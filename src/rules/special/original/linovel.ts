import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Linovel extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-title") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        ".author-frame > .novelist > div:nth-child(3) > a"
      ) as HTMLElement
    ).innerText.trim();

    const introDom = document.querySelector(".about-text");
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const attachmentsUrlList = []; // 书籍元数据附件去重
    const coverUrl = (
      document.querySelector(".book-cover > a") as HTMLAnchorElement
    ).href;
    if (coverUrl) {
      attachmentsUrlList.push(coverUrl);
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    additionalMetadate.attachments = [];
    const volumeCoverUrlList = Array.from(
      document.querySelectorAll(
        ".section-list > .section > .volume-info > .volume-cover a"
      )
    ).map((a) => (a as HTMLAnchorElement).href);

    for (const volumeCoverUrl of volumeCoverUrlList) {
      if (!attachmentsUrlList.includes(volumeCoverUrl)) {
        attachmentsUrlList.push(volumeCoverUrl);
        getImageAttachment(volumeCoverUrl, this.imageMode, "volumeCover-")
          .then((volumeCoverObj) => {
            additionalMetadate.attachments?.push(volumeCoverObj);
          })
          .catch((error) => log.error(error));
      }
    }

    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.meta-info > div.book-cats.clearfix > a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(".section-list > .section");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (
        s.querySelector(
          ".volume-info > h2.volume-title > a"
        ) as HTMLAnchorElement
      ).innerText.trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll(
        ".chapter-list > .text-content-actual div.chapter"
      );
      for (const div of Array.from(cs)) {
        const a = div.firstElementChild;
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

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
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const ChapterName = (
        doc.querySelector(".article-title") as HTMLElement
      ).innerText.trim();
      const content = doc.querySelector(".article-text") as HTMLElement;
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
      // VIP章节仅支持APP查看
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
