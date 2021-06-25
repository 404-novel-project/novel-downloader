import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { introDomHandle } from "./lib/common";

export class dierbanzhu implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("#info > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("#info > p:nth-child(2)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = <HTMLElement>document.querySelector("#intro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

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
    const dl = document.querySelector("#list>dl");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      const chapterList = dlc.filter((obj) => obj !== undefined);
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (let i = 0; i < chapterList.length; i++) {
        const node = <HTMLElement>chapterList[i];
        if (node.nodeName === "DT" && !node.innerText.includes("最新章节")) {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
        } else if (node.nodeName === "DD") {
          chapterNumber++;
          sectionChapterNumber++;
          const a = <HTMLLinkElement>node.firstElementChild;
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
      dom.querySelector(".bookname > h1:nth-child(1)")
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
