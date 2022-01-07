import { deDuplicate, nextPageParse } from "../../lib/rule";
import { Book } from "../../main/Book";
import { Chapter } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
import { mkRuleClass } from "../onePage/template";

export function mkBiqugeClass(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void
) {
  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info h1, .info > h2") as HTMLElement
    ).innerText
      .trim()
      .replace(/最新章节$/, ""),
    author: (
      document.querySelector(
        "#info > p:nth-child(2), .small > span:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim(),
    introDom: document.querySelector("#intro, .intro") as HTMLElement,
    introDomPatch,
    coverUrl:
      (
        document.querySelector(
          "#fmimg > img, .info > .cover > img"
        ) as HTMLImageElement
      )?.src ?? null,
    aList: document.querySelectorAll("#list a, .listmain a"),
    sections: document.querySelectorAll("#list dt, .listmain dt"),
    getSName: (sElem) => {
      const b = sElem.querySelector("b");
      if (b) {
        return (b as HTMLElement).innerText;
      }
      return (sElem as HTMLElement).innerText;
    },
    postHook: (chapter) => {
      if (chapter.sectionName) {
        if (chapter.sectionName.includes("《")) {
          chapter.sectionName = chapter.sectionName
            .replace(`《${chapter.bookname}》`, "")
            .trim();
        } else {
          chapter.sectionName = chapter.sectionName
            .replace(chapter.bookname, "")
            .trim();
        }
      }
      if (postHook) {
        const out = postHook(chapter);
        return out;
      }
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch,
    concurrencyLimit,
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const chapters = book.chapters;
        book.chapters = deDuplicate(chapters);
        return book;
      };
      if (overRide) {
        overRide(classThis);
      }
      return classThis;
    },
  });
}

export function mkBiqugeClassNextPage(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement, doc: Document) => HTMLElement,
  getNextPage: (doc: Document) => string,
  continueCondition: (content: HTMLElement, nextLink: string) => boolean,
  concurrencyLimit?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void
) {
  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info h1, .info > h2") as HTMLElement
    ).innerText
      .trim()
      .replace(/最新章节$/, ""),
    author: (
      document.querySelector(
        "#info > p:nth-child(2), .small > span:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim(),
    introDom: document.querySelector("#intro, .intro") as HTMLElement,
    introDomPatch,
    coverUrl:
      (
        document.querySelector(
          "#fmimg > img, .info > .cover > img"
        ) as HTMLImageElement
      )?.src ?? null,
    aList: document.querySelectorAll("#list a, .listmain a"),
    sections: document.querySelectorAll("#list dt, .listmain dt"),
    getSName: (sElem) => {
      const b = sElem.querySelector("b");
      if (b) {
        return (b as HTMLElement).innerText;
      }
      return (sElem as HTMLElement).innerText;
    },
    postHook: (chapter) => {
      if (chapter.sectionName) {
        if (chapter.sectionName.includes("《")) {
          chapter.sectionName = chapter.sectionName
            .replace(`《${chapter.bookname}》`, "")
            .trim();
        } else {
          chapter.sectionName = chapter.sectionName
            .replace(chapter.bookname, "")
            .trim();
        }
      }
      if (postHook) {
        const out = postHook(chapter);
        return out;
      }
      return chapter;
    },
    getContentFromUrl: async (
      chapterUrl: string,
      chapterName: string | null,
      charset: string
    ) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch,
        getNextPage,
        continueCondition,
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
    concurrencyLimit,
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const chapters = book.chapters;
        book.chapters = deDuplicate(chapters);
        return book;
      };
      if (overRide) {
        overRide(classThis);
      }
      return classThis;
    },
  });
}
