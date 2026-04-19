import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";

export const uukanshuCc = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h1") as HTMLElement)?.innerText.trim(),
    author: (
      document.querySelector('a[href*="authorarticle"]') as HTMLElement
    )?.innerText.trim(),
    introDom: (() => {
      const h1 = document.querySelector("h1");
      const parent = h1?.parentElement;
      if (parent) {
        const ps = Array.from(parent.querySelectorAll("p"));
        // The intro paragraph is the one with longer text (not the latest chapter / update time)
        for (const p of ps) {
          const text = (p as HTMLElement).innerText?.trim() ?? "";
          if (
            text.length > 50 &&
            !text.startsWith("最新章節") &&
            !text.startsWith("更新時間")
          ) {
            return p as HTMLElement;
          }
        }
      }
      return undefined;
    })(),
    introDomPatch: (dom) => dom,
    coverUrl: (() => {
      const img = document.querySelector(
        'img[alt]'
      ) as HTMLImageElement | null;
      return img?.src ?? null;
    })(),
    aList: document.querySelectorAll<HTMLAnchorElement>(
      'dd > a[href*="/book/"]'
    ),
    getContent: (doc) =>
      doc.querySelector(".readcotent") as HTMLElement | null,
    contentPatch: (content) => {
      rm("iframe", true, content);
      rm("ins", true, content);
      rm(".ad_content", true, content);
      return content;
    },
    language: "zh-tw",
  });
