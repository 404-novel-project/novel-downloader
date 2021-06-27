import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { getHtmlDOM, cleanDOM, getImageAttachment } from "../lib";
import { ruleClass, chapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";

export class linovel implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".book-title")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector(".author-frame > .novelist > div:nth-child(3) > a")
    )).innerText.trim();

    const introDom = document.querySelector(".about-text");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const attachmentsUrlList = []; //书籍元数据附件去重
    const coverUrl = (<HTMLAnchorElement>(
      document.querySelector(".book-cover > a")
    )).href;
    if (coverUrl) {
      attachmentsUrlList.push(coverUrl);
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    additionalMetadate.attachments = [];
    const volumeCoverUrlList = Array.from(
      document.querySelectorAll(
        ".section-list > .section > .volume-info > .volume-cover a"
      )
    ).map((a) => (<HTMLAnchorElement>a).href);

    for (const volumeCoverUrl of volumeCoverUrlList) {
      if (!attachmentsUrlList.includes(volumeCoverUrl)) {
        attachmentsUrlList.push(volumeCoverUrl);
        getImageAttachment(volumeCoverUrl, this.imageMode, "volumeCover-").then(
          (volumeCoverObj) => {
            additionalMetadate.attachments?.push(volumeCoverObj);
          }
        );
      }
    }

    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.meta-info > div.book-cats.clearfix > a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(".section-list > .section");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLAnchorElement>(
        s.querySelector(".volume-info > h2.volume-title > a")
      )).innerText.trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll(
        ".chapter-list > .text-content-actual div.chapter"
      );
      for (let j = 0; j < cs.length; j++) {
        const div = cs[j];
        const a = div.firstElementChild;
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (<HTMLAnchorElement>a).innerText.trim();
        const chapterUrl = (<HTMLAnchorElement>a).href;

        const isVIP = () => {
          if (div.className.includes("lock")) {
            if (div.className.includes("unlock")) {
              return false;
            } else {
              return true;
            }
          }
          return false;
        };
        const isPaid = () => {
          // VIP章节仅支持APP查看
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
          "UTF-8",
          {}
        );

        const isLogin = () => {
          // VIP章节仅支持APP查看
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
    async function publicChapter(): Promise<chapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        doc.querySelector(".article-title")
      )).innerText.trim();
      const content = <HTMLElement>doc.querySelector(".article-text");
      if (content) {
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

    async function vipChapter(): Promise<chapterParseObject> {
      // VIP章节仅支持APP查看
      return {
        chapterName: chapterName,
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
