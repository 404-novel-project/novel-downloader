import { rm, rm2 } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const twkan = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: document.querySelector("h1")?.innerText ?? "",
    author: document.querySelector<HTMLAnchorElement>(
        ".booknav2 > p:nth-child(3) > a"
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
        document.querySelector('a.btn.more-btn[href]') as HTMLAnchorElement
      ).href;
      //https://twkan.com/book/xxx/index.html
      const article = menuUrl.match(/\/book\/(\d+)\/index.html/);
      const articleId = article?article[1]:""
      const menuUrlNew = "https://twkan.com/ajax_novels/chapterlist/" + articleId + ".html"

      const doc = await getHtmlDOM(menuUrlNew, "UTF-8");
      indexPages.push(doc);
      return indexPages;
    },
    getAList: (doc) => Array.from(doc.querySelectorAll("ul a")) as unknown as NodeListOf<Element>,
    getAName: (aElem) => (aElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#txtcontent0"),
    contentPatch: (content) => {
      rm(".hide720, .txtcenter, .bottom-ad", true, content);
      // rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);
      rm2([
        /【.*台灣小說網.*】/g,
        /（.*台灣小說網.*）/g,
        /本書由.*首發/g,
        /本書首發.*讀體驗/g,
        /GOOGLE搜索TWKAN/gi,
        /.*台灣小說網.*(隨時.|超全|超讚|超實用|超順暢|超流暢|超方便|超好用|超貼心|超給力|超省心|超靠譜|輕鬆讀|輕鬆看|任你.|等你尋)/g,
        /\(本章完\)/g
        ], content);
    
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
  });
