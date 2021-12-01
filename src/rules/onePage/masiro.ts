import { mkRuleClass } from "./template";

export const masiro = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".novel-title") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".author > a") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(".brief") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: (
      document.querySelector(
        "div.mailbox-attachment-icon > a > img.img"
      ) as HTMLImageElement
    ).src,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll("div.n-detail > div.tags a")
      ).map((a) => (a as HTMLAnchorElement).innerText);
      return additionalMetadate;
    },
    aList: document.querySelectorAll("a.to-read"),
    getAName: (dom) =>
      (
        dom.querySelector('span[style^="overflow: hidden;"]') as HTMLElement
      ).innerText.trim(),
    sections: document.querySelectorAll("li.chapter-box > span + b"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => dom.querySelector("div.box-body.nvl-content"),
    contentPatch: (dom) => dom,
    concurrencyLimit: 3,
  });
