import { mkRuleClass } from "./template";

export const czbooks = () =>
    mkRuleClass({
        bookUrl: document.location.href,
        bookname: (
            document.querySelector("div.info > span.title") as HTMLElement
        ).innerText.trim(),
        author: (
            document.querySelector(
                "div.info > span.author"
            ) as HTMLElement
        ).innerText.trim(),
        introDom: document.querySelector("div.description") as HTMLElement,
        introDomPatch: (dom) => dom,
        coverUrl: (document.querySelector("div.novel-detail .thumbnail > img") as HTMLImageElement).src,
        aList: document.querySelectorAll("#chapter-list li > a"),
        sections: document.querySelectorAll("#chapter-list li.volume"),
        getSName: (dom) => (dom as HTMLElement).innerText.trim(),
        getContent: (doc) => doc.querySelector("div.content") as HTMLElement,
        contentPatch: (dom) => dom,
    });
