import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import { ggetHtmlDOM, cleanDOM, co, cosCompare, sleep, rm } from "../lib";
import { ruleClass, ruleClassNamespace, chapterParseObject } from "../rules";

export class shuhai implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GBK";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("div.book-info-bookname > span:nth-child(1)")
    )).innerText.trim();

    let introduction: string | null;
    const author = (<HTMLElement>(
      document.querySelector("div.book-info-bookname > span:nth-child(2)")
    )).innerText
      .replace("作者: ", "")
      .trim();
    const introDom =
      document.querySelector("div.book-info-bookintro") ||
      document.querySelector("div.book-info-bookintro-all");
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
    let coverUrl = (<HTMLImageElement>(
      document.querySelector(".book-cover-wrapper > img")
    )).getAttribute("data-original");
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info-bookstate > .tag")
    ).map((span) => (<HTMLSpanElement>span).innerText.trim());

    const chapters: Chapter[] = [];

    if (document.querySelectorAll("#catalog > .chapter-item").length === 0) {
      await sleep(3000);
    }

    const cos: co[] = [];
    const dsList = document.querySelectorAll("#catalog > .chapter-item");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;

    for (let i = 0; i < dsList.length; i++) {
      const node = dsList[i];
      if (node.nodeName === "SPAN") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLElement>node)?.innerText.trim();
      } else if (node.nodeName === "DIV") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = node.querySelector("a");

        const isVIP = () => {
          if (node.childElementCount === 2) {
            return true;
          } else {
            return false;
          }
        };
        const isPaid = () => {
          //Todo
          return false;
        };
        const chapterName = (<HTMLAnchorElement>a).innerText.trim();
        const chapterUrl = (<HTMLAnchorElement>a).href;
        const co: co = {
          bookUrl: bookUrl,
          bookname: bookname,
          chapterUrl: chapterUrl,
          chapterName: chapterName,
          isVIP: isVIP(),
          isPaid: isPaid(),
          sectionName: sectionName,
          sectionNumber: sectionNumber,
          sectionChapterNumber: sectionChapterNumber,
        };
        cos.push(co);
      }
    }

    cos.sort(cosCompare);
    for (let i = 0; i < cos.length; i++) {
      const chapterNumber = i + 1;
      let {
        bookUrl,
        bookname,
        chapterUrl,
        chapterName,
        isVIP,
        isPaid,
        sectionName,
        sectionNumber,
        sectionChapterNumber,
      } = cos[i];
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
        chapterParse,
        "GBK"
      );
      const isLogin = () => {
        //Todo
        return false;
      };
      if (isVIP && !(isLogin() && chapter.isPaid)) {
        chapter.status = Status.aborted;
      }
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
    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await ggetHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("div.chapter-name")
      )).innerText
        .replace("正文 ", "")
        .trim();
      const content = <HTMLElement>(
        dom.querySelector("#reader-content > div:nth-child(1)")
      );

      if (content) {
        rm("div.chaper-info", false, content);
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

    async function vipChapter(): Promise<chapterParseObject> {
      //Todo
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
