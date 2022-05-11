import { insertBrBeforeText } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const alphapolis = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h2.title") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "div.author > span:nth-child(1) > a:nth-child(1)"
      ) as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(".abstract") as HTMLDivElement,
    introDomPatch: (dom) => dom,
    coverUrl:
      (document.querySelector("div.cover > a > img") as HTMLImageElement)
        ?.src ?? null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll(".content-tags > .tag > a")
      ).map((a) => (a as HTMLAnchorElement).innerText.trim());
      return additionalMetadate;
    },
    aList: document.querySelectorAll(".episodes > .episode > a"),
    getAName: (aElem) =>
      (aElem.querySelector(".title") as HTMLSpanElement)?.innerText.trim(),
    sections: document.querySelectorAll(".episodes > h3"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#novelBoby"),
    contentPatch: (content) => {
      insertBrBeforeText(content);
      return content;
    },
    language: "ja",
  });
