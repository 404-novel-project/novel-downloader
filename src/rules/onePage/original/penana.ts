import { insertBrBeforeText, rm } from "../../../lib/dom";
import { mkRuleClass } from "../template";

export const penana = () =>
    mkRuleClass({
        bookUrl: document.location.href,
        bookname: (
            document.querySelector(".booktitlewrap") as HTMLElement
        ).innerText.trim(),
        author: (
            document.querySelector(
                "div.fontbold"
            ) as HTMLAnchorElement
        ).innerText.trim(),
        introDom: document.querySelector("div.readtext") as HTMLDivElement,
        introDomPatch: (dom) => dom,
        coverUrl:
            (document.querySelector("img.bookcover") as HTMLImageElement)
                ?.src ?? null,
        additionalMetadatePatch: (additionalMetadate) => {
            additionalMetadate.tags = Array.from(
                document.querySelectorAll(".tags_wrap .story_tag a")
            ).map((a) => (a as HTMLAnchorElement).innerText.trim());
            return additionalMetadate;
        },
        aList: document.querySelectorAll("div#toclist a"),
        getAName: (aElem) =>
            (aElem.querySelector("div.toc1") as HTMLElement)?.innerText.trim(),
        sections: undefined,
        getSName: undefined,
        getContent: (doc) => doc.querySelector("article"),
        contentPatch: (content) => {
            rm("span", true, content);
            rm('p[style="display:none"]', true, content);
            rm(".displaynone", true, content);
            return content;
        },
        language: "zh",
    });
