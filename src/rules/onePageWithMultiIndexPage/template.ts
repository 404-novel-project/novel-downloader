import { getImageAttachment } from "../../lib/attachments";
import { Options, cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM, getHtmlDomWithRetry } from "../../lib/http";
import { PublicConstructor, concurrencyRun } from "../../lib/misc";
import { getSectionName, introDomHandle } from "../../lib/rule";
import { log } from "../../log";
import { Chapter } from "../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../main/Book";
import { BaseRuleClass } from "../../rules";
import { Status } from "../../main/main";

interface MkRuleClassOptions {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom: HTMLElement;
  introDomPatch: (introDom: HTMLElement) => HTMLElement;
  coverUrl: string | null;
  getIndexUrls?: () => string[] | Promise<string[]>;
  getIndexPages?: () => Promise<(Document | null)[]>;
  getAList: (doc: Document) => NodeListOf<Element>;
  getAName?: (aElem: Element) => string;
  getIsVIP?: (aElem: Element) => {
    isVIP: boolean;
    isPaid: boolean;
  };
  getSections?: (doc: Document) => NodeListOf<Element>;
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
  nsfw?: boolean;
  cleanDomOptions?: Options;
  overrideConstructor?: (classThis: BaseRuleClass) => any;
}
export function mkRuleClass({
  bookUrl,
  bookname,
  author,
  introDom,
  introDomPatch,
  coverUrl,
  getIndexUrls,
  getIndexPages,
  getAList,
  getAName,
  getIsVIP,
  getSections,
  getSName,
  postHook,
  getContentFromUrl,
  getContent,
  contentPatch,
  concurrencyLimit,
  needLogin,
  nsfw,
  cleanDomOptions,
  overrideConstructor,
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
      if (nsfw) {
        this.nsfw = nsfw;
      }
      if (overrideConstructor) {
        overrideConstructor(this);
      }
    }
    public async bookParse() {
      const [introduction, introductionHTML] = await introDomHandle(
        introDom,
        introDomPatch
      );

      const additionalMetadate: BookAdditionalMetadate = {};
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }

      let indexPages: (Document | null)[];
      if (typeof getIndexPages === "function") {
        indexPages = await getIndexPages();
      } else if (typeof getIndexUrls === "function") {
        const indexUrls = await getIndexUrls();
        const _indexPage: [Document | null, string][] = [];
        await concurrencyRun(
          indexUrls,
          this.concurrencyLimit,
          async (url: string) => {
            log.info(`[BookParse]抓取目录页：${url}`);
            const doc = await getHtmlDomWithRetry(url, this.charset);
            _indexPage.push([doc, url]);
            return doc;
          }
        );
        indexPages = _indexPage
          .sort(
            (a: [Document | null, string], b: [Document | null, string]) => {
              const aUrl = a[1];
              const bUrl = b[1];
              // https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
              return indexUrls.indexOf(aUrl) - indexUrls.indexOf(bUrl);
            }
          )
          .map((l) => l[0]);
      } else {
        throw Error("未发现 getIndexUrls 或 getIndexPages");
      }

      const chapters: Chapter[] = [];
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionChapterNumber = 0;
      let sectionName = null;
      for (const doc of indexPages) {
        if (!doc) {
          continue;
        }
        let sections;
        let hasSection;
        if (typeof getSections === "function") {
          sections = getSections(doc);
        }
        if (sections && sections instanceof NodeList) {
          hasSection = true;
        }

        const aList = getAList(doc);
        for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
          let chapterName;
          if (getAName) {
            chapterName = getAName(aElem);
          } else {
            chapterName = aElem.innerText;
          }
          const chapterUrl = aElem.href;

          if (hasSection && sections && getSName) {
            const _sectionName = getSectionName(aElem, sections, getSName);
            if (_sectionName !== sectionName) {
              sectionName = _sectionName;
              sectionNumber++;
              sectionChapterNumber = 0;
            }
          }

          chapterNumber++;
          sectionChapterNumber++;
          let isVIP = false;
          let isPaid = false;
          if (getIsVIP) {
            ({ isVIP, isPaid } = getIsVIP(aElem));
          }
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
          if (isVIP === true && isPaid === false) {
            chapter.status = Status.aborted;
          }
          if (typeof postHook === "function") {
            chapter = postHook(chapter);
          }
          if (chapter) {
            chapters.push(chapter);
          }
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
      if (typeof getContentFromUrl === "function") {
        content = await getContentFromUrl(chapterUrl, chapterName, charset);
      } else if (typeof getContent === "function") {
        const doc = await getHtmlDOM(chapterUrl, charset);
        content = getContent(doc);
      } else {
        throw Error("未发现 getContentFromUrl 或 getContent");
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
