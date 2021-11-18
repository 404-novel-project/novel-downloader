import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { ggetHtmlDOM } from "../lib/http";
import { rm, sleep } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter, Status } from "../main";
import { BaseRuleClass, ChapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";

export class Shuhai extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(
        "div.book-info-bookname > span:nth-child(1)"
      ) as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        "div.book-info-bookname > span:nth-child(2)"
      ) as HTMLElement
    ).innerText
      .replace("作者: ", "")
      .trim();
    const introDom =
      document.querySelector("div.book-info-bookintro") ||
      document.querySelector("div.book-info-bookintro-all");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".book-cover-wrapper > img") as HTMLImageElement
    ).getAttribute("data-original");
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info-bookstate > .tag")
    ).map((span) => (span as HTMLSpanElement).innerText.trim());

    const chapters: Chapter[] = [];

    if (document.querySelectorAll("#catalog > .chapter-item").length === 0) {
      await sleep(3000);
    }

    const dsList = document.querySelectorAll("#catalog > .chapter-item");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const node of Array.from(dsList)) {
      if (node.nodeName === "SPAN") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (node as HTMLElement)?.innerText.trim();
      } else if (node.nodeName === "DIV") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = node.querySelector("a");

        const isVIP = () => {
          if (node.childElementCount === 2) {
            return true;
          } else {
            return false;
          }
        };
        const isPaid = () => {
          // Todo
          return false;
        };
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;
        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP(),
          isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          this.chapterParse,
          this.charset,
          {}
        );
        const isLogin = () => {
          // Todo
          return false;
        };
        if (isVIP() && !(isLogin() && chapter.isPaid)) {
          chapter.status = Status.aborted;
        }
        chapters.push(chapter);
      }
    }

    const book = new Book(
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters
    );
    return book;
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await ggetHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector("div.chapter-name") as HTMLElement
      ).innerText
        .replace("正文 ", "")
        .trim();
      const content = doc.querySelector(
        "#reader-content > div:nth-child(1)"
      ) as HTMLElement;

      if (content) {
        rm("div.chaper-info", false, content);
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }
    }

    async function vipChapter(): Promise<ChapterParseObject> {
      // Todo
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
