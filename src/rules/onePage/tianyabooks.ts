import { rm } from "../../lib/misc";
import { mkRuleClass } from "./template";

export const tianyabooks = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector(".book > h1") as HTMLElement)?.innerText
      .replace(/《|》/g, "")
      .trim(),
    author: (
      document.querySelector(".book > h2 > a") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(".description") as HTMLElement,
    introDomPatch: (dom) => {
      rm("h3", false, dom);
      return dom;
    },
    coverUrl: null,
    aList: document.querySelectorAll(".book > dl > dd > a"),
    sections: document.querySelectorAll(".book > dl > dt"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#main"),
    contentPatch: (dom) => {
      rm("div.crumb", false, dom);
      rm("h1", false, dom);
      rm('p[align="center"]', false, dom);
      rm("table", true, dom);
      return dom;
    },
  });
