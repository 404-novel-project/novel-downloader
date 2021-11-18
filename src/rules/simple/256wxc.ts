import { mkRuleClass1 } from "../lib/common";

export const c256wxc = mkRuleClass1({
  bookUrl: document.location.href,
  bookname: (
    document.querySelector(".art_tit") as HTMLHeadElement
  ).innerText.trim(),
  author: (
    (document.querySelector("span.bookinfo:nth-child(1) > a") ??
      document.querySelector("span.bookinfo:nth-child(1)")) as
      | HTMLAnchorElement
      | HTMLSpanElement
  ).innerText
    .replace(/^作者：/, "")
    .trim(),
  introDom: document.querySelector(".infotype > p") as HTMLElement,
  introDomPatch: (introDom) => introDom,
  coverUrl: null,
  cos: document.querySelectorAll(".catalog > li > a"),
  getContent: (doc) => doc.querySelector(".book_con") as HTMLElement,
  contentPatch: (content) => content,
});
