import { insertBrBeforeText } from "../../../lib/dom";
import { mkRuleClass } from "../template";

export const alphapolis = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1.p-content-info__title") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector("a.p-content-info__author") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(
      ".p-content-info__abstract"
    ) as HTMLDivElement,
    introDomPatch: (dom) => dom,
    coverUrl:
      (document.querySelector("img.c-banner") as HTMLImageElement)?.src ?? null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll(".p-content-info__tags .c-tag")
      ).map((a) => (a as HTMLElement).innerText.trim());
      return additionalMetadate;
    },
    aList: document.querySelectorAll(
      ".p-table-of-contents__episodes a.p-table-of-contents__episode-link"
    ),
    getAName: (aElem) =>
      (
        aElem.querySelector(
          ".p-table-of-contents__episode-title"
        ) as HTMLDivElement
      )?.innerText.trim(),
    getContent: (doc) => doc.querySelector("#novelBody"),
    contentPatch: (content) => {
      insertBrBeforeText(content);
      return content;
    },
    language: "ja",
  });
