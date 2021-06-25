import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM } from "../lib";
import { introDomHandle } from "./lib/common";

export class shubaowa implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("#info > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("#info > p:nth-child(2)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = <HTMLElement>document.querySelector("#intro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector("#fmimg > img"))
      ?.src;
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
    }

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll("#list > dl > dd > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>aElem).innerText;
      const chapterUrl = (<HTMLAnchorElement>aElem).href;
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        false,
        false,
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
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".bookname > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
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
