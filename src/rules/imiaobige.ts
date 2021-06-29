import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, getImageAttachment } from "../lib";
import { introDomHandle } from "./lib/common";

export class imiaobige implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "UTF-8";
  }

  public async bookParse() {
    const bookUrl = document.location.href
      .replace("/read/", "/novel/")
      .replace(/\/$/, ".html");
    const doc = await getHtmlDOM(bookUrl, this.charset);
    const bookname = (<HTMLElement>(
      doc.querySelector(".booktitle > h1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      doc.querySelector("#author > a")
    )).innerText.trim();

    const introDom = <HTMLElement>doc.querySelector("#bookintro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>doc.querySelector("#bookimg > img"))
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll("#readerlists > ul");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLHeadElement>s.querySelector("h3")).innerText
        .replace(bookname, "")
        .trim();

      if (sectionName.includes("最新章节")) {
        continue;
      }
      let sectionChapterNumber = 0;
      const cs = s.querySelectorAll("li > a");
      for (let j = 0; j < cs.length; j++) {
        const a = cs[j];
        chapterNumber++;
        sectionChapterNumber++;
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
          { bookname: bookname }
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
    interface options {
      bookname: string;
    }
    const bookname = (<options>options).bookname;
    const dom = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLElement>(
      dom.querySelector(".title > h1:nth-child(1)")
    )).innerText.trim();
    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
      content.innerHTML = content.innerHTML.replace(
        `<p>您可以在百度里搜索“${bookname} 妙笔阁(imiaobige.com)”查找最新章节！</p>`,
        ""
      );
      let { dom, text, images } = await cleanDOM(content, "TM");
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
