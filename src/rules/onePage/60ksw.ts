import { mkRuleClass } from "./template";

export const i60ksw = () =>
    mkRuleClass({
        bookUrl: document.location.href,
        bookname: (
            document.querySelector("div.booktitle > h1") as HTMLElement
        ).innerText.trim(),
        author: (
            document.querySelector(
                "#author"
            ) as HTMLElement
        ).innerText.trim(),
        introDom: document.querySelector("#bookintro") as HTMLElement,
        introDomPatch: (dom) => dom,
        coverUrl: (document.querySelector("#bookimg img") as HTMLImageElement).src,
        aList: document.querySelectorAll("#chapterlist li > a"),
        sections: undefined,
        getSName: (dom) => (dom as HTMLElement).innerText.trim(),
        getContent: (doc) => doc.querySelector("#content") as HTMLElement,
        contentPatch: (dom) => dom,
    });
