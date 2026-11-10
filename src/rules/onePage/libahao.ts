import { rm } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { sleep } from "../../lib/misc";
import { nextPageParse } from "../../lib/rule";
import { ChapterAbortError } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
import { mkRuleClass } from "./template";

const placeholderText =
  "亲爱的读者，本章节内容仍在更新中，暂时无法提供完整正文，请您耐心等待。您可以先返回目录阅读其他章节，或稍后再次打开本页查看更新。感谢您的理解与支持！";

const defaultPageRequestInterval = 5000;

let ruleInstance: BaseRuleClass | null = null;

let lastPageRequestTime = 0;

function getPageRequestInterval(): number {
  const sleepTime = ruleInstance?.sleepTime;
  if (
    typeof sleepTime === "number" &&
    Number.isFinite(sleepTime) &&
    sleepTime >= 0
  ) {
    return sleepTime;
  }
  return defaultPageRequestInterval;
}

async function getHtmlDOMWithInterval(
  input: RequestInfo,
  charset?: string,
  init?: RequestInit,
  test = (response: Response) => Promise.resolve(false)
) {
  if (lastPageRequestTime !== 0) {
    const waitTime =
      lastPageRequestTime + getPageRequestInterval() - Date.now();
    if (waitTime > 0) {
      await sleep(waitTime);
    }
  }
  try {
    return await getHtmlDOM(input, charset, init, test);
  } finally {
    lastPageRequestTime = Date.now();
  }
}

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
        getHtmlDomFunc: getHtmlDOMWithInterval,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
    language: "zh",
    concurrencyLimit: 1,
    sleepTime: defaultPageRequestInterval,
    overrideConstructor: (classThis) => {
      ruleInstance = classThis;
    },
  });