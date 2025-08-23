import { rm, rm2 } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const mjyhb = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.tab > p.p1") as HTMLParagraphElement
      )?.innerText.trim() || "",
    introDom: (() => {
      // create fake element to hold the introduction
      const introDom = document.createElement("div");
      introDom.className = "intro";
      const introContent = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
      if (introContent) {
        introDom.textContent = introContent;
      }
      return introDom;
    })(),
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.tu > img") as HTMLImageElement)?.src || undefined,
    aList: document.querySelectorAll("div.info_chapters > ul.p2:last-of-type > li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // Use nextPageParse to handle multi-page chapters
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#novelcontent",
        contentPatch: (content, doc) => {          
          // Remove ads, scripts, and other unwanted elements if needed
          rm("p", true, content);
          rm2(["内容未完，下一页继续阅读", /三五中文/], content);

          return content;
        },
        getNextPage: (doc) => {
          // Function to get the URL of the next page (if present)
          const nextPageLink = doc.querySelector('div.page_chapter > ul > li:last-of-type > a') as HTMLAnchorElement;
          if (nextPageLink && nextPageLink.innerText.includes("下一页")) {
            return nextPageLink.href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Condition to continue fetching next pages
          // Continue if nextLink exists and doesn't match certain patterns
          return nextLink !== "" && /_\d.html/.test(nextLink);
        },
        enableCleanDOM: false,
      });

      return contentRaw;
    },
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    nsfw: true,
  });
