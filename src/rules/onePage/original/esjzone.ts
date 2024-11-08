import { rm } from "../../../lib/dom";
import { mkRuleClass } from "../template";

export const esjzone = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".book-detail h2") as HTMLElement
    ).innerText.trim(),
    author: (
            Array.from(document.querySelectorAll('ul.book-detail li')).find(
                li => li.textContent && li.textContent.includes('作者:')
            )?.querySelector('a') as HTMLAnchorElement | null
        )?.innerText.trim() || "Unknown Author",
    introDom: document.querySelector(".description") as HTMLElement,
    introDomPatch: (dom) => dom,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll(
          'section.widget-tags.m-t-20 a.tag'
        )
      ).map((a) => (a as HTMLAnchorElement).innerText);
      return additionalMetadate;
    },
    coverUrl: document.querySelector("div.product-gallery")?.querySelector("img")?.getAttribute("src") ?? null,
    aList: document.querySelectorAll('#chapterList a'),
    getAName: (aElem) =>
      (aElem as HTMLElement)?.innerText.trim(),
    getContent: (dom) => dom.querySelector('.forum-content'),
    contentPatch: (dom) => {
      rm('h3', true, dom);
      rm('footer', true, dom);
      return dom;
    },
    language: "zh",
    needLogin: true,
  });
