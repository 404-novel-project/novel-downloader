import { saveAs } from "file-saver";
import { log } from "../log";
import { Book } from "../main/Book";
import { enableDebug } from "../setting";
import { Options, SaveOptions } from "./options";

export class TXT extends Options {
  private readonly book: Book;
  private readonly savedTextArray: string[] = [];
  private readonly saveFileNameBase: string;

  public constructor(book: Book, options?: SaveOptions) {
    super();
    this.book = book;
    this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;

    if (options) {
      Object.assign(this, options);
    }
  }

  public saveTxt() {
    const chapters = this.book.chapters;

    const metaDateText = this.genMetaDateTxt(this.book);
    this.savedTextArray.push(metaDateText);

    log.debug("[save]对 chapters 排序");
    chapters.sort(this.chapterSort);

    const sections: string[] = [];
    for (const chapterTemp of chapters) {
      const chapterName = this.getchapterName(chapterTemp);
      if (
        chapterTemp.sectionName &&
        !sections.includes(chapterTemp.sectionName)
      ) {
        sections.push(chapterTemp.sectionName);
        const sectionText = this.genSectionText(chapterTemp.sectionName);
        this.savedTextArray.push(sectionText);
      }

      const chapterText = this.genChapterText(
        chapterName,
        chapterTemp.contentText ?? ""
      );
      this.savedTextArray.push(chapterText);

      if (!enableDebug.value) {
        chapterTemp.contentText = null;
      }
    }

    log.info("[save]保存TXT文件");
    // 设置换行符为 CRLF，兼容旧版本Windows。
    const savedText = this.savedTextArray.join("\n").replaceAll("\n", "\r\n");
    saveAs(
      new Blob([savedText], { type: "text/plain;charset=utf-8" }),
      `${this.saveFileNameBase}.txt`
    );
  }
}
