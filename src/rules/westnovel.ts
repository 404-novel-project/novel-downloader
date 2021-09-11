import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class westnovel extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".btitle > h1 > a")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector(".btitle > em:nth-child(2)")
    )).innerText
      .replace("作者：", "")
      .trim();

    const introDom = document.querySelector(".intro-p > p:nth-child(1)");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>document.querySelector(".img-img")).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const chapters: Chapter[] = [];
    const aList = document.querySelectorAll(".chapterlist > dd > a");
    let chapterNumber = 0;
    for (const a of Array.from(aList)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>a).innerText.trim();
      const chapterUrl = (<HTMLAnchorElement>a).href;
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      doc.querySelector("#BookCon > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>doc.querySelector("#BookText");
    if (content) {
      rm("div.ads", true, content);
      rm("div.link", true, content);
      rm("h4", true, content);
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
