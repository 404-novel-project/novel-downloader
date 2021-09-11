import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass } from "../rules";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";

export class meegoq extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 3;
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace("/book", "/info");

    const dom = await getHtmlDOM(bookUrl, "GBK");
    const author = (<HTMLElement>(
      dom.querySelector("article.info > p.detail.pt20 > i:nth-child(1) > a")
    )).innerText.trim();

    const bookname = (<HTMLElement>(
      dom.querySelector("article.info > header > h1")
    )).innerText.trim();
    const introDom = <HTMLElement>dom.querySelector("article.info > p.desc");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom, (introDom) => {
      rm("b", false, introDom);
      return introDom;
    });

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      dom.querySelector("article.info > div.cover > img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const chapters: Chapter[] = [];
    const ul = document.querySelector("ul.mulu");
    if (ul?.childElementCount) {
      const ulc = Array.from(ul.children);
      if (
        Array.from(ulc[0].classList).includes("volumn") &&
        (<HTMLElement>ulc[0]).innerText.match(/最新.章/)
      ) {
        for (let i = 0; i < ul?.childElementCount; i++) {
          if (
            i !== 0 &&
            Array.from(ulc[i].classList).includes("volumn") &&
            (<HTMLElement>ulc[i]).innerText.trim() !== "全部章节"
          ) {
            delete ulc[0];
            break;
          }
          delete ulc[i];
        }
      }

      const chapterList = ulc.filter((obj) => obj !== undefined);
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (let i = 0; i < chapterList.length; i++) {
        const li = <HTMLElement>chapterList[i];
        if (Array.from(li.classList).includes("volumn")) {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = li.innerText.trim();
        } else {
          chapterNumber++;
          sectionChapterNumber++;
          const a = <HTMLLinkElement>li.firstElementChild;
          const chapterName = a.innerText;
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
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            this.chapterParse,
            this.charset,
            {}
          );
          chapters.push(chapter);
        }
      }
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
      dom.querySelector("article > header > h1")
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
