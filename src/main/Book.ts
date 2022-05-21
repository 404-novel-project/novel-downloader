import { removeTrackParm } from "../lib/removeTrackParam";
import { log } from "../log";
import { SaveOptions } from "../save/options";
import { AttachmentClass } from "./Attachment";
import { Chapter } from "./Chapter";

export interface BookAdditionalMetadate {
  cover?: AttachmentClass;
  attachments?: AttachmentClass[];
  tags?: string[];
  lastModified?: number;
  serires?: string;
  seriresNumber?: number;
  ids?: string[] | string;
  publisher?: string;
  language?: string;
}

export interface saveType {
  epub: boolean;
  txt: boolean;
  raw: false | { ext: string };
}

export class Book {
  private _bookUrl = "";
  private _ToCUrl?: string;
  public saveType: saveType = {
    epub: true,
    txt: true,
    raw: false,
  };
  public readonly bookname: string;
  public readonly author: string;
  public readonly introduction: string | null;
  public readonly introductionHTML: HTMLElement | null;
  public readonly additionalMetadate: BookAdditionalMetadate;
  public chapters: Chapter[];
  public saveOptions!: SaveOptions;

  public constructor({
    bookUrl,
    bookname,
    author,
    introduction,
    introductionHTML,
    additionalMetadate,
    chapters,
  }: {
    bookUrl: string;
    bookname: string;
    author: string;
    introduction: string | null;
    introductionHTML: HTMLElement | null;
    additionalMetadate: BookAdditionalMetadate;
    chapters: Chapter[];
  }) {
    this.bookUrl = bookUrl;
    this.bookname = bookname;
    this.author = author;
    this.introduction = introduction;
    this.introductionHTML = introductionHTML;
    this.additionalMetadate = additionalMetadate;
    this.chapters = chapters;
    log.debug("[Book]初始化完成");
  }

  public set bookUrl(v: string) {
    this._bookUrl = removeTrackParm(v);
  }

  public get bookUrl(): string {
    return this._bookUrl;
  }

  public set ToCUrl(v: string | undefined) {
    if (v) {
      this._ToCUrl = removeTrackParm(v);
    }
  }

  public get ToCUrl(): string | undefined {
    return this._ToCUrl;
  }

  private toJSON() {
    return {
      bookUrl: this.bookUrl,
      ToCUrl: this.ToCUrl,
      bookname: this.bookname,
      author: this.author,
      introduction: this.introduction,
      introductionHTML: this.introductionHTML
        ? this.introductionHTML.outerHTML
        : this.introductionHTML,
      additionalMetadate: this.additionalMetadate,
    };
  }
}
