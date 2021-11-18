import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { rm } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class Xiaoshuodaquan extends BaseRuleClass {
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
      bookUrl = (
        document.querySelector(
          `.crumbswrap > a:nth-child(${ccount - 2})`
        ) as HTMLLinkElement
      ).href;
    }

    const bookname = (
      document.querySelector("div.dirwraps > h1") as HTMLElement
    ).innerText
      .replace("《", "")
      .replace("》", "")
      .trim();
    const author = (
      document.querySelector(
        ".smallcons > span:nth-child(1) > a:nth-child(1)"
      ) as HTMLElement
    ).innerText.trim();

    const introDom = document.querySelector(".bookintro") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom, (introDomI) => {
        introDomI.innerHTML = introDomI.innerHTML.replace("内容简介:", "");
        return introDomI;
      });

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl;
    if (ccount) {
      const dom = await getHtmlDOM(bookUrl, "GBK");
      coverUrl = (dom.querySelector(".con_limg > img") as HTMLImageElement).src;
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

      const sectionName = (
        sectionNameObj.firstElementChild as HTMLElement
      )?.innerText
        .replace(bookname, "")
        .trim();

      let sectionChapterNumber = 0;
      const cos = sectionObj.querySelectorAll("ul>li>a");
      for (const a of Array.from(cos) as HTMLLinkElement[]) {
        chapterNumber++;
        sectionChapterNumber++;
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
    const doc = await getHtmlDOM(chapterUrl, charset);

    chapterName = (
      doc.querySelector(".page-body > h1:nth-child(4)") as HTMLElement
    ).innerText.trim();

    const _content = doc.querySelector("#content") as HTMLElement;
    if (_content) {
      rm("div", true, _content);
      rm("script", true, _content);

      const content = document.createElement("div");
      content.innerHTML = _content.innerHTML.replace(/\n/g, "<br/>");
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
