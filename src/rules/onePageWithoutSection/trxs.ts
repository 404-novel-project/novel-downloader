import { mkRuleClass } from "./template";

export const trxs = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".infos > h1") as HTMLHeadElement
    ).innerText
      .split("(")[0]
      .trim(),
    author: (
      document.querySelector(".date > span > a") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(".infos > p") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector(".pic > img") as HTMLImageElement).src,
    aList: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) =>
      doc.querySelector(".read_chapterDetail") as HTMLElement,
    contentPatch: (content) => content,
  });

export const tongrenquan = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".infos > h1") as HTMLHeadElement
    ).innerText
      .split("(")[0]
      .trim(),
    author: (
      document.querySelector(".date > span") as HTMLAnchorElement
    ).innerText
      .replace("作者：", "")
      .trim(),
    introDom: document.querySelector(".infos > p") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector(".pic > img") as HTMLImageElement).src,
    aList: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) =>
      doc.querySelector(".read_chapterDetail") as HTMLElement,
    contentPatch: (content) => content,
  });
