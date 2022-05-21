import { FflateZip } from "../lib/zip";
import { Book } from "../main/Book";
import { extensionToMimetype } from "../lib/misc";

export class Raw {
  private readonly book: Book;
  private readonly epubZip: FflateZip;

  public constructor(book: Book) {
    this.book = book;

    if (this.book.saveType.raw instanceof Object) {
      const zipFilename = `[${this.book.author}]${this.book.bookname}.${this.book.saveType.raw.ext}`;
      this.epubZip = new FflateZip(
        zipFilename,
        false,
        extensionToMimetype(this.book.saveType.raw.ext)
      );
    } else {
      throw new Error("init raw save zip failed!");
    }
  }

  public async saveRaw() {
    const attachments = this.book.additionalMetadate.attachments;
    const tasks =
      attachments?.map(async (attach) => {
        if (attach.Blob) {
          await this.epubZip.file(
            attach.name,
            attach.Blob,
            attach.comments === "nocompress"
          );
        }
      }) ?? [];
    await Promise.all(tasks);
    await this.epubZip.generateAsync();
  }
}
