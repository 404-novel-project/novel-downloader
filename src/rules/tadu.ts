import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import { ruleClass, ruleClassNamespace, chapterParseObject } from "../rules";
import { getHtmlDOM, cleanDOM, console_debug, gfetch } from "../lib";

export class tadu implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    let bookUrl = document.location.href.replace("catalogue/", "");

    const bookname = (<HTMLElement>(
      document.querySelector("div.boxCenter > h1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".itct > span:nth-child(1)")
    )).innerText
      .replace("作者：", "")
      .trim();

    let introduction: string | null;
    const doc = await getHtmlDOM(bookUrl, undefined);
    const introDom = <HTMLElement>(
      doc.querySelector("div.boxCenter.bookIntro > div > p:nth-child(4)")
    );
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
    const coverUrl = (<HTMLImageElement>(
      doc.querySelector("a.bookImg > img")
    )).getAttribute("data-src");
    if (coverUrl) {
      additionalMetadate.cover = new attachmentClass(
        coverUrl,
        `cover.${coverUrl.split(".").slice(-1)[0]}`,
        "TM"
      );
      additionalMetadate.cover.init();
    }

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll("div.chapter > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>aElem).innerText;
      const chapterUrl = (<HTMLAnchorElement>aElem).href;
      const isVIP = () => {
        if (aElem.childElementCount) {
          return true;
        } else {
          return false;
        }
      };
      const isPaid = () => {
        //Todo
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
        null,
        null,
        null,
        chapterParse,
        "UTF-8"
      );
      const isLogin = () => {
        //Todo
        return false;
      };
      if (isVIP() && !(isLogin() && chapter.isPaid)) {
        chapter.status = Status.aborted;
      }
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
    async function publicChapter(): Promise<chapterParseObject> {
      console_debug(`[Chapter]请求 ${chapterUrl}`);
      const doc = await getHtmlDOM(chapterUrl, charset);

      const content = document.createElement("div");

      const _bookPartResourceUrl = doc
        .getElementById("bookPartResourceUrl")
        ?.getAttribute("value");
      if (_bookPartResourceUrl) {
        const bookPartResourceUrl = new URL(_bookPartResourceUrl);
        bookPartResourceUrl.searchParams.set("callback", "callback");

        interface contentObj {
          content: string;
        }
        let contentObj: contentObj;
        function callback(obj: object) {
          contentObj = obj as contentObj;
          return obj;
        }
        console_debug(`[Chapter]请求 ${bookPartResourceUrl.toString()}`);
        const jsonpText = await gfetch(bookPartResourceUrl.toString(), {
          headers: {
            accept: "*/*",
            Referer: document.location.origin,
          },
          responseType: "arraybuffer",
        })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return <ArrayBuffer>response.response;
            } else {
              throw new Error(
                `Bad response! ${bookPartResourceUrl.toString()}`
              );
            }
          })
          .then((buffer: ArrayBuffer) => {
            const decoder = new TextDecoder(charset);
            const text = decoder.decode(buffer);
            return text;
          });

        eval(jsonpText);
        //@ts-ignore Variable 'contentObj' is used before being assigned.ts(2454)
        if (typeof contentObj === "object") {
          content.innerHTML = contentObj.content;
          let { dom, text, images } = cleanDOM(content, "TM");
          return {
            chapterName: chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
          };
        }
      }
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }

    async function vipChapter(): Promise<chapterParseObject> {
      //Todo
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
