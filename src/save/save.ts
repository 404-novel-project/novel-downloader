import { saveAs } from "file-saver";
import { FflateZip } from "../lib/zip";
import { log, logText } from "../log";
import { Status } from "../main/main";
import { AttachmentClass } from "../main/Attachment";
import { Chapter } from "../main/Chapter";
import { Book } from "../main/Book";
import { enableDebug } from "../setting";
import defaultMainStyleText from "./main.css";
import { getSectionsObj } from "./misc";
import { chapter as chapterTemplt, index, section } from "./template";
import defaultTocStyleText from "./toc.css";

export interface SaveOptions {
  mainStyleText?: SaveBook["mainStyleText"];
  tocStyleText?: SaveBook["tocStyleText"];
  getchapterName?: SaveBook["getchapterName"];
  genSectionText?: SaveBook["genSectionText"];
  genChapterText?: SaveBook["genChapterText"];
  genSectionHtmlFile?: SaveBook["genSectionHtmlFile"];
  genChapterHtmlFile?: SaveBook["genChapterHtmlFile"];
  chapterSort?: SaveBook["chapterSort"];
}

export function saveOptionsValidate(data: any) {
  const keyNamesS: (keyof SaveOptions)[] = ["mainStyleText", "tocStyleText"];
  const keyNamesF: (keyof SaveOptions)[] = [
    "getchapterName",
    "genSectionText",
    "genChapterText",
    "genSectionHtmlFile",
    "genChapterHtmlFile",
    "chapterSort",
  ];

  function keyNametest(keyname: string) {
    const keyList: string[] = [...keyNamesS, ...keyNamesF];
    if (keyList.includes(keyname)) {
      return true;
    }
    return false;
  }
  function keyNamesStest(keyname: string) {
    if (keyNamesS.includes(keyname as keyof SaveOptions)) {
      if (typeof data[keyname] === "string") {
        return true;
      }
    }
    return false;
  }
  function keyNamesFtest(keyname: string) {
    if (keyNamesF.includes(keyname as keyof SaveOptions)) {
      if (typeof data[keyname] === "function") {
        return true;
      }
    }
    return false;
  }

  if (typeof data !== "object") {
    return false;
  }
  if (Object.keys(data).length === 0) {
    return false;
  }
  for (const keyname in data) {
    if (Object.prototype.hasOwnProperty.call(data, keyname)) {
      if (!keyNametest(keyname)) {
        return false;
      }
      if (!(keyNamesStest(keyname) || keyNamesFtest(keyname))) {
        return false;
      }
    }
  }
  return true;
}
export class SaveBook {
  protected book: Book;
  protected streamZip: boolean;

  private chapters: Chapter[];

  public mainStyleText: string;
  public tocStyleText: string;

  private savedZip: FflateZip;
  private savedTextArray: string[];
  private saveFileNameBase: string;

  private _sections: string[];

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    this.book = book;
    this.chapters = book.chapters;
    this.streamZip = streamZip;
    this.mainStyleText = defaultMainStyleText;
    this.tocStyleText = defaultTocStyleText;

    this.savedTextArray = [];
    this._sections = [];
    this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;

    const zipFilename = `${this.saveFileNameBase}.zip`;
    this.savedZip = new FflateZip(zipFilename, streamZip);

