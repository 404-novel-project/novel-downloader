import { mkRuleClass } from "./template";

export const fantasybooks = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".works-intro-title > strong") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".works-intro-digi > span:nth-child(1) > em:nth-child(1)"
      ) as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector(".works-intro-short") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: (document.querySelector(".works-cover > img") as HTMLImageElement)
      .src,
    aList: document.querySelectorAll(
      ".works-chapter-list .works-chapter-item > a"
    ),
    sections: document.querySelectorAll(".vloume"),
    getSName: (sElem) => (sElem as HTMLDivElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#content_cust") as HTMLElement,
    contentPatch: (content) => {
      Array.from(content.children)
        .filter(
          (node) => node.nodeName === "SPAN" && node.childNodes.length > 15
        )
        .map((span) => {
          const div = document.createElement("div");
          div.innerHTML = span.innerHTML;
          Array.from(div.querySelectorAll("p"))
            .filter(
              (node) =>
                node.childElementCount === 1 &&
                node.children[0].nodeName === "BR"
            )
            .forEach((pbrp) => pbrp.remove());
          span.replaceWith(div);
        });
      return content;
    },
    concurrencyLimit: 3,
    nsfw: true,
  });
