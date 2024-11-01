import { deDuplicate, nextPageParse } from "../../lib/rule";
import { Book } from "../../main/Book";
import { Chapter } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
import { mkRuleClass } from "../onePage/template";
import { mkRuleClass as mkRuleClassMultiIndex } from "../onePageWithMultiIndexPage/template";

function base(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void
) {
  return {
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info h1, .info h2, .info h1") as HTMLElement
    ).innerText
      .trim()
      .replace(/最新章节$/, ""),
    author: (
      document.querySelector(
        "#info > p:nth-child(2), #info > div:nth-child(2), .info .author, .small > span:nth-child(1), .info .fix > p:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim(),
    introDom: document.querySelector(
      "#intro, .intro, .book-intro, .desc"
    ) as HTMLElement,
    introDomPatch,
    coverUrl:
      (
        document.querySelector(
          "#fmimg > img, .info > .cover > img, .book-boxs > .img > img, .imgbox > img"
        ) as HTMLImageElement
      )?.src ?? null,
    postHook: (chapter: Chapter) => {
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
        return postHook(chapter);
      }
      return chapter;
    },
    concurrencyLimit,
    sleepTime,
    maxSleepTime,
    overrideConstructor: (classThis: BaseRuleClass) => {
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
  };
}

export function baseOnePage(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void
) {
  return {
    ...base(introDomPatch, concurrencyLimit, sleepTime, maxSleepTime, overRide, postHook),
    aList: document.querySelectorAll("#list a, .listmain a, .book-item a"),
    sections: document.querySelectorAll("#list dt, .listmain dt, .layout-tit"),
    getSName: (sElem: Element) => {
      const b = sElem.querySelector("b");
      if (b) {
        return (b as HTMLElement).innerText;
      }
      return (sElem as HTMLElement).innerText;
    },
  };
}

export function baseMultiIndex(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void
) {
  return {
    ...base(introDomPatch, concurrencyLimit, sleepTime, maxSleepTime, overRide, postHook),
    getIndexUrls: () =>
      Array.from(
        document.querySelectorAll<HTMLOptionElement>(
          'select[name="pageselect"] > option'
        )
      ).map((o) => document.location.origin + o.getAttribute("value")),
    getAList: (doc: Document) => {
      const sectionList = Array.from(
        doc.querySelectorAll<HTMLUListElement>("ul.section-list.fix, ul.list")
      ).slice(-1)[0];
      if (!sectionList) {
        throw new Error("获取章节列表失败！");
      }
      return sectionList.querySelectorAll("li > a");
    },
  };
}

export function mkBiquge(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void,
  chapterContenSelector = "#content"
) {
  return mkRuleClass({
    ...baseOnePage(introDomPatch, concurrencyLimit, sleepTime, maxSleepTime, overRide, postHook),
    getContent: (doc) => doc.querySelector(chapterContenSelector),
    contentPatch,
  });
}

export function mkBiqugeNextPage(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement, doc: Document) => HTMLElement,
  getNextPage: (doc: Document) => string,
  continueCondition: (content: HTMLElement, nextLink: string) => boolean,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void,
  chapterContenSelector = "#content"
) {
  return mkRuleClass({
    ...baseOnePage(introDomPatch, concurrencyLimit, sleepTime, maxSleepTime, overRide, postHook),
    getContentFromUrl: async (
      chapterUrl: string,
      chapterName: string | null,
      charset: string
    ) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: chapterContenSelector,
        contentPatch,
        getNextPage,
        continueCondition,
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
}

export function mkBiqugeMultiIndexNextPage(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement, doc: Document) => HTMLElement,
  getNextPage: (doc: Document) => string,
  continueCondition: (content: HTMLElement, nextLink: string) => boolean,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void,
  chapterContenSelector = "#content"
) {
  return mkRuleClassMultiIndex({
    ...baseMultiIndex(introDomPatch, concurrencyLimit,sleepTime, maxSleepTime, overRide, postHook),
    getContentFromUrl: async (
      chapterUrl: string,
      chapterName: string | null,
      charset: string
    ) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: chapterContenSelector,
        contentPatch,
        getNextPage,
        continueCondition,
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
}

export function mkBiqugeMultiIndex(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement,
  concurrencyLimit?: number,
  sleepTime?: number,
  maxSleepTime?: number,
  overRide?: (classThis: BaseRuleClass) => any,
  postHook?: (chapter: Chapter) => Chapter | void,
  chapterContenSelector = "#content"
) {
  return mkRuleClassMultiIndex({
    ...baseMultiIndex(introDomPatch, concurrencyLimit,sleepTime, maxSleepTime, overRide, postHook),
    getContent: (doc) => doc.querySelector(chapterContenSelector),
    contentPatch,
  });
}
