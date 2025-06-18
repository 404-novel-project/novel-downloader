import { mkRuleClass } from "./template";

export const fuxiaoshu = mkRuleClass({
  bookUrl: document.location.href,
  bookname: (document.querySelector("h1") as HTMLHeadElement).innerText.trim(),
  author: (
    document.querySelector("div.af_lst > strong > a") as HTMLAnchorElement
  )?.innerText.trim(),
  introDom: undefined,
  coverUrl: null,
  aList: Array.from(document.querySelectorAll(".alt_page li > a")).slice(2), // 前2个是 “共x页”和“下一页”，从第3个开始
  getContent: (doc) => doc.querySelector("div.wznrb") as HTMLElement,
  contentPatch: (content) => content,
});
