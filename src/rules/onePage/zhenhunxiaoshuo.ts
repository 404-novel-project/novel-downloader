import { mkRuleClass } from "./template";

export const zhenhunxiaoshuo = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.focusbox-text > p") as HTMLParagraphElement
      )?.innerText
        .split("\n")[0]
        ?.split("作者：")[1] || "",
    introDom: (() => {
      const introElement = document.createElement("p");

      const introParagraph = document.querySelector(
        "div.focusbox-text > p",
      ) as HTMLParagraphElement;
      if (introParagraph) {
        // always after <br> tag
        const introText = introParagraph.innerText.split("\n")[1] || "";
        introElement.textContent = introText;
      }

      return introElement;
    })(),
    introDomPatch: (introDom) => introDom,
    coverUrl: null,
    aList: document.querySelectorAll("article > a"),
    getContent: (doc) =>
      doc.querySelector("article.article-content") as HTMLElement,
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    // nsfw: true,
  });
