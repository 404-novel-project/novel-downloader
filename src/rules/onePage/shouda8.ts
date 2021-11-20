import { rm, rm2 } from "../../lib/misc";
import { mkRuleClass } from "./template";

export const shouda8 = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".bread-crumbs > li:nth-child(4)") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector("div.bookname > h1 > em") as HTMLElement
    ).innerText
      .replace("作者：", "")
      .trim(),
    introDom: document.querySelector(".intro") as HTMLElement,
    introDomPatch: (introDom) => {
      rm(".book_keywords", true, introDom);
      rm("script", true, introDom);
      return introDom;
    },
    coverUrl: (
      document.querySelector(".pic > img:nth-child(1)") as HTMLImageElement
    ).src,
    aList: document.querySelectorAll(".link_14 dd > a"),
    sections: document.querySelectorAll(".link_14 dt > b"),
    getName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#content") as HTMLElement,
    contentPatch: (content) => {
      const ads = ["手打吧更新速度最快。", "www.shouda88.com"];
      rm2(content, ads);
      return content;
    },
  });
