import { insertBrBeforeText } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const novelup = () => {
  const bookUrl = document.location.origin + document.location.pathname;
  return mkRuleClass({
    bookUrl,
    bookname: (
      document.querySelector(
        "#section_episode_info_table > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)"
      ) as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "#section_episode_info_table > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)"
      ) as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector(".novel_synopsis") as HTMLElement,
    introDomPatch: (dom) => {
      Array.from(dom.querySelectorAll("p")).forEach((p) => {
        const div = document.createElement("div");
        div.innerHTML = p.innerHTML.split("\n").join("<br>");

        insertBrBeforeText(div);

        p.replaceWith(div);
      });
      return dom;
    },
    coverUrl:
      (document.querySelector(".novel_cover img") as HTMLImageElement)?.src ??
      null,
    getIndexPages: async () => {
      const indexPages: Document[] = [];

      let nextUrl = bookUrl;
      do {
        const doc = await getHtmlDOM(nextUrl);
        indexPages.push(doc);
        nextUrl =
          (
            doc.querySelector(
              "div.move_set:nth-child(4) > div:nth-child(3) > a"
            ) as HTMLAnchorElement
          )?.href ?? null;
      } while (nextUrl);
      return indexPages;
    },
    getAList: (doc) =>
      doc.querySelectorAll(".episode_list li > .episode_link > a"),
    getSections: (doc) => doc.querySelectorAll(".episode_list li.chapter"),
    getSName: (sElem) =>
      (sElem as HTMLElement).querySelector("cite")?.innerText.trim() ?? "",
    getContent: (doc) => doc.querySelector(".content"),
    contentPatch: (content) => {
      Array.from(content.querySelectorAll("p")).forEach((p) => {
        const div = document.createElement("div");
        div.innerHTML = p.innerHTML.split("\n").join("<br>");

        insertBrBeforeText(div);

        p.replaceWith(div);
      });
      return content;
    },
    language: "jp",
  });
};
