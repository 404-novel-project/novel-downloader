import { mkRuleClass } from "./template";
import { nextPageParse } from "../../lib/rule";
import { rm } from "../../lib/dom";

export const wanxiangshucheng = () =>
  mkRuleClass({
    attachmentMode: "naive",
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "div.media-body > div.row > div > a",
      ) as HTMLAnchorElement
    )?.innerText // first one
      .trim(),
    introDom: document.querySelector("div.book-detail") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      window.location.origin + (
        document.querySelector("img.book-img-middel") as HTMLImageElement
      ).getAttribute("src") || null,
    aList: Array.from(
      document.querySelectorAll(
        "#all-chapter > div.panel > div.panel-body > div.row > div.item > a",
      ),
    ),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // Use nextPageParse to handle multi-page chapters
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#cont-body",
        contentPatch: (content, doc) => {
          rm("script", true, content);
          rm("div", true, content);
          return content
        },
        getNextPage: (doc) => {
          // Function to get the URL of the next page (if present)
          const nextPageLink = doc.querySelector(
            "#content > div.row > div.text-center > a:last-of-type",
          ) as HTMLAnchorElement;
          if (nextPageLink && nextPageLink.innerText.includes("下一页")) {
            return nextPageLink.href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Condition to continue fetching next pages
          // Continue if nextLink exists and doesn't match certain patterns
          return nextLink !== "" && nextLink.includes(".html");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
  });
