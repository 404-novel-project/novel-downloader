import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass, ruleClassNamespace } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";

export class xiaoshuodaquan implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
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

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector(".bookintro");
    if (introDom === null) {
      introduction = null;
    } else {
      introDom.innerHTML = introDom.innerHTML.replace("内容简介:", "");
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl;
    if (ccount) {
      const dom = await getHtmlDOM(bookUrl, "GBK");
      coverUrl = (<HTMLImageElement>dom.querySelector(".con_limg > img")).src;
    }
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
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
          chapterParse,
          "GBK"
        );
        chapters.push(chapter);
      }
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
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
      let { dom, text, images } = cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
      };
    } else {
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }
  }
}
