import { gfetch } from "./lib/http";
import { sleep } from "./lib/misc";
import { log } from "./log";
import { BaseRuleClass, ChapterParseObject } from "./rules";
import { SaveOptions } from "./save/save";
import { retryLimit } from "./setting";

export enum Status {
  pending,
  downloading,
  failed,
  finished,
  aborted,
  saved,
}

export interface BookAdditionalMetadate {
  cover?: AttachmentClass;
  attachments?: AttachmentClass[];
  tags?: string[];
  lastModified?: number;
  serires?: string;
  seriresNumber?: number;
  ids?: string[] | string;
  publisher?: string;
  languages?: string;
}

export class Book {
  public bookUrl: string;
  public bookname: string;
  public author: string;
  public introduction: string | null;
  public introductionHTML: HTMLElement | null;
  public additionalMetadate: BookAdditionalMetadate;
  public chapters: Chapter[];
  public saveOptions!: SaveOptions;

  public constructor(
    bookUrl: string,
    bookname: string,
    author: string,
    introduction: string | null,
    introductionHTML: HTMLElement | null,
    additionalMetadate: BookAdditionalMetadate,
    chapters: Chapter[]
  ) {
    this.bookUrl = bookUrl;
    this.bookname = bookname;
    this.author = author;
    this.introduction = introduction;
    this.introductionHTML = introductionHTML;
    this.additionalMetadate = additionalMetadate;
    this.chapters = chapters;
    log.debug("[Book]初始化完成");
  }
}

export interface ChapterAdditionalMetadate {
  lastModified?: number;
}

// tslint:disable-next-line:max-classes-per-file
export class Chapter {
  public bookUrl: string;
  public bookname: string;

  public chapterUrl: string;
  public chapterNumber: number;
  public chapterName: string | null;
  public isVIP: boolean;
  public isPaid: boolean | null;

  public sectionName: string | null;
  public sectionNumber: number | null;
  public sectionChapterNumber: number | null;

  public chapterParse: BaseRuleClass["chapterParse"];
  public charset: string;
  public options: object;

  public status: Status;
  public retryTime: number;

  public contentRaw!: HTMLElement | null;
  public contentText!: string | null;
  public contentHTML!: HTMLElement | null;
  public contentImages!: AttachmentClass[] | null;
  public additionalMetadate!: ChapterAdditionalMetadate | null;

  public chapterHtmlFileName!: string | number;

  public constructor(
    bookUrl: string,
    bookname: string,
    chapterUrl: string,
    chapterNumber: number,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    sectionName: string | null,
    sectionNumber: number | null,
    sectionChapterNumber: number | null,
    chapterParse: BaseRuleClass["chapterParse"],
    charset: string,
    options: object
  ) {
    this.bookUrl = bookUrl;
    this.bookname = bookname;

    this.chapterUrl = chapterUrl;
    this.chapterNumber = chapterNumber;
    this.chapterName = chapterName;
    this.isVIP = isVIP;
    this.isPaid = isPaid;
    this.sectionName = sectionName;
    this.sectionNumber = sectionNumber;
    this.sectionChapterNumber = sectionChapterNumber;

    this.chapterParse = chapterParse;
    this.charset = charset;
    this.options = options;

    this.status = Status.pending;
    this.retryTime = 0;
  }

  public async init() {
    const {
      chapterName,
      contentRaw,
      contentText,
      contentHTML,
      contentImages,
      additionalMetadate,
    } = await this.parse();
    this.chapterName = chapterName;
    this.contentRaw = contentRaw;
    this.contentText = contentText;
    this.contentHTML = contentHTML;
    this.contentImages = contentImages;
    this.additionalMetadate = additionalMetadate;

    if (this.status === Status.failed) {
      log.error(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!Boolean(this.contentHTML)} 解析出错。`);
    } else {
      log.info(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!Boolean(this.contentHTML)} 解析成功。`);
    }
    return this;
  }

  private async parse(): Promise<ChapterParseObject> {
    this.status = Status.downloading;

    return this.chapterParse(
      this.chapterUrl,
      this.chapterName,
      this.isVIP,
      this.isPaid,
      this.charset,
      this.options
    )
      .then(async (obj) => {
        const contentImages = obj.contentImages;
        if (contentImages) {
          let downloadingImages = contentImages.filter(
            (imgObj) => imgObj.status === Status.downloading
          );
          while (downloadingImages.length) {
            // 等待所有图片下载完成
            await sleep(500);
            downloadingImages = contentImages.filter(
              (imgObj) => imgObj.status === Status.downloading
            );
          }
        }
        this.status = Status.finished;
        return obj;
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        log.error(
          `[Chapter]${this.chapterName}解析出错，第${this.retryTime}次重试，章节地址：${this.chapterUrl}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.parse();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return {
            chapterName: this.chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
          };
        }
      });
  }
}

// tslint:disable-next-line:max-classes-per-file
export class AttachmentClass {
  public url: string;
  public name: string;
  public mode: "naive" | "TM";
  public headers?: { [index: string]: string };
  private defaultHeader: object;

  public status: Status;
  public retryTime: number;

  public imageBlob!: Blob | null | void;
  public comments!: string;

  public constructor(imageUrl: string, name: string, mode: "naive" | "TM") {
    this.url = imageUrl;
    this.name = name;
    this.mode = mode;

    this.status = Status.pending;
    this.retryTime = 0;

    this.defaultHeader = {
      Referer: document.location.origin,
    };
  }

  public async init() {
    if (this.mode === "naive") {
      this.imageBlob = await this.downloadImage();
    } else {
      this.imageBlob = await this.tmDownloadImage();
    }
    if (this.imageBlob) {
      log.info(`[attachment] ${this.url} 下载完成。`);
    }
    return this.imageBlob;
  }

  private downloadImage(): Promise<Blob | null> {
    const headers = Object.assign(this.defaultHeader, this.headers);
    const referer = headers.Referer;
    delete headers.Referer;
    this.status = Status.downloading;
    return fetch(this.url, {
      headers: { ...headers },
      referrer: referer,
    })
      .then((response: Response) => {
        if (response.ok) {
          this.status = Status.finished;
          return response.blob();
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(
            `Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`
          );
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        log.error(
          `[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.downloadImage();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }

  private tmDownloadImage(): Promise<Blob | null> {
    const headers = Object.assign(this.defaultHeader, this.headers);
    this.status = Status.downloading;
    return gfetch(this.url, {
      headers: { ...headers },
      responseType: "blob",
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.status = Status.finished;
          return response.response as Blob;
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(
            `Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`
          );
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        log.error(
          `[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1000);
          return this.tmDownloadImage();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ExpectError extends Error {}
