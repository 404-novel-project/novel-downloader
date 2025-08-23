import { htmlTrim } from "../../lib/cleanDOM";
import { rm2 } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

const $ = <T extends Element>(selector: string) =>
  document.querySelector<T>(selector);
const $$ = <T extends Element>(selector: string) =>
  document.querySelectorAll<T>(selector);

export const dishuge = () =>
  mkRuleClass({
    bookUrl: location.href,
    bookname: $<HTMLHeadingElement>("#info h1")!.innerText.trim(),
    author: $<HTMLSpanElement>("#info > p")!.innerText.trim().replace(/^作\s*者\s*[：:]\s*/u, ""),
    introDom: $<HTMLElement>("#intro")!,
    introDomPatch: (_) => _,
    coverUrl: $<HTMLImageElement>("#fmimg img")!.src,
    aList:
      $$<HTMLAnchorElement>("#list > dl > dt:last-of-type ~ a"),
    async getContentFromUrl(chapterUrl, chapterName, charset) {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#booktxt",
        contentPatch(content, doc) {
          rm2([/本章阅读完毕/], content);
          htmlTrim(content);
          return content;
        },
        getNextPage(doc) {
          const nextPageLink = doc.querySelector('div.bottem1 > a[rel=next]') as HTMLAnchorElement;
          if (nextPageLink && nextPageLink.innerText.includes("下一页")) {
            return nextPageLink.href;
          }
          return "";
        },
        continueCondition(content, nextLink) {
          // Condition to continue fetching next pages
          // Continue if nextLink exists and doesn't match certain patterns
          return nextLink !== "" && /_\d.html/.test(nextLink);
        },
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
  });
