import { mkRuleClass } from "./tempate";
import { rm } from "../../lib/dom";

export const wenku8 = () => {
  const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
  const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join("/");
  const tocUrl = document.location.href;

  return mkRuleClass({
    bookUrl,
    ToCUrl: tocUrl,
    anotherPageUrl: bookUrl,
    getBookname: () =>
      (document.querySelector("#title") as HTMLElement).innerText.trim(),
    getAuthor: (doc) =>
      (
        doc.querySelector(
          "#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
        ) as HTMLElement
      ).innerText
        .replace("小说作者：", "")
        .trim(),
    getIntroDom: (doc) =>
      doc.querySelector(
        '#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span[style="font-size:14px;"]:nth-last-of-type(1)'
      ) as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (
        doc.querySelector(
          "#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)"
        ) as HTMLImageElement
      ).src,
    getAList: () => document.querySelectorAll("tbody td.ccss > a"),
    getSections: () => document.querySelectorAll("tbody td.vcss"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
      rm("#contentdp", true, content);
      return content;
    },
    concurrencyLimit: 1,
  });
};
