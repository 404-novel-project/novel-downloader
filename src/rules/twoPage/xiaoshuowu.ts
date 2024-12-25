import { rm, rms } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const xiaoshuowu = () => {
  const href = document.location.href;
  const bookId = href.substring(
    href.lastIndexOf("/", href.lastIndexOf("/") - 1) + 1,
    href.lastIndexOf("/")
  );
  const bookUrl = document.location.origin + `/book/${bookId}/`;
  return mkRuleClass({
    bookUrl,
    ToCUrl: document.location.href,
    anotherPageUrl: bookUrl,
    getBookname: (doc) =>
      (
        doc.querySelector(
          "div.divbox:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        doc.querySelector(
          "div.divbox:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > a"
        ) as HTMLElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector(
        "div.tabvalue:nth-child(1) > div:nth-child(1)"
      ) as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (
        doc.querySelector(
          "div.divbox:nth-child(2) > div:nth-child(1) > a:nth-child(1) > img"
        ) as HTMLImageElement
      ).src,
    getAList: (doc) => document.querySelectorAll("li.chapter > a"),
    getSections: (doc) => document.querySelectorAll(".volume"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    postHook: (chapter) => {
      if (chapter.sectionName) {
        chapter.sectionName = chapter.sectionName.replace(chapter.bookname, "");
      }
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#acontent"),
    contentPatch: (content) => {
      rm("div[align]", true, content);
      rm(".tishi", true, content);
      rm("h1", false, content);
      rms(
        ["(小说屋 www.xiaoshuowu.com)", "小说屋 www.xiaoshuowu.com"],
        content
      );
      return content;
    },
    concurrencyLimit: 1,
  });
};
