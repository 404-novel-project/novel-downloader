import webStyleText from "./web.css";
import { FflateZip } from "../lib/zip";
import { log, logText } from "../log";
import { Status } from "../main/main";
import { AttachmentClass } from "../main/Attachment";
import { Chapter } from "../main/Chapter";
import { Book } from "../main/Book";
import { enableDebug } from "../setting";
import { getSectionsObj } from "./misc";
import { Options, SaveOptions } from "./options";
import { convertHTMLtoXHTML } from "../lib/dom";

import chapterHtml from "./chapter.html.j2";
import indexHtml from "./index.html.j2";
import sectionHtml from "./section.html.j2";
import { Environment, Template } from "nunjucks";

const env = new Environment(undefined, { autoescape: false });

export const section = new Template(sectionHtml, env, undefined, true);
export const chapterTemplt = new Template(chapterHtml, env, undefined, true);
const index = new Template(indexHtml, env, undefined, true);

export class ZIP extends Options {
  private book: Book;
  private chapters: Chapter[];
  private savedZip: FflateZip;

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    super();
    this.book = book;
    this.chapters = this.book.chapters;

    const zipFilename = `[${this.book.author}]${this.book.bookname}.zip`;
    this.savedZip = new FflateZip(zipFilename, streamZip);

    if (options) {
      Object.assign(this, options);
    }
  }

  public async saveLog() {
    await this.savedZip.file(
      "debug.log",
      new Blob([logText], { type: "text/plain; charset=UTF-8" })
    );
  }

  public async saveZip(): Promise<void> {
    const self = this;

    log.debug("[save]保存元数据文本");
    const metaDateText = this.genMetaDateTxt(this.book);
    await this.savedZip.file(
      "info.txt",
      new Blob([metaDateText], { type: "text/plain;charset=utf-8" })
    );
    log.debug("[save]保存样式");
    await this.savedZip.file(
      "style.css",
      new Blob([this.mainStyleText], { type: "text/css;charset=utf-8" })
    );
    await this.savedZip.file(
      "web.css",
      new Blob([webStyleText], { type: "text/css;charset=utf-8" })
    );
    modifyTocStyleText();
    await this.savedZip.file(
      "toc.css",
      new Blob([this.tocStyleText], { type: "text/css;charset=utf-8" })
    );

    if (this.book.additionalMetadate.cover) {
      log.debug("[save]保存封面");
      await this.addAttachmentToZip(
        this.book.additionalMetadate.cover,
        this.savedZip
      );
    }
    if (this.book.additionalMetadate.attachments) {
      log.debug("[save]保存书籍附件");
      for (const bookAttachment of this.book.additionalMetadate.attachments) {
        await this.addAttachmentToZip(bookAttachment, this.savedZip);
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

    log.debug("[save]保存仅标题章节文件");
    await saveStubChapters(this.chapters);

    log.info("[save]开始保存ZIP文件");
    if (enableDebug.value) {
      await self.saveLog();
    }
    await this.savedZip.generateAsync();

    async function saveToC() {
      log.debug("[save]对 chapters 排序");
      self.chapters.sort(self.chapterSort);

      const sectionsListObj = getSectionsObj(self.chapters, self.chapterSort);

      const _indexHtmlText = index.render({
        creationDate: Date.now(),
        bookname: self.book.bookname,
        author: self.book.author,
        cover: self.book.additionalMetadate.cover,
        introductionHTML: self.book.introductionHTML?.outerHTML,
        bookUrl: self.book.bookUrl,
        sectionsObj: Object.values(sectionsListObj),
        Status,
      });
      const indexHtmlText = convertHTMLtoXHTML(_indexHtmlText);
      await self.savedZip.file(
        "index.xhtml",
        new Blob([indexHtmlText.replaceAll("data-src-address", "src")], {
          type: "application/xhtml+xml; charset=UTF-8",
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

    function genSectionHtmlFile(chapterObj: Chapter) {
      const _htmlText = section.render({ sectionName: chapterObj.sectionName });
      const doc = self.addWebCSS(_htmlText);
      const htmlText = convertHTMLtoXHTML(doc);
      return new Blob([htmlText.replaceAll("data-src-address", "src")], {
        type: "application/xhtml+xml; charset=UTF-8",
      });
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

      const _sections: string[] = [];

      for (const chapter of self.chapters) {
        const chapterNumberToSave = self.getChapterNumberToSave(
          chapter,
          self.chapters
        );
        const sectionHtmlFileName = `No${chapterNumberToSave}Section.xhtml`;

        if (chapter.sectionName) {
          if (!_sections.includes(chapter.sectionName)) {
            _sections.push(chapter.sectionName);

            log.debug(`[save]保存卷HTML文件：${chapter.sectionName}`);
            const sectionHTMLBlob = genSectionHtmlFile(chapter);
            await self.savedZip.file(sectionHtmlFileName, sectionHTMLBlob);
          }
        }
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
    const chapterNumberToSave = this.getChapterNumberToSave(
      chapter,
      this.chapters
    );
    const chapterHtmlFileName = `No${chapterNumberToSave}Chapter${suffix}.xhtml`;

    log.debug(`[save]保存章HTML文件：${chapterName}`);
    const chapterHTMLBlob = this.genChapterHtmlFile(chapter);
    await this.savedZip.file(chapterHtmlFileName, chapterHTMLBlob);
    chapter.chapterHtmlFileName = chapterHtmlFileName;

    if (chapter.contentImages && chapter.contentImages.length !== 0) {
      log.debug(`[save]保存章节附件：${chapterName}`);
      for (const attachment of chapter.contentImages) {
        await this.addAttachmentToZip(attachment, this.savedZip);
      }
    }
  }

  private genChapterHtmlFile(chapterObj: Chapter) {
    const _htmlText = chapterTemplt.render({
      chapterUrl: chapterObj.chapterUrl,
      chapterName: chapterObj.chapterName,
      outerHTML: chapterObj.contentHTML?.outerHTML ?? "",
    });
    const doc = this.addWebCSS(_htmlText);
    const htmlText = convertHTMLtoXHTML(doc);
    return new Blob([htmlText.replaceAll("data-src-address", "src")], {
      type: "application/xhtml+xml; charset=UTF-8",
    });
  }

  private addWebCSS(input: string) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    const link = document.createElement("link");
    link.href = "web.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    doc.head.appendChild(link);
    return doc;
  }

  private async addAttachmentToZip(
    attachment: AttachmentClass,
    zip: FflateZip
  ) {
    if (attachment.status === Status.finished && attachment.imageBlob) {
      log.debug(
        `[save]添加附件，文件名：${attachment.name}，对象`,
        attachment.imageBlob
      );
      await zip.file(attachment.name, attachment.imageBlob);
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
