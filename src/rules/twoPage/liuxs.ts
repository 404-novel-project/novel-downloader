import { rm2 } from "../../lib/dom";
import { mkRuleClass } from "./tempate";

export const liuxs = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: (document.querySelector(".btopt > a") as HTMLAnchorElement)
      .href,
    getBookname: (doc) =>
      (
        doc.querySelector(
          "div.infot:nth-child(1) > h1:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        doc.querySelector(
          "div.infot:nth-child(1) > span:nth-child(2)"
        ) as HTMLElement
      ).innerText
        .replace("作者：", "")
        .trim(),
    getIntroDom: (doc) => document.querySelector(".intro") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (document.querySelector(".pic > img") as HTMLImageElement).src,
    getAList: (doc) =>
      doc.querySelectorAll("#defaulthtml4 > table > tbody  div > a"),
    getSections: (doc) => doc.querySelectorAll(".j_title > b"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    postHook: (chapter) => {
      const bookname = chapter.bookname;
      if (chapter.sectionName) {
        chapter.sectionName = chapter.sectionName.replace(
          `《${bookname}》`,
          ""
        );
      }
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content") as HTMLElement,
    contentPatch: (dom) => {
      rm2(dom, ["--＆网--网"]);
      return dom;
    },
  });
