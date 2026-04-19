import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";

export const dushu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.book-title > h1") as HTMLElement
    )?.innerText.trim(),
    author: (() => {
      const tds = Array.from(document.querySelectorAll("table td"));
      for (const td of tds) {
        const text = td.textContent?.trim() ?? "";
        if (text.startsWith("作") && text.includes("者")) {
          const nextTd = td.nextElementSibling as HTMLElement | null;
          if (nextTd) {
            return nextTd.innerText.trim();
          }
        }
      }
      return "";
    })(),
    introDom: (() => {
      const summaryDiv = document.querySelector(
        "div.book-summary div.txtsummary"
      );
      return (summaryDiv as HTMLElement) ?? undefined;
    })(),
    introDomPatch: (dom) => dom,
    coverUrl: (() => {
      const img = document.querySelector<HTMLImageElement>("div.book-pic img");
      if (img) {
        return img.src.replace(/_200\.jpg$/, "");
      }
      return null;
    })(),
    aList: document.querySelectorAll<HTMLAnchorElement>(
      "table.booklist-table a[href*='/showbook/'][href$='.html']"
    ),
    sections: document.querySelectorAll("div.book-chapter"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("div.content_txt") as HTMLElement,
    contentPatch: (dom) => {
      rm("ins", true, dom);
      rm("iframe", true, dom);
      return dom;
    },
  });
