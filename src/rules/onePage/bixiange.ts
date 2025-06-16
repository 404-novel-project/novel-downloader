import { mkRuleClass } from "./template";

export const bixiange = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1") as HTMLElement
    )?.innerText.trim(),
    author: (document.querySelector("div.descTip > p:nth-of-type(2) > span") as HTMLSpanElement)?.innerText.trim().replace("作者：", ""),
    introDom: document.querySelector("div.descInfo > p") as HTMLParagraphElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.cover > img") as HTMLImageElement)?.src || null,
    aList: document.querySelectorAll("div.catalog > ul > li > a"),
    getContent: (doc) => doc.querySelector("#mycontent") as HTMLElement,
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1500,
    language: "zh",
    // nsfw: true,
  });
