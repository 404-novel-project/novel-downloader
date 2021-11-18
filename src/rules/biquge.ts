import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass, ChapterParseObject } from "../rules";
import { PublicConstructor, rm, sleep } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export async function bookParseTemp({
  bookUrl,
  bookname,
  author,
  introDom,
  introDomPatch,
  coverUrl,
  chapterListSelector,
  charset,
  chapterParse,
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
}): Promise<Book> {
  const [introduction, introductionHTML, introCleanimages] =
    await introDomHandle(introDom, introDomPatch);

  const additionalMetadate: BookAdditionalMetadate = {};
  if (coverUrl) {
    getImageAttachment(coverUrl, "TM", "cover-")
      .then((coverClass) => {
        additionalMetadate.cover = coverClass;
      })
      .catch((error) => log.error(error));
  }

  const chapters: Chapter[] = [];
  const dl = document.querySelector(chapterListSelector);
  if (dl?.childElementCount) {
    const dlc = Array.from(dl.children);
    if (
      dlc[0].nodeName === "DT" &&
      ((dlc[0] as HTMLTableDataCellElement).innerText.includes("最新章节") ||
        (dlc[0] as HTMLTableDataCellElement).innerText.includes(
          "最新的八个章节"
        ))
    ) {
      for (let i = 0; i < dl?.childElementCount; i++) {
        if (i !== 0 && dlc[i].nodeName === "DT") {
          delete dlc[0];
          break;
        }
        delete dlc[i];
      }
    }

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
}: {
  dom: Document;
  chapterUrl: string;
  chapterName: string;
  contenSelector: string;
  contentPatch: (content: HTMLElement) => HTMLElement;
  charset: string;
}): Promise<ChapterParseObject> {
  let content = dom.querySelector(contenSelector) as HTMLElement;
  if (content) {
    content = contentPatch(content);
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

function mkBiqugeClass(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement,
  concurrencyLimit?: number
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      if (typeof concurrencyLimit === "number") {
        this.concurrencyLimit = concurrencyLimit;
      }
      this.imageMode = "TM";
      this.charset = document.charset;
      this.overrideConstructor(this);
    }

    public async bookParse() {
      const self = this;
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
        coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
          .src,
        chapterListSelector: "#list>dl",
        charset: document.charset,
        chapterParse: self.chapterParse,
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
      const dom = await getHtmlDOM(chapterUrl, charset);
      return chapterParseTemp({
        dom,
        chapterUrl,
        chapterName: (
          dom.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
        ).innerText.trim(),
        contenSelector: "#content",
        contentPatch,
        charset,
      });
    }

    public overrideConstructor(self: this) {
      // overrideConstructor
    }
  };
}

// 笔趣阁通用模板，无contentpatch可直接使用
export const common = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content
  );

export const c81book = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content
  );

export const gebiqu = () =>
  mkBiqugeClass(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /如果您喜欢.+，别忘记分享给朋友/g,
        ""
      );
      rm('a[href^="http://down.gebiqu.com"]', false, introDom);
      return introDom;
    },
    (content) => {
      content.innerHTML = content.innerHTML.replace(/"www.gebiqu.com"/g, "");
      return content;
    }
  );

export const luoqiuzw = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      const ad = content.firstElementChild as HTMLParagraphElement;
      if (ad.innerText.includes("天才一秒记住本站地址：")) {
        ad.remove();
      }
      const ads = ["记住网址m.luoqｉｕｘｚｗ．ｃｏｍ"];
      ads.forEach(
        (adt) => (content.innerHTML = content.innerHTML.replace(adt, ""))
      );
      return content;
    }
  );

export const lwxs9 = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      rm("div[align]", false, content);
      return content;
    }
  );

export const biquwx = () =>
  mkBiqugeClass(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/,
        ""
      );
      return introDom;
    },
    (content) => content,
    1
  );

export const tycqxs = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      content.innerHTML = content.innerHTML.replace(
        /推荐都市大神老施新书:<a href="https:\/\/www\.tycqxs\.com\/[\d_]+\/" target="_blank">.+<\/a>/,
        ""
      );
      return content;
    }
  );

