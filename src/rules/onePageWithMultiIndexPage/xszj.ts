import { mkRuleClass } from "./template";
import { nextPageParse } from "../../lib/rule";
import { rm } from "../../lib/dom";

export const xszj = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("#info > p > a") as HTMLAnchorElement
      )?.innerText.trim() || "未知",
    introDom: document.querySelector("#intro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (document.querySelector("#fmimg > img") as HTMLImageElement)?.src || null,
    getIndexUrls: async () => {
      // Get the chapter list page URL
      const chapterListLink = document.querySelector(
        "a.chapterlist",
      ) as HTMLAnchorElement;
      if (!chapterListLink) {
        return [];
      }

      // Return the chapter list URL
      return [chapterListLink.href];
    },
    // Get chapters from the separate chapter list page
    getAList: (doc) => doc.querySelectorAll('#content_1 > a[rel="chapter"]'),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // Handle multi-page chapter content using nextPageParse
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#booktxt", // Content selector
        contentPatch: (content) => {
          rm("div", true, content);
          rm("script", true, content);
          rm("ins", true, content);
          return content
        },
        getNextPage: (doc) => {
          const nextPage = doc.querySelector("div.bottem1 > a:last-of-type");
          const linkText = nextPage?.textContent?.trim();
          // m.xszj.com has traditional Chinese
          if (linkText === "下一頁" || linkText === "下一页") {
            return (nextPage as HTMLAnchorElement).href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Continue if next link exists and is not pointing to book index
          return (
            nextLink !== "" && !nextLink.includes("javascript") // last page of last chapter has "javascript:void(0)" in the URL
          );
        },
        enableCleanDOM: false,
      });

      return contentRaw;
    },
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
  });
