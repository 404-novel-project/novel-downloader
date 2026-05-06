import { getFrameContentCondition } from "../../lib/http";
import { mkRuleClass } from "./template";

const hasRenderedContent = (doc: Document | null) => {
  const content = doc?.querySelector("div.read-content") as HTMLElement | null;
  if (!content) {
    return false;
  }

  const text = content.innerText.trim();
  const wordCount = Number(
    doc?.querySelector(".j_chapterWordCut")?.textContent?.trim() || "0",
  );
  return text.length > 50 || wordCount > 0;
};

export const alicesw = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.novel_title") as HTMLElement
    )?.innerText.trim(),
    author:
      (
        document.querySelector(
          "div.box_info p:first-of-type > a:first-of-type",
        ) as HTMLAnchorElement
      )?.innerText.trim() || "",
    introDom: document.querySelector("div.jianjie") as HTMLDivElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (document.querySelector("div.pic > img.fengmian2") as HTMLImageElement)
        .src || null,
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
    getContentFromUrl: async (chapterUrl) => {
      const doc = await getFrameContentCondition(chapterUrl, (frame) =>
        hasRenderedContent(frame.contentWindow?.document ?? null),
      ).catch(() => null);
      const content = doc?.querySelector(
        "div.read-content",
      ) as HTMLElement | null;
      return content
        ? (document.importNode(content, true) as HTMLElement)
        : null;
    },
    contentPatch: (content) => content,
    concurrencyLimit: 1,
    sleepTime: 1000,
    language: "zh",
    nsfw: true,
  });
