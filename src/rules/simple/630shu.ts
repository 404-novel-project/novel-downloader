import { mkRuleClass1 } from "../lib/common";

export const c630shu = mkRuleClass1({
  bookUrl: document.location.href,
  bookname: (
    document.querySelector("#info > h1") as HTMLHeadElement
  ).innerText.trim(),
  author: (
    document.querySelector(
      "div.options > span.item:nth-child(1) > a"
    ) as HTMLAnchorElement
  ).innerText.trim(),
  introDom: document.querySelector("#intro") as HTMLElement,
  introDomPatch: (introDom) => introDom,
  coverUrl: (document.querySelector(".img_in > img") as HTMLImageElement).src,
  cos: document.querySelectorAll(".zjlist > dd > a"),
  getContent: (doc) => doc.querySelector("#content") as HTMLElement,
  contentPatch: (content) => {
    content.innerHTML = content.innerHTML.replace(
      /恋上你看书网 WWW.630SHU.NET ，最快更新.+最新章节！/,
      ""
    );
    return content;
  },
});
