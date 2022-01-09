import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { Status } from "../main/main";
import { enableDebug } from "../setting";
import { SaveOptions } from "./options";
import { TXT } from "./txt";
import { ZIP } from "./zip";

export class SaveBook {
  private txt: TXT;
  private zip: ZIP;

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    const _options = {};
    if (options !== undefined) {
      Object.assign(_options, options);
    }
    if (book.saveOptions !== undefined) {
      Object.assign(_options, book.saveOptions);
    }

    this.txt = new TXT(book, _options);
    this.zip = new ZIP(book, streamZip, _options);
  }

  public async addChapter(chapter: Chapter) {
    await this.zip.addChapter(chapter);

    if (!enableDebug.value) {
      chapter.contentRaw = null;
      chapter.contentHTML = null;
      chapter.contentImages = null;
    }
    chapter.status = Status.saved;
  }

  public saveTxt() {
    this.txt.saveTxt();
  }

  public async saveZip(runSaveChapters = false) {
    await this.zip.saveZip(runSaveChapters);
  }
}
