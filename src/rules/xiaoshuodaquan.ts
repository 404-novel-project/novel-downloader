import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass } from "../rules";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class xiaoshuodaquan extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const ccount = document.querySelector(".crumbswrap")?.childElementCount;
    let bookUrl = document.location.href;
    if (ccount) {
      bookUrl = (<HTMLLinkElement>(
        document.querySelector(`.crumbswrap > a:nth-child(${ccount - 2})`)
      )).href;
    }

    const bookname = (<HTMLElement>(
      document.querySelector("div.dirwraps > h1")
    )).innerText
      .replace("《", "")
      .replace("》", "")
      .trim();
    const author = (<HTMLElement>(
      document.querySelector(".smallcons > span:nth-child(1) > a:nth-child(1)")
    )).innerText.trim();

    const introDom = <HTMLElement>document.querySelector(".bookintro");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom, (introDom) => {
        introDom.innerHTML = introDom.innerHTML.replace("内容简介:", "");
        return introDom;
      });

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl;
    if (ccount) {
      const dom = await getHtmlDOM(bookUrl, "GBK");
      coverUrl = (<HTMLImageElement>dom.querySelector(".con_limg > img")).src;
    }
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const sectionNames = document.querySelectorAll(".dirwraps > div.dirtitone");
    const sections = document.querySelectorAll(
      ".dirwraps > div.clearfix.dirconone"
    );

    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const sectionNameObj = sectionNames[i];
      const sectionObj = sections[i];
      const sectionNumber = i + 1;

      const sectionName = (<HTMLElement>(
        sectionNameObj.firstElementChild
      ))?.innerText
        .replace(bookname, "")
        .trim();

      let sectionChapterNumber = 0;
      const cos = sectionObj.querySelectorAll("ul>li>a");
      for (let j = 0; j < cos.length; j++) {
        chapterNumber++;
        sectionChapterNumber++;
        const a = <HTMLLinkElement>cos[j];
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
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".page-body > h1:nth-child(4)")
    )).innerText.trim();

    const _content = <HTMLElement>dom.querySelector("#content");
    if (_content) {
      rm("div", true, _content);
      rm("script", true, _content);

      const content = document.createElement("div");
      content.innerHTML = _content.innerHTML.replace(/\n/g, "<br/>");
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
