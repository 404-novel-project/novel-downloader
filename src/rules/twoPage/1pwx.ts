import { rm } from "../../lib/misc";
import { mkRuleClass } from "./tempate";

export const xiaoshuodaquan = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl: (
      document.querySelector(".viewalllinks") as HTMLAnchorElement
    ).href,
    getBookname: (doc) =>
      (document.querySelector(".r420 > h1") as HTMLElement).innerText.trim(),
    getAuthor: (doc) =>
      (
        document.querySelector(".author a") as HTMLAnchorElement
      ).innerText.trim(),
    getIntroDom: (doc) => doc.querySelector(".bookintro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) =>
      (document.querySelector(".con_limg > img") as HTMLImageElement)?.src,
    getAList: (doc) => doc.querySelectorAll("div.clearfix li > a"),
    getSections: (doc) => doc.querySelectorAll("div.dirtitone > h2"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    postHook: (chapter) => {
      chapter.sectionName =
        chapter.sectionName?.replace(chapter.bookname, "").trim() ?? null;
      return chapter;
    },
    getContent: (doc) => doc.querySelector("#content") as HTMLElement,
    contentPatch: (content) => {
      rm("div", true, content);
      rm("script", true, content);
      const c = document.createElement("div");
      c.innerHTML = content.innerHTML.replace(/\n/g, "<br/><br/>");
      return c;
    },
  });
