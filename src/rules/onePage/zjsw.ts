import { rm, rm2 } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const zjsw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1.f20h") as HTMLElement
    )?.firstChild?.textContent?.trim() || "",
    author: (() => {
      const em = document.querySelector("h1.f20h em") as HTMLElement;
      if (em) {
        return em.textContent?.replace(/^作者[：:]/, "").trim() || "";
      }
      return "";
    })(),
    introDom: document.querySelector("div.intro") as HTMLElement,
    introDomPatch: (dom) => {
      rm("p.book_keywords", false, dom);
      rm("script", true, dom);
      return dom;
    },
    coverUrl: (
      document.querySelector("div.pic > img") as HTMLImageElement
    )?.src,
    aList: document.querySelectorAll<HTMLAnchorElement>("dl > dd > a"),
    sections: document.querySelectorAll("dl > dt"),
    getSName: (sElem: Element) => {
      const b = sElem.querySelector("b");
      if (b) {
        return (b as HTMLElement).innerText.trim();
      }
      return (sElem as HTMLElement).innerText.trim();
    },
    async getContentFromUrl(chapterUrl, chapterName, charset) {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content) => {
          rm2(["爪机书屋更新速度全网最快"], content);
          return content;
        },
        getNextPage(doc) {
          const links = Array.from(doc.querySelectorAll<HTMLAnchorElement>("#thumb a"));
          for (const a of links) {
            if (a.textContent?.trim() === "下一页") {
              return a.href;
            }
          }
          return "";
        },
        continueCondition(_content, nextLink) {
          return nextLink !== "";
        },
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
    language: "zh",
  });
