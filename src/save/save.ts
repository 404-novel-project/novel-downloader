import { saveAs } from "file-saver";
import { logText } from "../log";
import { Book, saveType } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { Status } from "../main/main";
import { enableDebug, TxtDownload,EpubDownload } from "../setting";
import { SaveOptions } from "./options";
import { EPUB } from "./epub";
import { TXT } from "./txt";
import { Raw } from "./raw";

export class SaveBook {
  private saveType: saveType;
  private txt: TXT;
  private epub: EPUB;
  private raw!: Raw;

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    const _options = {};
    if (options !== undefined) {
      Object.assign(_options, options);
    }
    if (book.saveOptions !== undefined) {
      Object.assign(_options, book.saveOptions);
    }

    this.saveType = book.saveType;

    this.txt = new TXT(book, _options);
    this.epub = new EPUB(book, streamZip, _options);
    if (this.saveType.raw instanceof Object) {
      this.raw = new Raw(book);
    }
  }

  private static saveLog() {
    saveAs(
      new Blob([logText], { type: "text/plain; charset=UTF-8" }),
      "debug.log"
    );
  }

  public async addChapter(chapter: Chapter) {
    await this.epub.addChapter(chapter);

    if (!enableDebug.value) {
      chapter.contentRaw = null;
      chapter.contentHTML = null;
      chapter.contentImages = null;
    }
    if (chapter.contentImages && chapter.contentImages.length !== 0) {
      for (const attachment of chapter.contentImages) {
        attachment.status = Status.saved;
        if (!enableDebug.value) {
          attachment.Blob = null;
        }
      }
    }
    chapter.status = Status.saved;
  }

  public async save() {
    if (TxtDownload.value && this.saveType.txt) {
      this.saveTxt();
    }
    if (enableDebug.value) {
      SaveBook.saveLog();
    }
    if (EpubDownload.value &&this.saveType.epub) {
      await this.saveEpub();
    }
    if (this.saveType.raw instanceof Object) {
      await this.saveRaw();
    }
  }

  private saveTxt() {
    this.txt.saveTxt();
  }

  private async saveEpub() {
    await this.epub.saveEpub();
  }

  private async saveRaw() {
    await this.raw.saveRaw();
  }
}