    if (options !== undefined) {
      Object.assign(this, options);
    }
    if (book.saveOptions !== undefined) {
      Object.assign(this, book.saveOptions);
    }
  }

  public saveTxt() {
    const metaDateText = this.genMetaDateTxt();
    this.savedTextArray.push(metaDateText);

    log.debug("[save]对 chapters 排序");
    this.chapters.sort(this.chapterSort);

    const sections: string[] = [];
    for (const chapterTemp of this.chapters) {
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

  public async saveLog() {
    await this.savedZip.file(
      "debug.log",
      new Blob([logText], { type: "text/plain; charset=UTF-8" })
    );
  }

  public async saveZip(runSaveChapters = false): Promise<void> {
    const self = this;

    log.debug("[save]保存元数据文本");
    const metaDateText = this.genMetaDateTxt();
    await this.savedZip.file(
      "info.txt",
      new Blob([metaDateText], { type: "text/plain;charset=utf-8" })
    );
    log.debug("[save]保存样式");
    await this.savedZip.file(
      "style.css",
      new Blob([this.mainStyleText], { type: "text/css;charset=utf-8" })
    );
    modifyTocStyleText();
    await this.savedZip.file(
      "toc.css",
      new Blob([this.tocStyleText], { type: "text/css;charset=utf-8" })
    );

    if (this.book.additionalMetadate.cover) {
      log.debug("[save]保存封面");
      await this.addImageToZip(
        this.book.additionalMetadate.cover,
        this.savedZip
      );
    }
    if (this.book.additionalMetadate.attachments) {
      log.debug("[save]保存书籍附件");
      for (const bookAttachment of this.book.additionalMetadate.attachments) {
        await this.addImageToZip(bookAttachment, this.savedZip);
      }
    }

    log.debug("[save]开始生成并保存卷文件");
    await saveSections();

    log.debug("[save]保存已完成章节文件");
    await saveFinishedChapters(this.chapters);

    log.debug("[save]开始生成并保存 index.html");
    await saveToC();

    log.debug("[save]开始保存 Meta Data Json");
    await saveMetaJson();

    if (runSaveChapters) {
      log.debug("[save]开始保存章节文件");
      await saveChapters();
    } else {
      log.debug("[save]保存仅标题章节文件");
      await saveStubChapters(this.chapters);
    }

    log.info("[save]开始保存ZIP文件");
    if (enableDebug.value) {
      await self.saveLog();
    }
    await this.savedZip.generateAsync();

    async function saveToC() {
      log.debug("[save]对 chapters 排序");
      self.chapters.sort(self.chapterSort);

      const sectionsListObj = getSectionsObj(self.chapters);

      const indexHtmlText = index.render({
        creationDate: Date.now(),
        bookname: self.book.bookname,
        author: self.book.author,
        cover: self.book.additionalMetadate.cover,
        introductionHTML: self.book.introductionHTML?.outerHTML,
        bookUrl: self.book.bookUrl,
        sectionsObj: Object.values(sectionsListObj),
        Status,
      });
      await self.savedZip.file(
        "index.html",
        new Blob([indexHtmlText.replaceAll("data-src-address", "src")], {
          type: "text/html; charset=UTF-8",
        })
      );
    }

    function modifyTocStyleText() {
      if (self.book.additionalMetadate.cover) {
        self.tocStyleText = `${self.tocStyleText}
  .info {
    display: grid;
    grid-template-columns: 30% 70%;
  }`;
      } else {
        self.tocStyleText = `${self.tocStyleText}
  .info {
    display: grid;
    grid-template-columns: 100%;
  }`;
      }
    }

    async function saveMetaJson() {
      await self.savedZip.file(
        "book.json",
        new Blob([JSON.stringify(self.book)], {
          type: "application/json; charset=utf-8",
        })
      );

      await self.savedZip.file(
        "chapters.json",
        new Blob([JSON.stringify(self.book.chapters)], {
          type: "application/json; charset=utf-8",
        })
      );
    }

    async function saveSections() {
      log.debug("[save]对 chapters 排序");
      self.chapters.sort(self.chapterSort);

      for (const chapter of self.chapters) {
        const chapterNumberToSave = self.getChapterNumberToSave(chapter);
        const sectionHtmlFileName = `No${chapterNumberToSave}Section.html`;

        if (chapter.sectionName) {
          if (!self._sections.includes(chapter.sectionName)) {
            self._sections.push(chapter.sectionName);

            log.debug(`[save]保存卷HTML文件：${chapter.sectionName}`);
            const sectionHTMLBlob = self.genSectionHtmlFile(chapter);
            await self.savedZip.file(sectionHtmlFileName, sectionHTMLBlob);
          }
        }
      }
    }

    async function saveChapters() {
      for (const chapter of self.chapters) {
        await self.addChapter(chapter);
      }
    }

    async function saveFinishedChapters(chapters: Chapter[]) {
      const cs = chapters.filter((c) => c.status === Status.finished);
      for (const c of cs) {
        await self.addChapter(c);
      }
    }

    async function saveStubChapters(chapters: Chapter[]) {
      chapters = chapters.filter((c) => c.status !== Status.saved);
      for (const c of chapters) {
        if (c.status === Status.finished) {
          await self.addChapter(c);
        } else {
          await self.addChapter(c, "Stub");
        }
      }
    }
  }

  public async addChapter(chapter: Chapter, suffix = "") {
    const chapterName = this.getchapterName(chapter);
    const chapterNumberToSave = this.getChapterNumberToSave(chapter);
    const chapterHtmlFileName = `No${chapterNumberToSave}Chapter${suffix}.html`;

    log.debug(`[save]保存章HTML文件：${chapterName}`);
    const chapterHTMLBlob = this.genChapterHtmlFile(chapter);
    if (!enableDebug.value) {
      chapter.contentRaw = null;
      chapter.contentHTML = null;
    }
    await this.savedZip.file(chapterHtmlFileName, chapterHTMLBlob);
    chapter.chapterHtmlFileName = chapterHtmlFileName;
    chapter.status = Status.saved;

    if (chapter.contentImages && chapter.contentImages.length !== 0) {
      log.debug(`[save]保存章节附件：${chapterName}`);
      for (const attachment of chapter.contentImages) {
        this.addImageToZip(attachment, this.savedZip);
      }
      if (!enableDebug.value) {
        chapter.contentImages = null;
      }
    }
  }

  public getchapterName(chapter: Chapter) {
    if (chapter.chapterName) {
      return chapter.chapterName;
    } else {
      return chapter.chapterNumber.toString();
    }
  }

  public genSectionText(sectionName: string) {
    return (
      `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}` +
      "\n\n"
    );
  }

  public genChapterText(chapterName: string, contentText: string) {
    return `## ${chapterName}\n\n${contentText}\n\n`;
  }

  public genSectionHtmlFile(chapterObj: Chapter) {
    const htmlText = section.render({ sectionName: chapterObj.sectionName });
    return new Blob([htmlText.replaceAll("data-src-address", "src")], {
      type: "text/html; charset=UTF-8",
    });
  }

  public genChapterHtmlFile(chapterObj: Chapter) {
    const htmlText = chapterTemplt.render({
      chapterUrl: chapterObj.chapterUrl,
      chapterName: chapterObj.chapterName,
      outerHTML: chapterObj.contentHTML?.outerHTML ?? "",
    });
    return new Blob([htmlText.replaceAll("data-src-address", "src")], {
      type: "text/html; charset=UTF-8",
    });
  }

  public chapterSort(a: Chapter, b: Chapter) {
    if (a.chapterNumber > b.chapterNumber) {
      return 1;
    }
    if (a.chapterNumber === b.chapterNumber) {
      return 0;
    }
    if (a.chapterNumber < b.chapterNumber) {
      return -1;
    }
    return 0;
  }

  private getChapterNumberToSave(chapter: Chapter) {
    return `${"0".repeat(
      this.chapters.length.toString().length -
        Math.trunc(chapter.chapterNumber).toString().length
    )}${chapter.chapterNumber.toString()}`;
  }

  private genMetaDateTxt() {
    let metaDateText = `题名：${this.book.bookname}\n作者：${this.book.author}`;
    if (this.book.additionalMetadate.tags) {
      metaDateText += `\nTag列表：${this.book.additionalMetadate.tags.join(
        "、"
      )}`;
    }
    metaDateText += `\n原始网址：${this.book.bookUrl}`;
    if (this.book.additionalMetadate.cover) {
      metaDateText += `\n封面图片地址：${this.book.additionalMetadate.cover.url}`;
    }
    if (this.book.introduction) {
      metaDateText += `\n简介：${this.book.introduction}`;
    }
    metaDateText += `\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader\n\n`;
    return metaDateText;
  }

  private async addImageToZip(attachment: AttachmentClass, zip: FflateZip) {
    if (attachment.status === Status.finished && attachment.imageBlob) {
      log.debug(
        `[save]添加附件，文件名：${attachment.name}，对象`,
        attachment.imageBlob
      );
      await zip.file(attachment.name, attachment.imageBlob);
      attachment.status = Status.saved;
      if (!enableDebug.value) {
        attachment.imageBlob = null;
      }
    } else if (attachment.status === Status.saved) {
      log.debug(`[save]附件${attachment.name}已添加`);
    } else {
      log.warn(
        `[save]添加附件${attachment.name}失败，该附件未完成或内容为空。`
      );
      log.warn(attachment);
    }
  }
}
