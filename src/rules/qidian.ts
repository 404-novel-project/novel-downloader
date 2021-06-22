import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
  Book,
} from "../main";
import { ggetHtmlDOM, cleanDOM, sleep, gfetch } from "../lib";
import { ruleClass, chapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class qidian implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector(".book-info > h1 > em")
    )).innerText.trim();

    const author = (<HTMLElement>(
      document.querySelector(".book-info .writer")
    )).innerText
      .replace(/作\s+者:/, "")
      .trim();
    const introDom = document.querySelector(".book-info-detail .book-intro");
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>document.querySelector("#bookImg > img"))
      .src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".tag-wrap>.tags")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    const chapters: Chapter[] = [];

    const liLength = document.querySelectorAll("#j-catalogWrap li").length;
    const getChapterTotalNumber = () => {
      const span = (<HTMLSpanElement>(
        document.querySelector("#J-catalogCount")
      )).innerText.match(/\d+/);
      if (span) {
        return Number(span[0]);
      }
    };
    if (!(liLength && getChapterTotalNumber() === liLength)) {
      await sleep(3000);
    }
    const sections = document.querySelectorAll(
      "#j-catalogWrap > .volume-wrap > .volume"
    );
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLElement>s.querySelector("h3")).innerText
        .trim()
        .split("·")[0];
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll("ul.cf > li");
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
        const a = c.firstElementChild;
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (<HTMLAnchorElement>a).innerText.trim();
        const chapterUrl = (<HTMLAnchorElement>a).href;

        const isVIP = () => {
          const host = new URL(chapterUrl).host;
          if (host === "vipreader.qidian.com") {
            return true;
          }
          return false;
        };
        const isPaid = () => {
          if (isVIP()) {
            if (c.childElementCount === 2) {
              return false;
            } else {
              return true;
            }
          }
          return false;
        };

        const chapter = new Chapter(
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP(),
          isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          this.chapterParse,
          "UTF-8",
          {}
        );
        const isLogin = () => {
          const sign_in_dom = document.querySelector(".sign-in");
          const sign_out_dom = document.querySelector(".sign-out");
          if (sign_in_dom && sign_out_dom) {
            if (Array.from(sign_out_dom.classList).includes("hidden")) {
              return true;
            }
          }
          return false;
        };
        if (isVIP() && !(isLogin() && chapter.isPaid)) {
          chapter.status = Status.aborted;
        }
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

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await ggetHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector(".j_chapterName > .content-wrap")
      )).innerText.trim();
      const content = <HTMLElement>dom.querySelector(".read-content");
      const author_say_wrap = <HTMLElement>(
        dom.querySelector(".author-say-wrap")
      );
      if (content) {
        if (author_say_wrap) {
          const author_say = author_say_wrap.querySelector(
            "div.author-say > p:nth-child(3)"
          );
          const hr = document.createElement("hr");
          content.appendChild(hr);
          content.appendChild(<HTMLElement>author_say);
        }

        let { dom, text, images } = cleanDOM(content, "TM");
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

    async function vipChapter(): Promise<chapterParseObject> {
      const _csrfToken = (<any>unsafeWindow).jQuery.ajaxSettings.data
        ._csrfToken;
      const bookId = document.location.pathname.split("/").slice(-1)[0];
      const authorId = document
        .querySelector("#authorId")
        ?.getAttribute("data-authorid");
      const chapterId = chapterUrl.split("/").slice(-1)[0];
      interface chapterInfo {
        code: number;
        data: {
          chapterInfo: {
            actualWords: number;
            authorRecommend: [];
            authorSay: string;
            authorWords: {
              avatar: string;
              content: string;
              time: string;
            };
            cbid: number;
            ccid: string;
            chapterId: number;
            chapterName: string;
            chapterOrder: number;
            content: string;
            cvid: number;
            extra: {
              nextName: string;
              nextUrl: string;
              nextVipStatus: number;
              preUrl: string;
              prevName: string;
              prevVipStatus: number;
              volumeBody: boolean;
              volumeName: string;
            };
            fineLayout: number;
            freeStatus: number;
            isBuy: number;
            isContentEncode: number;
            isFirst: number;
            modifyTime: number;
            next: number;
            nextCcid: number;
            prev: number;
            prevCcid: number;
            updateTime: string;
            updateTimestamp: number;
            uuid: number;
            vipStatus: number;
            volumeId: number;
            wordsCount: number;
          };
          hongBaoStatus: number;
          pageOps: { hasAd: number };
        };
        msg: string;
      }
      async function getChapterInfo(): Promise<chapterInfo> {
        const baseUrl = "https://vipreader.qidian.com/ajax/chapter/chapterInfo";
        const search = new URLSearchParams({
          _csrfToken: _csrfToken,
          bookId: bookId,
          chapterId: chapterId,
          authorId: <string>authorId,
        });

        const url = baseUrl + "?" + search.toString();

        log.debug(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
        return gfetch(url, {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "x-requested-with": "XMLHttpRequest",
            Referer: chapterUrl,
          },
          responseType: "json",
        }).then((response) => <chapterInfo>response.response);
      }

      if (isPaid) {
        const chapterInfo = await getChapterInfo();
        if (chapterInfo.code === 0) {
          const authorSay = chapterInfo.data.chapterInfo.authorSay;
          const _content = chapterInfo.data.chapterInfo.content;

          const content = document.createElement("div");
          content.innerHTML = _content;

          if (authorSay) {
            const hr = document.createElement("hr");
            content.appendChild(hr);
            const authorSayDom = document.createElement("p");
            authorSayDom.innerHTML = authorSay;
            content.appendChild(authorSayDom);
          }

          const { dom, text, images } = cleanDOM(content, "TM");
          return {
            chapterName: chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
          };
        }
      }

      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
