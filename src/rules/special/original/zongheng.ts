import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, ggetHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Zongheng extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace("/showchapter/", "/book/");
    const bookname = (
      document.querySelector("div.book-meta > h1") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        "div.book-meta > p > span:nth-child(1) > a"
      ) as HTMLElement
    ).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, undefined);
    const introDom = doc.querySelector("div.book-info > div.book-dec");
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      doc.querySelector("div.book-img > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      doc.querySelectorAll(".book-info>.book-label a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(".volume-list");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;

      const sectionLabel = s.querySelector("div.volume");
      Array.from((sectionLabel as HTMLElement).children).forEach((ele) =>
        ele.remove()
      );

      const sectionName = (sectionLabel as HTMLElement).innerText.trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll("ul.chapter-list > li");
      for (const c of Array.from(cs)) {
        const a = c.querySelector("a");
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

        const isVIP = () => {
          return c.className.includes("vip");
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
          sectionName,
          sectionNumber,
          sectionChapterNumber,
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
      const doc = await ggetHtmlDOM(chapterUrl, charset);
      const ChapterName = (
        doc.querySelector("div.title_txtbox") as HTMLElement
      ).innerText.trim();
      const content = doc.querySelector("div.content") as HTMLElement;
      if (content) {
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName: ChapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName: ChapterName,
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
