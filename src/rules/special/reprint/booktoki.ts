import { mkRuleClass } from "../../onePage/template";
import { rm } from "../../../lib/dom";
import { log } from "../../../log";

/**
 * booktoki (북토끼) — 韩国小说站
 *
 * 特点：
 * - Cloudflare 防护
 * - 章节内容需要通过 captcha 验证或登录
 * - 多域名变体 (booktokiNNN.com)
 *
 * 页面结构：
 * - 目录页: /novel/{bookId}
 *   - 书名: .view-detail .view-title 或 div[class*="view-title"]
 *   - 作者: .view-detail .info-box 内含作者名
 *   - 简介: .view-detail .view-intro
 *   - 章节列表: ul.list-body > li a
 * - 内容页: /novel/{chapterId}
 *   - 内容: article div 内的 p 元素
 * - Captcha 页: /bbs/captcha.php — 需手动验证
 */
export const booktoki = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: getBookname(),
    author: getAuthor(),
    introDom: getIntroDom(),
    introDomPatch: (dom: HTMLElement) => dom,
    coverUrl: getCoverUrl(),
    aList: getChapterList(),
    getContentFromUrl: async (
      chapterUrl: string,
      _chapterName: string | null,
      charset: string
    ) => {
      const { getHtmlDOM } = await import("../../../lib/http");
      const doc = await getHtmlDOM(chapterUrl, charset);

      // 检测是否为 captcha 页面
      if (isCaptchaPage(doc)) {
        log.warn(`[booktoki] 章节需要 captcha 验证: ${chapterUrl}`);
        return createCaptchaMessage(doc);
      }

      return getContentFromDoc(doc);
    },
    contentPatch: (content: HTMLElement) => {
      rm("script, style, iframe, ins", false, content);
      return content;
    },
    concurrencyLimit: 1,
    sleepTime: 1000,
    needLogin: false,
    nsfw: false,
    language: "ko",
  });

/** 获取书名 */
function getBookname(): string {
  // 真实 DOM: div.view-content > div.row > div.col-sm-8 > div.view-content > span > b
  // 或者: div.col-sm-8 内第一个 div.view-content 的文本
  const selectors = [
    "div.col-sm-8 div.view-content span b",
    "div.col-sm-8 div.view-content b",
    "div.col-sm-8 div.view-content:first-of-type",
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    const text = el?.textContent?.trim();
    if (text && text.length > 0 && text.length < 100) {
      return text;
    }
  }
  // fallback: document.title（格式 "书名 > 북토끼 - ..."）
  const titlePart = document.title.split(">")[0]?.trim();
  return titlePart || document.title.trim();
}

/** 获取作者 */
function getAuthor(): string {
  // 真实 DOM: div.view-content[style*="color: #666666"] 内含:
  //   <i class="fa fa-building-o"></i> 카카오
  //   <i class="fa fa-tag"></i> 판타지
  //   <i class="fa fa-user"></i> 뀰나무
  // 作者紧跟在 fa-user 图标后面
  const metaDiv = document.querySelector('div.view-content[style*="color: #666"], div.view-content[style*="color:#666"]');
  if (metaDiv) {
    const userIcon = metaDiv.querySelector('i.fa-user, i[class*="fa-user"]');
    if (userIcon) {
      // 作者文本在 fa-user 图标的下一个文本节点
      const nextSibling = userIcon.nextSibling;
      if (nextSibling?.textContent?.trim()) {
        return nextSibling.textContent.trim();
      }
      // 备用：图标后面紧跟的文本
      const parentText = userIcon.parentElement?.textContent?.trim() || "";
      const iconText = userIcon.textContent?.trim() || "";
      // 提取 fa-user 之后的部分
      const afterUser = parentText.split(iconText).pop()?.trim();
      if (afterUser && afterUser.length > 0 && afterUser.length < 30) {
        return afterUser;
      }
    }
    // 备用：取元数据文本，按 &nbsp; 分割，最后一个通常是作者
    const text = metaDiv.textContent?.trim() || "";
    const parts = text.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 1) {
      return parts[parts.length - 1];
    }
  }
  return "未知作者";
}

