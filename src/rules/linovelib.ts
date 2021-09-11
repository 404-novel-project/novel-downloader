import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { rm } from "../lib/misc";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { BaseRuleClass } from "../rules";
import { introDomHandle, nextPageParse } from "./lib/common";

export class linovelib extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
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
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>doc.querySelector(".book-img > img"))
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

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
          this.chapterParse,
          "UTF-8",
          {}
        );
        if (chapterUrl.startsWith("javascript")) {
          chapter.status = Status.aborted;
        }
        chapters.push(chapter);
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
      "#TextContent",
      (_content, doc) => {
        const s = Array.from(doc.querySelectorAll("script")).find((s) =>
          s.innerHTML.includes('document.getElementById("chapter_last")')
        );
        if (s) {
          const _dom_nr = s.innerText.trim().match(/let dom_nr = '(.+)';/);
          if (_dom_nr) {
            const dom_nr = _dom_nr[1];
            (<HTMLSpanElement>(
              doc.getElementById("chapter_last")
            )).innerHTML = dom_nr;
          }
        }

        rm(".tp", true, _content);
        rm(".bd", true, _content);
        return _content;
      },
      (doc) =>
        (<HTMLAnchorElement>doc.querySelector(".mlfy_page > a:nth-child(5)"))
          .href,
      (_content, nextLink) => new URL(nextLink).pathname.includes("_")
    );
  }
}
