import { mkRuleClass } from "./template";

const getRenderedContent = async (chapterUrl: string) =>
  new Promise<HTMLElement | null>((resolve) => {
    const iframe = document.createElement("iframe");
    let settled = false;
    let intervalId: number | null = null;
    let timeoutId: number | null = null;

    const finish = (content: HTMLElement | null) => {
      if (settled) {
        return;
      }
      settled = true;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      iframe.remove();
      resolve(content);
    };

    iframe.style.display = "none";
    iframe.src = chapterUrl;
    document.body.appendChild(iframe);

    const checkContent = () => {
      const doc = iframe.contentDocument;
      const content = doc?.querySelector("div.read-content") as HTMLElement | null;
      if (!content) {
        return;
      }

      const text = content.innerText.trim();
      const wordCount = Number(
        doc?.querySelector(".j_chapterWordCut")?.textContent?.trim() || "0",
      );
      if (text.length > 50 || wordCount > 0) {
        finish(document.importNode(content, true) as HTMLElement);
      }
    };

    intervalId = window.setInterval(checkContent, 250);
    iframe.addEventListener("load", checkContent);
    timeoutId = window.setTimeout(() => finish(null), 15000);
  });

export const alicesw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("div.novel_title") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.box_info p:first-of-type > a:first-of-type") as HTMLAnchorElement
      )?.innerText.trim() || "",
    introDom: document.querySelector("div.jianjie") as HTMLDivElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.pic > img.fengmian2") as HTMLImageElement).src || null,
    getIndexUrls: () => {
      const chapterPageLink = document.querySelector(
        "div.book_newchap > div.tit a",
      ) as HTMLAnchorElement;
      if (!chapterPageLink) {
        return [];
      }

      return [chapterPageLink.href];
    },
    getAList: (doc) => doc.querySelectorAll("ul.mulu_list > li > a"),
    getContentFromUrl: (chapterUrl) => getRenderedContent(chapterUrl),
    contentPatch: (content) => content,
    concurrencyLimit: 3,
    sleepTime: 1000,
    language: "zh",
    nsfw: true,
  });