// tslint:disable-next-line:max-classes-per-file
export class C25zw extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = document.charset;
  }

  public async bookParse() {
    const self = this;
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
      introDomPatch: (introDom) => {
        introDom.querySelector("font")?.parentElement?.remove();
        introDom.innerHTML = introDom.innerHTML.replace("简介:", "");
        return introDom;
      },
      coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
        .src,
      chapterListSelector: "#list>dl",
      charset: document.charset,
      chapterParse: self.chapterParse,
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
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (
        dom.querySelector(".zhangjieming > h1") as HTMLElement
      ).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        rm(".bottem", false, content);
        return content;
      },
      charset,
    });
  }
}

export const dijiubook = () => {
  const c = mkBiqugeClass(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace("本书网址：", "");
      rm('a[href^="https://dijiubook.net/"]', false, introDom);

      rm(
        "dl > dt:nth-of-type(2)",
        false,
        document.querySelector("#list") as HTMLElement
      );
      document
        .querySelectorAll('#list a[href^="https://m.dijiubook.net"]')
        .forEach((elem) => elem.parentElement?.remove());
      document
        .querySelectorAll('#list a[href$=".apk"]')
        .forEach((elem) => elem.parentElement?.remove());

      return introDom;
    },
    (content) => {
      rm("a", true, content);
      return content;
    }
  );
  c.prototype.overrideConstructor = (classThis: any) => {
    classThis.concurrencyLimit = 1;
    classThis.maxRunLimit = 1;
    classThis.postChapterParseHook = async (obj: Chapter) => {
      await sleep(3000 * Math.random());
      return obj;
    };
  };
  return c;
};

function mkBiqugeClass2(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement,
  concurrencyLimit?: number
): PublicConstructor<BaseRuleClass> {
  // tslint:disable-next-line:max-classes-per-file
  return class extends BaseRuleClass {
    public constructor() {
      super();
      if (typeof concurrencyLimit === "number") {
        this.concurrencyLimit = concurrencyLimit;
      }
      this.imageMode = "TM";
      this.charset = document.charset;
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
        coverUrl: (
          document.querySelector(".info > .cover > img") as HTMLImageElement
        ).src,
        chapterListSelector: ".listmain>dl",
        charset: document.charset,
        chapterParse: self.chapterParse,
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
      });
    }

    public overrideConstructor(self: this) {
      // overrideConstructor
    }
  };
}

export const shuquge = () =>
  mkBiqugeClass2(
    (introDom) => {
      document.querySelector(".noshow")?.classList.remove("noshow");
      if (document.querySelector(".showall")) {
        (document.querySelector(".showall") as HTMLElement).innerHTML = "";
      }

      introDom.innerHTML = introDom.innerHTML
        .replace(
          /作者：.+所写的《.+》无弹窗免费全文阅读为转载作品,章节由网友发布。/,
          ""
        )
        .replace(
          /推荐地址：https?:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g,
          ""
        );
      return introDom;
    },
    (content) => {
      content.innerHTML = content.innerHTML
        .replace(
          "请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com",
          ""
        )
        .replace(/https?:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
      return content;
    },
    1
  );

export const xyqxs = () =>
  mkBiqugeClass2(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /推荐地址：https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/index\.html/g,
        ""
      );
      return introDom;
    },
    (content) => {
      rm("div[style]", true, content);
      rm("script", true, content);
      rm('div[align="center"]', false, content);
      content.innerHTML = content.innerHTML
        .replace(
          "请记住本书首发域名：www.xyqxs.cc。笔趣阁手机版阅读网址：m.xyqxs.cc",
          ""
        )
        .replace(/\(https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/\d+\.html\)/, "");
      return content;
    }
  );

// tslint:disable-next-line:max-classes-per-file
export class Xbiquge extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const self = this;
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (
        document.querySelector("#info > h1:nth-child(1)") as HTMLElement
      ).innerText.trim(),
      author: (
        document.querySelector("#info > p:nth-child(2)") as HTMLElement
      ).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: document.querySelector("#intro") as HTMLElement,
      introDomPatch: (introDom) => introDom,
      coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
        ?.src,
      chapterListSelector: "#list>dl",
      charset: "GBK",
      chapterParse: self.chapterParse,
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
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (
        dom.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
      ).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        content.innerHTML = content.innerHTML.replace(
          `笔趣阁 www.xbiquge.so，最快更新${
            (options as ChapterParseOption).bookname
          } ！`,
          ""
        );
        return content;
      },
      charset,
    });
  }
}
