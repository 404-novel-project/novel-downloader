import { mkRuleClass1 } from "../lib/common";

export const c630shu = mkRuleClass1({
  bookUrl: document.location.href,
  bookname: (<HTMLHeadElement>(
    document.querySelector("#info > h1")
  )).innerText.trim(),
  author: (<HTMLAnchorElement>(
    document.querySelector("div.options > span.item:nth-child(1) > a")
  )).innerText.trim(),
  introDom: <HTMLElement>document.querySelector("#intro"),
  introDomPatch: (introDom) => introDom,
  coverUrl: (<HTMLImageElement>document.querySelector(".img_in > img")).src,
  cos: document.querySelectorAll(".zjlist > dd > a"),
  getContent: (doc) => <HTMLElement>doc.querySelector("#content"),
  contentPatch: (content) => {
    content.innerHTML = content.innerHTML.replace(
      /恋上你看书网 WWW.630SHU.NET ，最快更新.+最新章节！/,
      ""
    );
    return content;
  },
});
