import { cleanDOM } from "../../../lib/cleanDOM";
import { getFrameContentConditionWithWindow, getHtmlDOM } from "../../../lib/http";
import { log } from "../../../log";
import { ExpectError } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

export class Sosadfun extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.origin + document.location.pathname;

    const bookname = (
      document.querySelector(".font-1") as HTMLElement
    ).innerText.trim();
    const authorDom = document.querySelector(
      "div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
    ) as HTMLElement;
    let author;
    if (authorDom) {
      author = authorDom.innerText.trim();
    } else {
      author = "匿名咸鱼";
    }

    const needLogin = () => {
      const mainDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      ) as HTMLDivElement;
      return mainDom.innerText.trim() === "主楼隐藏，请登录后查看";
    };

    const additionalMetadate: BookAdditionalMetadate = {};
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.h5:nth-child(1) > div:nth-child(3) > a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    let introDom;
    if (needLogin()) {
      alert("本小说需要登录后浏览！");
      throw new ExpectError("本小说需要登录后浏览！");
    } else {
      introDom = document.createElement("div");
      const shortIntroDom = document.querySelector("div.article-title div.h5");
      const longIntroDom = document.querySelector(
        ".col-xs-12 > .main-text.no-selection"
      );
      if (shortIntroDom) {
        const pElem = document.createElement("p");
        pElem.innerText = (shortIntroDom as HTMLDivElement).innerText;
        introDom.appendChild(pElem);
      }
      if (longIntroDom) {
        for (const elem of Array.from(
          (longIntroDom.cloneNode(true) as HTMLDivElement).children
        )) {
          introDom.appendChild(elem);
        }
      }
    }
    if (introDom === null) {
      introduction = null;
      introductionHTML = null;
    } else {
      const {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = await cleanDOM(introDom, "TM");
      introduction = introCleantext;
      introductionHTML = introCleanDom;
      if (introCleanimages) {
        additionalMetadate.attachments = [...introCleanimages];
      }
    }

    const chapters: Chapter[] = [];
    const aList = document.querySelectorAll(
      ".table > tbody:nth-child(2) > tr > th:nth-child(1) > a"
    );
    let chapterNumber = 0;
    for (const a of Array.from(aList)) {
      chapterNumber++;
      const chapterName = (a as HTMLAnchorElement).innerText.trim();
      const chapterUrl = (a as HTMLAnchorElement).href;
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {},
      });
      chapters.push(chapter);
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    const contentSelector = ".main-text.no-selection > span[id^=full]";
    const authorSaySelector = ".main-text.no-selection > .grayout";

    // 优先用 frame 加载 JS 渲染后的页面；失败再回退到静态抓取
    let doc: Document | null = null;
    let win: Window | null = null;
    let frame: HTMLIFrameElement | null = null;
    try {
      frame = await getFrameContentConditionWithWindow(chapterUrl, (f) => {
        const d = f.contentWindow?.document ?? null;
        return !!d?.querySelector(contentSelector);
      });
      doc = frame?.contentWindow?.document ?? null;
      win = frame?.contentWindow ?? null;
    } catch (e) {
      log.error(`[sosadfun] frame 加载失败，回退到 getHtmlDOM: ${e}`);
    }
    const usedFrame = !!doc;
    if (!doc) {
      doc = await getHtmlDOM(chapterUrl, charset);
    }

    try {
      if (!doc) {
        return {
          chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }

      const nameEl = doc.querySelector("strong.h3") as HTMLElement | null;
      if (nameEl) {
        chapterName = nameEl.innerText.trim();
      }

      const _content = doc.querySelector(contentSelector) as HTMLElement | null;
      const _authorSay = doc.querySelector(authorSaySelector);

      if (!_content) {
        return {
          chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }

      // 可见性过滤必须在 frame 仍挂载、文档处于实时渲染状态时进行
      // （getComputedStyle 与几何读取都依赖实时渲染）。工具默认把 iframe 设为
      // 1x1，几何尺寸不可靠，因此先放大到离屏的真实视口，待重排后再判定，
      // 最后在 finally 移除 frame。
      if (usedFrame && win && frame) {
        expandFrameForLayout(frame);
        await new Promise((r) => setTimeout(r, 100));
        removeInvisibleElements(_content, win);
        if (_authorSay) {
          removeInvisibleElements(_authorSay as Element, win);
        }
      }

      // 通过 innerHTML 将内容重解析到主文档上下文：frame 文档的元素原型链属于
      // frame 窗口，append 到主文档也不会改变，cleanDOM 内的 instanceof HTMLElement
      // 校验会全部失败。用主文档重新序列化/解析可规避该跨 realm 问题。
      const content = document.createElement("div");
      content.innerHTML = _content.innerHTML;

      // eslint-disable-next-line prefer-const
      let { dom, text, images } = await cleanDOM(content, "TM");

      if (_authorSay) {
        const authorSayMain = document.createElement("div");
        authorSayMain.innerHTML = (_authorSay as HTMLElement).innerHTML;
        const {
          dom: authorSayDom,
          text: authorySayText,
          images: authorSayImages,
        } = await cleanDOM(authorSayMain, "TM");

        const hrElem = document.createElement("hr");
        const authorSayDiv = document.createElement("div");
        authorSayDiv.className = "authorSay";
        for (const elem of Array.from(
          (authorSayDom.cloneNode(true) as HTMLElement).children
        )) {
          authorSayDiv.appendChild(elem);
        }

        content.appendChild(hrElem);
        content.appendChild(authorSayDiv);
        dom.appendChild(hrElem);
        dom.appendChild(authorSayDiv);

        text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorySayText;

        authorSayImages.forEach((aImage) => images.push(aImage));
      }

      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    } finally {
      frame?.remove();
    }
  }
}

