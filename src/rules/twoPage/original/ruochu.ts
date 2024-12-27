import { rm } from "../../../lib/dom";
import { mkRuleClass } from "../template";

export const ruochu = () => {
    const bookUrl = document.location.href;
    const bookID = bookUrl.match(/book\/(\d+)/)?.[1];
    const contentUrl = `https://www.ruochu.com/chapter/${bookID}/`;
    return mkRuleClass({
        bookUrl: bookUrl,
        anotherPageUrl: contentUrl,
        getBookname: (doc) =>
            (document.querySelector("div.hd h1 > span") as HTMLElement).innerText.trim(),
        getAuthor: (doc) =>
            (
                document.querySelector("div.pattern-cover-author a.name") as HTMLAnchorElement
            ).innerText.trim(),
        getIntroDom: (doc) => document.querySelector("div.summary pre") as HTMLElement,
        introDomPatch: (introDom) => introDom,
        getCoverUrl: (doc) =>
            (document.querySelector("div.pic img") as HTMLImageElement)?.src,
        getAList: (doc) => doc.querySelectorAll("div.bd li > a"),
        getSections: (doc) => doc.querySelectorAll("div.hd > h2"),
        getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
        // postHook: (chapter) => {
        //     chapter.sectionName =
        //         chapter.sectionName?.replace(chapter.bookname, "").trim() ?? null;
        //     return chapter;
        // },
        getContent: (doc) => doc.querySelector("div.page-content") as HTMLElement,
        contentPatch: (content) => {
            // rm("div", true, content);
            // rm("script", true, content);
            const c = document.createElement("div");
            c.innerHTML = content.innerHTML.replace(/\n/g, "<br/><br/>");
            return c;
        },
    })
}
