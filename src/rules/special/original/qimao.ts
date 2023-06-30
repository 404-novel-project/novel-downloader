import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
//import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { sleep } from "../../../lib/misc";

export class Qimao extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;

    const bookname = (
      document.querySelector("div.title > span.txt") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("div.sub-title > span.txt > em > a") as HTMLElement
    ).innerHTML.trim();

    const introDom = document.querySelector(
      "head > meta[name='description']"
    ) as HTMLElement;
    const introduction = introDom.getAttribute('content') || "";
    const introductionHTML = document.createElement("div");
    introductionHTML.appendChild(document.createTextNode(introduction));

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("div.wrap-pic > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("em.qm-tag > a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    // 虽然有第一卷标识，但并没有发现有多卷的图书
    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(
      'ul.clearfix > li > a > span.txt'
    );
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (aElem as HTMLAnchorElement).innerText;
      const chapterUrl = (aElem.parentNode as HTMLAnchorElement).href;
      const isVIP = () => {
        return !!aElem.previousElementSibling;
      };
      const isPaid = () => {
        // Todo
        return false;
      };
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: isVIP(),
        isPaid: isPaid(),
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {},
      });
      const isLogin = () => {
        // Todo
        return false;
      };
      if (isVIP() && !(isLogin() && chapter.isPaid)) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    async function publicChapter(): Promise<ChapterParseObject> {
      log.debug(`[Chapter]请求 ${chapterUrl}`);
      const doc = await getHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector(".chapter-title") as HTMLElement
      ).innerText.trim();

      const content = doc.querySelector(".article") as HTMLElement;
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

    async function vipChapter(): Promise<ChapterParseObject> {
      // Todo
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      await sleep(3000 + Math.round(Math.random() * 2000));
      return publicChapter();
    }
  }
}
