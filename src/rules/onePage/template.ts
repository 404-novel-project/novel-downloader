import { getImageAttachment } from "../../lib/attachments";
import { Options, cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { PublicConstructor } from "../../lib/misc";
import { getSectionName, introDomHandle } from "../../lib/rule";
import { log } from "../../log";
import { Chapter } from "../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../main/Book";
import { BaseRuleClass } from "../../rules";

interface MkRuleClassOptions {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom?: HTMLElement;
  introDomPatch?: (introDom: HTMLElement) => HTMLElement;
  coverUrl?: string | null;
  additionalMetadatePatch?: (
    additionalMetadate: BookAdditionalMetadate
  ) => BookAdditionalMetadate;
  aList: NodeListOf<Element> | Element[];
  getAName?: (aElem: Element) => string;
  sections?: NodeListOf<Element>;
  getSName?: (sElem: Element) => string;
  postHook?: (chapter: Chapter) => Chapter | void;
  getContentFromUrl?: (
    chapterUrl: string,
    chapterName: string | null,
    charset: string
  ) => Promise<HTMLElement | null>;
  getContent?: (doc: Document) => HTMLElement | null;
  contentPatch: (content: HTMLElement) => HTMLElement;
  concurrencyLimit?: number;
  needLogin?: boolean;
  cleanDomOptions?: Options;
}
export function mkRuleClass({
  bookUrl,
  bookname,
  author,
  introDom,
  introDomPatch,
  coverUrl,
  additionalMetadatePatch,
  aList,
  getAName,
  sections,
  getSName: _getSectionName,
  postHook,
  getContentFromUrl,
  getContent,
  contentPatch,
  concurrencyLimit,
  needLogin,
  cleanDomOptions,
}: MkRuleClassOptions): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      this.imageMode = "TM";
      if (concurrencyLimit) {
        this.concurrencyLimit = concurrencyLimit;
      }
      if (needLogin) {
        this.needLogin = needLogin;
      }
    }

    public async bookParse() {
      let introduction = null;
      let introductionHTML = null;
      if (introDom && introDomPatch) {
        [introduction, introductionHTML] = await introDomHandle(
          introDom,
          introDomPatch
        );
      }

      const additionalMetadate: BookAdditionalMetadate = {};
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }
      if (additionalMetadatePatch) {
        Object.assign(
          additionalMetadate,
          additionalMetadatePatch(additionalMetadate)
        );
      }

      const chapters: Chapter[] = [];
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionChapterNumber = 0;
      let sectionName = null;
      let hasSection = false;
      if (
        sections &&
        sections instanceof NodeList &&
        typeof _getSectionName === "function"
      ) {
        hasSection = true;
      }
      for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
        let chapterName;
        if (getAName) {
          chapterName = getAName(aElem);
        } else {
          chapterName = aElem.innerText;
        }
        const chapterUrl = aElem.href;
        if (hasSection && sections && _getSectionName) {
          const _sectionName = getSectionName(aElem, sections, _getSectionName);
          if (_sectionName !== sectionName) {
            sectionName = _sectionName;
            sectionNumber++;
            sectionChapterNumber = 0;
          }
        }
        chapterNumber++;
        sectionChapterNumber++;
        const isVIP = false;
        const isPaid = false;
        let chapter: Chapter | void = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP,
          isPaid,
          sectionName,
          sectionNumber: hasSection ? sectionNumber : null,
          sectionChapterNumber: hasSection ? sectionChapterNumber : null,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: { bookname },
        });
        if (typeof postHook === "function") {
          chapter = postHook(chapter);
        }
        if (chapter) {
          chapters.push(chapter);
        }
      }

      const book = new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters,
      });
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
      let content;
      if (getContentFromUrl !== undefined) {
        content = await getContentFromUrl(chapterUrl, chapterName, charset);
      } else if (getContent !== undefined) {
        const doc = await getHtmlDOM(chapterUrl, charset);
        content = getContent(doc);
      }
      if (content) {
        content = contentPatch(content);
        const { dom, text, images } = await cleanDOM(
          content,
          "TM",
          cleanDomOptions
        );
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      }
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }
  };
}
