import { mkRuleClass } from "../onePage/template";
import { nextPageParse } from "../../lib/rule";
import { rm, rms } from "../../lib/dom";

export const mbtxt = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".booktitle") as HTMLElement
    ).innerText.trim(),
    author: (document.querySelector("a.red") as HTMLElement).innerText.trim(),
    introDom: document.querySelector(".bookintro") as HTMLElement,
    introDomPatch: (dom) => {
      rm(".visible-xs", true, dom);
      return dom;
    },
    coverUrl: document.querySelector<HTMLImageElement>(".bookcover > img")?.src,
    aList: document.querySelectorAll("#list-chapterAll > dd > a"),
    getContentFromUrl: async (
      chapterUrl: string,
      chapterName: string | null,
      charset: string
    ) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: ".readcontent",
        contentPatch: (content) => {
          rm(".kongwen", true, content);
          rm(".readmiddle", true, content);
          rm(".text-danger.text-center", true, content);
          rms(["-->>"], content);
          return content;
        },
        getNextPage: (doc) =>
          doc.querySelector<HTMLAnchorElement>("#linkNext")?.href ?? "",
        continueCondition: (content, nextLink) => {
          if (nextLink === "") {
            return false;
          }
          return nextLink.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },

    contentPatch: (dom) => dom,
  });
