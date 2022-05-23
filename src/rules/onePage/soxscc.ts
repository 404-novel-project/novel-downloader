import { mkRuleClass } from "./template";
import { rm, rm2 } from "../../lib/dom";

export const soxscc = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".xiaoshuo > h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".xiaoshuo > h6:nth-child(3) > a"
      ) as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector("#intro") as HTMLElement,
    introDomPatch: (dom) => {
      rm("span.tags", false, dom);
      rm("q", true, dom);
      return dom;
    },
    coverUrl: (document.querySelector(".book_cover > img") as HTMLImageElement)
      .src,
    aList: document.querySelectorAll("div.novel_list[id] dd > a"),
    sections: document.querySelectorAll(
      "div.novel_list[id] dl > dt:nth-child(1) > b:nth-child(1)"
    ),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("div.content[id]") as HTMLElement,
    contentPatch: (content) => {
      rm2(
        [
          "最新章节地址：",
          "全文阅读地址：",
          "txt下载地址：",
          "手机阅读：",
          '为了方便下次阅读，你可以点击下方的"收藏"记录本次',
          "请向你的朋友（QQ、博客、微信等方式）推荐本书",
          "您可以在百度里搜索",
        ],
        content
      );
      return content;
    },
  });
