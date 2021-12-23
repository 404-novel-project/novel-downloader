import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm } from "../../../lib/misc";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../../main";
import { BaseRuleClass } from "../../../rules";

export class Hetushu extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book_info > h2") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector(
        ".book_info > div:nth-child(3) > a:nth-child(1)"
      ) as HTMLElement
    ).innerText.trim();

    const introDom = document.querySelector(".intro") as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".book_info > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const chapterList = document.querySelector("#dir")?.childNodes as
      | HTMLElement[]
      | undefined;

    if (chapterList && chapterList.length !== 0) {
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (const node of chapterList) {
        if (node.nodeName === "DT") {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = node.innerText.trim();
        } else if (node.nodeName === "DD") {
          chapterNumber++;
          sectionChapterNumber++;
          const a = node.firstElementChild as HTMLLinkElement;
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
      // 章节排序，来自：https://www.hetushu.com/command/section.js
      let path;
      let bid;
      let sid;
      let position;
      if (
        /\/(book[0-9]?)\/([0-9]+)\/([0-9]+)\.html(\?position=([0-9]+))?$/.test(
          chapterUrl // https://www.hetushu.com/book/1472/994331.html
        )
      ) {
        path = RegExp.$1; // book
        bid = RegExp.$2; // 1472
        sid = RegExp.$3; // 994331
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
      })
        .then((response) => response.headers.get("token"))
        .catch((error) => log.error(error));

      if (token) {
        interface TokenDict {
          [index: number]: number;
        }
        const tokenDict = atob(token)
          .split(/[A-Z]+%/)
          .map((v) => Number(v));

        const thisBody = doc.querySelector("#content") as HTMLElement;
        let b = 0;
        let star = 0;
        for (let i = 0; i < thisBody.childNodes.length; i++) {
          if (thisBody.childNodes[i].nodeName === "H2") {
            star = i + 1;
          }
          if (
            thisBody.childNodes[i].nodeName === "DIV" &&
            (thisBody.childNodes[i] as HTMLDivElement).className !== "chapter"
          ) {
            break;
          }
        }
        const thisChildNode = [];
        for (let i = 0; i < tokenDict.length; i++) {
          if (tokenDict[i] < 5) {
            thisChildNode[tokenDict[i]] = thisBody.childNodes[i + star];
            b++;
          } else {
            thisChildNode[tokenDict[i] - b] = thisBody.childNodes[i + star];
          }
        }
        for (const childNode of thisChildNode) {
          if (!childNode) {
            continue;
          }
          thisBody.appendChild(childNode);
        }
      }
    }

    const doc = await getHtmlDOM(chapterUrl, charset);

    chapterName = (
      doc.querySelector("#content .h2") as HTMLElement
    ).innerText.trim();

    await sorfPage();
    const content = doc.querySelector("#content") as HTMLElement;
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
}
