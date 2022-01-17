import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { PublicConstructor } from "../../../lib/misc";
import { rm } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { replaceHaitangtxtImage } from "../../lib/haitangtxtImageDecode";
import { replaceYuzhaigeImage } from "../../lib/yuzhaigeImageDecode";

function getClass(
  replaceFunction: (inputText: string) => string
): PublicConstructor<BaseRuleClass> {
  return class extends BaseRuleClass {
    public constructor() {
      super();
      this.imageMode = "TM";
      this.nsfw = true;
    }

    public async bookParse() {
      const bookUrl = (
        document.querySelector(
          "div.currency_head > h1 > a"
        ) as HTMLAnchorElement
      ).href;
      const bookId = bookUrl.split("/").slice(-2, -1)[0];

      log.debug(`[chapter]请求 ${bookUrl}`);
      const dom = await getHtmlDOM(bookUrl, "UTF-8");
      const bookname = (
        dom.querySelector("div.cataloginfo > h3") as HTMLElement
      ).innerText.trim();
      const author = (
        dom.querySelector(
          ".infotype > p:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim();

      const introDom = dom.querySelector(".intro") as HTMLElement;
      const [introduction, introductionHTML] = await introDomHandle(
        introDom,
        (introDomI) => {
          rm("span:nth-child(1)", false, introDomI);
          return introDomI;
        }
      );

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
        const indexUrlsI = [];
        const _maxPageNumber = getMaxPageNumber();
        if (_maxPageNumber === undefined) {
          throw new Error("getMaxPageNumber return null ");
        }
        const maxPageNumber = parseInt(_maxPageNumber);
        for (let i = 1; i <= maxPageNumber; i++) {
          const indexUrl =
            [
              document.location.origin,
              document.location.pathname.split("/")[1],
              `${bookId}_${i}`,
            ].join("/") + "/";
          indexUrlsI.push(indexUrl);
        }
        return indexUrlsI;
      };
      const indexUrls = getIndexUrls();
      let lis: HTMLElement[] = [];

      for (const indexUrl of indexUrls) {
        log.debug(`[chapter]请求 ${indexUrl}`);
        const doc = await getHtmlDOM(indexUrl, "UTF-8");
        const ul = doc.querySelector("ul.chapters");
        if (ul?.childElementCount) {
          lis = lis.concat(Array.from(ul.children) as HTMLElement[]);
        }
      }

      const chapterList = lis.filter((obj) => obj !== undefined);
      let chapterNumber = 0;
      for (const node of chapterList as HTMLElement[]) {
        chapterNumber++;
        const a = node.firstElementChild as HTMLAnchorElement;
        const chapterName = a.innerText;
        const chapterUrl = a.href;
        const isVIP = false;
        const isPaid = false;
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP,
          isPaid,
          sectionName: null,
          sectionNumber: null,
          sectionChapterNumber: null,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {},
        });
        chapters.push(chapter);
      }

      const book = new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters,
      });
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
        const contentRaw = dom.querySelector("#articlecontent") as HTMLElement;
        let codeurl: string;
        let code: number;
        const _codeurl = dom
          .getElementsByTagName("script")[1]
          .innerText.trim()
          .match(/"(http.+)"/);
        if (_codeurl) {
          codeurl = _codeurl[1];
          const _code = new URL(codeurl).searchParams.get("code");
          if (_code) {
            code = parseInt(_code);
          }
        }

        if (_e) {
          const e = atob(_e)
            .split(/[A-Z]+%/)
            .map((v) => parseInt(v));

          const childNode = [];
          if (
            Array.from(dom.querySelectorAll("script")).filter((s) =>
              s.src.includes("/17mb/js/article.js")
            ).length
          ) {
            for (let i = 0; i < e.length; i++) {
              const k = UpWz(e[i], i);
              childNode[k] = contentRaw.childNodes[i];
            }
            for (const node of childNode) {
              if (node.nodeType !== 1) {
                continue;
              }
              if (
                !(
                  (node as HTMLDivElement).innerText.includes(
                    "本章尚未完结,请"
                  ) ||
                  (node as HTMLDivElement).innerText.includes("本章已阅读完毕")
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
              (node as HTMLDivElement).innerText.includes("本章尚未完结,请") ||
              (node as HTMLDivElement).innerText.includes("本章已阅读完毕")
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
        const nextLink = (
          dom.querySelector(
            ".novelbutton .p1.p3 > a:nth-child(1)"
          ) as HTMLAnchorElement
        ).href;

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
        const { dom: oldDom, images: finalImages } = await cleanDOM(
          content,
          "TM",
          { keepImageName: true }
        );
        const _newDom = document.createElement("div");
        _newDom.innerHTML = replaceFunction(content.innerHTML);
        const { dom: newDom, text: finalText } = await cleanDOM(_newDom, "TM", {
          keepImageName: true,
        });

        const fontStyleDom = document.createElement("style");
        fontStyleDom.innerHTML = `.hide { display: none; }`;
        oldDom.className = "hide";

        const finalDom = document.createElement("div");
        finalDom.appendChild(fontStyleDom);
        finalDom.appendChild(oldDom);
        finalDom.appendChild(newDom);

        return {
          chapterName,
          contentRaw: content,
          contentText: finalText,
          contentHTML: finalDom,
          contentImages: finalImages,
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
  };
}

export const haitangtxt = () => getClass(replaceHaitangtxtImage);
export const yuzhaige = () => getClass(replaceYuzhaigeImage);
