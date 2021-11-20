import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm } from "../../../lib/misc";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../../main";
import { BaseRuleClass } from "../../../rules";
import { introDomHandle } from "../../lib/common";
export class Wenku8 extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
    const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join(
      "/"
    );
    const bookname = (
      document.querySelector("#title") as HTMLElement
    ).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, "GBK");
    const author = (
      doc.querySelector(
        "#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
      ) as HTMLElement
    ).innerText
      .replace("小说作者：", "")
      .trim();
    const introDom = doc.querySelector(
      "#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(11)"
    );
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      doc.querySelector(
        "#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)"
      ) as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];

    const tdList = Array.from(
      document.querySelectorAll(".css > tbody td")
    ).filter((td) => (td as HTMLTableDataCellElement).innerText.trim());
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const td of Array.from(tdList)) {
      if (td.className === "vcss") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (td as HTMLTableDataCellElement).innerText.trim();
      } else if (td.className === "ccss") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = td.firstElementChild;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;
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

    const content = doc.querySelector("#content") as HTMLElement;
    if (content) {
      rm("#contentdp", true, content);
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    } else {
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }
  }
}
