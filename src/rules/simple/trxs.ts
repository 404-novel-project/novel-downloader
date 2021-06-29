import { mkRuleClass1 } from "../lib/common";

export const trxs = () =>
  mkRuleClass1({
    bookUrl: document.location.href,
    bookname: (<HTMLHeadElement>document.querySelector(".infos > h1")).innerText
      .split("(")[0]
      .trim(),
    author: (<HTMLAnchorElement>(
      document.querySelector(".date > span > a")
    )).innerText.trim(),
    introDom: <HTMLElement>document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: (<HTMLImageElement>document.querySelector(".pic > img")).src,
    cos: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => <HTMLElement>doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
  });

export const tongrenquan = () =>
  mkRuleClass1({
    bookUrl: document.location.href,
    bookname: (<HTMLHeadElement>document.querySelector(".infos > h1")).innerText
      .split("(")[0]
      .trim(),
    author: (<HTMLAnchorElement>(
      document.querySelector(".date > span")
    )).innerText
      .replace("作者：", "")
      .trim(),
    introDom: <HTMLElement>document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: (<HTMLImageElement>document.querySelector(".pic > img")).src,
    cos: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => <HTMLElement>doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
  });
