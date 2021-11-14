import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
  Book,
} from "../main";
import { rm, sleep } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { gfetch } from "../lib/http";
import {
  getAttachmentClassCache,
  putAttachmentClassCache,
  getImageAttachment,
} from "../lib/attachments";
import { getHtmlDOM, ggetHtmlDOM } from "../lib/http";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { retryLimit } from "../setting";
import { replaceJjwxcCharacter } from "./lib/jjwxcFontDecode";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class jjwxc extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GB18030";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const getInformationBlocked = () => {
      const fl = Array.from(document.querySelectorAll(".smallreadbody")).filter(
        (div) =>
          (<HTMLDivElement>div).innerText.includes(
            "文案信息审核未通过，等待作者修改后重新审核"
          )
      );
      if (fl.length !== 0) {
        return true;
      } else {
        return false;
      }
    };

    let bookname = "";
    let additionalMetadate: BookAdditionalMetadate = {};
    let author = "佚名";
    let introduction: string | null = null;
    let introductionHTML: HTMLElement | null = null;
    let introCleanimages: attachmentClass[] | null = null;
    if (!getInformationBlocked()) {
      bookname = (<HTMLElement>(
        document.querySelector('h1[itemprop="name"] > span')
      )).innerText.trim();

      author = (<HTMLElement>(
        document.querySelector("td.sptd h2 a span")
      )).innerText
        .replace(/作\s+者:/, "")
        .trim();
      const introDom = document.querySelector("#novelintro");
      [introduction, introductionHTML, introCleanimages] = await introDomHandle(
        introDom
      );
      if (introCleanimages) {
        additionalMetadate.attachments = [...introCleanimages];
      }

      let coverUrl = (<HTMLImageElement>(
        document.querySelector(".noveldefaultimage")
      )).src;
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }

      let tags = (<HTMLSpanElement>(
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(1) > span:nth-child(2)"
        )
      )).innerText.split("-");
      tags = tags.concat(
        Array.from(
          document.querySelectorAll("div.smallreadbody:nth-child(3) > span > a")
        ).map((a) => (<HTMLAnchorElement>a).innerText)
      );
      const perspective = (<HTMLLIElement>(
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(2)"
        )
      )).innerText.replace("\n", "");
      const workStyle = (<HTMLLIElement>(
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(3)"
        )
      )).innerText.replace("\n", "");
      tags.push(perspective);
      tags.push(workStyle);
      additionalMetadate.tags = tags;
    } else {
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(3000);
      bookname = (<HTMLAnchorElement>(
        document.querySelector("td[id^=comment_] span.coltext > a")
      ))?.innerText
        .trim()
        .replace(/《|》/g, "");
      window.scrollTo(0, 0);
      if (!bookname) {
        throw new Error("抓取书名出错");
      }
      const authorPageUrl = (<HTMLAnchorElement>(
        document.querySelector(
          "#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a"
        )
      ))?.href;
      if (authorPageUrl) {
        const authorPage = await getHtmlDOM(authorPageUrl, this.charset);
        author =
          (<HTMLSpanElement>authorPage.querySelector('span[itemprop="name"]'))
            ?.innerText ?? author;
      }
    }

    const chapters: Chapter[] = [];
    const trList = document.querySelectorAll("#oneboolt > tbody > tr");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < trList.length; i++) {
      const tr = trList[i];
      if (tr.getAttribute("bgcolor")) {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLElement>(
          tr.querySelector("b.volumnfont")
        ))?.innerText.trim();
      } else if (tr.getAttribute("itemprop")) {
        chapterNumber++;
        sectionChapterNumber++;
        const td = tr.querySelector("td:nth-child(2)");
        const a = td?.querySelector("a:nth-child(1)");
        const isLocked = () => {
          if ((<HTMLElement>td)?.innerText.trim() === "[锁]") {
            return true;
          } else {
            return false;
          }
        };
        const isVIP = () => {
          if (a?.getAttribute("onclick")) {
            return true;
          } else {
            return false;
          }
        };

        if (!isLocked()) {
          if (isVIP()) {
            const chapterName = (<HTMLAnchorElement>a).innerText.trim();
            const chapterUrl = (<HTMLAnchorElement>a).getAttribute("rel");
            if (chapterUrl) {
              const chapter = new Chapter(
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP(),
                null,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                this.chapterParse,
                this.charset,
                {}
              );
              const isLogin = () => {
                if (document.getElementById("jj_login")) {
                  return false;
                } else {
                  return true;
                }
              };
              if (isVIP() && !isLogin()) {
                chapter.status = Status.aborted;
              }
              chapters.push(chapter);
            }
          } else {
            const chapterName = (<HTMLAnchorElement>a).innerText.trim();
            const chapterUrl = (<HTMLAnchorElement>a).href;
            const chapter = new Chapter(
              bookUrl,
              bookname,
              chapterUrl,
              chapterNumber,
              chapterName,
              isVIP(),
              null,
              sectionName,
              sectionNumber,
              sectionChapterNumber,
              this.chapterParse,
              this.charset,
              {}
            );
            const isLogin = () => {
              if (document.getElementById("jj_login")) {
                return false;
              } else {
                return true;
              }
            };
            if (isVIP() && !isLogin()) {
              chapter.status = Status.aborted;
            }
            chapters.push(chapter);
          }
        } else {
          const chapterName = "[锁]";
          const chapterUrl = "";
          const chapter = new Chapter(
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            false,
            null,
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            this.chapterParse,
            this.charset,
            {}
          );
          chapter.status = Status.aborted;
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
    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("div.noveltext h2")
      )).innerText.trim();

      const content = <HTMLElement>dom.querySelector("div.noveltext");
      if (content) {
        rm("hr", true, content);
        const rawAuthorSayDom = content.querySelector(".readsmall");
        let authorSayDom, authorSayText;
        if (rawAuthorSayDom) {
          let {
            dom: adom,
            text: atext,
            images: aimages,
          } = await cleanDOM(rawAuthorSayDom, "TM");
          [authorSayDom, authorSayText] = [adom, atext];
        }
        rm("div", true, content);
        content.innerHTML = content.innerHTML.replaceAll(
          "@无限好文，尽在晋江文学城",
          ""
        );
        let { dom, text, images } = await cleanDOM(content, "TM");
        if (rawAuthorSayDom && authorSayDom && authorSayText) {
          const hr = document.createElement("hr");
          authorSayDom.className = "authorSay";
          dom.appendChild(hr);
          dom.appendChild(authorSayDom);

          text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
        }
        return {
          chapterName: chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
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

    async function vipChapter(): Promise<chapterParseObject> {
      async function getFont(): Promise<
        [string | null, attachmentClass | null, HTMLStyleElement | null]
      > {
        function getFontInfo() {
          const s = <HTMLStyleElement>dom.querySelectorAll("body > style")[1];
          let fontName: string, fontUrl: string;

          if (s.sheet) {
            const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];

            const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
            const m2 = f.cssText.match(/{(.*)}/);
            if (m1 && m2) {
              fontName = m1[0];

              const ft = m2[1];
              for (const k of ft.split(",")) {
                if (k.includes('format("woff2")')) {
                  const m3 = k.match(/url\("(.*)"\)\s/);
                  if (m3) {
                    fontUrl = document.location.protocol + m3[1];
                    return [fontName, fontUrl];
                  }
                }
              }
            }
          }

          const _fontName =
            document.querySelector("div.noveltext")?.classList[1];
          if (_fontName) {
            fontName = _fontName;
            fontUrl =
              document.location.protocol +
              `//static.jjwxc.net/tmp/fonts/${fontName}.woff2?h=my.jjwxc.net`;
            return [fontName, fontUrl];
          }

          return [null, null];
        }

        let retryTime = 0;
        function fetchFont(fontUrl: string): Promise<Blob | null | void> {
          log.debug(
            `[Chapter]请求 ${fontUrl} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );
          return gfetch(fontUrl, {
            headers: {
              accept: "*/*",
              Referer: chapterUrl,
            },
            responseType: "blob",
          })
            .then((response) => {
              if (response.status >= 200 && response.status <= 299) {
                return <Blob>response.response;
              } else {
                log.error(
                  `[Chapter]请求 ${fontUrl} 失败 Referer ${chapterUrl}`
                );
                if (retryTime < retryLimit) {
                  retryTime++;
                  return fetchFont(fontUrl);
                } else {
                  return null;
                }
              }
            })
            .catch((error) => log.error(error));
        }

        const [fontName, fontUrl] = getFontInfo();
        if (fontName && fontUrl) {
          const fontFileName = `${fontName}.woff2`;
          let fontClassObj: attachmentClass;
          const fontClassObjCache = getAttachmentClassCache(fontUrl);
          if (fontClassObjCache) {
            fontClassObj = fontClassObjCache;
          } else {
            const fontBlob = await fetchFont(fontUrl);
            fontClassObj = new attachmentClass(fontUrl, fontFileName, "TM");
            fontClassObj.imageBlob = fontBlob;
            fontClassObj.status = Status.finished;
            putAttachmentClassCache(fontClassObj);
          }

          const fontStyleDom = document.createElement("style");
          fontStyleDom.innerHTML = `.${fontName} {
  font-family: ${fontName}, 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif !important;
}
@font-face {
  font-family: ${fontName};
  src: url('${fontFileName}') format('woff2');
}
.hide {
  display: none;
}`;

          return [fontName, fontClassObj, fontStyleDom];
        }
        return [null, null, null];
      }

      const dom = await ggetHtmlDOM(chapterUrl, charset);
      const isPaid = () => {
        if (
          !dom.querySelector("#buy_content") &&
          dom.querySelector("div.noveltext")
        ) {
          return true;
        } else {
          return false;
        }
      };

      if (isPaid()) {
        const chapterName = (<HTMLElement>(
          dom.querySelector("div.noveltext h2")
        )).innerText.trim();

        const content = <HTMLElement>dom.querySelector("div.noveltext");
        if (content) {
          rm("hr", true, content);
          const rawAuthorSayDom = content.querySelector(".readsmall");
          let authorSayDom, authorSayText;
          if (rawAuthorSayDom) {
            let {
              dom: adom,
              text: atext,
              images: aimages,
            } = await cleanDOM(rawAuthorSayDom, "TM");
            [authorSayDom, authorSayText] = [adom, atext];
          }
          rm("div", true, content);
          content.innerHTML = content.innerHTML.replaceAll(
            "@无限好文，尽在晋江文学城",
            ""
          );
          let {
            dom: rawDom,
            text: rawText,
            images,
          } = await cleanDOM(content, "TM");
          if (rawAuthorSayDom && authorSayDom && authorSayText) {
            const hr = document.createElement("hr");
            authorSayDom.className = "authorSay";
            rawDom.appendChild(hr);
            rawDom.appendChild(authorSayDom);

            rawText =
              rawText + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
          }

          let finalDom = rawDom;
          let finalText = rawText;
          const [fontName, fontClassObj, fontStyleDom] = await getFont();
          if (fontName && fontClassObj && fontStyleDom) {
            // Replace Text
            finalText = await replaceJjwxcCharacter(fontName, rawText);

            //DOM
            images.push(fontClassObj);
            finalDom = document.createElement("div");

            // Replace DOM innerHTML
            const replacedDom = document.createElement("div");
            replacedDom.innerHTML = await replaceJjwxcCharacter(
              fontName,
              rawDom.innerHTML
            );

            //Backup raw DOM
            finalDom.appendChild(fontStyleDom);
            rawDom.className = `${fontName} hide`;
            finalDom.appendChild(rawDom);

            finalDom.appendChild(replacedDom);
          }

          return {
            chapterName: chapterName,
            contentRaw: content,
            contentText: finalText,
            contentHTML: finalDom,
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
