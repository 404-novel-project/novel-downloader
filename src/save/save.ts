import { saveAs } from "file-saver";
import { deepcopy } from "../lib/misc";
import { Optional } from "../lib/typescript";
import { FflateZip } from "../lib/zip";
import { log, logText } from "../log";
import { AttachmentClass, Book, Chapter, Status } from "../main";
import { enableCustomSaveOptions, enableDebug } from "../setting";
import defaultMainStyleText from "./main.css";
import { chapter as chapterGlobal, index, section } from "./template";
import defaultTocStyleText from "./toc.css";

export class SaveBook {
  protected book: Book;
  private chapters: Chapter[];

  public mainStyleText: string;
  public tocStyleText: string;

  private savedZip: FflateZip;
  private savedTextArray: string[];
  private saveFileNameBase: string;

  private _sections: string[];

  public constructor(book: Book) {
    this.book = book;
    this.chapters = book.chapters;

    this.savedZip = new FflateZip();
    this._sections = [];

    this.savedTextArray = [];
    this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;

    this.mainStyleText = defaultMainStyleText;
    this.tocStyleText = defaultTocStyleText;
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

  public saveLog() {
    this.savedZip.file(
      "debug.log",
      new Blob([logText], { type: "text/plain; charset=UTF-8" })
    );
  }

  public saveZip(runSaveChapters = false): Promise<void> {
    log.debug("[save]保存元数据文本");
    const metaDateText = this.genMetaDateTxt();
    this.savedZip.file(
      "info.txt",
      new Blob([metaDateText], { type: "text/plain;charset=utf-8" })
    );
    log.debug("[save]保存样式");
    this.savedZip.file(
      "style.css",
      new Blob([this.mainStyleText], { type: "text/css;charset=utf-8" })
    );
    this.savedZip.file(
      "toc.css",
      new Blob([this.tocStyleText], { type: "text/css;charset=utf-8" })
    );

    if (this.book.additionalMetadate.cover) {
      log.debug("[save]保存封面");
      this.addImageToZip(this.book.additionalMetadate.cover, this.savedZip);
    }
    if (this.book.additionalMetadate.attachments) {
      log.debug("[save]保存书籍附件");
      for (const bookAttachment of this.book.additionalMetadate.attachments) {
        this.addImageToZip(bookAttachment, this.savedZip);
      }
    }

    log.debug("[save]开始生成并保存卷文件");
    this.saveSections();

    log.debug("[save]开始生成并保存 index.html");
    this.saveToC();

    log.debug("[save]开始保存 Meta Data Json");
    this.saveMetaJson();

    if (runSaveChapters) {
      log.debug("[save]开始保存章节文件");
      this.saveChapters();
    } else {
      log.debug("[save]保存仅标题章节文件");
      this.saveStubChapters(this.chapters);
    }

    log.info("[save]开始保存ZIP文件");
    const self = this;
    if (enableDebug.value) {
      self.saveLog();
    }

    return new Promise((resolve, reject) => {
      const finalHandle = (blob: Blob) => {
        saveAs(blob, `${self.saveFileNameBase}.zip`);
        resolve();
      };
      const finalErrorHandle = (err: Error) => {
        log.error("saveZip: " + err);
        log.trace(err);
        reject(err);
      };

      this.savedZip.onFinal = finalHandle;
      this.savedZip.onFinalError = finalErrorHandle;
      this.savedZip.generateAsync();
    });
  }

  private saveToC() {
    log.debug("[save]对 chapters 排序");
    this.chapters.sort(this.chapterSort);

    const self = this;
    const sectionsListObj = getSectionsObj(self.chapters);
    modifyTocStyleText();

    const indexHtmlText = index.render({
      creationDate: Date.now(),
      bookname: self.book.bookname,
      tocStyleText: self.tocStyleText,
      author: self.book.author,
      cover: self.book.additionalMetadate.cover,
      introductionHTML: self.book.introductionHTML?.outerHTML,
      bookUrl: self.book.bookUrl,
      sectionsObj: Object.values(sectionsListObj),
      Status,
    });
    this.savedZip.file(
      "index.html",
      new Blob([indexHtmlText.replaceAll("data-src-address", "src")], {
        type: "text/html; charset=UTF-8",
      })
    );

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
  }

  private saveMetaJson() {
    const book = Object.assign({}, this.book) as Optional<Book>;
    delete book.chapters;
    this.savedZip.file(
      "book.json",
      new Blob([JSON.stringify(book)], {
        type: "application/json; charset=utf-8",
      })
    );

    const chapters = (this.book.chapters as Optional<Chapter>[])
      .map((c) => deepcopy(c))
      .filter((c) => {
        return c.contentHTML || c.status === Status.saved;
      })
      .map((c) => {
        delete c.bookUrl;
        delete c.bookname;
        delete c.chapterParse;
        delete c.charset;
        delete c.options;
        delete c.status;
        delete c.retryTime;
        delete c.contentRaw;
        delete c.contentText;
        delete c.contentHTML;
        delete c.contentImages;
        return c;
      });

    this.savedZip.file(
      "chapters.json",
      new Blob([JSON.stringify(chapters)], {
        type: "application/json; charset=utf-8",
      })
    );
  }

  private async saveStubChapters(chapters: Chapter[]) {
    chapters = chapters.filter((c) => c.status !== Status.saved);
    for (const c of chapters) {
      if (c.status === Status.finished) {
        await this.addChapter(c);
      } else {
        await this.addChapter(c, "Stub");
      }
    }
  }

  private saveChapters() {
    for (const chapter of this.chapters) {
      this.addChapter(chapter);
    }
  }

  private saveSections() {
    log.debug("[save]对 chapters 排序");
    this.chapters.sort(this.chapterSort);

    for (const chapter of this.chapters) {
      const chapterNumberToSave = this.getChapterNumberToSave(chapter);
      const sectionHtmlFileName = `No${chapterNumberToSave}Section.html`;

      if (chapter.sectionName) {
        if (!this._sections.includes(chapter.sectionName)) {
          this._sections.push(chapter.sectionName);

          log.debug(`[save]保存卷HTML文件：${chapter.sectionName}`);
          const sectionHTMLBlob = this.genSectionHtmlFile(chapter);
          this.savedZip.file(sectionHtmlFileName, sectionHTMLBlob);
        }
      }
    }
  }

  private getChapterNumberToSave(chapter: Chapter) {
    return `${"0".repeat(
      this.chapters.length.toString().length -
        chapter.chapterNumber.toString().length
    )}${chapter.chapterNumber.toString()}`;
  }

  public async addChapter(chapter: Chapter, suffix: string = "") {
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
    const htmlText = chapterGlobal.render({
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
}

export interface SectionObj {
  sectionName: string | null;
  sectionNumber: number | null;
  chpaters: Chapter[];
}
export interface SectionsObj {
  [sectionNumber: number]: SectionObj;
}
export function getSectionsObj(chapters: Chapter[]): SectionObj[] {
  const _sectionsObj: SectionsObj = {};
  for (const chapter of chapters) {
    let sectionNumber: number | null = null;
    const sectionName: string | null = null;
    if (chapter.sectionNumber && chapter.sectionName) {
      sectionNumber = chapter.sectionNumber;
    } else {
      sectionNumber = -99999999;
    }

    if (_sectionsObj[sectionNumber]) {
      _sectionsObj[sectionNumber].chpaters.push(chapter);
    } else {
      _sectionsObj[sectionNumber] = {
        sectionName: chapter.sectionName,
        sectionNumber: chapter.sectionNumber,
        chpaters: [chapter],
      };
    }
  }
  const _sectionsListObj: [string, SectionObj][] = Object.entries(_sectionsObj);
  function sectionListSort(a: [string, SectionObj], b: [string, SectionObj]) {
    const aKey = Number(a[0]);
    const bKey = Number(b[0]);
    return aKey - bKey;
  }
  _sectionsListObj.sort(sectionListSort);
  const sectionsListObj = _sectionsListObj.map((s) => s[1]);
  return sectionsListObj;
}

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
    const keyList = new Array().concat(keyNamesS).concat(keyNamesF);
    if (keyList.includes(keyname)) {
      return true;
    }
    return false;
  }
  function keyNamesStest(keyname: string) {
    // @ts-expect-error
    if (keyNamesS.includes(keyname)) {
      if (typeof data[keyname] === "string") {
        return true;
      }
    }
    return false;
  }
  function keyNamesFtest(keyname: string) {
    // @ts-expect-error
    if (keyNamesF.includes(keyname)) {
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

export function getSaveBookObj(book: Book, options: SaveOptions) {
  const saveBookObj = new SaveBook(book);

  // 自定义保存参数
  if (enableCustomSaveOptions && saveOptionsValidate(options)) {
    Object.assign(saveBookObj, options);
  }

  // 规则定义保存参数
  if (book.saveOptions !== undefined) {
    Object.assign(saveBookObj, book.saveOptions);
  }

  return saveBookObj;
}
