import { getAttachment } from "../../../lib/attachments";
import { cleanDOM, htmlTrim } from "../../../lib/cleanDOM";
import { getFrameContentCondition, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rm2 } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Qidian extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    if (bookUrl.match("www.qidian.com/book/")) {
      return this.bookParse_www();
    }
    else return this.bookParse_book();
  }
  public async bookParse_www() { 
    const ndButton = document.getElementById("nd-button");
    const _csrfTokenMatch = document.cookie.match(/(?:^|; )_csrfToken=([^;]*)/);
    const _csrfToken = _csrfTokenMatch ? decodeURIComponent(_csrfTokenMatch[1]) : null;
    if (!_csrfToken) {
      throw new Error("未发现 _csrfToken");
    }
    const bookUrl = document.location.href;
    const bookIdMatch = bookUrl.match(/www\.qidian\.com\/book\/(\d+)/);
    const bookId = bookIdMatch ? bookIdMatch[1] : null;
    const newurl = "https://book.qidian.com/info/" + bookId?.toString();
    const author = (document.querySelector(".author") as HTMLElement)?.innerText;
    const authorId = document
      .getElementById("authorId")
      ?.getAttribute("data-authorid");
    const bookname = (document.querySelector("#bookName") as HTMLElement)?.innerText;
    const introDom = document.querySelector("#book-intro-detail");
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#bookImg > img") as HTMLImageElement
    ).src.slice(0, -4);
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("#all-label > a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());
    if (ndButton) {
        ndButton.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">
        小说下载器尚不支持此页面，不过你可以切换到 <a href="${newurl}$" target="_blank">book.qidian.com下载</a>
      </div>
    `;
    }

    const limitFree = Boolean(
      document.querySelector(".book-information .flag")
    );
    log.info(`[Book]限免书籍 ${limitFree}`);

    const sections = document.querySelectorAll(
      ".catalog-volume"
    );
    let chapterNumber = 0;
    const chapters: Chapter[] = [];

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (s.querySelector(".volume-name") as HTMLElement).innerText
        .trim()
        .split("\n")
        .slice(-1)[0]
        .split("·")[0]
        .trim();
      let sectionChapterNumber = 0;
      const cs = s.querySelectorAll("ul.volume-chapters > li");
      for (const c of Array.from(cs)) {
        const a = c.querySelector("a");
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

        const isVIP = () => {
          const host = new URL(chapterUrl).host;
          return host === "vipreader.qidian.com";
        };
        const isPaid = () => {
          if (isVIP()) {
            return c.childElementCount !== 2;
          }
          return false;
        };
        let chapterId;
        if (isVIP()) {
          chapterId = /(\d+)\/?$/.exec(chapterUrl)?.slice(-1)[0] ?? null;
        } else {
          chapterId = null;
        }
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: isVIP(),
          isPaid: isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {
            _csrfToken,
            bookId,
            authorId,
            chapterId,
            limitFree,
          },
        });

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
          if (chapter.isPaid) {
            chapter.status = Status.pending;
          }
        }
        //
        chapters.push(chapter);
      }
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
  }

  public async bookParse_book() {
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
    const _csrfTokenMatch = document.cookie.match(/(?:^|; )_csrfToken=([^;]*)/);
    const _csrfToken = _csrfTokenMatch ? decodeURIComponent(_csrfTokenMatch[1]) : null;
    if (!_csrfToken) {
      throw new Error("未发现 _csrfToken");
    }
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-info > h1 > em") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        ".book-info .writer, .book-info > h1:nth-child(1) > span:nth-child(2)"
      ) as HTMLElement
    ).innerText
      .replace(/作\s+者:/, "")
      .replace(/\s+著$/, "")
      .trim();
    const introDom = document.querySelector(".book-info-detail .book-intro");
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#bookImg > img") as HTMLImageElement
    ).src.slice(0, -4);
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
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
        return parseInt(span[0]);
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
        .split("·")[0]
        .trim();
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
          return host === "vipreader.qidian.com";
        };
        const isPaid = () => {
          if (isVIP()) {
            return c.childElementCount !== 2;
          }
          return false;
        };
        let chapterId;
        if (isVIP()) {
          chapterId = /(\d+)\/?$/.exec(chapterUrl)?.slice(-1)[0] ?? null;
        } else {
          chapterId = null;
        }
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: isVIP(),
          isPaid: isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {
            _csrfToken,
            bookId,
            authorId,
            chapterId,
            limitFree,
          },
        });
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
          if (chapter.isPaid) {
            chapter.status = Status.pending;
          }
        }
        //
        chapters.push(chapter);
      }
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: chapterOptions
  ) {
    const nullObj = {
      chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
      additionalMetadate: null,
    };

    async function getChapter(): Promise<ChapterParseObject> {
      let doc;
      if (isVIP) {
        doc = await ggetHtmlDOM(chapterUrl, charset);
        if (
          !doc.querySelector(".read-content") ||
          (doc.querySelector(".read-content")?.childElementCount ?? 0) < 10
        ) {
          doc = await getFrameContentCondition(chapterUrl, (frame) => {
            const doc = frame.contentWindow?.document ?? null;
            if (doc) {
              return doc.querySelectorAll(".read-content > p").length !== 0;
            } else {
              return false;
            }
          });
          if (doc) {
            doc = new DOMParser().parseFromString(
              doc.documentElement.outerHTML,
              "text/html"
            );
          }
        }
      } else {
        doc = await ggetHtmlDOM(chapterUrl, charset);
      }

      if (doc) {
        chapterName = (
          doc.querySelector("h1.title") as HTMLElement
        ).innerText.trim();

        // VIP章节
        if (doc.querySelector(".vip-limit-wrap")) {
          return nullObj;
        }

        const content = document.createElement("div");
        let contentText = "";

        const contentMain = doc.querySelector("main.content") as HTMLElement;
        rm("span.review-count", true, contentMain);
        const authorSayWrap = doc.querySelector(
          "#r-authorSay"
        ) as HTMLElement;
        if (contentMain) {
          const { dom, text, images } = await cleanDOM(contentMain, "TM");
          htmlTrim(dom);
          content.appendChild(dom);
          rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);

          contentText = contentText + text;

          if (authorSayWrap) {
            const authorSay = authorSayWrap.querySelector("div");
            if (authorSay) {
              rm("a.avatar", false, authorSay as HTMLElement);
              rm("h4", false, authorSay as HTMLElement);
              const {
                dom: authorDom,
                text: authorText,
                images: authorImages,
              } = await cleanDOM(authorSayWrap, "TM");
              htmlTrim(authorDom);
              authorDom.className = "authorSay";

              const hr = document.createElement("hr");
              content.appendChild(hr);
              content.appendChild(authorSay as HTMLElement);

              contentText =
                contentText + "\n\n" + "-".repeat(10) + "\n\n" + authorText;

              images.push(...authorImages);
            }
          }

          return {
            chapterName,
            contentRaw: content,
            contentText,
            contentHTML: content,
            contentImages: images,
            additionalMetadate: null,
          };
        }
      }

      return nullObj;
    }

    return getChapter();
  }
}

interface chapterOptions {
  _csrfToken: string;
  bookId: string;
  authorId: string;
  chapterId: string;
  limitFree: boolean;
}
