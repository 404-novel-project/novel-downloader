import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm, getImageAttachment } from "../lib";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class hetushu implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".book_info > h2")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".book_info > div:nth-child(3) > a:nth-child(1)")
    )).innerText.trim();

    const introDom = <HTMLElement>document.querySelector(".intro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".book_info > img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const chapters: Chapter[] = [];
    const chapterList = <HTMLElement[] | undefined>(
      document.querySelector("#dir")?.childNodes
    );

    if (chapterList && chapterList.length !== 0) {
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (let i = 0; i < chapterList.length; i++) {
        const node = chapterList[i];
        if (node.nodeName === "DT") {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = node.innerText.trim();
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
            this.chapterParse,
            "UTF-8",
            {}
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

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    async function sorfPage() {
      //章节排序，来自：https://www.hetushu.com/command/section.js
      let path, bid, sid, position;
      if (
        /\/(book[0-9]?)\/([0-9]+)\/([0-9]+)\.html(\?position=([0-9]+))?$/.test(
          chapterUrl //https://www.hetushu.com/book/1472/994331.html
        )
      ) {
        path = RegExp.$1; //book
        bid = RegExp.$2; //1472
        sid = RegExp.$3; //994331
        position = RegExp.$5;
      } else {
        return false;
      }

      const url = [
        document.location.origin,
        path,
        bid,
        "r" + sid + ".json",
      ].join("/");
      log.debug(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
      const token = await fetch(url, {
        headers: {
          accept: "*/*",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          pragma: "no-cache",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: chapterUrl,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }).then((response) => response.headers.get("token"));
      if (token) {
        interface token_dict {
          [index: number]: number;
        }
        const token_dict = atob(token)
          .split(/[A-Z]+%/)
          .map((v) => Number(v));

        const this_body = <HTMLElement>dom.querySelector("#content");
        let b = 0,
          star = 0;
        for (let i = 0; i < this_body.childNodes.length; i++) {
          if (this_body.childNodes[i].nodeName == "H2") {
            star = i + 1;
          }
          if (
            this_body.childNodes[i].nodeName == "DIV" &&
            (<HTMLDivElement>this_body.childNodes[i]).className != "chapter"
          ) {
            break;
          }
        }
        const this_childNode = [];
        for (let i = 0; i < token_dict.length; i++) {
          if (token_dict[i] < 5) {
            this_childNode[token_dict[i]] = this_body.childNodes[i + star];
            b++;
          } else {
            this_childNode[token_dict[i] - b] = this_body.childNodes[i + star];
          }
        }
        for (let i = 0; i < this_childNode.length; i++) {
          if (!this_childNode[i]) {
            continue;
          }
          this_body.appendChild(this_childNode[i]);
        }
      }
    }

    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>(
      dom.querySelector("#content .h2")
    )).innerText.trim();

    await sorfPage();
    const content = <HTMLElement>dom.querySelector("#content");
    if (content) {
      const tagRemoved =
        "h2, acronym, bdo, big, cite, code, dfn, kbd, q, s, samp, strike, tt, u, var";
      tagRemoved.split(", ").forEach((s) => {
        rm(s, true, content);
      });
      Array.from(content.querySelectorAll("div")).map((oldNode) => {
        const newNode = document.createElement("p");
        newNode.innerHTML = oldNode.innerHTML;
        oldNode.parentNode?.replaceChild(newNode, oldNode);
      });
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
}
