import { getImageAttachment } from "../../lib/attachments";
import { cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { PublicConstructor } from "../../lib/misc";
import { log } from "../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../main";
import { BaseRuleClass } from "../../rules";
import { introDomHandle } from "../lib/common";

interface MkRuleClassOptions1 {
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
  optionis: MkRuleClassOptions1
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
        const chapterName = (aElem as HTMLAnchorElement).innerText;
        const chapterUrl = (aElem as HTMLAnchorElement).href;
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
          { bookname }
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
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName,
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
