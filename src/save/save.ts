import { saveAs } from "file-saver";
import { logText } from "../log";
import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { Status } from "../main/main";
import { enableDebug } from "../setting";
import { EPUB } from "./epub";
import { SaveOptions } from "./options";
import { TXT } from "./txt";

export class SaveBook {
  private txt: TXT;
  private epub: EPUB;

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    const _options = {};
    if (options !== undefined) {
      Object.assign(_options, options);
    }
    if (book.saveOptions !== undefined) {
      Object.assign(_options, book.saveOptions);
    }

    this.txt = new TXT(book, _options);
    this.epub = new EPUB(book, streamZip, _options);
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
          attachment.imageBlob = null;
        }
      }
    }
    chapter.status = Status.saved;
  }

  private saveTxt() {
    this.txt.saveTxt();
  }

  private async saveEpub() {
    await this.epub.saveEpub();
  }

  private saveLog() {
    saveAs(
      new Blob([logText], { type: "text/plain; charset=UTF-8" }),
      "debug.log"
    );
  }

  public async save() {
    this.saveTxt();
    if (enableDebug.value) {
      this.saveLog();
    }
    await this.saveEpub();
  }
}
