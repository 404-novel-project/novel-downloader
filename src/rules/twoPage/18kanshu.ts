import { convertFixWidth, isFixWidth } from "../../lib/cleanDOM";
import { mkRuleClass } from "./template";

export const c18kanshu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: (
      document.querySelector("div.menu_more_black > a") as HTMLAnchorElement
    ).href,
    getBookname: (doc) =>
      (document.querySelector(".in_textone") as HTMLElement).innerText.trim(),
    getAuthor: (doc) => {
      const authorElem = document.querySelector(
        "div.in_texttwo:nth-child(2)"
      ) as HTMLElement;
      const author = /作者：(.+)$/.exec(authorElem.innerText.trim())?.[1] ?? "";
      return author;
    },
    getIntroDom: (doc) => document.querySelector(".janjie") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (document.querySelector(".book_top > div.img > img") as HTMLImageElement)
        .src,
    getAList: (doc) => {
      const _aList = doc.querySelectorAll("div.list_main.book_list");
      const reducer = (out: HTMLAnchorElement[], div: Element) => {
        const onclick = div.getAttribute("onclick");
        const href =
          onclick?.substring(
            onclick.indexOf("'") + 1,
            onclick.lastIndexOf("'")
          ) ?? "";
        const a = document.createElement("a");
        a.href = href;
        a.innerHTML = div.innerHTML.trim();
        out.push(a);
        return out;
      };
      const aList = Array.from(_aList).reduce(reducer, []);
      return aList;
    },
    getContent: (doc) => doc.querySelector(".readcontent"),
    contentPatch: (dom) => {
      Array.from(dom.childNodes)
        .filter((node) => node instanceof Text)
        .forEach((text) => {
          if ((text as Text).textContent?.includes("　　")) {
            (text as Text).parentNode?.insertBefore(
              document.createElement("br"),
              text
            );
          }
        });
      if (isFixWidth(dom)) {
        convertFixWidth(dom);
      }
      return dom;
    },
    nsfw: true,
  });
