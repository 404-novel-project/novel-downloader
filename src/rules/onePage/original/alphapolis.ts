import { cleanDOM } from "../../../lib/cleanDOM";
import { insertBrBeforeText } from "../../../lib/dom";
import { getHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { introDomHandle } from "../../../lib/rule";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Alphapolis extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector("h1.p-content-info__title") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("a.p-content-info__author") as HTMLAnchorElement
    ).innerText.trim();

    const introDom = document.querySelector(
      ".p-content-info__abstract"
    ) as HTMLDivElement;
    const [introduction, introductionHTML] = await introDomHandle(
      introDom,
      (dom) => dom
    );

    const additionalMetadate: BookAdditionalMetadate = { language: "ja" };
    // alphapolis index pages don't render the book's own cover image — only
    // ad/event banners and recommendation covers. Skip cover extraction here.
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".p-content-info__tags .c-tag")
    ).map((a) => (a as HTMLElement).innerText.trim());

    // The TOC is rendered by Vue after page load; wait for episode anchors.
    const episodeSelector =
      ".p-table-of-contents__episodes a.p-table-of-contents__episode-link";
    const maxWaitMs = 30000;
    const pollMs = 250;
    const start = Date.now();
    while (
      document.querySelectorAll(episodeSelector).length === 0 &&
      Date.now() - start < maxWaitMs
    ) {
      await sleep(pollMs);
    }
    const aList = document.querySelectorAll(episodeSelector);

    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
      chapterNumber++;
      const chapterName = (
        aElem.querySelector(
          ".p-table-of-contents__episode-title"
        ) as HTMLDivElement
      )?.innerText.trim();
      const chapterUrl = aElem.href;
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: { bookname },
      });
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
  ): Promise<ChapterParseObject> {
    const doc = await getHtmlDOM(chapterUrl, charset);
    const content = doc.querySelector("#novelBody") as HTMLElement | null;
    if (content) {
      insertBrBeforeText(content);
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    }
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
