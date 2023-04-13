import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2 } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const wanben = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".detailTitle > h1") as HTMLHeadingElement
    ).innerText.trim(),
    author: (
      document.querySelector(".writer > a") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(
      ".detailTopMid > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)"
    ) as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (
      document.querySelector(".detailTopLeft > img") as HTMLImageElement
    )?.src,
    aList: document.querySelectorAll(".chapter li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "div.readerCon",
        contentPatch: (content, doc) => {
          rm("script", true, content);
          rm("div[style]", true, content);
          rm("a", true, content);
          const ads = [
            "【提示】：如果觉得此文不错，请推荐给更多小伙伴吧！分享也是一种享受。",
            "【看书助手】",
            "百万热门书籍终身无广告免费阅读",
            "【完本神站】",
            "一秒记住、永不丢失！"
          ];
          rm2(ads, content);
          htmlTrim(content);
          return content;
        },
        getNextPage: (doc) =>
          (doc.querySelector(".readPage > a:nth-child(3)") as HTMLAnchorElement)
            .href,
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
