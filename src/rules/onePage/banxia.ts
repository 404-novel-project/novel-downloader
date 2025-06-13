import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";

export const banxia = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.book-describe > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector("div.book-describe > p:first-of-type > a") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector("div.book-describe > div.describe-html > p:first-of-type") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.book-img > img") as HTMLImageElement).src,
    aList: document.querySelectorAll("div.book-list > ul > li > a"),
    getContent: (doc) => doc.querySelector("#nr1") as HTMLElement,
    contentPatch: (content) => {
      rm("script", true, content);
      rm("span", true, content);
      // TODO: 替换半夏小说
      // 半夏小说会把如“晋江文学城”替换成“半夏小说”，需要处理
      return content;
    },
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
  });
