import { rm } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const biquge345 = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.xinxi > span.x1 > a") as HTMLAnchorElement
      )?.innerText || "",
    introDom: document.querySelector("div.xinxi > div.x3") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.zhutu > img") as HTMLImageElement)?.src || undefined,
    aList: document.querySelectorAll("div.border > ul.info > li > a"),
    getContent: (doc) => doc.querySelector("#txt") as HTMLElement,
    contentPatch: (content) => {
      rm("p", true, content);
      return content;
    },
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    // nsfw: true,
  });
