import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { rm } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle, nextPageParse } from "./lib/common";

export class Yibige extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = (
      document.querySelector(
        "#list_hb > li:nth-child(2) > a:nth-child(1)"
      ) as HTMLAnchorElement
    ).href;

    const doc = await getHtmlDOM(bookUrl, undefined);
    const bookname = (
      doc.querySelector(".title > h1:nth-child(1)") as HTMLHeadElement
    ).innerText.trim();
    const author = (
      doc.querySelector(
        "div.xsxq_2:nth-child(2) > a:nth-child(1)"
      ) as HTMLAnchorElement
    ).innerText.trim();

    const introDom = document.createElement("p");
    const _introDom = doc.querySelector(".nr") as HTMLElement;
    for (const node of Array.from(_introDom.childNodes)) {
      if (
        node.nodeName.toLowerCase() === "#text" &&
        (node as Text).textContent?.trim() === "相关："
      ) {
        break;
      }
      introDom.appendChild(node.cloneNode(true));
    }
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      doc.querySelector(".limg > img:nth-child(1)") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const dl = document.querySelector(".books_li");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      if (
        dlc[0].nodeName === "DT" &&
        (dlc[0] as HTMLTableDataCellElement).innerText.includes("最新12章节")
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
      for (const node of chapterList as HTMLElement[]) {
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
          const a = node.firstElementChild as HTMLLinkElement;
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
            "UTF-8",
            { bookname }
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
    return nextPageParse(
      chapterName,
      chapterUrl,
      charset,
      "#fontsize",
      (_content, doc) => {
        rm("div", true, _content);
        rm("script", true, _content);
        _content.innerHTML = _content.innerHTML
          .replaceAll("测试广告1", "")
          .replaceAll("测试广告2", "");
        return _content;
      },
      (doc) =>
        (doc.querySelector(".nr_fy > a:nth-child(4)") as HTMLAnchorElement)
          .href,
      (_content, nextLink) => new URL(nextLink).pathname.includes("_")
    );
  }
}
