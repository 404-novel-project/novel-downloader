import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";
import { table } from "../lib/hongxiuzhao";

export const hongxiuzhao = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname:
      document
        .querySelector<HTMLHeadingElement>(".m-bookdetail div.f-fl > h1")
        ?.innerText.trim() ?? "",
    author:
      document
        .querySelector<HTMLAnchorElement>(".author > a:nth-child(1)")
        ?.innerText.trim() ?? "",
    introDom:
      document.querySelector<HTMLParagraphElement>(".summery") ?? undefined,
    introDomPatch: (dom) => {
      rm("strong", false, dom);
      rm("em", false, dom);
      return dom;
    },
    coverUrl: document.querySelector<HTMLImageElement>(".cover > img")?.src,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(".tags > a")
      ).map((a) => a.innerText.trim());
      return additionalMetadate;
    },
    aList: document.querySelectorAll(".m-chapters li > a"),
    getContent: (doc) => doc.querySelector(".article-content"),
    contentPatch: (content) => {
      rm("mark", true, content);
      rm("h1", true, content);
      rm("ins", true, content);
      rm("script", true, content);
      rm("p[style]", true, content);
      rm('a[href="https://hongxiuzh.com"]', true, content);

      for (const k in table) {
        content.innerHTML = content.innerHTML.replaceAll(k, table[k]);
      }
      return content;
    },
  });
