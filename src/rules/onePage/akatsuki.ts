import { convertBr } from "../../lib/cleanDOM";
import { mkRuleClass } from "./template";

export const akatsuki = () =>
  mkRuleClass({
    bookUrl: document.location.origin + document.location.pathname,
    bookname: (
      document.querySelector("#LookNovel") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".box.story > h3.font-bb:nth-last-of-type(1) > a"
      ) as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(
      ".box.story.body-normal > .body-normal > div"
    ) as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl:
      (document.querySelector("div.font-bb > center > img") as HTMLImageElement)
        ?.src ?? null,
    aList: document.querySelectorAll("table.list td > a"),
    sections: document.querySelectorAll("table.list td[colspan] > b"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => {
      doc.querySelectorAll("center > img").forEach((img) => {
        const parent = img.parentElement;
        parent?.replaceWith(img);
      });

      const contentRaw = document.createElement("div");
      const nodes = Array.from(
        doc.querySelectorAll(".body-novel, .body-novel + hr")
      );
      if (nodes.length > 1) {
        const previous = nodes[0].previousElementSibling;
        if (previous?.nodeName.toLowerCase() === "div") {
          nodes.unshift(previous);
        }
      }

      for (const node of nodes) {
        if (node instanceof HTMLDivElement && node.className === "body-novel") {
          contentRaw.appendChild(convertBr(node, true));
        } else {
          contentRaw.appendChild(node);
        }
      }
      return contentRaw;
    },
    contentPatch: (content) => content,
    concurrencyLimit: 2,
    language: "ja",
  });
