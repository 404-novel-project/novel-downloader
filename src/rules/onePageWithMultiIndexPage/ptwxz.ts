import { mkRuleClass } from "./template";
import { getHtmlDOM } from "../../lib/http";
import { nextPageParse } from "../../lib/rule";
import { rm2 } from "../../lib/dom";

export const ptwxz = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname:
      document
        .querySelector<HTMLHeadingElement>("#info h1")
        ?.innerText.trim() ?? "",
    author:
      document
        .querySelector<HTMLAnchorElement>(
          "#info > p:nth-child(2) > a:nth-child(1)"
        )
        ?.innerText.trim() ?? "",
    introDom: document.querySelector<HTMLDivElement>("#intro") ?? undefined,
    introDomPatch: (dom) => dom,
    coverUrl:
      document.querySelector<HTMLImageElement>("#fmimg > img")?.src ?? null,
    getIndexUrls: async () => {
      const base = document.location.pathname;
      const listUrlBase = document.location.origin + "/list" + base;
      const doc = await getHtmlDOM(listUrlBase, document.characterSet);
      return Array.from(
        doc.querySelectorAll<HTMLOptionElement>("#indexselect > option")
      ).map((o) => document.location.origin + o.getAttribute("value"));
    },
    getAList: (doc) => doc.querySelectorAll('a[rel="chapter"]'),
    getContentFromUrl: async (
      chapterUrl: string,
      chapterName: string | null,
      charset: string
    ) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#booktxt",
        contentPatch: (content) => {
          rm2(["本章未完，點選下一頁繼續閱讀。"], content);
          return content;
        },
        getNextPage: (doc) =>
          doc.querySelector<HTMLAnchorElement>("#next_url")?.href ?? "",
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
