import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getImageAttachment } from "../lib";
import { introDomHandle, nextPageParse } from "./lib/common";

export class xinwanben implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
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
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".detailTopLeft > img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
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
        this.chapterParse,
        this.charset,
        {}
      );
      chapters.push(chapter);
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
    return nextPageParse(
      chapterName,
      chapterUrl,
      charset,
      ".readerCon",
      (_content, doc) => {
        const replaces = [
          "一秒记住【完本神站】手机用户输入地址：m.wanbentxt.com",
          "支持（完本神站）把本站分享那些需要的小伙伴！找不到书请留言！",
        ];
        replaces.forEach(
          (replace) =>
            (_content.innerHTML = _content.innerHTML.replaceAll(replace, ""))
        );
        return _content;
      },
      (doc) =>
        (<HTMLAnchorElement>doc.querySelector(".next")?.parentElement).href,
      (_content, nextLink) => new URL(nextLink).pathname.includes("_")
    );
  }
}
