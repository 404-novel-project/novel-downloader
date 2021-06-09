import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { ruleClass } from "../rules";

export class linovelib implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href.replace(/\/catalog$/, ".html");
    const bookname = (<HTMLElement>(
      document.querySelector(".book-meta > h1")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector(
        ".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(2)"
      )
    )).innerText.trim();

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    const doc = await getHtmlDOM(bookUrl, undefined);
    const introDom = doc.querySelector(".book-dec > p:nth-child(1)");
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
      doc.querySelector(".book-img > img")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split("!")[0].split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    additionalMetadate.tags = Array.from(
      doc.querySelectorAll(".book-label a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    const chapters: Chapter[] = [];

    const chapterList = document.querySelector(".chapter-list");
    if (!chapterList) {
      throw new Error("获取章节失败！");
    }
    const liList = chapterList.children;
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < liList.length; i++) {
      const node = liList[i];
      const nodeNmae = node.nodeName.toLowerCase();
      if (nodeNmae === "div") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLDivElement>node).innerText.trim();
      } else if (nodeNmae === "li") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = node.firstElementChild as HTMLAnchorElement;
        const isVIP = false;
        const chapterName = a.innerText.trim();
        const chapterUrl = a.href;
        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP,
          null,
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse,
          "UTF-8",
          {}
        );
        if (chapterUrl.startsWith("javascript")) {
          chapter.status = Status.aborted;
        }
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      doc.querySelector("#mlfy_main_text > h1:nth-child(1)")
    )).innerText.trim();
    const content = <HTMLElement>doc.querySelector("#TextContent");
    rm(".tp", true, content);
    rm(".bd", true, content);
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
