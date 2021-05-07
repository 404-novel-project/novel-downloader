import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass, ruleClassNamespace } from "../rules";
import { getHtmlDOM, cleanDOM, console_debug } from "../lib";

export class idejian implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    let bookUrl = document.location.href;

    const bookname = (<HTMLElement>(
      document.querySelector(".detail_bkname > a")
    )).innerText.trim();
    const _author = (<HTMLElement>document.querySelector(".detail_bkauthor"))
      .childNodes[0];
    let author = "佚名";
    if (_author && _author.textContent) {
      author = _author.textContent.trim();
    }

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector(".brief_con");
    if (introDom === null) {
      introduction = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

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
        chapterParse,
        "UTF-8"
      );
      chapters.push(chapter);
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    console_debug(`[Chapter]请求 ${chapterUrl}`);
    let doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>doc.querySelector(".title")).innerText.trim();

    let content;
    if (doc.querySelectorAll("div.h5_mainbody").length === 1) {
      content = <HTMLElement>doc.querySelector("div.h5_mainbody");
    } else {
      content = <HTMLElement>doc.querySelector("div.h5_mainbody:nth-child(2)");
    }
    if (content) {
      let { dom, text, images } = cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
      };
    } else {
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }
  }
}
