import { rms } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const biqugecc = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("#info > p") as HTMLParagraphElement
      )?.innerText.split("作    者：")[1] || "",
    introDom: document.querySelector("#intro > p") as HTMLParagraphElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)?.src || undefined,
    aList: document.querySelectorAll("#list > dl > dd > a"),
    getContent: (doc) => doc.querySelector("#content") as HTMLElement,
    contentPatch: (content) => {
      rms(["zw443sx"], content)
      return content;
    },
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
    // nsfw: true,
  });
