import { rm, rm2, rms } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const xianfengxiaoshuo = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author: (document.querySelector("h2 > span > a") as HTMLAnchorElement)?.innerText.trim(),
    introDom: document.querySelector("div.intro") as HTMLDivElement,
    introDomPatch: (introDom) => {
      // Clean up the introduction if needed
      return introDom;
    },
    coverUrl: (document.querySelector("div.cover > img") as HTMLImageElement)?.src || null,

    // This function gets all chapter list page URLs
    getIndexUrls: async () => {
      // Get the chapter list page URL from the book page
      const chapterListLink = document.querySelector("a.chapterlist") as HTMLAnchorElement;
      if (!chapterListLink) {
        return [];
      }

      const chapterListUrl = chapterListLink.href;

      // Navigate to the chapter list page
      const doc = await getHtmlDOM(chapterListUrl, document.characterSet);

      const element = doc.getElementById("indexselect") as HTMLSelectElement;
      return Array.from(element.querySelectorAll<HTMLOptionElement>("option")).map(
          (o) => document.location.origin + o.getAttribute("value"),
      );
    },

    // This function gets the chapters from each index page
    getAList: (doc) => {
      // Get all chapter items on the current page
      return doc.querySelectorAll("div.booklist > ul > li > a");
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
        selector: "#chaptercontent",
        contentPatch: (content, doc) => {
          // Remove ads, scripts, and other unwanted elements if needed
          // rm("script", true, content);
          // rm(".readinline", true, content);
          // rm(".bottem", true, content);
          // rm("center", true, content);
          rm2(["本章未完，点击下一页继续阅读"], content);

          // somehow the last node is weird newline
          if (content.lastChild) {
            const lastNode = content.lastChild as HTMLElement;
            if (lastNode.textContent?.includes("\n")) {
              lastNode.remove();
            }
          }

          // remove all trailing <br>
          while (content.lastChild) {
            const lastNode = content.lastChild as HTMLElement;

            // Check if the node is an Element AND is a <br> tag
            if (lastNode.nodeType === Node.ELEMENT_NODE && lastNode.tagName === 'BR') {
              lastNode.remove();
            } 
            else {
              // If it's not a <br>, stop looking
              break;
            }
          }

          lastParagraphIndex.push(lastPageTotalParagraph + content.children.length - 1);
          lastPageTotalParagraph = lastPageTotalParagraph + content.children.length;

          return content;
        },
        getNextPage: (doc) => {
          // Function to get the URL of the next page (if present)
          const nextPageLink = doc.querySelector('a#next_url') as HTMLAnchorElement;
          if (nextPageLink && nextPageLink.innerText.includes("一页")) {
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

      // 最后一行需要和下一页第一行合并
      if (contentRaw) {
        // we don't care about last page
        for (let i = 0; i < lastParagraphIndex.length - 1; i++) {
          let lastParagraph = contentRaw.children[lastParagraphIndex[i] - i]; // Adjust for removed elements
          if (lastParagraph && lastParagraph.nextElementSibling) {
            const nextParagraph = lastParagraph.nextElementSibling;
            if (nextParagraph) {
              while(lastParagraph.innerHTML.endsWith("<br>")) {
                const prevParagraph = lastParagraph.previousElementSibling as HTMLElement;
                lastParagraph.remove();
                lastParagraph = prevParagraph;
              }
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
    nsfw: false,          // Mark as NSFW based on the content
    language: "zh",      // Chinese language
  });