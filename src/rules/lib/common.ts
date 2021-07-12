import { cleanDOM, getHtmlDOM, getImageAttachment } from "../../lib";
import {
  attachmentClass,
  Book,
  BookAdditionalMetadate,
  Chapter,
} from "../../main";
import { ruleClass } from "../../rules";

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
export function mkRuleClass1(optionis: mkRuleClassOptions1) {
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
  return class implements ruleClass {
    public imageMode: "naive" | "TM";
    public charset: string;

    public constructor() {
      this.imageMode = "TM";
      this.charset = document.charset;
    }

    public async bookParse() {
      const [
        introduction,
        introductionHTML,
        introCleanimages,
      ] = await introDomHandle(introDom, introDomPatch);

      const additionalMetadate: BookAdditionalMetadate = {};
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-").then(
          (coverClass) => {
            additionalMetadate.cover = coverClass;
          }
        );
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
