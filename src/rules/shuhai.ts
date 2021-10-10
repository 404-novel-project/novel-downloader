import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { sleep, rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { ggetHtmlDOM } from "../lib/http";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";
export class shuhai extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("div.book-info-bookname > span:nth-child(1)")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector("div.book-info-bookname > span:nth-child(2)")
    )).innerText
      .replace("作者: ", "")
      .trim();
    const introDom =
      document.querySelector("div.book-info-bookintro") ||
      document.querySelector("div.book-info-bookintro-all");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>(
      document.querySelector(".book-cover-wrapper > img")
    )).getAttribute("data-original");
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info-bookstate > .tag")
    ).map((span) => (<HTMLSpanElement>span).innerText.trim());

    const chapters: Chapter[] = [];

    if (document.querySelectorAll("#catalog > .chapter-item").length === 0) {
      await sleep(3000);
    }

    const dsList = document.querySelectorAll("#catalog > .chapter-item");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < dsList.length; i++) {
      const node = dsList[i];
      if (node.nodeName === "SPAN") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLElement>node)?.innerText.trim();
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
          //Todo
          return false;
        };
        const chapterName = (<HTMLAnchorElement>a).innerText.trim();
        const chapterUrl = (<HTMLAnchorElement>a).href;
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
          //Todo
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
    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await ggetHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("div.chapter-name")
      )).innerText
        .replace("正文 ", "")
        .trim();
      const content = <HTMLElement>(
        dom.querySelector("#reader-content > div:nth-child(1)")
      );

      if (content) {
        rm("div.chaper-info", false, content);
        let { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName: chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName: chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }
    }

    async function vipChapter(): Promise<chapterParseObject> {
      //Todo
      return {
        chapterName: chapterName,
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
