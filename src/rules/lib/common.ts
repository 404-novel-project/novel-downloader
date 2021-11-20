import { cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { log } from "../../log";
import { AttachmentClass } from "../../main";
import { ChapterParseObject } from "../../rules";

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
export async function nextPageParse(
  options: NextPageParseOptions
): Promise<ChapterParseObject> {
  const {
    chapterName,
    chapterUrl,
    charset,
    selector,
    contentPatch,
    getNextPage,
    continueCondition,
    enableCleanDOM,
  } = options;

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
