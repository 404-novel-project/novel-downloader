import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm, console_debug } from "../lib";
import { introDomHandle } from "./lib/common";

export class yibige implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = (<HTMLAnchorElement>(
      document.querySelector("#list_hb > li:nth-child(2) > a:nth-child(1)")
    )).href;

    const doc = await getHtmlDOM(bookUrl, undefined);
    const bookname = (<HTMLHeadElement>(
      doc.querySelector(".title > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLAnchorElement>(
      doc.querySelector("div.xsxq_2:nth-child(2) > a:nth-child(1)")
    )).innerText.trim();

    const introDom = document.createElement("p");
    const _introDom = <HTMLElement>doc.querySelector(".nr");
    for (const node of Array.from(_introDom.childNodes)) {
      if (
        node.nodeName.toLowerCase() === "#text" &&
        (<Text>node).textContent?.trim() === "相关："
      ) {
        break;
      }
      introDom.appendChild(node.cloneNode());
    }
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      doc.querySelector(".limg > img:nth-child(1)")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const dl = document.querySelector(".books_li");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      if (
        dlc[0].nodeName === "DT" &&
        (<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新12章节")
      ) {
        for (let i = 0; i < dl?.childElementCount; i++) {
          if (i !== 0 && dlc[i].nodeName === "DT") {
            delete dlc[0];
            break;
          }
          delete dlc[i];
        }
      }

      const chapterList = dlc.filter(
        (obj) => obj !== undefined && obj.getAttribute("style") === null
      );
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (let i = 0; i < chapterList.length; i++) {
        const node = <HTMLElement>chapterList[i];
        if (node.nodeName === "DT") {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
        } else if (node.nodeName === "DD") {
          if (node.childElementCount === 0) {
            continue;
          }
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
            chapterParse,
            "UTF-8",
            { bookname: bookname }
          );
          chapters.push(chapter);
        }
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
    const content = document.createElement("div");

    let flag = false;
    do {
      const _content = <HTMLElement>doc.querySelector("#fontsize");
      rm("div", true, _content);
      rm("script", true, _content);
      _content.innerHTML = _content.innerHTML.replace(
        new RegExp("测试广告1", "g"),
        ""
      );
      for (const _c of Array.from(_content.childNodes)) {
        content.appendChild(_c);
      }

      const nextLink = (<HTMLAnchorElement>(
        doc.querySelector(".nr_fy > a:nth-child(4)")
      )).href;

      if (new URL(nextLink).pathname.includes("_")) {
        if (nextLink !== nowUrl) {
          flag = true;
        } else {
          console.error("网站页面出错，URL： " + nowUrl);
          flag = false;
        }
      } else {
        flag = false;
      }
      if (flag) {
        console_debug(`[Chapter]请求 ${nextLink}`);
        nowUrl = nextLink;
        doc = await getHtmlDOM(nextLink, charset);
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
