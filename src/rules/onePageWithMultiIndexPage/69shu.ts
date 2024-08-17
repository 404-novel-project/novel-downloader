import { rm, rm2 } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const c69shu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: document.querySelector("h1")?.innerText ?? "",
    author: document.querySelector<HTMLAnchorElement>(
        ".booknav2 > p:nth-child(3) > a"
    )?.innerText ?? "",
    introDom: 
      document.querySelector(
        ".lastcontent"
      ) as HTMLParagraphElement,
    introDomPatch: (content) => content,
    coverUrl: document.querySelector<HTMLImageElement>(".bookimg2 > img")?.src ?? null,
    getIndexPages: async () => {
      const indexPages: Document[] = [];
      const menuUrl = (
        document.querySelector('a.btn.more-btn[href^="https://69shuba.cx/book/"]') as HTMLAnchorElement
      ).href;
      const doc = await getHtmlDOM(menuUrl, "GBK");
      indexPages.push(doc);
      return indexPages;
    },
    getAList: (doc) => doc.querySelectorAll("#catalog ul a"),
    getAName: (aElem) => (aElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector(".txtnav"),
    contentPatch: (content) => {
      rm(".hide720, .txtright, .bottom-ad", true, content);
      rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);
      return content;
    },
    language: "zh",
  });
