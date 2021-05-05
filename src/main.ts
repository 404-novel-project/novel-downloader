import { ruleClassNamespace, chapterParseObject, retryLimit } from "./rules";
import { gfetch, sleep, console_debug } from "./lib";

export enum Status {
  pending,
  downloading,
  failed,
  finished,
  aborted,
}

export interface BookAdditionalMetadate {
  cover?: attachmentClass;
  attachments?: attachmentClass[];
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
  public additionalMetadate: BookAdditionalMetadate;
  public chapters: Chapter[];

  public constructor(
    bookUrl: string,
    bookname: string,
    author: string,
    introduction: string | null,
    additionalMetadate: BookAdditionalMetadate,
    chapters: Chapter[]
  ) {
    this.bookUrl = bookUrl;
    this.bookname = bookname;
    this.author = author;
    this.introduction = introduction;
    this.additionalMetadate = additionalMetadate;
    this.chapters = chapters;
    console_debug("[Book]初始化完成");
  }
}

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

  public chapterParse: ruleClassNamespace.chapterParse;
  public charset: string;

  public status: Status;
  public retryTime: number;

  public contentRaw!: HTMLElement | null;
  public contentText!: string | null;
  public contentHTML!: HTMLElement | null;
  public contentImages!: attachmentClass[] | null;

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
    chapterParse: ruleClassNamespace.chapterParse,
    charset: string
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

    this.status = Status.pending;
    this.retryTime = 0;
  }

  public async init() {
    const obj = await this.parse();

    const {
      chapterName,
      contentRaw,
      contentText,
      contentHTML,
      contentImages,
    } = obj;
    this.chapterName = chapterName;
    this.contentRaw = contentRaw;
    this.contentText = contentText;
    this.contentHTML = contentHTML;
    this.contentImages = contentImages;

    console_debug(`[Chapter]${this.chapterName} 解析完成。`);
    return obj;
  }

  private async parse(): Promise<chapterParseObject> {
    this.status = Status.downloading;

    return this.chapterParse(
      this.chapterUrl,
      this.chapterName,
      this.isVIP,
      this.isPaid,
      this.charset
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
        console.error(
          `[Chapter]${this.chapterName}解析出错，第${this.retryTime}次重试，章节地址：${this.chapterUrl}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.parse();
        } else {
          this.status = Status.failed;
          console.error(err);
          return {
            chapterName: this.chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
          };
        }
      });
  }
}

export class attachmentClass {
  public imageUrl: string;
  public name: string;
  public mode: "naive" | "TM";
  public referer?: string;

  public status: Status;
  public retryTime: number;

  public imageBlob!: Blob | null;

  public constructor(imageUrl: string, name: string, mode: "naive" | "TM") {
    this.imageUrl = imageUrl;
    this.name = name;
    this.mode = mode;

    this.status = Status.pending;
    this.retryTime = 0;
  }

  public async init() {
    if (this.mode === "naive") {
      this.imageBlob = await this.downloadImage();
    } else {
      this.imageBlob = await this.tmDownloadImage();
    }
    console_debug(`[Image] ${this.imageUrl} 下载完成。`);
    return this.imageBlob;
  }

  private downloadImage(): Promise<Blob | null> {
    this.status = Status.downloading;
    return fetch(this.imageUrl)
      .then((response: Response) => {
        if (response.ok) {
          this.status = Status.finished;
          return response.blob();
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(
            `Image request response is not ok!\nImage url: ${this.imageUrl} .`
          );
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        console.error(
          `[Image]下载 ${this.imageUrl} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.downloadImage();
        } else {
          this.status = Status.failed;
          console.error(err);
          return null;
        }
      });
  }

  private tmDownloadImage(): Promise<Blob | null> {
    this.status = Status.downloading;
    return gfetch(this.imageUrl, {
      headers: {
        referrer: this.referer ? this.referer : document.location.origin,
      },
      responseType: "blob",
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.status = Status.finished;
          return <Blob>response.response;
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(`Bad response!\nRequest url: ${this.imageUrl}`);
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        console.error(
          `[Image]下载 ${this.imageUrl} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.tmDownloadImage();
        } else {
          this.status = Status.failed;
          console.error(err);
          return null;
        }
      });
  }
}
