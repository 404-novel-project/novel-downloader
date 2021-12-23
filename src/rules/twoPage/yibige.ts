import { htmlTrim } from "../../lib/cleanDOM";
import { rm } from "../../lib/misc";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./tempate";

export const yibige = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: document.location.href + "index.html",
    getBookname: (doc) =>
      (
        document.querySelector("#info h1:nth-of-type(1)") as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        document.querySelector("#info > p:nth-child(2)") as HTMLElement
      ).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
    getIntroDom: (doc) =>
      document.querySelector("#intro > p:nth-child(1)") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) =>
      (document.querySelector("#fmimg > img") as HTMLImageElement)?.src ?? "",
    getAList: (doc) => doc.querySelectorAll("#list dd > a"),
    getContent: (doc) => doc.querySelector("#content"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content, doc) => {
          rm("script", true, content);
          rm("div[style]", true, content);
          htmlTrim(content);
          return content;
        },
        getNextPage: (doc) =>
          (doc.querySelector(".bottem1 > a:nth-child(4)") as HTMLAnchorElement)
            .href,
        continueCondition: (_content, nextLink) => {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
  });
