import { rm, rms } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const qzxsw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.introduce > h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector("div.introduce > p.bq > span:nth-child(2) > a") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector("div.introduce > p.jj") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.pic > img") as HTMLImageElement).src,
    aList: document.querySelectorAll("div.ml_list > ul > li > a"),
    getContent: (doc) => doc.querySelector(".articlecontent") as HTMLElement,
    contentPatch: (content) => {
      rms([
        "一秒记住m.quanzhifashｉ。com",
        "ｍ．ｑuanzhifashｉ．com",
        "ｈttp://m.quanzhifashi.com首发"
      ], content);
      rm("br", true, content);
      return content;
    },
  });
