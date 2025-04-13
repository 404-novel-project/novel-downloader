import { rm } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const c101kanshu = () =>
    mkRuleClass({
        bookUrl: document.location.href,
        anotherPageUrl: getAnotherPageUrl(document.location.href),
        getBookname: (doc) =>
            (document.querySelector("div.bookbox h1") as HTMLElement).innerText.trim(),
        getAuthor: (doc) =>
            (
                document.querySelector("div.booknav2 p") as HTMLAnchorElement
            ).innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("div.navtxt p") as HTMLElement,
        introDomPatch: (introDom) => introDom,
        getCoverUrl: (doc) =>
            (document.querySelector("div.bookimg2 img") as HTMLImageElement)?.src,
        getAList: (doc) => doc.querySelectorAll("a"),
        postHook: (chapter) => {
            return chapter;
        },
        getContent: (doc) => doc.querySelector("div#txtcontent") as HTMLElement,
        contentPatch: (content) => {
            rm("div.txtad", true, content);
            rm("script", true, content);
            const c = document.createElement("div");
            c.innerHTML = content.innerHTML.replace("<br><br>", "<br>");
            return c;
        },
    });

function getAnotherPageUrl(bookUrl: string) {
    const match = bookUrl.match(/\/book\/(\d+)\.html/);
    if (!match) {
        throw new Error("Invalid book URL.");
    }
    return `https://101kanshu.com/ajax_novels/chapterlist/${match[1]}.html`;
}