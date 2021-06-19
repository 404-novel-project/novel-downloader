import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM } from "../lib";
import { introDomHandle } from "./lib/common";
export class yrun implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("#info > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("#info > p:nth-child(2)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = <HTMLElement>document.querySelector("#intro > p");
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector("#fmimg > img"))
      .src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const chapterList = document.querySelectorAll("#list>dl>dd>a");
    if (chapterList && chapterList.length !== 0) {
      for (let i = 0; i < chapterList.length; i++) {
        const a = <HTMLLinkElement>chapterList[i];
        const chapterName = a.innerText;
        const chapterUrl = a.href;
        const isVIP = false;
        const isPaid = false;
        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          i,
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
    const dom = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      dom.querySelector(".bookname > h1:nth-child(1)")
    )).innerText.trim();
    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
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
