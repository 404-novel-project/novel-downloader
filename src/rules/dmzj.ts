import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { sandboxed } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class Dmzj extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;

    const bookname = (
      document.querySelector(".comic_deCon > h1 > a") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector(
        ".comic_deCon_liO > li:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace("作者：", "")
      .trim();

    const introDom = document.querySelector(".comic_deCon_d") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".comic_i_img > a > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(
      "div.zj_list_con:nth-child(4) > ul.list_con_li > li"
    );
    let chapterNumber = 0;
    for (const co of Array.from(cos)) {
      chapterNumber++;
      const a = co.firstElementChild as HTMLAnchorElement;
      const span = a.lastElementChild as HTMLSpanElement;
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
    function getpicUrlList(docI: Document) {
      const imgPrefix = "https://images.dmzj.com/";

      let pages = sandboxed(
        (docI.querySelector("head > script") as HTMLScriptElement).innerText +
          ";return pages;"
      );
      pages = pages.replace(/\n/g, "");
      pages = pages.replace(/\r/g, "|");
      const info = sandboxed("return (" + pages + ")");
      if (info) {
        const picUrlListI = info.page_url
          .split("|")
          .map((pic: string) => imgPrefix + pic);
        return picUrlListI;
      }
    }

    log.debug(`[Chapter]请求 ${chapterUrl}`);
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
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    }

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
