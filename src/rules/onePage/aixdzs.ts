import { mkRuleClass } from "./template";

export const aixdzs = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".d_info > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".d_ac > ul:nth-child(1) > li:nth-child(1) > a:nth-child(2)"
      ) as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(".d_co") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: (document.querySelector(".d_af > img") as HTMLImageElement).src,
    aList: document.querySelectorAll("#i-chapter li.chapter > a"),
    sections: document.querySelectorAll("#i-chapter li.volume"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector(".content") as HTMLElement,
    contentPatch: (dom) => dom,
  });
