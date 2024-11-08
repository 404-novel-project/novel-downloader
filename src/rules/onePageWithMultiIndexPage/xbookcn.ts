import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const xbookcn = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: document.querySelector(".status-msg-body")?.textContent ?? "",
    author: document.querySelector<HTMLAnchorElement>(
        ".entry-content > p:nth-child(1)"
    )?.innerText.split("：")[1] ?? "",
    introDom: 
      document.querySelector(
        ".entry-content"
      ) as HTMLParagraphElement,
    introDomPatch: (content) => content,
    coverUrl: null,
    getIndexPages: async () => {
        const bookUrl = document.location.origin + document.location.pathname;
        const indexPages: Document[] = [];
        let nextUrl = bookUrl;
        do {
          const doc = await getHtmlDOM(nextUrl, "UTF-8");
          indexPages.push(doc);
          nextUrl =
            (
              doc.querySelector(
                "#Blog1_blog-pager-older-link"
              ) as HTMLAnchorElement
            )?.href ?? null;
        } while (nextUrl);
        return indexPages;
    },
    getAList: (doc) => doc.querySelectorAll("h3 > a"),
    getAName: (aElem) => (aElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector(".entry-content") as HTMLElement,
    contentPatch: (content) => content,
    language: "zh",
  });
