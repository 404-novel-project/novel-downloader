import { rm, rm2 } from "../../lib/dom";
import { mkRuleClass } from "./tempate";

export const c69shu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: (
      document.querySelector(".addbtn > a:nth-child(1)") as HTMLAnchorElement
    ).href,
    getBookname: () => document.querySelector("h1")?.innerText ?? "",
    getAuthor: () =>
      document.querySelector<HTMLAnchorElement>(
        ".booknav2 > p:nth-child(2) > a"
      )?.innerText ?? "",
    getIntroDom: () =>
      document.querySelector(
        ".navtxt > p:nth-child(1)"
      ) as HTMLParagraphElement,
    introDomPatch: (content) => content,
    getCoverUrl: () =>
      document.querySelector<HTMLImageElement>(".bookimg2 > img")?.src ?? null,
    getAList: (doc) => doc.querySelectorAll("#catalog ul a"),
    getContent: (doc) => doc.querySelector(".txtnav"),
    contentPatch: (content) => {
      rm(".hide720, .txtright, .bottom-ad", true, content);
      rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);
      return content;
    },
  });
