import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
} from "../main";
import {
  getHtmlDOM,
  ggetHtmlDOM,
  cleanDOM,
  co,
  cosCompare,
  sleep,
  rm,
  gfetch,
} from "../lib";
import {
  ruleClass,
  ruleClassNamespace,
  chapterParseObject,
  retryLimit,
} from "../rules";

export class jjwxc implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GB18030";
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector('h1[itemprop="name"] > span')
    )).innerText.trim();

    let introduction: string | null;
    const author = (<HTMLElement>(
      document.querySelector("td.sptd h2 a span")
    )).innerText
      .replace(/作\s+者:/, "")
      .trim();
    const introDom = document.querySelector("#novelintro");
    if (introDom === null) {
      introduction = null;
    } else {
      rm("img", true, <HTMLElement>introDom);
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>(
      document.querySelector(".noveldefaultimage")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];

    const cos: co[] = [];
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
              const co: co = {
                bookUrl: bookUrl,
                bookname: bookname,
                chapterUrl: chapterUrl,
                chapterName: chapterName,
                isVIP: isVIP(),
                isPaid: null,
                sectionName: sectionName,
                sectionNumber: sectionNumber,
                sectionChapterNumber: sectionChapterNumber,
              };
              cos.push(co);
            }
          } else {
            const chapterName = (<HTMLAnchorElement>a).innerText.trim();
            const chapterUrl = (<HTMLAnchorElement>a).href;
            const co: co = {
              bookUrl: bookUrl,
              bookname: bookname,
              chapterUrl: chapterUrl,
              chapterName: chapterName,
              isVIP: isVIP(),
              isPaid: null,
              sectionName: sectionName,
              sectionNumber: sectionNumber,
              sectionChapterNumber: sectionChapterNumber,
            };
            cos.push(co);
          }
        }
      }
    }

    cos.sort(cosCompare);
    for (let i = 0; i < cos.length; i++) {
      const chapterNumber = i + 1;
      let {
        bookUrl,
        bookname,
        chapterUrl,
        chapterName,
        isVIP,
        isPaid,
        sectionName,
        sectionNumber,
        sectionChapterNumber,
      } = cos[i];
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
        chapterParse,
        "GB18030"
      );
      const isLogin = () => {
        if (document.getElementById("jj_login")) {
          return false;
        } else {
          return true;
        }
      };
      if (isVIP && !isLogin()) {
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
      const dom = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("div.noveltext h2")
      )).innerText.trim();

      const content = <HTMLElement>dom.querySelector("div.noveltext");
      if (content) {
        rm("div", true, content);
        content.innerHTML = content.innerHTML.replace(
          "@无限好文，尽在晋江文学城",
          ""
        );
        let { dom, text, images } = cleanDOM(content, "TM");
        return {
          chapterName: chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
        };
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

          const _fontName = document.querySelector("div.noveltext")
            ?.classList[1];
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
        function fetchFont(fontUrl: string): Promise<Blob | null> {
          console.debug(
            `[Chapter]请求 ${fontUrl} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );
          return gfetch(fontUrl, {
            headers: {
              accept: "*/*",
              Referer: chapterUrl,
            },
            responseType: "blob",
          }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return <Blob>response.response;
            } else {
              console.error(
                `[Chapter]请求 ${fontUrl} 失败 Referer ${chapterUrl}`
              );
              if (retryTime < retryLimit) {
                retryTime++;
                return fetchFont(fontUrl);
              } else {
                return null;
              }
            }
          });
        }

        const [fontName, fontUrl] = getFontInfo();
        if (fontName && fontUrl) {
          const fontBlob = await fetchFont(fontUrl);
          const fontFileName = `${fontName}.woff2`;
          if (fontBlob) {
            const fontClassObj = new attachmentClass(
              fontUrl,
              fontFileName,
              "TM"
            );
            fontClassObj.imageBlob = fontBlob;
            fontClassObj.status = Status.finished;

            const fontStyleDom = document.createElement("style");
            fontStyleDom.innerHTML = `.${fontName} {
  font-family: ${fontName}, 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif !important;
}
@font-face {
  font-family: ${fontName};
  src: url('${fontFileName}') format('woff2');
}`;

            return [fontName, fontClassObj, fontStyleDom];
          }
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
          rm("div", true, content);
          content.innerHTML = content.innerHTML.replace(
            "@无限好文，尽在晋江文学城",
            ""
          );
          let { dom: cdom, text, images } = cleanDOM(content, "TM");

          let [fontName, fontClassObj, fontStyleDom] = await getFont();
          if (fontName && fontClassObj && fontStyleDom) {
            images.push(fontClassObj);
            cdom.appendChild(fontStyleDom);
            cdom.className = fontName;
          }

          return {
            chapterName: chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: cdom,
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

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
