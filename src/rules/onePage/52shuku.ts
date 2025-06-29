import { mkRuleClass } from "./template";
import { rm, rms } from "../../lib/dom";

export const i52shuku = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1.article-title") as HTMLElement
    )?.innerText.trim(),
    author: "",
    introDom: document.querySelector("article.article-content > p:nth-of-type(2)") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: null,
    aList: document.querySelectorAll("ul.list > li.mulu > a"),
    getContent: (doc) => doc.querySelector("#nr1") as HTMLElement,
    contentPatch: (content) => {
        // Remove all elements after <div> tag
        const divElement = content.querySelector("div");
        if (divElement) {
            let nextElement = divElement.nextElementSibling;
            while (nextElement) {
                const elementToRemove = nextElement;
                nextElement = nextElement.nextElementSibling;
                elementToRemove.remove();
            }
        }
        // remove the <div> tag
        rm("div", true, content);
        // 符合标签的会插入标签链接
        // Replace <a> tags with their text content
        const links = content.querySelectorAll("a");
        links.forEach(link => {
          link.replaceWith(document.createTextNode(link.textContent || ""));
        });
        return content;
    },
    // 52shuku uses Cloudflare, and is strict about concurrency
    concurrencyLimit: 1,
    sleepTime: 50,
    language: "zh",
    // nsfw: true,
  });