// 实际渲染宽/高小于此阈值（px）视为不可见
const SIZE_THRESHOLD = 1;

// 工具默认把 iframe 设为 1x1，在此尺寸下读取宽高不可靠；
// 放大到离屏的真实视口，以便 getBoundingClientRect 反映实际渲染尺寸。
function expandFrameForLayout(frame: HTMLIFrameElement) {
  frame.style.position = "absolute";
  frame.style.left = "-99999px";
  frame.style.top = "0";
  frame.style.border = "0";
  frame.width = "1280";
  frame.height = "800";
}

function hasText(el: Element): boolean {
  const t = el.textContent;
  return !!t && t.trim().length > 0;
}

// 移除区域内容中实际不可见的元素（覆盖所有标签，不限于 <p>）。
// 判定依据：计算后样式（display/visibility/透明度/font-size:0/透明文字）
// 以及实际渲染宽高过小。
function removeInvisibleElements(root: Element, win: Window) {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    if (!el.isConnected) {
      // 已被隐藏的祖先连带移除
      continue;
    }
    const st = win.getComputedStyle(el);
    if (isInvisibleElement(el as HTMLElement, st)) {
      el.remove();
    }
  }
}

function isInvisibleElement(
  el: HTMLElement,
  st: CSSStyleDeclaration
): boolean {
  if (
    st.display === "none" ||
    st.visibility === "hidden" ||
    st.visibility === "collapse"
  ) {
    return true;
  }
  // 透明：opacity 为 0
  if (parseFloat(st.opacity) === 0) {
    return true;
  }
  // 透明：文字颜色 alpha 为 0（color: transparent / rgba(...,0)）
  const m = st.color.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(",").map((s) => s.trim());
    if (parts.length === 4 && parseFloat(parts[3]) === 0) {
      return true;
    }
  }
  // 文字本身不可见：font-size: 0
  if (parseFloat(st.fontSize) === 0) {
    return true;
  }
  // 实际渲染尺寸过小。仅对含文字的元素判定，避免误删空行占位（如空 <p>）。
  if (hasText(el)) {
    const rect = el.getBoundingClientRect();
    if (rect.width < SIZE_THRESHOLD || rect.height < SIZE_THRESHOLD) {
      return true;
    }
  }
  return false;
}
