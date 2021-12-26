import { rm } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const westnovel = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".btitle > h1 > a") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".btitle > em:nth-child(2)") as HTMLElement
    ).innerText
      .replace("作者：", "")
      .trim(),
    introDom: document.querySelector(
      ".intro-p > p:nth-child(1)"
    ) as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector(".img-img") as HTMLImageElement)?.src,
    aList: document.querySelectorAll(".chapterlist > dd > a"),
    getContent: (doc) => doc.querySelector("#BookText") as HTMLElement,
    contentPatch: (content) => {
      rm("div.ads", true, content);
      rm("div.link", true, content);
      rm("h4", true, content);
      return content;
    },
  });