/** 获取简介 DOM */
function getIntroDom(): HTMLElement | undefined {
  // 真实 DOM: div.col-sm-8 > div.view-content:nth-of-type(3) > p
  // 简介在 col-sm-8 的第三个 view-content div 中
  const colSm8 = document.querySelector("div.col-sm-8");
  if (colSm8) {
    const viewContents = Array.from(colSm8.querySelectorAll(":scope > div.view-content"));
    // 第三个 view-content 包含简介 p
    for (const vc of viewContents) {
      const p = vc.querySelector(":scope > p");
      if (p?.textContent?.trim()) {
        return p as HTMLElement;
      }
    }
  }
  // 备用
  const selectors = [
    "div.view-content > p",
    ".view-intro",
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel) as HTMLElement;
    if (el?.textContent?.trim()) {
      return el;
    }
  }
  return undefined;
}

/** 获取封面 URL */
function getCoverUrl(): string | null {
  // 真实 DOM: div.view-img > img[src*="/data/file/novel/"]
  const selectors = [
    "div.view-img img[src]",
    "div.view-content1 img[src]",
    "div.col-sm-4 img[src]",
  ];
  for (const sel of selectors) {
    const img = document.querySelector(sel) as HTMLImageElement;
    if (img?.src && !img.src.includes("linkbn")) {
      return img.src;
    }
  }
  return null;
}

/** 获取章节列表 */
function getChapterList(): NodeListOf<Element> | Element[] {
  // 真实 DOM: .list-body > li 内含多个 div，章节链接在第二个 div 中
  // 但简单选择器 .list-body a 就能拿到所有章节链接
  const selectors = [
    ".list-body a[href*='/novel/']",
    "ul.list-body a",
  ];
  for (const sel of selectors) {
    const list = document.querySelectorAll(sel);
    if (list.length > 0) {
      return list;
    }
  }
  return [];
}

/** 检测是否为 captcha 页面 */
function isCaptchaPage(doc: Document): boolean {
  return (
    doc.URL.includes("captcha") ||
    !!doc.querySelector("form[action*='captcha']") ||
    !!doc.querySelector("h2")?.textContent?.includes("캡챠")
  );
}

/** 从文档中提取内容 */
function getContentFromDoc(doc: Document): HTMLElement | null {
  // 内容页：article 内的 div 包含多个 p 元素
  const selectors = [
    ".view-detail article div:last-child",
    ".view-content",
    "article .view-con",
    "article div[class]",
  ];

  for (const sel of selectors) {
    const el = doc.querySelector(sel) as HTMLElement;
    if (el?.querySelectorAll("p").length && el.querySelectorAll("p").length > 3) {
      return el;
    }
  }

  // 最后手段：找到包含大量段落的 div
  const divs = Array.from(doc.querySelectorAll("article div"));
  for (const div of divs) {
    const ps = div.querySelectorAll(":scope > p");
    if (ps.length > 5) {
      return div as HTMLElement;
    }
  }

  return null;
}

/** 从 captcha 页面提取提示信息并构建内容元素 */
function createCaptchaMessage(doc: Document): HTMLElement {
  const container = document.createElement("div");

  // 尝试从 captcha 页面提取原始提示文本
  const captchaForm = doc.querySelector("form");
  const captchaTips = captchaForm?.querySelectorAll("li");
  const tipTexts: string[] = [];

  if (captchaTips && captchaTips.length > 0) {
    captchaTips.forEach((li) => {
      const text = li.textContent?.trim();
      if (text) {
        tipTexts.push(text);
      }
    });
  }

  // 添加提示标题
  const title = document.createElement("p");
  title.style.fontWeight = "bold";
  title.style.fontSize = "1.2em";
  title.textContent = "⚠️ 캡챠 인증이 필요합니다 (需要 Captcha 验证)";
  container.appendChild(title);

  // 添加从页面提取的原始提示
  if (tipTexts.length > 0) {
    tipTexts.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      container.appendChild(p);
    });
  } else {
    // 默认提示
    const p1 = document.createElement("p");
    p1.textContent =
      "캡챠를 통과해야 컨텐츠를 확인할 수 있습니다.";
    container.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = "로그인 시 캡챠 인증은 생략됩니다.";
    container.appendChild(p2);
  }

  // 添加中文说明
  const divider = document.createElement("hr");
  container.appendChild(divider);

  const hint = document.createElement("p");
  hint.style.color = "#666";
  hint.textContent =
    "请在浏览器中登录 booktoki 或手动通过验证码后重新下载此章节。";
  container.appendChild(hint);

  return container;
}
