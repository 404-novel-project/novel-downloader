import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { introDomHandle } from "./lib/common";

export class shouda8 implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".bread-crumbs > li:nth-child(4)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("div.bookname > h1 > em")
    )).innerText
      .replace("作者：", "")
      .trim();

    const introDom = <HTMLElement>document.querySelector(".intro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom, (introDom) => {
      rm(".book_keywords", false, introDom);
      rm("script", true, introDom);
      rm("#cambrian0", false, introDom);
      return introDom;
    });

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".pic > img:nth-child(1)")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const chapterList = document.querySelectorAll(".link_14 > dl dd a");
    for (let i = 0; i < chapterList.length; i++) {
      const a = <HTMLLinkElement>chapterList[i];
      const chapterName = a.innerText;
      const chapterUrl = a.href;
      const isVIP = false;
      const isPaid = false;
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        i + 1,
        chapterName,
        isVIP,
        isPaid,
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
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
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".kfyd > h2:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
      rm("p:last-child", false, content);
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
