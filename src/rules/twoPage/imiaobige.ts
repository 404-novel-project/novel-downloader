import { rm2 } from "../../lib/dom";
import { mkRuleClass } from "./tempate";

export const imiaobige = () => {
  const bookUrl = document.location.href
    .replace("/read/", "/novel/")
    .replace(/\/$/, ".html");
  const getName = (sElem: Element) =>
    (sElem.firstElementChild as HTMLHeadingElement)?.innerText
      .split(" ")
      .slice(-1)?.[0] ?? "";

  return mkRuleClass({
    bookUrl,
    anotherPageUrl: bookUrl,
    getBookname: (doc) =>
      (doc.querySelector(".booktitle > h1") as HTMLElement).innerText.trim(),
    getAuthor: (doc) =>
      (doc.querySelector("#author > a") as HTMLElement).innerText.trim(),
    getIntroDom: (doc) => doc.querySelector("#bookintro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) =>
      (doc.querySelector("#bookimg > img") as HTMLImageElement).src,
    getSections: (doc) => document.querySelectorAll("#readerlists > ul"),
    getAList: (doc) => document.querySelectorAll("#readerlists  a"),
    getSName: getName,
    postHook: (chapter) => {
      if (chapter.sectionName?.includes("最新章节")) {
        return;
      }
      chapter.sectionName =
        chapter.sectionName?.replace(chapter.bookname, "").trim() ?? null;
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
      const ads = ["您可以在百度里搜索“"];
      rm2(content, ads);
      return content;
    },
  });
};
