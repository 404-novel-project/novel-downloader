import { rm, rm2 } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const c69yuedu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: document.querySelector("h1")?.innerText ?? "",
    author: document.querySelector<HTMLAnchorElement>(
      ".booknav2 > p:nth-child(2) > a"
    )?.innerText ?? "",
    introDom:
      document.querySelector(
        ".navtxt"
      ) as HTMLParagraphElement,
    introDomPatch: (content) => content,
    coverUrl: document.querySelector<HTMLImageElement>(".bookimg2 > img")?.src ?? null,
    getIndexPages: async () => {
      const indexPages: Document[] = [];
      const menuUrl = (
        document.querySelector('.addbtn a.btn[href^="/chapters/"]') as HTMLAnchorElement
      ).href;
      const doc = await getHtmlDOM(menuUrl, "GBK");
      indexPages.push(doc);
      return indexPages;
    },
    getAList: (doc) => Array.from(doc.querySelectorAll("#chapters ul a")) as unknown as NodeListOf<Element>,
    getAName: (aElem) => (aElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector(".content"),
    contentPatch: (content) => {
      rm(".txtright, .bottom-ad", true, content);

      // Replace text nodes between <p> nodes with <p> nodes
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null);
      const nodesToReplace = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (
          node.parentNode &&
          node.parentNode.nodeName !== 'P' &&
          node.textContent &&
          node.textContent.trim() !== ''
        ) {
          nodesToReplace.push(node);
        }
      }

      nodesToReplace.forEach((node) => {
        const p = document.createElement('p');
        p.textContent = node.textContent;
        if (node.parentNode) {
          node.parentNode.replaceChild(p, node);
        }
      });

      // Split <p> elements containing <br /> tags
      const paragraphs = content.querySelectorAll('p');
      const brRegex = /<br\s*\/?>/i;

      paragraphs.forEach((p) => {
        if (brRegex.test(p.innerHTML)) {
          const parts = p.innerHTML.split(brRegex);
          const fragment = document.createDocumentFragment();
          parts.forEach((part) => {
            const newP = document.createElement('p');
            newP.innerHTML = part.trim();
            if (newP.innerHTML !== '') {
              fragment.appendChild(newP);
            }
          });
          if (p.parentNode) {
            p.parentNode.replaceChild(fragment, p);
          }
        }
      });

      return content;
    },
    language: "zh",
    concurrencyLimit: 1,
    sleepTime: 500,
    maxSleepTime: 1500
  });
