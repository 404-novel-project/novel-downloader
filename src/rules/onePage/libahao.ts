import { rm } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { ChapterAbortError } from "../../main/Chapter";
import { mkRuleClass } from "./template";

const placeholderText =
  "亲爱的读者，本章节内容仍在更新中，暂时无法提供完整正文，请您耐心等待。您可以先返回目录阅读其他章节，或稍后再次打开本页查看更新。感谢您的理解与支持！";

export const libahao = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!
        .content
    ).trim(),
    author: (
      document.querySelector<HTMLMetaElement>(
        'meta[property="og:novel:author"]'
      )!
        .content
    ).trim(),
    introDom: (() => {
      const introDom = document.createElement("div");
      const introContent = document
        .querySelector<HTMLMetaElement>('meta[property="og:description"]')
        ?.getAttribute("content");
      if (introContent) {
        introDom.textContent = introContent;
      }
      return introDom;
    })(),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector<HTMLImageElement>(".book-info > img")
      ?.src,
    aList: document.querySelectorAll(".all-chapters li a"),
    async getContentFromUrl(chapterUrl, chapterName, charset) {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: ".chapter-content",
        contentPatch: (content) => {
          if (!content) {
            return document.createElement("div");
          }
          if (
            content.querySelector(".chapter-updating") ||
            Array.from(content.querySelectorAll("p")).some((p) =>
              (p.textContent ?? "").includes(placeholderText)
            )
          ) {
            throw new ChapterAbortError("正文为占位提示，已跳过");
          }
          rm("a", false, content);
          rm("b", false, content);
          return content;
        },
        getNextPage: (doc) => {
          const content = doc.querySelector(".chapter-content");
          if (!content) {
            return "";
          }
          const nextPageLink = Array.from(
            content.querySelectorAll<HTMLAnchorElement>("a")
          ).find((a) => a.textContent?.includes("本章未完"));
          return nextPageLink?.href ?? "";
        },
        continueCondition: (_content, nextLink) => nextLink !== "",
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
    language: "zh",
    concurrencyLimit: 1,
    sleepTime: 3000,
    maxSleepTime: 6000,
  });