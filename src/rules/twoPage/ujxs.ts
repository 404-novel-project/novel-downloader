import { rm, rm2 } from "../../lib/misc";
import { mkRuleClass } from "./tempate";

export const ujxs = () => {
  const bookUrl =
    document.location.origin +
    document.location.pathname.replace(/^\/read/, "/book");

  return mkRuleClass({
    bookUrl,
    anotherPageUrl: bookUrl,
    getBookname: (doc) =>
      (
        document.querySelector("#smallcons > h1") as HTMLHeadingElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        document.querySelector(
          "#smallcons > span:nth-child(3) > a"
        ) as HTMLAnchorElement
      ).innerText.trim(),
    getIntroDom: (doc) => doc.querySelector("#bookintro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) =>
      (doc.querySelector(".img > img") as HTMLImageElement)?.src,
    getAList: (doc) => document.querySelectorAll("#readerlist  li > a"),
    getSections: (doc) => document.querySelectorAll("#readerlist  li.fj > h3"),
    getSName: (sElem) => (sElem as HTMLElement).innerText,
    postHook: (chapter) => {
      chapter.sectionName =
        chapter.sectionName?.replace(chapter.bookname, "") ?? null;
      return chapter;
    },
    getContent: (doc) => doc.querySelector(".read-content") as HTMLElement,
    contentPatch: (content) => {
      rm("script", true, content);
      const ads = ["免费小说无弹窗免费阅读！", "全集TXT电子书免费下载！"];
      rm2(content, ads);
      return content;
    },
  });
};
