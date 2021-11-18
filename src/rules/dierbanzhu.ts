import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class Dierbanzhu extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector("#info > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("#info > p:nth-child(2)") as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = document.querySelector("#intro") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#fmimg > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const dl = document.querySelector("#list>dl");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      const chapterList = dlc.filter((obj) => obj !== undefined);
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (const node of chapterList as HTMLElement[]) {
        if (node.nodeName === "DT" && !node.innerText.includes("最新章节")) {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
        } else if (node.nodeName === "DD") {
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
    const doc = await getHtmlDOM(chapterUrl, charset);

    chapterName = (
      doc.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();

    const content = doc.querySelector("#content") as HTMLElement;
    if (content) {
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
