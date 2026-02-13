import { mkRuleClass } from "./template";

export const alicesw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.box_info p:first-of-type > a:first-of-type") as HTMLAnchorElement
      )?.innerText.trim() || "",
    introDom: document.querySelector("div.intro") as HTMLDivElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.pic > img.fengmian2") as HTMLImageElement).src || null,
    getIndexUrls: () => {
      // Get the chapter list page URL
      const chapterPageLink = document.querySelector(
        "div.book_newchap > div.tit a",
      ) as HTMLAnchorElement;
      if (!chapterPageLink) {
        return [];
      }

      // Return the chapter list URL
      return [chapterPageLink.href];
    },
    getAList: (doc) => doc.querySelectorAll("ul.mulu_list > li > a"),
    getContent: (doc) =>
      doc.querySelector("div.read-content") as HTMLElement,
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    nsfw: true,
  });
