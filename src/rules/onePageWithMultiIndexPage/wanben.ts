import { htmlTrim } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { rm, rm2 } from "../../lib/misc";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const wanben = () => {
  const getIntroDom = () => {
    const a = document.querySelector(".bookInfo > a") as HTMLElement;
    if (a) {
      a.click();
      a.remove();
    }

    return document.querySelector(".bookInfo") as HTMLElement;
  };

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.bookPhr > h2") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "div.bookPhrMid > p:nth-child(1)"
      ) as HTMLParagraphElement
    ).innerText
      .replace("作者：", "")
      .trim(),
    introDom: getIntroDom(),
    introDomPatch: (dom) => dom,
    coverUrl: (document.querySelector("div.bookImg > img") as HTMLImageElement)
      ?.src,
    getIndexUrls: async () => {
      const contentPageUrl = (
        document.querySelector(
          "#contentbox > div.detailDiv > div.category > a"
        ) as HTMLAnchorElement
      ).href;
      const doc = await getHtmlDOM(contentPageUrl, document.characterSet);
      const aList = doc.querySelectorAll("div.pageBg div.pagenum a");
      const indexUrls = Array.from(aList).map(
        (a) => (a as HTMLAnchorElement).href
      );
      return indexUrls;
    },
    getAList: (doc) =>
      doc.querySelectorAll("div.chapterDiv > div.chapterList > ul > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "div.raderCon",
        contentPatch: (content, doc) => {
          rm("script", true, content);
          rm("[style]", true, content);
          const ads = [
            "【提示】：如果觉得此文不错，请推荐给更多小伙伴吧！分享也是一种享受。",
            "【看书助手】",
            "【完本神站】",
            "百万热门书籍终身无广告免费阅读",
          ];
          rm2(content, ads);
          htmlTrim(content);
          return content;
        },
        getNextPage: (doc) =>
          (doc.querySelector("div.page > a:nth-child(3)") as HTMLAnchorElement)
            .href,
        continueCondition: (_content, nextLink) => {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
};
