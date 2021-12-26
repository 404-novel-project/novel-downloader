import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2 } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const a7xs = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector("span.item:nth-child(1)") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(".bookinfo_intro") as HTMLElement,
    introDomPatch: (dom) => {
      rm("strong", true, dom);
      rm2(dom, [
        "您要是觉得《",
        "请不要忘记向您QQ群和微博微信里的朋友推荐哦！",
      ]);
      return dom;
    },
    coverUrl: (document.querySelector(".pic > img") as HTMLImageElement).src,
    aList: document.querySelectorAll(".book_list > ul > li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#htmlContent",
        contentPatch: (content, doc) => {
          const ads = ["免费追书小说网手机版阅读网址"];
          rm2(content, ads);
          htmlTrim(content);
          return content;
        },
        getNextPage: (doc) =>
          (doc.querySelector("a.next.pager_next") as HTMLAnchorElement).href,
        continueCondition: (_content, nextLink) => {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
  });
