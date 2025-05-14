import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";
import { convertBr } from "../../lib/cleanDOM";
import { nextPageParse } from "../../lib/rule";

export const zgzl = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info > h1") as HTMLElement
    )?.innerText.trim(),
    author: (() => {
      const authorElement = document.querySelector(
        "#info > p:first-of-type",
      ) as HTMLElement;
      if (authorElement) {
        // Clean up the author name
        return authorElement.innerText
          .replace(/^作\s*者\s*[：:]\s*/u, "")
          .trim();
      }
      return "未知";
    })(),
    introDom: document.querySelector("#intro > p") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (document.querySelector("#fmimg > img") as HTMLImageElement).src || null,
    aList: (() => {
      // "最新章节" 区域
      const sectionHeaders = document.querySelectorAll("#list > dl > dt > b");

      if (sectionHeaders.length > 0) {
        // "正文"
        const secondDt = document.querySelector(
          "#list > dl > dt:nth-of-type(2)",
        );

        if (secondDt) {
          const chaptersAfterSecondDt: Element[] = [];
          let currentElement = secondDt.nextElementSibling;

          while (currentElement) {
            if (currentElement.tagName.toLowerCase() === "dd") {
              const anchor = currentElement.querySelector("a");
              if (anchor) {
                chaptersAfterSecondDt.push(anchor);
              }
            } else {
              break;
            }
            currentElement = currentElement.nextElementSibling;
          }

          return chaptersAfterSecondDt;
        } else {
          console.error("未找到正文区域");
          return [];
        }
      } else {
        return document.querySelectorAll("#list > dl > dd > a");
      }
    })(),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // Handle multi-page chapter content using nextPageParse
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content", // Content selector
        contentPatch: (content) => {
          const converted = convertBr(content);

          // Remove the last line
          if (converted.children.length > 1) {
            const lastLine = (
              converted.lastElementChild as HTMLParagraphElement
            ).innerText;
            const unwantedText = /内容未完.*|本章阅读完毕.*/;
            if (unwantedText.test(lastLine)) {
              converted.removeChild(
                converted.lastElementChild as HTMLParagraphElement,
              );
            }
          }

          return converted;
        },
        getNextPage: (doc) => {
          const nextLink = doc.querySelector(
            "div.bottem1 > a:last-of-type",
          ) as HTMLAnchorElement;

          // extract chapter id
          const url = doc.baseURI;
          const urlParts = url.split("/");
          const lastPart = urlParts[urlParts.length - 1];
          const chapterId = lastPart.split(".")[0].split("_")[0];

          if (nextLink?.href.includes(chapterId)) {
            return nextLink.href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Continue if next link exists and doesn't point to index or next chapter
          return nextLink !== "" && !nextLink.includes("info_");
        },
        enableCleanDOM: false,
      });

      return contentRaw;
    },
    contentPatch: (content) => {
      // rm("script", true, content);
      // rm("div.adsbygoogle", true, content);
      // rm("ins", true, content);
      // rm("a", true, content);

      return content;
    },
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    nsfw: true,
  });
