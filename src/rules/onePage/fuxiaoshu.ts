import { mkRuleClass } from "./template";

export const fuxiaoshu = mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
        document.querySelector(".con_box h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
        document.querySelector(".con_box .tits strong a") as
        | HTMLAnchorElement
        | HTMLSpanElement
    ).innerText
        .trim(),
    introDom: undefined,
    coverUrl: null,
    aList: Array.from(document.querySelectorAll(".alt_page li > a")).slice(2),
    getContent: (doc) => doc.querySelector("div.co-bay") as HTMLElement,
    contentPatch: (content) => content,
});
