import { mkRuleClass } from "./tempate";

export const viviyzw = () => {
  const bookUrl = document.location.href.replace("/book", "/info");
  return mkRuleClass({
    bookUrl,
    anotherPageUrl: bookUrl,
    getBookname: (doc) =>
      (
        doc.querySelector("article.info > header > h1") as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        doc.querySelector(
          "article.info > p.detail.pt20 > i:nth-child(1) > a"
        ) as HTMLElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector("article.info > p.desc") as HTMLElement,
    introDomPatch: (content) => content,
    getCoverUrl: (doc) =>
      (doc.querySelector("article.info > div.cover > img") as HTMLImageElement)
        .src,
    getAList: (doc) => document.querySelectorAll("ul.mulu > li.col3 > a"),
    getSections: (doc) => document.querySelectorAll("li.col1.volumn"),
    getSName: (sElem) => (sElem as HTMLLIElement).innerText,
    postHook: (chapter) => {
      if (chapter.sectionName?.includes("最新九章")) {
        return;
      }
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => content,
  });
};
