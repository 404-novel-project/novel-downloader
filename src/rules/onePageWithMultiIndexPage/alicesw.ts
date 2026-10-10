// 爱丽丝书屋（www.alicesw.com，diyquge 模板）：
// 1. 书页 /novel/*.html 有一个全屏年龄验证浮层 #age-gate-iframe，会挡住下载按钮，
//    已在 src/router/ui.ts 中通过 localStorage.ageVerified 预先跳过并移除。
// 2. 章节正文是服务端直接渲染在 div.read-content 里的，但阅读器 JS（global.js 的
//    getChapterInfo）在翻页/预加载时会用 AJAX 结果覆盖 .j_readContent，
//    所以仍用 iframe 等待页面自身脚本跑完再取内容。
// 3. 站点对 /book/ 章节路由有很严格的反爬频率限制，超限会返回「访问异常」提示页并
//    封锁 IP 一段时间，因此 concurrencyLimit / sleepTime 不宜调高。

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
