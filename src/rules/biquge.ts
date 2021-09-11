import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { PublicConstructor, rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";

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
  const [
    introduction,
    introductionHTML,
    introCleanimages,
  ] = await introDomHandle(introDom, introDomPatch);

  const additionalMetadate: BookAdditionalMetadate = {};
  if (coverUrl) {
    getImageAttachment(coverUrl, "TM", "cover-").then((coverClass) => {
      additionalMetadate.cover = coverClass;
    });
  }

  const chapters: Chapter[] = [];
  const dl = document.querySelector(chapterListSelector);
  if (dl?.childElementCount) {
    const dlc = Array.from(dl.children);
    if (
      dlc[0].nodeName === "DT" &&
      ((<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新章节") ||
        (<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新的八个章节"))
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
    for (let i = 0; i < chapterList.length; i++) {
      const node = <HTMLElement>chapterList[i];
      if (node.nodeName === "DT") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
      } else if (node.nodeName === "DD") {
        if (node.childElementCount === 0) {
          continue;
        }
        chapterNumber++;
        sectionChapterNumber++;
        const a = <HTMLLinkElement>node.firstElementChild;
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
          { bookname: bookname }
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

interface chapterParseOption {
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
}): Promise<chapterParseObject> {
  let content = <HTMLElement>dom.querySelector(contenSelector);
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

function mkBiqugeClass(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      this.imageMode = "TM";
      this.charset = document.charset;
    }

    public async bookParse() {
      const self = this;
      return bookParseTemp({
        bookUrl: document.location.href,
        bookname: (<HTMLElement>(
          document.querySelector("#info > h1:nth-child(1)")
        )).innerText
          .trim()
          .replace(/最新章节$/, ""),
        author: (<HTMLElement>(
          document.querySelector("#info > p:nth-child(2)")
        )).innerText
          .replace(/作(\s+)?者[：:]/, "")
          .trim(),
        introDom: <HTMLElement>document.querySelector("#intro"),
        introDomPatch: introDomPatch,
        coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img"))
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
        chapterName: (<HTMLElement>(
          dom.querySelector(".bookname > h1:nth-child(1)")
        )).innerText.trim(),
        contenSelector: "#content",
        contentPatch: contentPatch,
        charset,
      });
    }
  };
}

// 笔趣阁通用模板，无contentpatch可直接使用
export const common = () =>
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

function mkBiqugeClass2(
  introDomPatch: (introDom: HTMLElement) => HTMLElement,
  contentPatch: (content: HTMLElement) => HTMLElement
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      this.imageMode = "TM";
      this.charset = document.charset;
    }

    public async bookParse() {
      const self = this;
      return bookParseTemp({
        bookUrl: document.location.href,
        bookname: (<HTMLElement>document.querySelector(".info > h2")).innerText
          .trim()
          .replace(/最新章节$/, ""),
        author: (<HTMLElement>(
          document.querySelector(".small > span:nth-child(1)")
        )).innerText
          .replace(/作(\s+)?者[：:]/, "")
          .trim(),
        introDom: <HTMLElement>document.querySelector(".intro"),
        introDomPatch: introDomPatch,
        coverUrl: (<HTMLImageElement>(
          document.querySelector(".info > .cover > img")
        )).src,
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
        chapterName: (<HTMLElement>(
          dom.querySelector(".content > h1:nth-child(1)")
        )).innerText.trim(),
        contenSelector: "#content",
        contentPatch: contentPatch,
        charset,
      });
    }
  };
}

export const shuquge = () =>
  mkBiqugeClass2(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /推荐地址：http:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g,
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
        .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
      return content;
    }
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
export class xbiquge extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const self = this;
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (<HTMLElement>(
        document.querySelector("#info > h1:nth-child(1)")
      )).innerText.trim(),
      author: (<HTMLElement>(
        document.querySelector("#info > p:nth-child(2)")
      )).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: <HTMLElement>document.querySelector("#intro"),
      introDomPatch: (introDom) => introDom,
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img"))?.src,
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
      chapterName: (<HTMLElement>(
        dom.querySelector(".bookname > h1:nth-child(1)")
      )).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        content.innerHTML = content.innerHTML.replace(
          `笔趣阁 www.xbiquge.so，最快更新${
            (<chapterParseOption>options).bookname
          } ！`,
          ""
        );
        return content;
      },
      charset,
    });
  }
}
