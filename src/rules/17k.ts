import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import { getHtmlDOM, cleanDOM, co, cosCompare, rm } from "../lib";
import { ruleClass, ruleClassNamespace, chapterParseObject } from "../rules";

export class c17k implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href.replace("/list/", "/book/");
    const bookname = (<HTMLElement>(
      document.querySelector("h1.Title")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector("div.Author > a")
    )).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, undefined);
    let introduction: string | null;
    const introDom = doc.querySelector("#bookInfo p.intro > a");
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
    let coverUrl = (<HTMLImageElement>doc.querySelector("#bookCover img.book"))
      .src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];

    const sections = document.querySelectorAll("dl.Volume");

    const cos: co[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;

      const sectionName = (<HTMLElement>(
        s.querySelector("dt > span.tit")
      )).innerText.trim();

      const cs = s.querySelectorAll("dd > a");
      for (let j = 0; j < cs.length; j++) {
        const a = cs[j];
        const span = a.firstElementChild;
        const chapterName = (<HTMLSpanElement>span).innerText.trim();
        const chapterUrl = (<HTMLAnchorElement>a).href;

        const isVIP = () => {
          if (span?.className.includes("vip")) {
            return true;
          } else {
            return false;
          }
        };
        const isPaid = () => {
          //Todo
          return false;
        };

        const co: co = {
          bookUrl: bookUrl,
          bookname: bookname,
          chapterUrl: chapterUrl,
          chapterName: chapterName,
          isVIP: isVIP(),
          isPaid: isPaid(),
          sectionName: sectionName,
          sectionNumber: sectionNumber,
          sectionChapterNumber: j,
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
        "UTF-8"
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
      const doc = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        doc.querySelector("#readArea > div.readAreaBox.content > h1")
      )).innerText.trim();
      const content = <HTMLElement>(
        doc.querySelector("#readArea > div.readAreaBox.content > div.p")
      );
      if (content) {
        rm("p.copy", false, content);
        rm("#banner_content", false, content);
        rm("div.qrcode", false, content);
        rm("div.chapter_text_ad", false, content);

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
