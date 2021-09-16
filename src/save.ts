import { Book, Chapter, attachmentClass, Status } from "./main";
import { fflateZip } from "./lib/zip";
import { enableCustomSaveOptions, enaleDebug } from "./setting";
import { log, logText } from "./log";
import { newWindow } from "./global";

export class saveBook {
  protected book: Book;
  private chapters: Chapter[];

  public mainStyleText: string;
  public tocStyleText: string;

  private savedZip: fflateZip;
  private savedTextArray: string[];
  private saveFileNameBase: string;

  private _sections: string[];
  private _savedChapters: Chapter[];

  public constructor(book: Book) {
    this.book = book;
    this.chapters = book.chapters;
    this.chapters.sort(this.chapterSort);

    this.savedZip = new fflateZip();
    this._sections = [];
    this._savedChapters = [];

    this.savedTextArray = [];
    this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;

    this.mainStyleText = `body {
  background-color: #f0f0f2;
  margin: 0;
  padding: 0;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
div.main {
  width: 900px;
  margin: 5em auto;
  padding: 2em;
  background-color: #fdfdff;
  border-radius: 0.5em;
  box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);
}
@media (max-width: 700px) {
  div.main {
    margin: 0 auto;
    width: auto;
  }
}
h1 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: xxx-large;
  margin-top: 3.2em;
  margin-bottom: 3.3em;
}
h2 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  margin-top: 1.2em;
  margin-bottom: 2.3em;
}
div {
  margin: 0px;
  padding: 0px;
  text-align: justify;
}
p {
  text-indent: 2em;
  display: block;
  line-height: 1.3em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
img {
  vertical-align: text-bottom;
  max-width: 90%;
}
.title {
  margin-bottom: 0.7em;
}
.author {
  text-align: center;
}`;
    this.tocStyleText = `img {
  max-width: 100%;
  max-height: 15em;
}
.introduction {
  font-size: smaller;
  max-height: 18em;
  overflow-y: scroll;
}
.introduction p {
	text-indent: 0;
}
.bookurl {
  text-align: center;
  font-size: smaller;
  padding-top: 1em;
  padding-bottom: 0.5em;
  margin-top: 0.4em;
}
.bookurl > a {
  color: gray;
}
.info {
  display: grid;
  grid-template-columns: 30% 70%;
}
.info h3 {
  padding-left: 0.5em;
  margin-top: -1.2em;
  margin-bottom: 0.5em;
}
.section {
  margin-top: 1.5em;
  display: grid;
  grid-template-columns: 30% 30% 30%;
}
.section > h2:first-child {
  grid-column-end: span 3;
}
.section > .chapter {
  padding-bottom: 0.3em;
  text-align: center;
}
.main > h1 {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
a.disabled {
  pointer-events: none;
  cursor: default;
  color: gray;
}
.author::before {
	content: "作者：";
}
.author {
	text-align: center;
	margin-top: -3em;
	margin-bottom: 3em;
}`;
  }

  public saveTxt() {
    const metaDateText = this.genMetaDateTxt();
    this.savedTextArray.push(metaDateText);

    let sections: string[] = [];
    for (const chapter of this.chapters) {
      const chapterName = this.getchapterName(chapter);
      if (chapter.sectionName && !sections.includes(chapter.sectionName)) {
        sections.push(chapter.sectionName);
        const sectionText = this.genSectionText(chapter.sectionName);
        this.savedTextArray.push(sectionText);
      }

      if (chapter.contentText) {
        const chapterText = this.genChapterText(
          chapterName,
          chapter.contentText
        );
        this.savedTextArray.push(chapterText);
      }
      if (!enaleDebug) {
        chapter.contentText = null;
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

    if (runSaveChapters) {
      log.debug("[save]开始保存章节文件");
      this.saveChapters();
    }

    log.debug("[save]开始生成并保存ToC.html");
    this.saveToC();

    log.info("[save]开始保存ZIP文件");
    const self = this;
    self.saveLog();

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
      this.savedZip.generateAsync((percent) => {
        const progress = (window as newWindow & typeof globalThis).progress;
        if (progress) {
          progress.zipPercent = percent;
        }
      });
    });
  }

