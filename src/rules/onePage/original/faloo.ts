import { insertBrBeforeText, rm } from "../../../lib/dom";
import { mkRuleClass } from "../template";

export const faloo = () =>
    mkRuleClass({
        bookUrl: document.location.href,
        bookname: (
            document.querySelector("h1#novelName") as HTMLElement
        ).innerText.trim(),
        author: (
            document.querySelector(
                "img.rentouOne"
            ) as HTMLAnchorElement
        ).innerText.trim(),
        introDom: document.querySelector("div.T-L-T-C-Box1") as HTMLDivElement,
        introDomPatch: (dom) => dom,
        coverUrl:
            (document.querySelector("img.imgcss") as HTMLImageElement)
                ?.src ?? null,
        additionalMetadatePatch: (additionalMetadate) => {
            additionalMetadate.tags = Array.from(
                document.querySelectorAll("div.T-R-T-B2-Box1 a")
            ).map((a) => (a as HTMLAnchorElement).innerText.trim());
            return additionalMetadate;
        },
        aList: document.querySelectorAll("div.C-Fo-Zuo div.DivTable a"),
        getAName: (aElem) =>
            (aElem as HTMLElement)?.innerText.trim(),
        sections: document.querySelectorAll("div.C-Fo-Zuo h3 a"),
        getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
        getContent: (doc) => doc.querySelector("div.noveContent"),
        contentPatch: (content) => {
            rm("b",true,content);
            return content;
        },
        language: "zh",
    });
