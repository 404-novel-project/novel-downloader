import { sleep } from "../lib/misc";
import { log } from "../log";
import { BaseRuleClass, ChapterParseObject } from "../rules";
import { retryLimit } from "../setting";
import { Status } from "./main";
import { AttachmentClass } from "./Attachment";
import { Book } from "./Book";
import { GmWindow } from "../global";

export interface ChapterAdditionalMetadate {
  lastModified?: number;
  tags?: string[];
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

  public chapterParse: BaseRuleClass["chapterParse"];
  public charset: string;
  public options: object;

  public status: Status = Status.pending;
  public retryTime = 0;

  public contentRaw!: HTMLElement | null;
  public contentText!: string | null;
  public contentHTML!: HTMLElement | null;
  public contentImages!: AttachmentClass[] | null;
  public additionalMetadate!: ChapterAdditionalMetadate | null;

  public chapterHtmlFileName!: string;
  public book!: Book;

  public constructor({
    bookUrl,
    bookname,
    chapterUrl,
    chapterNumber,
    chapterName,
    isVIP,
    isPaid,
    sectionName,
    sectionNumber,
    sectionChapterNumber,
    chapterParse,
    charset,
    options,
  }: {
    bookUrl: string;
    bookname: string;
    chapterUrl: string;
    chapterNumber: number;
    chapterName: string | null;
    isVIP: boolean;
    isPaid: boolean | null;
    sectionName: string | null;
    sectionNumber: number | null;
    sectionChapterNumber: number | null;
    chapterParse: BaseRuleClass["chapterParse"];
    charset: string;
    options: Record<string, any>;
  }) {
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
isNull:${!this.contentHTML} 解析出错。`);
    } else {
      log.info(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!this.contentHTML} 解析成功。`);
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
          (window as GmWindow).failedCount++;
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

  private toJSON() {
    return {
      bookUrl: this.bookUrl,
      bookname: this.bookname,
      chapterUrl: this.chapterUrl,
      chapterNumber: this.chapterNumber,
      chapterName: this.chapterName,
      isVIP: this.isPaid,
      isPaid: this.isPaid,
      sectionName: this.sectionName,
      sectionNumber: this.sectionNumber,
      sectionChapterNumber: this.sectionChapterNumber,
      status: this.status,
      retryTime: this.retryTime,
      chapterHtmlFileName: this.chapterHtmlFileName,
    };
  }
}
