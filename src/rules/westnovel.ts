import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { rm } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class Westnovel extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".btitle > h1 > a") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(".btitle > em:nth-child(2)") as HTMLElement
    ).innerText
      .replace("作者：", "")
      .trim();

    const introDom = document.querySelector(".intro-p > p:nth-child(1)");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (document.querySelector(".img-img") as HTMLImageElement)
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const aList = document.querySelectorAll(".chapterlist > dd > a");
    let chapterNumber = 0;
    for (const a of Array.from(aList)) {
      chapterNumber++;
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
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
        {}
      );
      chapters.push(chapter);
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
    chapterName = (
      doc.querySelector("#BookCon > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();

    const content = doc.querySelector("#BookText") as HTMLElement;
    if (content) {
      rm("div.ads", true, content);
      rm("div.link", true, content);
      rm("h4", true, content);
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
