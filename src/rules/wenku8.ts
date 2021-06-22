import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { ruleClass } from "../rules";
import { introDomHandle } from "./lib/common";
export class wenku8 implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
    const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join(
      "/"
    );
    const bookname = (<HTMLElement>(
      document.querySelector("#title")
    )).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, "GBK");
    const author = (<HTMLElement>(
      doc.querySelector(
        "#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
      )
    )).innerText
      .replace("小说作者：", "")
      .trim();
    const introDom = doc.querySelector(
      "#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(11)"
    );
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>(
      doc.querySelector(
        "#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)"
      )
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];

    const tdList = Array.from(
      document.querySelectorAll(".css > tbody td")
    ).filter((td) => (<HTMLTableDataCellElement>td).innerText.trim());
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < tdList.length; i++) {
      const td = tdList[i];
      if (td.className === "vcss") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLTableDataCellElement>td).innerText.trim();
      } else if (td.className === "ccss") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = td.firstElementChild;
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    // chapterName = (<HTMLElement>doc.querySelector("#title")).innerText.trim();

    const content = <HTMLElement>doc.querySelector("#content");
    if (content) {
      rm("#contentdp", true, content);
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
