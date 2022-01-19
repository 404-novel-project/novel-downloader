import { deDuplicate, nextPageParse } from "../../lib/rule";
import { Book } from "../../main/Book";
import { mkRuleClass } from "./template";

export const c226ks = () =>
  mkRuleClass({
    bookUrl: document.location.href.replace(/index_\d+\.html/, ""),
    bookname: (
      document.querySelector(".info > h2.name") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".info > .author") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(".book-intro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (
      document.querySelector(".book-boxs > .img > img") as HTMLImageElement
    ).src,
    getIndexUrls: () =>
      Array.from(document.querySelectorAll('[name="pageselect"] > option')).map(
        (opt) => document.location.origin + opt.getAttribute("value")
      ),
    getAList: (doc) => doc.querySelectorAll("ul.list a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content, doc) => content,
        getNextPage: (doc) =>
          (
            doc.querySelector(
              "section.g-content-nav > a:nth-child(3)"
            ) as HTMLAnchorElement
          ).href,
        continueCondition: (_content, nextLink) => {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const chapters = book.chapters;
        book.chapters = deDuplicate(chapters);
        return book;
      };
      return classThis;
    },
  });
