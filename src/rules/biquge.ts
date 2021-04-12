import { BookAdditionalMetadate, ImageClass, Chapter } from "../main";
import { ruleClass, ruleClassNamespace } from "../rules";
import { getHtmlDOM, cleanDOM } from "../lib";

export class biquwo implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("#info > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("#info > p:nth-child(2)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector("#intro");
    if (introDom === null) {
      introduction = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector("#fmimg > img"))
      .src;
    additionalMetadate.cover = new ImageClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const dl = document.querySelector("#list>dl");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      if (
        dlc[0].nodeName === "DT" &&
        (<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新章节")
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
            "UTF-8"
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
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".bookname > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
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
}

export class shuquge implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".info > h2")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".small > span:nth-child(1)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector(".intro");
    if (introDom === null) {
      introduction = null;
    } else {
      introDom.innerHTML = introDom.innerHTML.replace(
        /推荐地址：http:\/\/www.shuquge.com\/txt\/\d+\/index\.html/,
        ""
      );
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".info > .cover > img")
    )).src;
    additionalMetadate.cover = new ImageClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const dl = document.querySelector(".listmain>dl");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      if (
        dlc[0].nodeName === "DT" &&
        (<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新章节")
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
            "UTF-8"
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
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".content > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
      content.innerHTML = content.innerHTML
        .replace(
          "请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com",
          ""
        )
        .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
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
}
export class dingdiann implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("#info > h1:nth-child(1)")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector("#info > p:nth-child(2)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector("#intro");
    if (introDom === null) {
      introduction = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector("#fmimg > img"))
      .src;
    additionalMetadate.cover = new ImageClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const dl = document.querySelector("#list>dl");
    if (dl?.childElementCount) {
      const dlc = Array.from(dl.children);
      if (
        dlc[0].nodeName === "DT" &&
        (<HTMLTableDataCellElement>dlc[0]).innerText.includes("最新章节")
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
            "UTF-8"
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
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector(".bookname > h1:nth-child(1)")
    )).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    const ad =
      '<div align="center"><a href="javascript:postError();" style="text-align:center;color:red;">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
    content.innerHTML = content.innerHTML
      .replace(ad, "")
      .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
    if (content) {
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
}

export class c226ks implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href.replace(
      /index_\d+\.html/,
      "index_1.html"
    );
    const bookname = (<HTMLElement>(
      document.querySelector(".info > .top > h1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".info > .top > .fix > p:nth-child(1)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    let introduction: string | null;
    const introDom = <HTMLElement>document.querySelector(".desc");
    if (introDom === null) {
      introduction = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector(".imgbox > img"))
      .src;
    additionalMetadate.cover = new ImageClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const indexUrls = Array.from(
      document.querySelectorAll('[name="pageselect"] > option')
    ).map((opt) => document.location.origin + opt.getAttribute("value"));
    let lis: HTMLElement[] = [];

    for (const indexUrl of indexUrls) {
      const dom = await getHtmlDOM(indexUrl, "UTF-8");
      const ul = dom.querySelector(
        "div.row.row-section > div > div:nth-child(4) > ul"
      );
      if (ul?.childElementCount) {
        lis = lis.concat(<HTMLElement[]>Array.from(ul.children));
      }
    }

    const chapterList = lis.filter((obj) => obj !== undefined);
    let chapterNumber = 0;
    for (let i = 0; i < chapterList.length; i++) {
      const node = <HTMLElement>chapterList[i];
      chapterNumber++;
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
        null,
        null,
        null,
        chapterParse,
        "UTF-8"
      );
      chapters.push(chapter);
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>dom.querySelector("h1.title")).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    const ad =
      '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
    content.innerHTML = content.innerHTML.replace(ad, "");
    if (content) {
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
}
