import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { gfetch } from "../../../lib/http";
import { ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter, Status } from "../../../main";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Qidian extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    let bookId: HTMLElement | string | null =
      document.getElementById("bookImg");
    if (bookId) {
      bookId = bookId.getAttribute("data-bid");
    } else {
      throw new Error("未发现 bookId");
    }
    const authorId = document
      .getElementById("authorId")
      ?.getAttribute("data-authorid");
    const _csrfToken = (unsafeWindow as any).jQuery.ajaxSettings.data
      ._csrfToken;

    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-info > h1 > em") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(".book-info .writer") as HTMLElement
    ).innerText
      .replace(/作\s+者:/, "")
      .trim();
    const introDom = document.querySelector(".book-info-detail .book-intro");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#bookImg > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info > .tag > a, .tag-wrap > .tags")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    // 限免探测
    /*
    const limitFreeUrl = "https://www.qidian.com/free/";
    const limitFreeDom = await ggetHtmlDOM(limitFreeUrl, this.charset);
    const limitFreeBookIds = Array.from(
      limitFreeDom.querySelectorAll(
        "#limit-list div.book-img-box > a[data-bid]"
      )
    ).map((a) => a.getAttribute("data-bid"));
    const limitFree = limitFreeBookIds.includes(bookId);
    */
    const limitFree = Boolean(
      document.querySelector(".book-information .flag")
    );
    log.info(`[Book]限免书籍 ${limitFree}`);

    const chapters: Chapter[] = [];

    const liLength = document.querySelectorAll("#j-catalogWrap li").length;
    const getChapterTotalNumber = () => {
      const span = (
        document.querySelector("#J-catalogCount") as HTMLSpanElement
      ).innerText.match(/\d+/);
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
      const sectionName = (s.querySelector("h3") as HTMLElement).innerText
        .trim()
        .split("\n")
        .slice(-1)[0]
        .split("·")[0];
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll("ul.cf > li");
      for (const c of Array.from(cs)) {
        const a = c.querySelector("a");
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

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
        let chapterId;
        if (isVIP()) {
          chapterId = chapterUrl.split("/").slice(-1)[0];
        } else {
          chapterId = null;
        }
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
          {
            _csrfToken,
            bookId,
            authorId,
            chapterId,
            limitFree,
          }
        );
        const isLogin = () => {
          const signInDom = document.querySelector(".sign-in");
          const signOutDom = document.querySelector(".sign-out");
          if (signInDom && signOutDom) {
            if (Array.from(signOutDom.classList).includes("hidden")) {
              return true;
            }
          }
          return false;
        };
        if (isVIP()) {
          chapter.status = Status.aborted;
          if (limitFree) {
            chapter.status = Status.pending;
          }
          if (isLogin() && chapter.isPaid) {
            chapter.status = Status.pending;
          }
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
    interface Options {
      _csrfToken: string;
      bookId: string;
      authorId: string;
      chapterId: string;
      limitFree: boolean;
    }
    const bookId = (options as Options).bookId;
    const authorId = (options as Options).authorId;
    const chapterId = (options as Options).chapterId;
    const limitFree = (options as Options).limitFree;
    const _csrfToken = (options as Options)._csrfToken;

    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await ggetHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector(".j_chapterName > .content-wrap") as HTMLElement
      ).innerText.trim();

      const nullObj = {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
      // VIP章节
      if (doc.querySelector(".vip-limit-wrap")) {
        return nullObj;
      }

      const content = doc.querySelector(".read-content") as HTMLElement;
      const authorSayWrap = doc.querySelector(
        ".author-say-wrap"
      ) as HTMLElement;
      if (content) {
        if (authorSayWrap) {
          const authorSay = authorSayWrap.querySelector(
            "div.author-say > p:nth-child(3)"
          );
          const hr = document.createElement("hr");
          content.appendChild(hr);
          content.appendChild(authorSay as HTMLElement);
        }

        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return nullObj;
      }
    }

    async function vipChapter(): Promise<ChapterParseObject> {
      interface ChapterInfo {
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
      async function getChapterInfo(): Promise<ChapterInfo | void> {
        const baseUrl = "https://vipreader.qidian.com/ajax/chapter/chapterInfo";
        const search = new URLSearchParams({
          _csrfToken,
          bookId,
          chapterId,
          authorId,
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
        })
          .then((response) => response.response as ChapterInfo)
          .catch((error) => log.error(error));
      }

      async function getByAPI() {
        const chapterInfo = await getChapterInfo();
        if (!chapterInfo) {
          throw new Error("Request Api failed!");
        }
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

          const { dom, text, images } = await cleanDOM(content, "TM");
          return {
            chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
          };
        } else {
          log.error(
            `[chapter]VIP章节API请求失败！\n${JSON.stringify(chapterInfo)}`
          );

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

      if (limitFree || isPaid) {
        const _obj = await publicChapter();
        if (!_obj.contentHTML) {
          return getByAPI();
        } else {
          return _obj;
        }
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

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
