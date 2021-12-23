import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import {
  Book,
  BookAdditionalMetadate,
  Chapter,
  ExpectError,
} from "../../../main";
import { BaseRuleClass } from "../../../rules";

export class Sosadfun extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.origin + document.location.pathname;

    const bookname = (
      document.querySelector(".font-1") as HTMLElement
    ).innerText.trim();
    const authorDom = document.querySelector(
      "div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
    ) as HTMLElement;
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
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    let introDom;
    if (needLogin()) {
      alert("本小说需要登录后浏览！");
      throw new ExpectError("本小说需要登录后浏览！");
    } else {
      introDom = document.createElement("div");
      const shortIntroDom = document.querySelector("div.article-title div.h5");
      const longIntroDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      );
      if (shortIntroDom) {
        const pElem = document.createElement("p");
        pElem.innerText = (shortIntroDom as HTMLDivElement).innerText;
        introDom.appendChild(pElem);
      }
      if (longIntroDom) {
        for (const elem of Array.from(
          (longIntroDom.cloneNode(true) as HTMLDivElement).children
        )) {
          introDom.appendChild(elem);
        }
      }
    }
    if (introDom === null) {
      introduction = null;
      introductionHTML = null;
    } else {
      const {
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
      const chapterName = (a as HTMLAnchorElement).innerText.trim();
      const chapterUrl = (a as HTMLAnchorElement).href;
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
    chapterName = (
      doc.querySelector("strong.h3") as HTMLElement
    ).innerText.trim();

    const content = document.createElement("div");

    const _content = doc.querySelector(
      ".main-text.no-selection > span[id^=full]"
    ) as HTMLElement;
    const _authorSay = doc.querySelector(".main-text.no-selection > .grayout");
    if (_content) {
      for (const elem of Array.from(
        (_content.cloneNode(true) as HTMLElement).children
      )) {
        content.appendChild(elem);
      }
    }

    if (_content) {
      // eslint-disable-next-line prefer-const
      let { dom, text, images } = await cleanDOM(content, "TM");

      if (_authorSay) {
        const {
          dom: authorSayDom,
          text: authorySayText,
          images: authorSayImages,
        } = await cleanDOM(_authorSay, "TM");

        const hrElem = document.createElement("hr");
        const authorSayDiv = document.createElement("div");
        authorSayDiv.className = "authorSay";
        for (const elem of Array.from(
          (authorSayDom.cloneNode(true) as HTMLElement).children
        )) {
          authorSayDiv.appendChild(elem);
        }

        content.appendChild(hrElem);
        content.appendChild(authorSayDiv);
        dom.appendChild(hrElem);
        dom.appendChild(authorSayDiv);

        text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorySayText;

        authorSayImages.forEach((aImage) => images.push(aImage));
      }

      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    } else {
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }
  }
}
