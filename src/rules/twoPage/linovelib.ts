import { mkRuleClass } from "./tempate";
import { Status } from "../../main/main";
import { chapterHiddenFix, nextPageParse } from "../../lib/rule";
import { rm, sandboxed } from "../../lib/dom";
import { Book } from "../../main/Book";
import { Chapter } from "../../main/Chapter";
import { table } from "../lib/linovelib";

export const linovelib = () => {
  const ToCurl = document.location.href;
  const bookUrl = ToCurl.replace(/\/catalog$/, ".html");
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
          ".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector(".book-dec > p:nth-child(1)") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (doc.querySelector(".book-img > img") as HTMLImageElement).src,
    additionalMetadatePatch: (additionalMetadate, doc) => {
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
    contentPatch: (content) => {
      for (const k in table) {
        content.innerHTML = content.innerHTML.replaceAll(k, table[k]);
      }
      return content;
    },
  });
};

export const wlinovelib = () => {
  const bookUrl = document.location.href;
  const tocUrl = bookUrl.replace(/\.html/, "/catalog");

  interface ReadParams {
    // "/novel/3225/164492.html"
    url_previous: string;
    // "/novel/3225/164493_2.html",
    url_next: string;
    // "/novel/3225/catalog",
    url_index: string;
    // "/novel/3225.html",
    url_articleinfo: string;
    // "https://w.linovelib.com/files/article/image/3/3225/3225s.jpg",
    url_image: string;
    // "https://w.linovelib.com/",
    url_home: string;
    // "3225",
    articleid: string;
    // "曾经对我造成过精神创伤的女性们又开始关注我，但可惜的是为时已晚",
    articlename: string;
    // "/3",
    subid: string;
    // "御堂ユラギ",
    author: string;
    // "164493",
    chapterid: string;
    // "1",
    page: string;
    // "第五章「恋」与「罪」 第38话 老师的内裤",
    chaptername: string;
    // "0",
    chapterisvip: string;
    // "0",
    userid: string;
    // "1653293820"
    readtime: string;
  }

  function getReadParams(doc: Document): ReadParams | null {
    const script = Array.from(doc.querySelectorAll("script")).filter((s) =>
      s.innerHTML.includes("ReadParams")
    )?.[0];
    if (script) {
      // noinspection UnnecessaryLocalVariableJS
      const ReadParams = sandboxed(`${script.innerHTML}; return ReadParams;`);
      return ReadParams;
    } else {
      return null;
    }
  }

  return mkRuleClass({
    bookUrl,
    anotherPageUrl: tocUrl,
    ToCUrl: tocUrl,
    getBookname: () =>
      document
        .querySelector<HTMLHeadingElement>("h2.book-title")
        ?.innerText.trim() ?? "",
    getAuthor: () =>
      document
        .querySelector<HTMLSpanElement>(".book-rand-a > span")
        ?.innerText.trim() ?? "",
    getIntroDom: () =>
      document.querySelector(
        "#bookSummary > content:nth-child(1)"
      ) as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: () =>
      document.querySelector<HTMLImageElement>(".book-cover")?.src ?? null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll<HTMLElement>(".tag-small")
      ).map((a) => a.innerText.trim());
      return additionalMetadate;
    },
    getAList: (doc) => doc.querySelectorAll(".chapter-li-a "),
    getSections: (doc) => doc.querySelectorAll("li.chapter-bar.chapter-li"),
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
        const getPrevHref = (doc: Document) => {
          const ReadParams = getReadParams(doc);
          if (ReadParams) {
            return document.location.origin + ReadParams.url_previous;
          } else {
            return;
          }
        };
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
        selector: "#acontent",
        contentPatch: (_content) => {
          rm(".cgo", true, _content);
          rm("script", true, _content);
          return _content;
        },
        getNextPage: (doc) => {
          const ReadParams = getReadParams(doc);
          if (ReadParams) {
            return document.location.origin + ReadParams.url_next;
          } else {
            return "";
          }
        },
        continueCondition: (_content, nextLink) => {
          if (nextLink === "") {
            return false;
          }
          return new URL(nextLink).pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
};
