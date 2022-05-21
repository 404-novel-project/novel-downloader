import { log } from "../log";
import { AttachmentClass } from "../main/Attachment";
import { Chapter } from "../main/Chapter";
import { ChapterParseObject } from "../rules";
import { cleanDOM } from "./cleanDOM";
import { getHtmlDOM } from "./http";

export async function introDomHandle(
  introDom: (Element | HTMLElement) | null,
  domPatch?: (introDom: HTMLElement) => HTMLElement
): Promise<[string | null, HTMLElement | null, AttachmentClass[] | null]> {
  if (introDom === null) {
    return [null, null, null];
  } else {
    if (domPatch) {
      introDom = domPatch(introDom.cloneNode(true) as HTMLElement);
    }
    const {
      dom: introCleanDom,
      text: introCleantext,
      images: introCleanimages,
    } = await cleanDOM(introDom, "TM");
    return [introCleantext, introCleanDom, introCleanimages];
  }
}

interface NextPageParseOptions {
  chapterName: string | null;
  chapterUrl: string;
  charset: string;
  selector: string;
  contentPatch: (_content: HTMLElement, doc: Document) => HTMLElement;
  getNextPage: (doc: Document) => string;
  continueCondition: (_content: HTMLElement, nextLink: string) => boolean;
  enableCleanDOM?: boolean;
}

export async function nextPageParse({
  chapterName,
  chapterUrl,
  charset,
  selector,
  contentPatch,
  getNextPage,
  continueCondition,
  enableCleanDOM,
}: NextPageParseOptions): Promise<ChapterParseObject> {
  log.debug(`[Chapter]请求 ${chapterUrl}`);
  let nowUrl = chapterUrl;
  let doc = await getHtmlDOM(chapterUrl, charset);
  const content = document.createElement("div");

  let flag = false;
  do {
    let _content = doc.querySelector(selector) as HTMLElement;

    const nextLink = getNextPage(doc);
    if (continueCondition(_content, nextLink)) {
      if (nextLink !== nowUrl) {
        flag = true;
      } else {
        log.error("网站页面出错，URL： " + nowUrl);
        flag = false;
      }
    } else {
      flag = false;
    }

    _content = contentPatch(_content, doc);
    for (const _c of Array.from(_content.childNodes)) {
      content.appendChild(_c.cloneNode(true));
    }

    if (flag) {
      log.debug(`[Chapter]请求 ${nextLink}`);
      nowUrl = nextLink;
      doc = await getHtmlDOM(nextLink, charset);
    }
  } while (flag);

  let dom, text, images;
  if (enableCleanDOM || enableCleanDOM === undefined) {
    const obj = await cleanDOM(content, "TM");
    dom = obj.dom;
    text = obj.text;
    images = obj.images;
  } else {
    dom = null;
    text = null;
    images = null;
  }
  return {
    chapterName,
    contentRaw: content,
    contentText: text,
    contentHTML: dom,
    contentImages: images,
    additionalMetadate: null,
  };
}

export function getSectionName(
  chapterElement: Element,
  sections: NodeListOf<Element>,
  getName: (sElem: Element) => string
) {
  const _sections = Array.from(sections);
  let sectionName = null;
  for (const sElem of _sections) {
    const position = chapterElement.compareDocumentPosition(sElem);
    if (position & Node.DOCUMENT_POSITION_DISCONNECTED) {
      return null;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      sectionName = getName(sElem);
    }
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      break;
    }
  }
  return sectionName;
}

export function centerDetct(element: Element): [boolean, Element, number] {
  const docEl = document.documentElement;
  const bodyEl = document.body;
  const vw = Math.min(docEl.clientWidth, window.innerWidth);
  const vh = Math.min(docEl.clientHeight, window.innerHeight);
  const tolx = vw * 0.15;
  const toly = Math.min(bodyEl.scrollHeight * 0.1, vh * 0.3);

  const rect = element.getBoundingClientRect();
  const distanceToTop = window.scrollY + rect.top;
  const distanceToBottom =
    bodyEl.scrollHeight - distanceToTop - element.scrollHeight;

  const distanceToRight = vw - rect.right;
  // const distanYmin = Math.min(distanceToTop, distanceToBottom);
  const percentY = element.scrollHeight / bodyEl.scrollHeight;
  if (
    rect.left < tolx ||
    distanceToRight < tolx ||
    distanceToTop < toly ||
    distanceToBottom < toly
  ) {
    return [false, element, percentY];
  }
  return [true, element, percentY];
}

export function reIndex(chapters: Chapter[]) {
  chapters = chapters.sort(
    (a: Chapter, b: Chapter) => a.chapterNumber - b.chapterNumber
  );
  let i = 0;
  let sectionName;
  let s = 0;
  let si = 0;
  for (const chapter of chapters) {
    i++;
    chapter.chapterNumber = i;

    if (chapter.sectionName) {
      if (chapter.sectionName !== sectionName) {
        sectionName = chapter.sectionName;
        s++;
        si = 0;
      }
      si++;
      chapter.sectionNumber = s;
      chapter.sectionChapterNumber = si;
    }
  }
  return chapters;
}

export function deDuplicate(chapters: Chapter[]) {
  interface reduceObj {
    [index: string]: Chapter | Chapter[];
  }

  const obj = chapters.reduce((obj, cur) => {
    const url = cur.chapterUrl;
    if (obj[url] === undefined) {
      obj[url] = cur;
    } else if (Array.isArray(obj[url])) {
      (obj[url] as Chapter[]).push(cur);
    } else {
      obj[url] = [obj[url] as Chapter, cur];
    }
    return obj;
  }, {} as reduceObj);

  const reducer = (out: Chapter[], cur: Chapter | Chapter[]) => {
    if (Array.isArray(cur)) {
      const url = cur[0].chapterUrl;
      if (url === "") {
        out.push(...cur);
      } else {
        out.push(
          cur.sort((a, b) => a.chapterNumber - b.chapterNumber).slice(-1)[0]
        );
      }
    } else {
      out.push(cur);
    }
    return out;
  };
  const results = Object.values(obj).reduce(reducer, []);
  reIndex(results);
  return results;
}
