import { mkRuleClass } from "./template";
import { rm, rms } from "../../lib/dom";

export const uaa = () => {
  

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".info_box h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".info_box div a") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector("div.brief") as HTMLElement,
    introDomPatch: (dom) => {
      return dom;
    },
    coverUrl: (document.querySelector("img.cover") as HTMLImageElement)
      .src,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(document.querySelectorAll(".tag_box li")).map((e) => (e as HTMLElement).innerText);
      return additionalMetadate;
    },
    aList: document.querySelectorAll("ul.catalog_ul a"),
    sections: undefined,
    getSName: undefined,
    getContent: (doc) => doc.querySelector("div.article") as HTMLElement,
    contentPatch: (content) => {
      rm(".dizhi", true, content);
      return content;
    },
  });
};
