import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Book,
} from "../main";
import {
  ruleClass,
  ruleClassNamespace,
  bookParseObject,
  chapterParseObject,
} from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";

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
}: {
  bookUrl: string;
  bookname: string;
  author: string;
  introDom: HTMLElement;
  introDomPatch: (introDom: HTMLElement) => HTMLElement;
  coverUrl: string;
  chapterListSelector: string;
  charset: string;
  chapterParse: ruleClassNamespace.chapterParse;
}): Promise<bookParseObject> {
  let introduction: string | null;
  let introductionHTML: HTMLElement | null;
  if (introDom === null) {
    introduction = null;
    introductionHTML = null;
  } else {
    introDom = introDomPatch(introDom);
    let {
      dom: introCleanDom,
      text: introCleantext,
      images: introCleanimages,
    } = cleanDOM(introDom, "TM");
    introduction = introCleantext;
    introductionHTML = introCleanDom;
  }

  const additionalMetadate: BookAdditionalMetadate = {};
  additionalMetadate.cover = new attachmentClass(
    coverUrl,
    `cover.${coverUrl.split(".").slice(-1)[0]}`,
    "TM"
  );
  additionalMetadate.cover.init();

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
          charset
        );
        chapters.push(chapter);
      }
    }
  }

  return {
    bookUrl: bookUrl,
    bookname: bookname,
    author: author,
    introduction: introduction,
    introductionHTML: introductionHTML,
    additionalMetadate: additionalMetadate,
    chapters: chapters,
  };
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
    let { dom, text, images } = cleanDOM(content, "TM");
    return {
      chapterName: chapterName,
      contentRaw: content,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
    };
  } else {
    return {
      chapterName: chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
    };
  }
}

export class biquwo implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
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
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img")).src,
      chapterListSelector: "#list>dl",
      charset: "UTF-8",
      chapterParse: chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (<HTMLElement>(
        dom.querySelector(".bookname > h1:nth-child(1)")
      )).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => content,
      charset,
    });
  }
}

export class shuquge implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (<HTMLElement>(
        document.querySelector(".info > h2")
      )).innerText.trim(),
      author: (<HTMLElement>(
        document.querySelector(".small > span:nth-child(1)")
      )).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: <HTMLElement>document.querySelector(".intro"),
      introDomPatch: (introDom) => {
        introDom.innerHTML = introDom.innerHTML.replace(
          /推荐地址：http:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g,
          ""
        );
        return introDom;
      },
      coverUrl: (<HTMLImageElement>(
        document.querySelector(".info > .cover > img")
      )).src,
      chapterListSelector: ".listmain>dl",
      charset: "UTF-8",
      chapterParse: chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (<HTMLElement>(
        dom.querySelector(".content > h1:nth-child(1)")
      )).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        content.innerHTML = content.innerHTML
          .replace(
            "请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com",
            ""
          )
          .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
        return content;
      },
      charset,
    });
  }
}
export class dingdiann implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
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
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img")).src,
      chapterListSelector: "#list>dl",
      charset: "UTF-8",
      chapterParse: chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
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
        const ad =
          '<div align="center"><a href="javascript:postError();" style="text-align:center;color:red;">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
        content.innerHTML = content.innerHTML
          .replace(ad, "")
          .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
        return content;
      },
      charset,
    });
  }
}

export class gebiqu implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
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
      introDomPatch: (introDom) => {
        introDom.innerHTML = introDom.innerHTML.replace(
          /如果您喜欢.+，别忘记分享给朋友/g,
          ""
        );
        rm('a[href^="http://down.gebiqu.com"]', false, introDom);
        return introDom;
      },
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img")).src,
      chapterListSelector: "#list>dl",
      charset: "UTF-8",
      chapterParse: chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
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
        content.innerHTML = content.innerHTML.replace(/"www.gebiqu.com"/g, "");
        return content;
      },
      charset,
    });
  }
}

export class zwdu implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
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
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img")).src,
      chapterListSelector: "#list>dl",
      charset: "GBK",
      chapterParse: chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (<HTMLElement>(
        dom.querySelector(".bookname > h1:nth-child(1)")
      )).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => content,
      charset,
    });
  }
}
