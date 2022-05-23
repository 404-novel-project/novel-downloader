import { mkRuleClass } from "../template";

export const kakuyomu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#workTitle > a") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "#workAuthor-activityName > a"
      ) as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector("#introduction") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll("#workMeta-tags > li > a")
      ).map((a) => (a as HTMLAnchorElement).innerText);
      return additionalMetadate;
    },
    aList: document.querySelectorAll("li.widget-toc-episode > a"),
    getAName: (dom) =>
      (
        dom.querySelector("span.widget-toc-episode-titleLabel") as HTMLElement
      ).innerText.trim(),
    sections: document.querySelectorAll("li.widget-toc-chapter > span"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => dom.querySelector(".widget-episodeBody"),
    contentPatch: (dom) => dom,
    language: "ja",
  });