  private saveToC() {
    const ToC = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="referrer" content="same-origin"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${this.book.bookname}</title></head><body><div class="main"><h1>${this.book.bookname}</h1><h3 class="author">${this.book.author}</h3></div></body></html>`,
      "text/html"
    );
    const TocMain = ToC.querySelector("div.main");

    log.debug("[save]生成ToC模板");
    const infoDom = document.createElement("div");
    infoDom.className = "info";
    if (this.book.additionalMetadate.cover) {
      const coverDom = document.createElement("img");
      coverDom.className = "cover";
      coverDom.setAttribute(
        "data-src-address",
        this.book.additionalMetadate.cover.name
      );
      infoDom.appendChild(coverDom);
    }
    if (this.book.introductionHTML) {
      const divElem = document.createElement("div");
      const h3Elem = document.createElement("h3");
      h3Elem.innerText = "简介";

      const introDom = document.createElement("div");
      introDom.className = "introduction";
      introDom.innerHTML = this.book.introductionHTML.innerHTML;

      divElem.appendChild(h3Elem);
      divElem.appendChild(introDom);
      infoDom.appendChild(divElem);
    }
    TocMain?.appendChild(infoDom);

    const bookUrlDom = document.createElement("div");
    bookUrlDom.className = "bookurl";
    const bookUrlAnchor = document.createElement("a");
    bookUrlAnchor.href = this.book.bookUrl;
    bookUrlAnchor.innerText = "打开原始网站";
    bookUrlDom.appendChild(bookUrlAnchor);
    TocMain?.appendChild(bookUrlDom);

    const hr = document.createElement("hr");
    TocMain?.appendChild(hr);

    const tocStyle = document.createElement("style");
    tocStyle.innerHTML = this.tocStyleText;
    ToC.head.appendChild(tocStyle);

    let sections: string[] = [];
    for (const chapter of this.chapters) {
      const chapterName = this.getchapterName(chapter);
      const htmlfileNameBase = `${"0".repeat(
        this.chapters.length.toString().length -
          chapter.chapterNumber.toString().length
      )}${chapter.chapterNumber.toString()}.html`;
      const chapterHtmlFileName = `Chapter${htmlfileNameBase}`;

      if (chapter.sectionName) {
        const sectionHtmlId = `section${chapter.sectionNumber}`;

        if (!sections.includes(chapter.sectionName)) {
          sections.push(chapter.sectionName);

          log.debug(`[save]生成卷DOM：${chapter.sectionName}`);
          const sectionDiv = document.createElement("div");
          sectionDiv.id = sectionHtmlId;
          sectionDiv.className = "section";

          const heading = document.createElement("h2");
          heading.className = "section-label";
          heading.innerHTML = chapter.sectionName;

          sectionDiv.appendChild(heading);
          if (sections.length !== 1) {
            const hr = document.createElement("hr");
            TocMain?.appendChild(hr);
          }
          TocMain?.appendChild(sectionDiv);
        }

        log.debug(`[save]生成章DOM：${chapterName}`);
        const sectionDiv = TocMain?.querySelector("#" + sectionHtmlId);

        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        const chapterAnchor = document.createElement("a");
        chapterAnchor.href = chapterHtmlFileName;
        chapterAnchor.innerHTML = chapterName;

        if (!(chapter.contentHTML || chapter.status === Status.saved)) {
          chapterAnchor.classList.add("disabled");
        }

        chapterDiv.appendChild(chapterAnchor);
        sectionDiv?.appendChild(chapterDiv);
      } else {
        let sectionDiv;
        if (TocMain?.querySelector("#section00")) {
          sectionDiv = TocMain?.querySelector("#section00");
        } else {
          sectionDiv = document.createElement("div");
          sectionDiv.id = "section00";
          sectionDiv.className = "section";
          TocMain?.appendChild(sectionDiv);
        }

        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        const chapterAnchor = document.createElement("a");
        chapterAnchor.href = chapterHtmlFileName;
        chapterAnchor.innerHTML = chapterName;

        if (!(chapter.contentHTML || chapter.status === Status.saved)) {
          chapterAnchor.classList.add("disabled");
        }

        chapterDiv.appendChild(chapterAnchor);
        sectionDiv?.appendChild(chapterDiv);
      }
    }
    log.debug("[save]保存ToC文件");
    this.savedZip.file(
      "index.html",
      new Blob(
        [ToC.documentElement.outerHTML.replaceAll("data-src-address", "src")],
        {
          type: "text/html; charset=UTF-8",
        }
      )
    );
  }

  private saveChapters() {
    for (const chapter of this.chapters) {
      this.addChapter(chapter);
    }
  }

  public addChapter(chapter: Chapter) {
    const chapterName = this.getchapterName(chapter);
    const htmlfileNameBase = `${"0".repeat(
      this.chapters.length.toString().length -
        chapter.chapterNumber.toString().length
    )}${chapter.chapterNumber.toString()}.html`;
    const chapterHtmlFileName = `Chapter${htmlfileNameBase}`;

    if (chapter.sectionName) {
      if (!this._sections.includes(chapter.sectionName)) {
        this._sections.push(chapter.sectionName);

        log.debug(`[save]保存卷HTML文件：${chapter.sectionName}`);
        const sectionHTMLBlob = this.genSectionHtmlFile(chapter.sectionName);
        this.savedZip.file(`Section${htmlfileNameBase}`, sectionHTMLBlob);
      }
    }

    log.debug(`[save]保存章HTML文件：${chapterName}`);
    if (chapter.contentHTML) {
      const chapterHTMLBlob = this.genChapterHtmlFile(
        chapterName,
        chapter.contentHTML,
        chapter.chapterUrl
      );
      if (!enaleDebug) {
        chapter.contentRaw = null;
        chapter.contentHTML = null;
        chapter.status = Status.saved;
      }
      this.savedZip.file(chapterHtmlFileName, chapterHTMLBlob);
    }

    log.debug(`[save]开始保存章节附件：${chapterName}`);
    if (chapter.contentImages) {
      for (const attachment of chapter.contentImages) {
        this.addImageToZip(attachment, this.savedZip);
      }
      if (!enaleDebug) {
        chapter.contentImages = null;
      }
    }

    this._savedChapters.push(chapter);
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

  private addImageToZip(attachment: attachmentClass, zip: fflateZip) {
    if (attachment.status === Status.finished && attachment.imageBlob) {
      log.debug(
        `[save]添加附件，文件名：${attachment.name}，对象`,
        attachment.imageBlob
      );
      zip.file(attachment.name, attachment.imageBlob);
      if (!enaleDebug) {
        attachment.imageBlob = null;
        attachment.status = Status.saved;
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

  public genSectionHtmlFile(sectionName: string) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="referrer" content="same-origin"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${sectionName}</title></head><body><div class="main"><h1>${sectionName}</h1></div></body></html>`,
      "text/html"
    );
    return new Blob(
      [
        htmlFile.documentElement.outerHTML.replaceAll(
          "data-src-address",
          "src"
        ),
      ],
      {
        type: "text/html; charset=UTF-8",
      }
    );
  }

  public genChapterHtmlFile(
    chapterName: string,
    DOM: HTMLElement,
    chapterUrl: string
  ) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="referrer" content="same-origin"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><meta name="source" content="${chapterUrl}"><link href="style.css" type="text/css" rel="stylesheet"/><title>${chapterName}</title></head><body><div class="main"><h2>${chapterName}</h2></div></body></html>`,
      "text/html"
    );
    htmlFile.querySelector(".main")?.appendChild(DOM);
    return new Blob(
      [
        htmlFile.documentElement.outerHTML.replaceAll(
          "data-src-address",
          "src"
        ),
      ],
      {
        type: "text/html; charset=UTF-8",
      }
    );
  }

  private chapterSort(a: Chapter, b: Chapter) {
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

export interface saveOptions {
  mainStyleText?: saveBook["mainStyleText"];
  tocStyleText?: saveBook["tocStyleText"];
  getchapterName?: saveBook["getchapterName"];
  genSectionText?: saveBook["genSectionText"];
  genChapterText?: saveBook["genChapterText"];
  genSectionHtmlFile?: saveBook["genSectionHtmlFile"];
  genChapterHtmlFile?: saveBook["genChapterHtmlFile"];
}
export function saveOptionsValidate(data: any) {
  const keyNamesS: Array<keyof saveOptions> = ["mainStyleText", "tocStyleText"];
  const keyNamesF: Array<keyof saveOptions> = ["getchapterName"];

  function keyNametest(keyname: string) {
    const keyList = new Array().concat(keyNamesS).concat(keyNamesF);
    if (keyList.includes(keyname)) {
      return true;
    }
    return false;
  }
  function keyNamesStest(keyname: string) {
    //@ts-expect-error
    if (keyNamesS.includes(keyname)) {
      if (typeof data[keyname] === "string") {
        return true;
      }
    }
    return false;
  }
  function keyNamesFtest(keyname: string) {
    //@ts-expect-error
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
    if (!keyNametest(keyname)) {
      return false;
    }
    if (!(keyNamesStest(keyname) || keyNamesFtest(keyname))) {
      return false;
    }
  }
  return true;
}

export function getSaveBookObj(book: Book, options: saveOptions) {
  const saveBookObj = new saveBook(book);

  // 自定义保存参数
  if (enableCustomSaveOptions && saveOptionsValidate(options)) {
    for (const option in options) {
      //@ts-expect-error
      saveBookObj[option] = options[option as keyof saveOptions];
    }
  }

  // 规则定义保存参数
  if (book.saveOptions !== undefined) {
    for (const option in book.saveOptions) {
      //@ts-expect-error
      saveBookObj[option] = book.saveOptions[option as keyof book.saveOptions];
    }
  }

  return saveBookObj;
}
