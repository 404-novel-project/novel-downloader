import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import { ruleClass } from "../rules";
import { ggetHtmlDOM, cleanDOM, rm, ggetText } from "../lib";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class idejian implements ruleClass {
  public imageMode: "naive" | "TM";
  public maxRunLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.maxRunLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const _bookID = bookUrl.match(/\/(\d+)\/$/);
    const bookID = _bookID && _bookID[1];

    const bookname = (<HTMLElement>(
      document.querySelector(".detail_bkname > a")
    )).innerText.trim();
    const _author = (<HTMLElement>document.querySelector(".detail_bkauthor"))
      .childNodes[0];
    let author = "佚名";
    if (_author && _author.textContent) {
      author = _author.textContent.trim();
    }

    const introDom = <HTMLElement>document.querySelector(".brief_con");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".book_img > img")
    )).src;
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.detail_bkgrade > span")
    ).map((span) => (<HTMLSpanElement>span).innerText.trim());

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(".catelog_list > li > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>aElem).innerText;
      const chapterUrl = (<HTMLAnchorElement>aElem).href;
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
        this.chapterParse,
        "UTF-8",
        { bookID: bookID }
      );
      chapters.push(chapter);
    }

    // 初始化章节前清除 Cookie
    document.cookie = "";

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
    interface options {
      bookID: string;
    }

    const _chapterUrl = new URL(chapterUrl);
    _chapterUrl.hostname = "m.idejian.com";
    chapterUrl = _chapterUrl.toString();

    const referBaseUrl = "https://m.idejian.com/catalog";
    const _refer = new URL(referBaseUrl);
    _refer.searchParams.set("bookId", (<options>options).bookID);
    const referUrl = _refer.toString();

    const fakeUA =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Snapchat/10.77.5.59 (like Safari/604.1)";

    // 获取移动端Cookie
    if (document.cookie === "") {
      await ggetText(referUrl, charset, { headers: { "User-Agent": fakeUA } });
      await ggetText(chapterUrl, charset, {
        headers: { "User-Agent": fakeUA, Referer: referUrl },
      });
    }

    log.debug(`[Chapter]请求 ${chapterUrl}，Refer：${referUrl}`);
    let doc = await ggetHtmlDOM(chapterUrl, charset, {
      headers: { "User-Agent": fakeUA, Referer: referUrl },
    });
    chapterName = (<HTMLElement>(
      doc.querySelector(".text-title-1")
    )).innerText.trim();

    let content;
    if (doc.querySelectorAll("div.h5_mainbody").length === 1) {
      content = <HTMLElement>doc.querySelector("div.h5_mainbody");
    } else {
      content = <HTMLElement>doc.querySelectorAll("div.h5_mainbody")[1];
    }
    if (content) {
      rm("h1", false, content);
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
}
