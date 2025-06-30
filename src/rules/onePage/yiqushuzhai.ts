import { mkRuleClass } from "./template";

export const yiqushuzhai = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("#info > p:nth-of-type(3) > a") as HTMLAnchorElement
      )?.innerText.trim() || "",
    introDom: document.querySelector("#intro > p") as HTMLParagraphElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector("#fmimg > img")?.getAttribute("src") || null,
    aList: document.querySelectorAll("dl > dd > a"),
    getContent: (doc) =>
      doc.querySelector("#content") as HTMLElement,
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    // nsfw: true,
  });
