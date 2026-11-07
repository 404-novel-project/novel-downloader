import { rm, rm2, rms } from "../../lib/dom";
import { log } from "../../log";
import { mkRuleClass } from "./template";

/**
 * bookkor (북코) — 韩国转载小说站
 *
 * 站点特性：
 * - Laravel + Inertia(Vue)，目录与正文都服务端渲染在首屏 HTML 里，无需等 JS 跑完。
 * - 多域名镜像 `NNN.bookkor.com`，主域 `bookkor.com` / `www.bookkor.com` 只是占位页，
 *   旧编号域名会 301 到当前主域，所以 header.json 用 `@include` 正则匹配整个子域。
 * - **反爬**：请求不带 `Sec-CH-UA` 头时，服务端会把正文整段替换成随机韩文音节，并插入
 *   「구글에 "북코"를 검색하세요」水印段落（DOM 里仍是合法 HTML，肉眼看不出来）。
 *   浏览器发出的请求（包括规则里的 fetch）都带这个头，所以不受影响；
 *   但用 curl 之类工具抓取验证时必须手动补 `Sec-CH-UA`，否则会以为站点坏了。
 * - 目录首屏只渲染 10 话，其余要靠「이전 회차 더 보기」懒加载；必须显式带
 *   `?order=asc&page=N` 才能拿到每页 100 话的完整分页，且顺序为第 1 话在前。
 *
 * 页面结构：
 * - 书页 `/{slug}`
 *   - 书名: `h1`
 *   - 作者: 书名下方信息行里的 `span.inline-flex.items-center`；同一行里评分项带 `gap-1`、
 *     「소설」角标带 `rounded-sm`，都要排除（部分转载作品没有作者，取到空串）
 *   - 简介: `p.line-clamp-4`（CSS 截断只是视觉，DOM 里是全文）
 *   - 封面: `div[style*="aspect-ratio"] img`
 *   - 目录: `ul.ep-chunk > li > a.ep-a`
 *   - 分页导航: `nav[aria-label="회차 목록"]`，总页数在 Inertia props.epPages.last
 * - 章节页 `/{seriesSlug}/{seriesId}-ep-{episodeId}`
 *   - 正文: `article.novel-reader` 内的 `p`
 *   - 抓不到正文时站点自己会渲染「본문 미확보」，此时 article 不存在，getContent 返回 null
 */

interface BookkorPageProps {
  epPages?: { current?: number | null; last?: number; size?: number };
}

/** Inertia 把整页 props 挂在 <script data-page="app" type="application/json"> 上 */
function getInertiaProps(doc: Document): BookkorPageProps | null {
  const el = doc.querySelector<HTMLScriptElement>('script[data-page="app"]');
  if (!el?.textContent) {
    return null;
  }
  try {
    return (
      (JSON.parse(el.textContent) as { props?: BookkorPageProps }).props ?? null
    );
  } catch (error) {
    log.error(error);
    return null;
  }
}

/** 目录总页数；取不到 Inertia props 时退回读分页导航 */
function getIndexPageCount(doc: Document): number {
  const last = getInertiaProps(doc)?.epPages?.last;
  if (typeof last === "number" && last > 0) {
    return last;
  }
  const pages = Array.from(
    doc.querySelectorAll<HTMLAnchorElement>(
      'nav[aria-label="회차 목록"] a[href*="page="]',
    ),
  )
    .map((a) => Number(new URL(a.href).searchParams.get("page")))
    .filter((page) => Number.isFinite(page) && page > 0);
  return Math.max(1, ...pages);
}

export const bookkor = () => {
  const bookname =
    (document.querySelector("h1") as HTMLElement | null)?.innerText.trim() ??
    "";

  const author =
    (
      document.querySelector(
        "div.mt-2.flex.flex-wrap.items-center > span.inline-flex.items-center:not(.rounded-sm):not(.gap-1)",
      ) as HTMLElement | null
    )?.innerText.trim() ?? "";

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname,
    author,
    introDom: document.querySelector("p.line-clamp-4") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (
        document.querySelector(
          'div[style*="aspect-ratio"] img',
        ) as HTMLImageElement | null
      )?.src ?? null,
    getIndexUrls: () => {
      const urls: string[] = [];
      for (let page = 1; page <= getIndexPageCount(document); page++) {
        const url = new URL(document.location.href);
        url.search = "";
        url.searchParams.set("order", "asc");
        url.searchParams.set("page", String(page));
        urls.push(url.href);
      }
      return urls;
    },
    getAList: (doc) => doc.querySelectorAll("ul.ep-chunk a.ep-a"),
    getContent: (doc) => doc.querySelector("article.novel-reader"),
    contentPatch: (content) => {
      rm("script, style, iframe, ins", true, content);
      // 反爬降级响应里插进来的水印段落
      rm2([/원문은 구글에/, /^구글에 "북코"를 검색하세요/], content);
      rms([/\u00a0/g], content);
      return content;
    },
    concurrencyLimit: 2,
    sleepTime: 500,
    language: "ko",
  });
};
