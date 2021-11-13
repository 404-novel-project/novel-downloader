import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass } from "../rules";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { saveOptions } from "../save/save";

export class fushuwang extends BaseRuleClass {
  public saveOptions: saveOptions;

  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
    this.maxRunLimit = 5;
    this.saveOptions = {
      genChapterText: (chapterName: string, contentText: string) => {
        return `${contentText}\n`;
      },
    };
  }

  public async bookParse() {
    const bookUrl = (
      document.location.origin + document.location.pathname
    ).replace(/(_\d+)\.html$/, ".html");
    const [bookname, author] = (<HTMLHeadElement>(
      document.querySelector(
        ".title_info > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > h1:nth-child(1)"
      )
    )).innerText.split("——");
    const [introduction, introductionHTML] = [null, null];
    const additionalMetadate: BookAdditionalMetadate = {};

    const options = document.querySelectorAll("p.pageLink > select > option");
    const urls = Array.from(options).map(
      (option) => document.location.origin + option.getAttribute("value")
    );
    const chapters: Chapter[] = [];
    for (let i = 0; i < urls.length; i++) {
      const chapterUrl = urls[i];
      const chapterName = `page${i}`;
      const isVIP = false;
      const isPaid = false;
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        i + 1,
        chapterName,
        isVIP,
        isPaid,
        null,
        null,
        null,
        this.chapterParse,
        this.charset,
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
    book.saveOptions = this.saveOptions;
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
    const content = <HTMLElement>doc.querySelector("#text");
    if (content) {
      rm("span", true, content);
      rm("p.pageLink", true, content);
      rm("script", true, content);
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
