import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { ruleClass } from "../rules";

export class westnovel implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".btitle > h1 > a")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector(".btitle > em:nth-child(2)")
    )).innerText
      .replace("作者：", "")
      .trim();

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    const introDom = document.querySelector(".intro-p > p:nth-child(1)");
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
    let coverUrl = (<HTMLImageElement>document.querySelector(".img-img")).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

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
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      doc.querySelector("#BookCon > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>doc.querySelector("#BookText");
    if (content) {
      rm("div.ads", true, content);
      rm("div.link", true, content);
      rm("h4", true, content);
      let { dom, text, images } = cleanDOM(content, "TM");
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
