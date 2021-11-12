import { cleanDOM } from "../../lib/cleanDOM";
import { getImageAttachment } from "../../lib/attachments";
import { getHtmlDOM } from "../../lib/http";
import {
  attachmentClass,
  Book,
  BookAdditionalMetadate,
  Chapter,
} from "../../main";
import { BaseRuleClass } from "../../rules";
import { log } from "../../log";
import { PublicConstructor } from "../../lib/misc";

export async function introDomHandle(
  introDom: (Element | HTMLElement) | null,
  domPatch: ((introDom: HTMLElement) => HTMLElement) | undefined = undefined
): Promise<[string | null, HTMLElement | null, attachmentClass[] | null]> {
  if (introDom === null) {
    return [null, null, null];
  } else {
    if (domPatch) {
      introDom = domPatch(introDom.cloneNode(true) as HTMLElement);
    }
    let {
      dom: introCleanDom,
      text: introCleantext,
      images: introCleanimages,
    } = await cleanDOM(introDom, "TM");
    return [introCleantext, introCleanDom, introCleanimages];
  }
}

export async function nextPageParse(
  chapterName: string | null,
  chapterUrl: string,
  charset: string,
  selector: string,
  contentPatch: (_content: HTMLElement, doc: Document) => HTMLElement,
  getNextPage: (doc: Document) => string,
  continueCondition: (_content: HTMLElement, nextLink: string) => boolean
) {
  log.debug(`[Chapter]请求 ${chapterUrl}`);
  let nowUrl = chapterUrl;
  let doc = await getHtmlDOM(chapterUrl, charset);
  const content = document.createElement("div");

  let flag = false;
  do {
    let _content = <HTMLElement>doc.querySelector(selector);

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

  let { dom, text, images } = await cleanDOM(content, "TM");
  return {
    chapterName: chapterName,
    contentRaw: content,
    contentText: text,
    contentHTML: dom,
    contentImages: images,
    additionalMetadate: null,
  };
}
interface mkRuleClassOptions1 {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom: HTMLElement;
  introDomPatch: (introDom: HTMLElement) => HTMLElement;
  coverUrl: string | null;
  cos: NodeListOf<Element>;
  getContent: (doc: Document) => HTMLElement;
  contentPatch: (content: HTMLElement) => HTMLElement;
}
export function mkRuleClass1(
  optionis: mkRuleClassOptions1
): PublicConstructor<BaseRuleClass> {
  const {
    bookUrl,
    bookname,
    author,
    introDom,
    introDomPatch,
    coverUrl,
    cos,
    getContent,
    contentPatch,
  } = optionis;
  return class extends BaseRuleClass {
    public constructor() {
      super();
      this.imageMode = "TM";
      this.charset = document.charset;
    }

    public async bookParse() {
      const [introduction, introductionHTML, introCleanimages] =
        await introDomHandle(introDom, introDomPatch);

      const additionalMetadate: BookAdditionalMetadate = {};
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }

      const chapters: Chapter[] = [];
      let chapterNumber = 0;
      for (const aElem of Array.from(cos)) {
        chapterNumber++;
        const chapterName = (<HTMLAnchorElement>aElem).innerText;
        const chapterUrl = (<HTMLAnchorElement>aElem).href;
        const isVIP = false;
        const isPaid = false;
        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP,
          isPaid,
          null,
          null,
          null,
          this.chapterParse,
          this.charset,
          { bookname: bookname }
        );
        chapters.push(chapter);
      }

      const book = new Book(
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters
      );
      return book;
    }

    public async chapterParse(
      chapterUrl: string,
      chapterName: string | null,
      isVIP: boolean,
      isPaid: boolean,
      charset: string,
      options: object
    ) {
      const doc = await getHtmlDOM(chapterUrl, charset);
      let content = getContent(doc);
      if (content) {
        content = contentPatch(content);
        let { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName: chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName: chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }
    }
  };
}
