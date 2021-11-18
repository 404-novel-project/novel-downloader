import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass } from "../rules";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class Imiaobige extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "UTF-8";
  }

  public async bookParse() {
    const bookUrl = document.location.href
      .replace("/read/", "/novel/")
      .replace(/\/$/, ".html");
    const doc = await getHtmlDOM(bookUrl, this.charset);
    const bookname = (
      doc.querySelector(".booktitle > h1") as HTMLElement
    ).innerText.trim();
    const author = (
      doc.querySelector("#author > a") as HTMLElement
    ).innerText.trim();

    const introDom = doc.querySelector("#bookintro") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (doc.querySelector("#bookimg > img") as HTMLImageElement)
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll("#readerlists > ul");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (s.querySelector("h3") as HTMLHeadElement).innerText
        .replace(bookname, "")
        .trim();

      if (sectionName.includes("最新章节")) {
        continue;
      }
      let sectionChapterNumber = 0;
      const cs = s.querySelectorAll("li > a");
      for (const a of Array.from(cs)) {
        chapterNumber++;
        sectionChapterNumber++;
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
          { bookname }
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
    interface Options {
      bookname: string;
    }
    const bookname = (options as Options).bookname;
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (
      doc.querySelector(".title > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();
    const content = doc.querySelector("#content") as HTMLElement;
    if (content) {
      content.innerHTML = content.innerHTML.replace(
        `<p>您可以在百度里搜索“${bookname} 妙笔阁(imiaobige.com)”查找最新章节！</p>`,
        ""
      );
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
