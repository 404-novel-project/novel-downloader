import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { ruleClass, ruleClassNamespace } from "../rules";

export class sosadfun implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.origin + document.location.pathname;

    const bookname = (<HTMLElement>(
      document.querySelector(".font-1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(
        "div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
      )
    )).innerText.trim();

    const needLogin = () => {
      const mainDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      ) as HTMLDivElement;
      if (mainDom.innerText.trim() === "主楼隐藏，请登录后查看") {
        return true;
      } else {
        return false;
      }
    };

    let introduction: string | null;
    let introDom;
    if (needLogin()) {
      introDom = document.querySelector("div.h5:nth-child(3)");
      alert("本小说需要登录后浏览！");
      throw new Error("本小说需要登录后浏览！");
    } else {
      introDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      ) as HTMLDivElement;
    }
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
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.h5:nth-child(1) > div:nth-child(3) > a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    const chapters: Chapter[] = [];
    const aList = document.querySelectorAll(
      ".table > tbody:nth-child(2) > tr > th:nth-child(1) > a"
    );
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      doc.querySelector("strong.h3")
    )).innerText.trim();

    const content = <HTMLElement>(
      doc.querySelector(".main-text.no-selection > span[id^=full]")
    );
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
