import { mkRuleClass } from "./tempate";

export const washuge = () => {
  const bookUrl = document.location.href;
  const bookId = /(\d+)\/?$/.exec(bookUrl)?.[1];
  const anotherPageUrl = `${document.location.origin}/books/book${bookId}.html`;

  return mkRuleClass({
    bookUrl,
    anotherPageUrl,
    getBookname: (doc) =>
      (doc.querySelector("#content > dd > h1") as HTMLHeadingElement)?.innerText
        .replace("全文阅读", "")
        .trim(),
    getAuthor: (doc) =>
      (
        doc.querySelector(
          "#at > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)"
        ) as HTMLElement
      )?.innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector(
        "#content > dd:nth-child(7) > p:nth-child(3)"
      ) as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (doc.querySelector(".hst > img") as HTMLImageElement).src,
    getAList: (doc) => document.querySelectorAll("#at > tbody td > a"),
    getContent: (doc) => doc.querySelector("#contents"),
    contentPatch: (dom) => dom,
    concurrencyLimit: 1,
  });
};
