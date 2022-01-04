import { mkRuleClass } from "./template";

export const dushu369 = () => {
  const title = document.querySelector(".cntitle") as HTMLElement;
  const [author, bookname] = /(.+)《(.+)》/
    .exec(title.innerText.trim())
    ?.slice(1) ?? ["", title.innerText.trim()];
  return mkRuleClass({
    bookUrl: document.location.href,
    bookname,
    author,
    introDom: document.querySelector(".Readme") as HTMLElement,
    introDomPatch: (dom) => dom,
    aList: document.querySelectorAll(".content a.a0"),
    getContent: (doc) => doc.querySelector(".content"),
    contentPatch: (dom) => dom,
  });
};
