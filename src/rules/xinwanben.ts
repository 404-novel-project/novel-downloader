import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, console_debug } from "../lib";
import { introDomHandle } from "./lib/common";

export class xinwanben implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    let bookUrl = document.location.href;

    const bookname = (<HTMLElement>(
      document.querySelector(".detailTitle > h1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".writer > a")
    )).innerText.trim();

    const introDom = <HTMLElement>(
      document.querySelector(
        ".detailTopMid > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      )
    );
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".detailTopLeft > img")
    )).src;
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
    }

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(".chapter > ul > li > a");
    let chapterNumber = 0;
    for (const co of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>co).innerText;
      const chapterUrl = (<HTMLAnchorElement>co).href;
      const isVIP = false;
      const isPaid = false;
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP,
        isPaid,
        null,
        null,
        null,
        chapterParse,
        "GBK",
        {}
      );
      chapters.push(chapter);
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      introductionHTML: introductionHTML,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    console_debug(`[Chapter]请求 ${chapterUrl}`);
    let nowUrl = chapterUrl;
    let doc = await getHtmlDOM(chapterUrl, charset);
    const content = document.createElement("div");

    let flag = false;
    do {
      const _content = <HTMLElement>doc.querySelector(".readerCon");
      for (const _c of Array.from(_content.childNodes)) {
        content.appendChild(_c);
      }

      const nextLink = (<HTMLAnchorElement>(
        doc.querySelector(".next")?.parentElement
      )).href;

      if (new URL(nextLink).pathname.includes("_")) {
        if (nextLink !== nowUrl) {
          flag = true;
        } else {
          console.error("网站页面出错，URL： " + nowUrl);
          flag = false;
        }
      } else {
        flag = false;
      }
      if (flag) {
        console_debug(`[Chapter]请求 ${nextLink}`);
        nowUrl = nextLink;
        doc = await getHtmlDOM(nextLink, charset);
      }
    } while (flag);

    let { dom, text, images } = cleanDOM(content, "TM");
    return {
      chapterName: chapterName,
      contentRaw: content,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate: null,
    };
  }
}
