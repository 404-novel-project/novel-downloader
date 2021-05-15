import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, console_debug, sandboxed } from "../lib";

export class dmzj implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href;

    const bookname = (<HTMLElement>(
      document.querySelector(".comic_deCon > h1 > a")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".comic_deCon_liO > li:nth-child(1)")
    )).innerText
      .replace("作者：", "")
      .trim();

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    const introDom = <HTMLElement>document.querySelector(".comic_deCon_d");
    if (introDom === null) {
      introduction = null;
      introductionHTML = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
      introductionHTML = introCleanDom;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".comic_i_img > a > img")
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
    let cos = document.querySelectorAll(
      "div.zj_list_con:nth-child(4) > ul.list_con_li > li"
    );
    let chapterNumber = 0;
    for (const co of Array.from(cos)) {
      chapterNumber++;
      const a = <HTMLAnchorElement>co.firstElementChild;
      const span = <HTMLSpanElement>a.lastElementChild;
      const chapterName = span.innerText;
      const chapterUrl = a.href;
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
        "UTF-8",
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
    function getpicUrlList(doc: Document) {
      const img_prefix = "https://images.dmzj1.com/";

      let pages = sandboxed(
        (<HTMLScriptElement>doc.querySelector("head > script")).innerText +
          ";return pages;"
      );
      pages = pages.replace(/\n/g, "");
      pages = pages.replace(/\r/g, "|");
      const info = sandboxed("return (" + pages + ")");
      if (info) {
        const picUrlList = info["page_url"]
          .split("|")
          .map((pic: string) => img_prefix + pic);
        return picUrlList;
      }
    }

    console_debug(`[Chapter]请求 ${chapterUrl}`);
    const doc = await getHtmlDOM(chapterUrl, charset);
    const picUrlList = getpicUrlList(doc);
    if (picUrlList) {
      const content = document.createElement("div");
      for (const picUrl of picUrlList) {
        const pElem = document.createElement("p");
        const imgElem = document.createElement("img");

        imgElem.src = picUrl;
        pElem.appendChild(imgElem);
        content.appendChild(pElem);
      }
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
