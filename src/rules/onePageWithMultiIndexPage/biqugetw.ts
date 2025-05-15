import { mkRuleClass } from "./template";
import { nextPageParse } from "../../lib/rule";

export const biqugetw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("h2 > span > a") as HTMLAnchorElement
      )?.innerText.trim() || "未知",
    introDom: document.querySelector("div.intro > p") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (document.querySelector("div.cover > img") as HTMLImageElement)?.src ||
      null,
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
    getAList: (doc) => doc.querySelectorAll("div.booklist ul > li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // Handle multi-page chapter content using nextPageParse
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#chaptercontent", // Content selector
        contentPatch: (content) => content,
        getNextPage: (doc) => {
          const nextPage = doc.querySelector("div.read-page > a:last-of-type");
          const linkText = nextPage?.textContent?.trim();
          if (linkText === "下一页") {
            return (nextPage as HTMLAnchorElement).href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Continue if next link exists and is not pointing to book index or next chapter
          return (
            nextLink !== "" &&
            nextLink !==
              (
                content.querySelector(
                  'div.read-page > a[rel="index"]',
                ) as HTMLAnchorElement
              )?.href &&
            !nextLink.includes("_") // paged chapter has "_<number>.html" in the URL
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
