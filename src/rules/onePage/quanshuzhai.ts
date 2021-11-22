import { mkRuleClass } from "./template";

export const quanshuzhai = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".booktitle") as HTMLElement
    ).innerText.trim(),
    author: (document.querySelector("a.red") as HTMLElement).innerText.trim(),
    introDom: document.querySelector(".bookintro") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: null,
    aList: document.querySelectorAll("#list-chapterAll > dd > a"),
    getContent: (doc) => doc.querySelector(".readcontent"),
    contentPatch: (dom) => dom,
  });
