import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { BaseRuleClass, ChapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class C17k extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "UTF-8";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace("/list/", "/book/");
    const bookname = (
      document.querySelector("h1.Title") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector("div.Author > a") as HTMLElement
    ).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, undefined);
    const introDom = doc.querySelector("#bookInfo p.intro > a");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      doc.querySelector("#bookCover img.book") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll("dl.Volume");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (
        s.querySelector("dt > span.tit") as HTMLElement
      ).innerText.trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll("dd > a");
      for (const a of Array.from(cs)) {
        const span = a.firstElementChild;
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (span as HTMLSpanElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

        const isVIP = () => {
          if (span?.className.includes("vip")) {
            return true;
          } else {
            return false;
          }
        };
        const isPaid = () => {
          // Todo
          return false;
        };

        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP(),
          isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          this.chapterParse,
          this.charset,
          {}
        );

        const isLogin = () => {
          // Todo
          return false;
        };
        if (isVIP() && !(isLogin() && chapter.isPaid)) {
          chapter.status = Status.aborted;
        }
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
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector(
          "#readArea > div.readAreaBox.content > h1"
        ) as HTMLElement
      ).innerText.trim();
      const content = doc.querySelector(
        "#readArea > div.readAreaBox.content > div.p"
      ) as HTMLElement;
      if (content) {
        rm("p.copy", false, content);
        rm("#banner_content", false, content);
        rm("div.qrcode", false, content);
        rm("div.chapter_text_ad", false, content);

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
      return publicChapter();
    }
  }
}
