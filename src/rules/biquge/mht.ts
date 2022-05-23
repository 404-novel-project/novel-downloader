import { mkRuleClass } from "../onePage/template";
import { baseOnePage } from "./template";
import { getHtmlDOM } from "../../lib/http";
import { nextPageParse } from "../../lib/rule";
import { rm } from "../../lib/dom";
import { htmlTrim } from "../../lib/cleanDOM";

export const mht = () =>
  mkRuleClass({
    ...baseOnePage((introDom) => introDom, 5),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const ngetHtmlDOM = (
        input: RequestInfo,
        charset?: string,
        init?: RequestInit
      ) => {
        const test = async (response: Response) => {
          const resp = response.clone();
          const text = await resp.text();
          return text.includes('<div id="content">');
        };
        return getHtmlDOM(input, charset, init, test);
      };
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content) => {
          rm("p[data-id]", true, content);
          htmlTrim(content);
          return content;
        },
        getNextPage: (doc) =>
          (doc.querySelector(".bottem2 > a:nth-child(4)") as HTMLAnchorElement)
            .href,
        continueCondition: (_content, nextLink) =>
          new URL(nextLink).pathname.includes("_"),
        enableCleanDOM: false,
        getHtmlDomFunc: ngetHtmlDOM,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
  });
