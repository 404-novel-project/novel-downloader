import { rm2 } from "../../lib/dom";
import { mkRuleClass } from "./tempate";

export const jingcaiyuedu6 = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: (
      document.querySelector("a.red-btn:nth-child(3)") as HTMLAnchorElement
    ).href,
    getBookname: (doc) =>
      (
        document.querySelector(".book-info > h1 > em") as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        document.querySelector(".book-info > h1 > a") as HTMLAnchorElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      document.querySelector(".book-info > p.intro") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (document.querySelector(".book-img-cover") as HTMLImageElement).src,
    getAList: (doc) => doc.querySelectorAll("dd.col-md-4 > a"),
    getContent: (doc) => doc.querySelector("#htmlContent"),
    contentPatch: (dom) => {
      rm2(["精彩小说网最新地址"], dom);
      return dom;
    },
  });
