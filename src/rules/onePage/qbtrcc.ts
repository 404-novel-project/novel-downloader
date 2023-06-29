import { mkRuleClass } from "./template";

export const qbtrcc = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.infos > h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector("div.infos > div.date > span") as HTMLAnchorElement
    ).innerText.replace("作者：", "").trim(),
    introDom: document.querySelector("div.infos > p") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: "https://www.qbtr.cc/skin/default/images/bbb2.png",
    aList: document.querySelectorAll("ul.clearfix > li > a"),
    getContent: (doc) => doc.querySelector("div.read_chapterDetail") as HTMLElement,
    contentPatch: (content) => content,
  });
