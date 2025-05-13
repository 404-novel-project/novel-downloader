import { rm } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const haiwaishubao = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author: document.querySelector<HTMLAnchorElement>(".BGsectionOne-top-right > p.author > span > a")?.innerText ?? "",
    introDom: document.querySelector("#intro > div.BGsectionTwo-bottom") as HTMLElement,
    introDomPatch: (introDom) => {
      // Clean up the introduction if needed
      return introDom;
    },
    coverUrl: (document.querySelector(".BGsectionOne-top-left > img") as HTMLImageElement)?.src || null,

    // This function gets all chapter list page URLs
    getIndexUrls: async () => {
      // Get the chapter list page URL from the book page
      const chapterListLink = document.querySelector("div.BGsectionOne-bottom > ul > li:nth-of-type(2) > a") as HTMLAnchorElement;
      if (!chapterListLink) {
        return [];
      }

      const chapterListUrl = chapterListLink.href;

      // Navigate to the chapter list page
      const doc = await getHtmlDOM(chapterListUrl, document.characterSet);

      return Array.from(
        doc.querySelectorAll<HTMLOptionElement>(
          'p.CGsectionTwo-right-bottom-btn > select > option'
        )
      ).map((o) => document.location.origin + o.getAttribute("value"));
    },

    // This function gets the chapters from each index page
    getAList: (doc) => {
      // Get all chapter items on the current page
      return doc.querySelectorAll("li.BCsectionTwo-top-chapter > a");
    },
    
    getAName: (aElem) => {
      // Extract chapter name from the link
      return (aElem as HTMLElement).innerText.trim();
    },    
    // Handle chapter content that may span multiple pages
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      // last paragraph index for all pages
      const lastParagraphIndex: number[] = [];
      let lastPageTotalParagraph = 0;
      
      // Use nextPageParse to handle multi-page chapters
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content, doc) => {
          lastParagraphIndex.push(lastPageTotalParagraph + content.children.length - 1);
          lastPageTotalParagraph = lastPageTotalParagraph + content.children.length;
          
          // Remove ads, scripts, and other unwanted elements if needed
          // rm("script", true, content);
          // rm(".readinline", true, content);
          // rm(".bottem", true, content);
          // rm("center", true, content);
          
          return content;
        },
        getNextPage: (doc) => {
          // Function to get the URL of the next page (if present)
          const nextPageLink = doc.querySelector('section.RBGsectionTwo li.RBGsectionTwo-right a') as HTMLAnchorElement;
          if (nextPageLink && nextPageLink.innerText.includes("下一页")) {
            return nextPageLink.href;
          }
          return "";
        },
        continueCondition: (content, nextLink) => {
          // Condition to continue fetching next pages
          // Continue if nextLink exists and doesn't match certain patterns
          return nextLink !== "" && 
                 !nextLink.includes("index.html");
        },
        enableCleanDOM: false,
      });

      // 最后一行需要和下一页第一行合并
      if (contentRaw) {
        // we don't care about last page
        for (let i = 0; i < lastParagraphIndex.length - 1; i++) {
          const lastParagraph = contentRaw.children[lastParagraphIndex[i] - i]; // Adjust for removed elements
          if (lastParagraph && lastParagraph.nextElementSibling) {
            const nextParagraph = lastParagraph.nextElementSibling;
            if (nextParagraph) {
              lastParagraph.innerHTML += nextParagraph.innerHTML;
              nextParagraph.remove();
            }
          }
        }
      }
      return contentRaw;
    },
    contentPatch: (content) => content,
    // contentPatch: (content) => {
    //   // Final cleanup of chapter content
    //   rm("script", true, content);
    //   rm(".bottem", true, content);
    //   rm(".readinline", true, content);
    //   rm("center", true, content);
      
    //   // Remove empty paragraphs and clean up formatting
    //   const paragraphs = content.querySelectorAll("p");
    //   for (const p of Array.from(paragraphs)) {
    //     if (!p.textContent || p.textContent.trim() === "") {
    //       p.remove();
    //     }
    //   }
      
    //   return content;
    // },
    // concurrencyLimit: 3, // Limit concurrent requests
    // sleepTime: 1000,     // Wait time between requests
    // maxSleepTime: 3000,  // Maximum wait time
    nsfw: true,          // Mark as NSFW based on the content
    language: "zh",      // Chinese language
  });