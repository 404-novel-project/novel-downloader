import { getImageAttachment } from "../../lib/attachments";
import { Options, cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM, getHtmlDomWithRetry } from "../../lib/http";
import { PublicConstructor, concurrencyRun } from "../../lib/misc";
import { introDomHandle } from "../../lib/rule";
import { log } from "../../log";
import { Chapter } from "../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../main/Book";
import { BaseRuleClass } from "../../rules";

interface MkRuleClassOptions {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom: HTMLElement;
  introDomPatch: (introDom: HTMLElement) => HTMLElement;
  coverUrl: string | null;
  getIndexUrls: () => string[] | Promise<string[]>;
  getAList: (doc: Document) => NodeListOf<Element>;
  getAName?: (aElem: Element) => string;
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
  getIndexUrls,
  getAList,
  getAName,
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

      const indexUrls = await getIndexUrls();
      const _indexPage: [Document | null, string][] = [];
      await concurrencyRun(
        indexUrls,
        this.concurrencyLimit,
        async (url: string) => {
          log.info(`[BookParse]抓取目录页：${url}`);
          const doc = await getHtmlDomWithRetry(url);
          _indexPage.push([doc, url]);
          return doc;
        }
      );
      const indexPage = _indexPage
        .sort((a: [Document | null, string], b: [Document | null, string]) => {
          const aUrl = a[1];
          const bUrl = b[1];
          // https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
          return indexUrls.indexOf(aUrl) - indexUrls.indexOf(bUrl);
        })
        .map((l) => l[0]);
      const _aListList = indexPage
        .map((doc) => {
          if (doc) {
            return getAList(doc);
          } else {
            log.error("[bookParse]部分目录页抓取失败！");
            return null;
          }
        })
        .filter((a) => a !== null) as NodeListOf<Element>[];
      const aListList: HTMLAnchorElement[] = [];
      _aListList.forEach((alist) =>
        Array.from(alist).forEach((a) => aListList.push(a as HTMLAnchorElement))
      );

      const chapters: Chapter[] = [];
      let chapterNumber = 0;
      for (const aElem of Array.from(aListList)) {
        chapterNumber++;
        let chapterName;
        if (getAName) {
          chapterName = getAName(aElem);
        } else {
          chapterName = aElem.innerText;
        }
        const chapterUrl = aElem.href;
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
          sectionName: null,
          sectionChapterNumber: null,
          sectionNumber: null,
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
