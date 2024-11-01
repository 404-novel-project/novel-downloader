import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, gfetch } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Tadu extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;

    const bookname = (
      document.querySelector("div.bookNm > a.bkNm") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("div.authorInfo > a.author > span") as HTMLElement
    ).innerText.trim();

    const introDom = document.querySelector(
      "div.boxCenter.boxT.clearfix > div.lf.lfO > p.intro"
    ) as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("a.bookImg > img") as HTMLImageElement
    ).getAttribute("data-src");
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll("div.lf.lfT > li > div > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (aElem as HTMLAnchorElement).innerText;
      const chapterUrl = (aElem as HTMLAnchorElement).href;
      const isVIP = () => {
        return !!aElem.childElementCount;
      };
      const isPaid = () => {
        // Todo
        return false;
      };
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: isVIP(),
        isPaid: isPaid(),
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {},
      });
      const isLogin = () => {
        // Todo
        return false;
      };
      if (isVIP() && !(isLogin() && chapter.isPaid)) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
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
    options: object
  ) {
    async function publicChapter(): Promise<ChapterParseObject> {
      log.debug(`[Chapter]请求 ${chapterUrl}`);
      const doc = await getHtmlDOM(chapterUrl, charset);

      const content = document.createElement("div");

      const _bookPartResourceUrl = doc
        .getElementById("bookPartResourceUrl")
        ?.getAttribute("value");
      if (_bookPartResourceUrl) {
        const currentUrl = new URL(document.location.href);
        const rootDomain = `${currentUrl.protocol}//${currentUrl.host}`;
        const bookPartResourceUrl = new URL(_bookPartResourceUrl, rootDomain);
        bookPartResourceUrl.searchParams.set("callback", "callback");

        log.debug(`[Chapter]请求 ${bookPartResourceUrl.toString()}`);
        const jsonpText = await gfetch(bookPartResourceUrl.toString(), {
          headers: {
            accept: "*/*",
            Referer: document.location.origin,
          },
        })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return response.responseText;
            } else {
              throw new Error(
                `Bad response! ${bookPartResourceUrl.toString()}`
              );
            }
          })
          .catch((error) => log.error(error));

        if (!jsonpText) {
          throw new Error("jsonp request failed!");
        }

        interface ContentObj {
          content: string;
        }

        const getContentObj = new Function(
          `function callback(obj) { return obj; } return ${jsonpText};`
        );
        const contentObj: ContentObj = getContentObj();
        if (typeof contentObj === "object") {
          content.innerHTML = contentObj.content;
          const { dom, text, images } = await cleanDOM(content, "TM");
          return {
            chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
          };
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

    async function vipChapter(): Promise<ChapterParseObject> {
      // Todo
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
