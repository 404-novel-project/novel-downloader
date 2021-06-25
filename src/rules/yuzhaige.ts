import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { introDomHandle } from "./lib/common";
import { replaceYuzhaigeImage } from "./lib/yuzhaigeImageDecode";
import { log } from "../log";

export class yuzhaige implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = (<HTMLAnchorElement>(
      document.querySelector("div.currency_head > h1 > a")
    )).href;
    const bookId = bookUrl.split("/").slice(-2, -1)[0];

    log.debug(`[chapter]请求 ${bookUrl}`);
    const dom = await getHtmlDOM(bookUrl, "UTF-8");
    const bookname = (<HTMLElement>(
      dom.querySelector("div.cataloginfo > h3")
    )).innerText.trim();
    const author = (<HTMLElement>(
      dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)")
    )).innerText.trim();

    const introDom = <HTMLElement>dom.querySelector(".intro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom, (introDom) => {
      rm("span:nth-child(1)", false, introDom);
      return introDom;
    });

    const additionalMetadate: BookAdditionalMetadate = {};

    const chapters: Chapter[] = [];
    const getMaxPageNumber = () => {
      const pageDom = document.querySelector("div.page:nth-child(6)");
      if (pageDom) {
        const childNodes = Array.from(pageDom.childNodes);
        const _maxPageNumber = childNodes
          .slice(-1)[0]
          .textContent?.match(/第\d+\/(\d+)页/);
        if (_maxPageNumber) {
          return _maxPageNumber[1];
        }
      }
    };
    const getIndexUrls = () => {
      const indexUrls = [];
      const maxPageNumber = Number(getMaxPageNumber());
      for (let i = 1; i <= maxPageNumber; i++) {
        const indexUrl =
          [
            document.location.origin,
            document.location.pathname.split("/")[1],
            `${bookId}_${i}`,
          ].join("/") + "/";
        indexUrls.push(indexUrl);
      }
      return indexUrls;
    };
    const indexUrls = getIndexUrls();
    let lis: HTMLElement[] = [];

    for (const indexUrl of indexUrls) {
      log.debug(`[chapter]请求 ${indexUrl}`);
      const dom = await getHtmlDOM(indexUrl, "UTF-8");
      const ul = dom.querySelector("ul.chapters");
      if (ul?.childElementCount) {
        lis = lis.concat(<HTMLElement[]>Array.from(ul.children));
      }
    }

    const chapterList = lis.filter((obj) => obj !== undefined);
    let chapterNumber = 0;
    for (let i = 0; i < chapterList.length; i++) {
      const node = <HTMLElement>chapterList[i];
      chapterNumber++;
      const a = <HTMLAnchorElement>node.firstElementChild;
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
        this.chapterParse,
        "UTF-8",
        {}
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
    function contentAppend() {
      function UpWz(m: number, i: number) {
        let k = Math.ceil((i + 1) % code);
        k = Math.ceil(m - k);
        return k;
      }

      const _e = dom.getElementsByTagName("meta")[7].getAttribute("content");
      const contentRaw = <HTMLElement>dom.querySelector("#articlecontent");
      let codeurl: string;
      let code: number;
      const _codeurl = dom
        .getElementsByTagName("script")[1]
        .innerText.trim()
        .match(/"(http.+)"/);
      if (_codeurl) {
        codeurl = _codeurl[1];
        code = Number(new URL(codeurl).searchParams.get("code"));
      }

      if (_e) {
        const e = atob(_e)
          .split(/[A-Z]+%/)
          .map((v) => Number(v));

        let childNode = [];
        if (
          Array.from(dom.querySelectorAll("script")).filter((s) =>
            s.src.includes("/17mb/js/article.js")
          ).length
        ) {
          for (let i = 0; i < e.length; i++) {
            let k = UpWz(e[i], i);
            childNode[k] = contentRaw.childNodes[i];
          }
          for (const node of childNode) {
            if (node.nodeType != 1) {
              continue;
            }
            if (
              !(
                (<HTMLDivElement>node).innerText.includes("本章尚未完结,请") ||
                (<HTMLDivElement>node).innerText.includes("本章已阅读完毕")
              )
            ) {
              content.appendChild(node);
            }
          }
          return;
        }
      }

      for (const node of Array.from(contentRaw.childNodes)) {
        if (
          !(
            (<HTMLDivElement>node).innerText.includes("本章尚未完结,请") ||
            (<HTMLDivElement>node).innerText.includes("本章已阅读完毕")
          )
        ) {
          content.appendChild(node);
        }
      }
      return;
    }

    let nowUrl = chapterUrl;
    let dom = await getHtmlDOM(chapterUrl, charset);
    const content = document.createElement("div");

    let flag = false;
    do {
      contentAppend();
      const nextLink = (<HTMLAnchorElement>(
        dom.querySelector(".novelbutton .p1.p3 > a:nth-child(1)")
      )).href;

      if (new URL(nextLink).pathname.includes("_")) {
        if (nextLink !== nowUrl) {
          flag = true;
        } else {
          log.error("网站页面出错，URL： " + nowUrl);
          flag = false;
        }
      } else {
        flag = false;
      }
      if (flag) {
        nowUrl = nextLink;
        dom = await getHtmlDOM(nextLink, charset);
      }
    } while (flag);

    if (content) {
      let { dom: oldDom, text: _text, images: finalImages } = await cleanDOM(
        content,
        "TM"
      );
      const _newDom = document.createElement("div");
      _newDom.innerHTML = replaceYuzhaigeImage(content.innerHTML);
      let { dom: newDom, text: finalText, images } = await cleanDOM(
        _newDom,
        "TM"
      );

      const fontStyleDom = document.createElement("style");
      fontStyleDom.innerHTML = `.hide { display: none; }`;
      oldDom.className = "hide";

      const finalDom = document.createElement("div");
      finalDom.appendChild(fontStyleDom);
      finalDom.appendChild(oldDom);
      finalDom.appendChild(newDom);

      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: finalText,
        contentHTML: finalDom,
        contentImages: finalImages,
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
}
