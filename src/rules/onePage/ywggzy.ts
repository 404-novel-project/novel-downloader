import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";
import { Book } from "../../main/Book";
import { deDuplicate } from "../../lib/rule";

export const ywggzy = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname:
      document.querySelector<HTMLHeadElement>(".info h1")?.innerText.trim() ??
      "",
    author:
      document
        .querySelector<HTMLParagraphElement>("div.fix > p:nth-child(1)")
        ?.innerText.trim() ?? "",
    introDom: document.querySelector<HTMLDivElement>(".desc") ?? undefined,
    introDomPatch: (dom) => dom,
    coverUrl: document.querySelector<HTMLImageElement>(".imgbox > img")?.src,
    aList: document.querySelectorAll("li.book-item > a"),
    sections: document.querySelectorAll("div.row.row-section h2.layout-tit"),
    getSName: (sElem) => (sElem as HTMLHeadingElement).innerText.trim(),
    postHook: (chapter) => {
      if (chapter.sectionName) {
        chapter.sectionName = chapter.sectionName
          .replace(`《${chapter.bookname}》`, "")
          .trim();
      }
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (dom) => {
      rm(".posterror", false, dom);
      return dom;
    },
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
