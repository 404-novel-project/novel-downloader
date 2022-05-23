import { mkRuleClass } from "./tempate";
import { Status } from "../../main/main";
import { chapterHiddenFix, nextPageParse } from "../../lib/rule";
import { rm } from "../../lib/dom";
import { Book } from "../../main/Book";
import { Chapter } from "../../main/Chapter";

export const linovelib = () => {
  const bookUrl = document.location.href.replace(/\/catalog$/, ".html");
  const ToCurl = document.location.href;
  return mkRuleClass({
    bookUrl,
    anotherPageUrl: bookUrl,
    ToCUrl: ToCurl,
    getBookname: () =>
      (
        document.querySelector(".book-meta > h1") as HTMLElement
      ).innerText.trim(),
    getAuthor: () =>
      (
        document.querySelector(
          ".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(2)"
        ) as HTMLElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector(".book-dec > p:nth-child(1)") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (doc.querySelector(".book-img > img") as HTMLImageElement).src,
    additionalMetadatePatch: (doc, additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        doc.querySelectorAll(".book-label a")
      ).map((a) => (a as HTMLAnchorElement).innerText.trim());
      return additionalMetadate;
    },
    getAList: () => document.querySelectorAll(".chapter-list li.col-4 > a"),
    getSections: () => document.querySelectorAll(".chapter-list div.volume"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    postHook: (chapter) => {
      if (chapter.chapterUrl.startsWith("javascript")) {
        chapter.status = Status.aborted;
      }
      return chapter;
    },
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const invalidTest = (c: Chapter) =>
          c.chapterUrl.startsWith("javascript");
        const getPrevHref = (doc: Document) =>
          doc.querySelector<HTMLAnchorElement>(".mlfy_page > a:nth-child(1)")
            ?.href;
        await chapterHiddenFix(
          book,
          invalidTest,
          getPrevHref,
          classThis.concurrencyLimit
        );
        return book;
      };
      return classThis;
    },
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#TextContent",
        contentPatch: (_content) => {
          rm(".tp", true, _content);
          rm(".bd", true, _content);
          return _content;
        },
        getNextPage: (doc) =>
          (
            doc.querySelector(
              ".mlfy_page > a:nth-child(5)"
            ) as HTMLAnchorElement
          ).href,
        continueCondition: (_content, nextLink) =>
          new URL(nextLink).pathname.includes("_"),
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
};

// export const wlinovelib = () => mkRuleClass();
