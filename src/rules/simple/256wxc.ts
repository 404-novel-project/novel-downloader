import { mkRuleClass1 } from "../lib/common";

export const c256wxc = mkRuleClass1({
  bookUrl: document.location.href,
  bookname: (<HTMLHeadElement>(
    document.querySelector(".art_tit")
  )).innerText.trim(),
  author: (<HTMLAnchorElement | HTMLSpanElement>(
    (document.querySelector("span.bookinfo:nth-child(1) > a") ??
      document.querySelector("span.bookinfo:nth-child(1)"))
  )).innerText
    .replace(/^作者：/, "")
    .trim(),
  introDom: <HTMLElement>document.querySelector(".infotype > p"),
  introDomPatch: (introDom) => introDom,
  coverUrl: null,
  cos: document.querySelectorAll(".catalog > li > a"),
  getContent: (doc) => <HTMLElement>doc.querySelector(".book_con"),
  contentPatch: (content) => content,
});
