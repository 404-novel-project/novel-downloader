import { BookAdditionalMetadate, Chapter, Book, ExpectError } from "../main";
import { getHtmlDOM, cleanDOM } from "../lib";
import { ruleClass } from "../rules";

export class sosadfun implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.origin + document.location.pathname;

    const bookname = (<HTMLElement>(
      document.querySelector(".font-1")
    )).innerText.trim();
    const authorDom = <HTMLElement>(
      document.querySelector(
        "div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
      )
    );
    let author;
    if (authorDom) {
      author = authorDom.innerText.trim();
    } else {
      author = "匿名咸鱼";
    }

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

    const additionalMetadate: BookAdditionalMetadate = {};
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.h5:nth-child(1) > div:nth-child(3) > a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    let introDom;
    if (needLogin()) {
      alert("本小说需要登录后浏览！");
      throw new ExpectError("本小说需要登录后浏览！");
    } else {
      introDom = document.createElement("div");
      const shortIntroDom = document.querySelector("div.h5:nth-child(3)");
      const longIntroDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      );
      if (shortIntroDom) {
        const pElem = document.createElement("p");
        pElem.innerText = (<HTMLDivElement>shortIntroDom).innerText;
        introDom.appendChild(pElem);
      }
      if (longIntroDom) {
        for (const elem of Array.from(
          (<HTMLDivElement>longIntroDom.cloneNode(true)).children
        )) {
          introDom.appendChild(elem);
        }
      }
    }
    if (introDom === null) {
      introduction = null;
      introductionHTML = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = await cleanDOM(introDom, "TM");
      introduction = introCleantext;
      introductionHTML = introCleanDom;
      if (introCleanimages) {
        additionalMetadate.attachments = [...introCleanimages];
      }
    }

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
      doc.querySelector("strong.h3")
    )).innerText.trim();

    const content = <HTMLElement>(
      doc.querySelector(".main-text.no-selection > span[id^=full]")
    );
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
