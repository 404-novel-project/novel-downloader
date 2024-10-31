import { rms } from "../../../lib/dom";
import { mkRuleClass } from "../template";

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
    introDomPatch: (dom) => {
      rms(["简介："], dom);
      return dom;
    },
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
    aList: document.querySelectorAll(".chapter-ul ul.episode-ul > a"),
    getAName: (aElem) =>
      (
        aElem.querySelector('span[style^="overflow: hidden;"]') as HTMLElement
      ).innerText.trim(),
    getIsVIP: (aElem) => {
      let isVIP = false;
      let isPaid = false;

      const small = aElem.querySelector("small");
      if (small) {
        const text = small.innerText.trim();
        if (text !== "") {
          isVIP = true;
          if (text === "已购") {
            isPaid = true;
          }
        }
      }
      return { isVIP, isPaid };
    },
    sections: document.querySelectorAll("li.chapter-box > span + b"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => dom.querySelector("div.box-body.nvl-content"),
    contentPatch: (dom) => dom,
    concurrencyLimit: 1,
    sleepTime: 500,
    needLogin: true,
  });
