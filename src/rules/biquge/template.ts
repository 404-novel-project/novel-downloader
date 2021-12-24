import { getImageAttachment } from "../../lib/attachments";
import { cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { PublicConstructor } from "../../lib/misc";
import { introDomHandle, nextPageParse } from "../../lib/rule";
import { log } from "../../log";
import { Chapter } from "../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../rules";

async function bookParseTemp({
  bookUrl,
  bookname,
  author,
  introDom,
  introDomPatch,
  coverUrl,
  chapterListSelector,
  charset,
  chapterParse,
  enableIgnore = true,
  customVolumeFilter,
}: {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom: HTMLElement;
  introDomPatch: (introDom: HTMLElement) => HTMLElement;
  coverUrl: string;
  chapterListSelector: string;
  charset: string;
  chapterParse: BaseRuleClass["chapterParse"];
  enableIgnore?: boolean;
  customVolumeFilter?: RegExp;
}): Promise<Book> {
  const [introduction, introductionHTML] = await introDomHandle(
    introDom,
    introDomPatch
  );

  const additionalMetadate: BookAdditionalMetadate = {};
  if (coverUrl) {
    getImageAttachment(coverUrl, "TM", "cover-")
      .then((coverClass) => {
        additionalMetadate.cover = coverClass;
      })
      .catch((error) => log.error(error));
  }

  const dls = document.querySelectorAll(chapterListSelector);
  const dlc: HTMLElement[] = [];
  Array.from(dls)
    .map((dl) => Array.from(dl.children))
    .forEach((dlcList) => dlcList.forEach((dl) => dlc.push(dl as HTMLElement)));

  // 删去第一个章节块
  let i = 1;
  if (enableIgnore) {
    if (dlc[0].nodeName === "DT") {
      const dt = dlc[0];
      if (
        /最新(.+)?章节/.test(dt.innerText) ||
        (customVolumeFilter && customVolumeFilter.test(dt.innerText))
      ) {
        delete dlc[0];
        for (; i < dlc.length; i++) {
          const d = dlc[i];
          if (d.nodeName === "DT") {
            break;
          } else {
            delete dlc[i];
          }
        }
      }
    }
  }

  const chapters: Chapter[] = [];
  const chapterList = dlc.filter((obj) => obj !== undefined);
  let chapterNumber = 0;
  let sectionNumber = 0;
  let sectionName = null;
  let sectionChapterNumber = 0;
  for (const node of chapterList as HTMLElement[]) {
    if (node.nodeName === "DT") {
      sectionNumber++;
      sectionChapterNumber = 0;
      if (node.innerText.includes("《")) {
        sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
      } else {
        sectionName = node.innerText.replace(`${bookname}`, "").trim();
      }
    } else if (node.nodeName === "DD") {
      if (node.childElementCount === 0) {
        continue;
      }
      chapterNumber++;
      sectionChapterNumber++;
      const a = node.firstElementChild as HTMLLinkElement;
      const chapterName = a.innerText;
      const chapterUrl = a.href;
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
        sectionName,
        sectionNumber,
        sectionChapterNumber,
        chapterParse,
        charset,
        { bookname }
      );
      chapters.push(chapter);
    }
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
interface ChapterParseOption {
  bookname: string;
}
async function chapterParseTemp({
  dom,
  chapterUrl,
  chapterName,
  contenSelector,
  contentPatch,
  charset,
  options,
}: {
  dom: Document;
  chapterUrl: string;
  chapterName: string;
  contenSelector: string;
  contentPatch: (
    content: HTMLElement,
    options: ChapterParseOption
  ) => HTMLElement;
  charset: string;
  options: ChapterParseOption;
}): Promise<ChapterParseObject> {
  let content = dom.querySelector(contenSelector) as HTMLElement;
  if (content) {
    content = contentPatch(content, options);
    const { dom: domClean, text, images } = await cleanDOM(content, "TM");
    return {
      chapterName,
      contentRaw: content,
      contentText: text,
      contentHTML: domClean,
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
export function mkBiqugeClass(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (
    content: HTMLElement,
    options: ChapterParseOption
  ) => HTMLElement,
  concurrencyLimit?: number,
  enableIgnore?: boolean,
  customVolumeFilter?: RegExp
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      if (typeof concurrencyLimit === "number") {
        this.concurrencyLimit = concurrencyLimit;
      }
      this.imageMode = "TM";
      this.charset = document.characterSet;
      this.overrideConstructor(this);
    }

    public async bookParse() {
      const self = this;
      if (enableIgnore === undefined) {
        enableIgnore = true;
      }
      return bookParseTemp({
        bookUrl: document.location.href,
        bookname: (
          document.querySelector("#info h1:nth-of-type(1)") as HTMLElement
        ).innerText
          .trim()
          .replace(/最新章节$/, ""),
        author: (
          document.querySelector("#info > p:nth-child(2)") as HTMLElement
        ).innerText
          .replace(/作(\s+)?者[：:]/, "")
          .trim(),
        introDom: document.querySelector("#intro") as HTMLElement,
        introDomPatch,
        coverUrl:
          (document.querySelector("#fmimg > img") as HTMLImageElement)?.src ??
          "",
        chapterListSelector: "#list>dl",
        charset: document.characterSet,
        chapterParse: self.chapterParse,
        enableIgnore,
        customVolumeFilter,
      });
    }

    public async chapterParse(
      chapterUrl: string,
      chapterName: string | null,
      isVIP: boolean,
      isPaid: boolean,
      charset: string,
      options: ChapterParseOption
    ) {
      const doc = await getHtmlDOM(chapterUrl, charset);
      return chapterParseTemp({
        dom: doc,
        chapterUrl,
        chapterName:
          ((
            doc.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
          )?.innerText.trim() ||
            chapterName) ??
          "",
        contenSelector: "#content",
        contentPatch,
        charset,
        options,
      });
    }

    public overrideConstructor(self: this) {
      // overrideConstructor
    }
  };
}
export function mkBiqugeClass2(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (
    content: HTMLElement,
    options: ChapterParseOption
  ) => HTMLElement,
  concurrencyLimit?: number,
  enableIgnore?: boolean,
  customVolumeFilter?: RegExp
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      if (typeof concurrencyLimit === "number") {
        this.concurrencyLimit = concurrencyLimit;
      }
      this.imageMode = "TM";
      this.charset = document.characterSet;
      this.overrideConstructor(this);
    }

    public async bookParse() {
      const self = this;
      return bookParseTemp({
        bookUrl: document.location.href,
        bookname: (
          document.querySelector(".info > h2") as HTMLElement
        ).innerText
          .trim()
          .replace(/最新章节$/, ""),
        author: (
          document.querySelector(".small > span:nth-child(1)") as HTMLElement
        ).innerText
          .replace(/作(\s+)?者[：:]/, "")
          .trim(),
        introDom: document.querySelector(".intro") as HTMLElement,
        introDomPatch,
        coverUrl:
          (document.querySelector(".info > .cover > img") as HTMLImageElement)
            ?.src ?? "",
        chapterListSelector: ".listmain>dl",
        charset: document.characterSet,
        chapterParse: self.chapterParse,
        enableIgnore,
        customVolumeFilter,
      });
    }

    public async chapterParse(
      chapterUrl: string,
      chapterName: string | null,
      isVIP: boolean,
      isPaid: boolean,
      charset: string,
      options: ChapterParseOption
    ) {
      const dom = await getHtmlDOM(chapterUrl, charset);
      return chapterParseTemp({
        dom,
        chapterUrl,
        chapterName: (
          dom.querySelector(".content > h1:nth-child(1)") as HTMLElement
        ).innerText.trim(),
        contenSelector: "#content",
        contentPatch,
        charset,
        options,
      });
    }

    public overrideConstructor(self: this) {
      // overrideConstructor
    }
  };
}
export function mkBiqugeClass3(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement, doc: Document) => HTMLElement,
  getNextPage: (doc: Document) => string,
  continueCondition: (content: HTMLElement, nextLink: string) => boolean,
  concurrencyLimit?: number,
  enableIgnore?: boolean,
  customVolumeFilter?: RegExp
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      if (typeof concurrencyLimit === "number") {
        this.concurrencyLimit = concurrencyLimit;
      }
      this.imageMode = "TM";
      this.charset = document.characterSet;
      this.overrideConstructor(this);
    }

    public async bookParse() {
      const self = this;
      if (enableIgnore === undefined) {
        enableIgnore = true;
      }
      return bookParseTemp({
        bookUrl: document.location.href,
        bookname: (
          document.querySelector("#info h1:nth-of-type(1)") as HTMLElement
        ).innerText
          .trim()
          .replace(/最新章节$/, ""),
        author: (
          document.querySelector("#info > p:nth-child(2)") as HTMLElement
        ).innerText
          .replace(/作(\s+)?者[：:]/, "")
          .trim(),
        introDom: document.querySelector("#intro") as HTMLElement,
        introDomPatch,
        coverUrl:
          (document.querySelector("#fmimg > img") as HTMLImageElement)?.src ??
          "",
        chapterListSelector: "#list>dl",
        charset: document.characterSet,
        chapterParse: self.chapterParse,
        enableIgnore,
        customVolumeFilter,
      });
    }

    public async chapterParse(
      chapterUrl: string,
      chapterName: string | null,
      isVIP: boolean,
      isPaid: boolean,
      charset: string,
      options: ChapterParseOption
    ) {
      return nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch,
        getNextPage,
        continueCondition,
      });
    }

    public overrideConstructor(self: this) {
      // overrideConstructor
    }
  };
}
