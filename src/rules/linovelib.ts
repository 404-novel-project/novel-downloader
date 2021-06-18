import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import { getHtmlDOM, cleanDOM, rm, console_debug } from "../lib";
import { ruleClass } from "../rules";
import { introDomHandle } from "./lib/common";
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

    const doc = await getHtmlDOM(bookUrl, undefined);
    const introDom = doc.querySelector(".book-dec > p:nth-child(1)");
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>doc.querySelector(".book-img > img"))
      .src;
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
    console_debug(`[Chapter]请求 ${chapterUrl}`);
    let nowUrl = chapterUrl;
    let doc = await getHtmlDOM(chapterUrl, charset);
    // chapterName = (<HTMLElement>(
    //   doc.querySelector("#mlfy_main_text > h1:nth-child(1)")
    // )).innerText.trim();
    const content = document.createElement("div");

    let flag = false;
    do {
      const _content = <HTMLElement>doc.querySelector("#TextContent");
      rm(".tp", true, _content);
      rm(".bd", true, _content);

      for (const _c of Array.from(_content.childNodes)) {
        content.appendChild(_c);
      }

      const nextLink = (<HTMLAnchorElement>(
        doc.querySelector(".mlfy_page > a:nth-child(5)")
      )).href;

      if (new URL(nextLink).pathname.includes("_")) {
        if (nextLink !== nowUrl) {
          flag = true;
          console_debug(`[Chapter]请求 ${nextLink}`);
          nowUrl = nextLink;
          doc = await getHtmlDOM(nextLink, charset);
        } else {
          console.error("网站页面出错，URL： " + nowUrl);
          flag = false;
        }
      } else {
        flag = false;
      }
    } while (flag);

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
}
