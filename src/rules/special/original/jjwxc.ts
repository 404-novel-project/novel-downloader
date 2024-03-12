import {
  getAttachment,
  getAttachmentClassCache,
  getRandomName,
  putAttachmentClassCache,
} from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, gfetch, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rms } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { ReferrerMode, Status } from "../../../main/main";
import { AttachmentClass } from "../../../main/Attachment";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { retryLimit } from "../../../setting";
import { replaceJjwxcCharacter } from "../../lib/jjwxcFontDecode";
import { UnsafeWindow } from "../../../global";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

import * as csstree from "css-tree";
import * as CryptoJS from "crypto-js";

type JJWindow = UnsafeWindow & { getCookie: (key: string) => string };

export class Jjwxc extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
    this.charset = "GB18030";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const getInformationBlocked = () => {
      const fl = Array.from(document.querySelectorAll(".smallreadbody")).filter(
        (div) =>
          (div as HTMLDivElement).innerText.includes(
            "文案信息审核未通过，等待作者修改后重新审核"
          )
      );
      return fl.length !== 0;
    };

    let bookname: string;
    const additionalMetadate: BookAdditionalMetadate = {};
    let author = "";
    let introduction: string | null = null;
    let introductionHTML: HTMLElement | null = null;
    let introCleanimages: AttachmentClass[] | null = null;
    if (!getInformationBlocked()) {
      bookname = (
        document.querySelector('h1[itemprop="name"] > span') as HTMLElement
      ).innerText.trim();

      author = (
        document.querySelector("td.sptd h2 a span") as HTMLElement
      ).innerText
        .replace(/作\s+者:/, "")
        .trim();
      const introDom = document.querySelector("#novelintro");
      [introduction, introductionHTML, introCleanimages] = await introDomHandle(
        introDom
      );
      if (introCleanimages) {
        additionalMetadate.attachments = [...introCleanimages];
      }

      const coverUrl = (
        document.querySelector(".noveldefaultimage") as HTMLImageElement
      ).src;
      if (coverUrl) {
        getAttachment(
          coverUrl,
          this.attachmentMode,
          "cover-",
          false,
          getRandomName(),
          { referrerMode: ReferrerMode.none }
        )
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }

      let tags = (
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(1) > span:nth-child(2)"
        ) as HTMLSpanElement
      ).innerText.split("-");
      tags = tags.concat(
        Array.from(
          document.querySelectorAll("div.smallreadbody:nth-child(3) > span > a")
        ).map((a) => (a as HTMLAnchorElement).innerText)
      );
      const perspective = (
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(2)"
        ) as HTMLLIElement
      ).innerText.replace("\n", "");
      const workStyle = (
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(3)"
        ) as HTMLLIElement
      ).innerText.replace("\n", "");
      tags.push(perspective);
      tags.push(workStyle);
      additionalMetadate.tags = tags;
    } else {
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(3000);
      bookname = (
        document.querySelector(
          "td[id^=comment_] span.coltext > a"
        ) as HTMLAnchorElement
      )?.innerText
        .trim()
        .replace(/[《》]/g, "");
      window.scrollTo(0, 0);
      if (!bookname) {
        throw new Error("抓取书名出错");
      }
      const authorPageUrl = (
        document.querySelector(
          "#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a"
        ) as HTMLAnchorElement
      )?.href;
      if (authorPageUrl) {
        const authorPage = await getHtmlDOM(authorPageUrl, this.charset);
        author =
          (authorPage.querySelector('span[itemprop="name"]') as HTMLSpanElement)
            ?.innerText ?? author;
      }
    }

    const chapters: Chapter[] = [];
    const trList = document.querySelectorAll("#oneboolt > tbody > tr");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const tr of Array.from(trList)) {
      if (tr.getAttribute("bgcolor")) {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (
          tr.querySelector("b.volumnfont") as HTMLElement
        )?.innerText.trim();
      } else if (tr.getAttribute("itemprop")) {
        chapterNumber++;
        sectionChapterNumber++;
        const td = tr.querySelector("td:nth-child(2)");
        const a = td?.querySelector("a:nth-child(1)");
        const isLocked = () => {
          return (td as HTMLElement)?.innerText.trim() === "[锁]";
        };
        const isVIP = () => {
          return !!a?.getAttribute("onclick");
        };

        if (!isLocked()) {
          if (isVIP()) {
            const chapterName = (a as HTMLAnchorElement).innerText.trim();
            const chapterUrl = (a as HTMLAnchorElement).getAttribute("rel");
            if (chapterUrl) {
              const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP(),
                isPaid: null,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
              });
              const isLogin = () => {
                return !document.getElementById("jj_login");
              };
              if (isVIP() && !isLogin()) {
                chapter.status = Status.aborted;
              }
              chapters.push(chapter);
            }
          } else {
            const chapterName = (a as HTMLAnchorElement).innerText.trim();
            const chapterUrl = (a as HTMLAnchorElement).href;
            const chapter = new Chapter({
              bookUrl,
              bookname,
              chapterUrl,
              chapterNumber,
              chapterName,
              isVIP: isVIP(),
              isPaid: null,
              sectionName,
              sectionNumber,
              sectionChapterNumber,
              chapterParse: this.chapterParse,
              charset: this.charset,
              options: {},
            });
            const isLogin = () => {
              return !document.getElementById("jj_login");
            };
            if (isVIP() && !isLogin()) {
              chapter.status = Status.aborted;
            }
            chapters.push(chapter);
          }
        } else {
          const chapterName = "[锁]";
          const chapterUrl = "";
          const chapter = new Chapter({
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            isVIP: false,
            isPaid: null,
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            chapterParse: this.chapterParse,
            charset: this.charset,
            options: {},
          });
          chapter.status = Status.aborted;
          chapters.push(chapter);
        }
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
    options: object
  ) {
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector("div.noveltext h2") as HTMLElement
      ).innerText.trim();

      const content = doc.querySelector("div.noveltext") as HTMLElement;
      if (content) {
        rm("hr", true, content);
        const rawAuthorSayDom = content.querySelector(".readsmall");
        let authorSayDom;
        let authorSayText;
        if (rawAuthorSayDom) {
          const { dom: adom, text: atext } = await cleanDOM(
            rawAuthorSayDom,
            "TM"
          );
          [authorSayDom, authorSayText] = [adom, atext];
        }
        rm("div", true, content);
        rms(["@无限好文，尽在晋江文学城"], content);
        // eslint-disable-next-line prefer-const
        let { dom, text, images } = await cleanDOM(content, "TM");
        if (rawAuthorSayDom && authorSayDom && authorSayText) {
          const hr = document.createElement("hr");
          authorSayDom.className = "authorSay";
          dom.appendChild(hr);
          dom.appendChild(authorSayDom);

          text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
        }
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
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
      async function getFont(
        dom: Document
      ): Promise<
        [string | null, AttachmentClass | null, HTMLStyleElement | null]
      > {
        function getFontInfo() {
          const s = dom.querySelectorAll("body > style")[1] as HTMLStyleElement;
          let fontNameI = "";
          let fontUrlI = "";

          if (s.sheet) {
            const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];

            const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
            const m2 = f.cssText.match(/{(.*)}/);
            if (m1 && m2) {
              fontNameI = m1[0];

              const ft = m2[1];
              for (const k of ft.split(",")) {
                if (k.includes('format("woff2")')) {
                  const m3 = k.match(/url\("(.*)"\)\s/);
                  if (m3) {
                    fontUrlI = document.location.protocol + m3[1];
                    return [fontNameI, fontUrlI];
                  }
                }
              }
            }
          }

          if (fontNameI !== "") {
            fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
            return [fontNameI, fontUrlI];
          } else {
            const css = dom.querySelector("div.noveltext")?.classList;
            if (css) {
              fontNameI = Array.from(css).filter((cn) =>
                cn.startsWith("jjwxcfont_")
              )[0];
              if (fontNameI) {
                fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
                return [fontNameI, fontUrlI];
              }
            }
          }

          return [null, null];
        }

        let retryTime = 0;

        function fetchFont(fontUrlI: string): Promise<Blob | null | void> {
          log.debug(
            `[Chapter]请求 ${fontUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );
          return gfetch(fontUrlI, {
            headers: {
              accept: "*/*",
              Referer: chapterUrl,
            },
            responseType: "blob",
          })
            .then((response) => {
              if (response.status >= 200 && response.status <= 299) {
                return response.response as Blob;
              } else {
                log.error(
                  `[Chapter]请求 ${fontUrlI} 失败 Referer ${chapterUrl}`
                );
                if (retryTime < retryLimit) {
                  retryTime++;
                  return fetchFont(fontUrlI);
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
          let fontClassObj: AttachmentClass;
          const fontClassObjCache = getAttachmentClassCache(fontUrl);
          if (fontClassObjCache) {
            fontClassObj = fontClassObjCache;
          } else {
            const fontBlob = await fetchFont(fontUrl);
            fontClassObj = new AttachmentClass(fontUrl, fontFileName, "TM");
            fontClassObj.Blob = fontBlob;
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

      function decrypt(doc: Document) {
        function getDecryptContent() {
          function getCookie(name: string): null | string {
            let cookies: string | null = "";
            const dc = document.cookie;
            const prefix = name + "=";
            let begin = dc.indexOf("; " + prefix);
            if (begin == -1) {
              begin = dc.indexOf(prefix);
              if (begin != 0) cookies = null;
            } else {
              begin += 2;
            }
            let end = document.cookie.indexOf(";", begin);
            if (end == -1) {
              end = dc.length;
            }
            if (cookies != null) {
              cookies = unescape(dc.substring(begin + prefix.length, end));
            }
            if (cookies == null && name != "token" && name != "managertoken") {
              const tokenKey = [
                "readerid",
                "ubuntu",
                "ptid",
                "email",
                "authorid",
                "cookietime",
                "islocaluser",
                "authorname",
                "newwindow",
                "showname",
                "examineright",
                "logintype",
                "certification",
                "userclosecomment",
                "shareweibo",
                "commentfilterversion",
              ]; //xwb
              const managerKey = [
                "managerid",
                "managertoken",
                "moderatorName",
                "isAdmin",
                "managername",
                "loginSource",
                "commentSearch",
              ];
              if (tokenKey.indexOf(name) > -1) {
                let token: null | string | string[] = getCookie("token");
                const index = tokenKey.indexOf(name);
                if (token != null) {
                  token = strdecode(token);
                  token = token.split("|");
                  return token[index];
                }
              } else if (managerKey.indexOf(name) > -1) {
                let token: null | string | string[] = getCookie("managertoken");
                const index = managerKey.indexOf(name);
                if (token != null) {
                  token = strdecode(token);
                  token = token.split("|");
                  return token[index];
                }
              }
              return null;
            }
            return cookies;
          }

          function strdecode(str: string) {
            return utf8to16(decode64(str));
          }

          const base64DecodeChars = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54,
            55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3,
            4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
            22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32,
            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, -1, -1, -1, -1, -1,
          ];

          function decode64(str: string) {
            let c1, c2, c3, c4;
            let i, out;
            const len = str.length;
            i = 0;
            out = "";
            while (i < len) {
              do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
              } while (i < len && c1 == -1);
              if (c1 == -1) break;
              do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
              } while (i < len && c2 == -1);
              if (c2 == -1) break;
              out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
              do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return out;
                c3 = base64DecodeChars[c3];
              } while (i < len && c3 == -1);
              if (c3 == -1) break;
              out += String.fromCharCode(
                ((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2)
              );
              do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return out;
                c4 = base64DecodeChars[c4];
              } while (i < len && c4 == -1);
              if (c4 == -1) break;
              out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
          }

          function utf8to16(str: string) {
            let out, i, c;
            let char2, char3;
            out = "";
            const len = str.length;
            i = 0;
            while (i < len) {
              c = str.charCodeAt(i++);
              switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                  // 0xxxxxxx
                  out += str.charAt(i - 1);
                  break;
                case 12:
                case 13:
                  // 110x xxxx    10xx xxxx
                  char2 = str.charCodeAt(i++);
                  out += String.fromCharCode(
                    ((c & 0x1f) << 6) | (char2 & 0x3f)
                  );
                  break;
                case 14:
                  // 1110 xxxx   10xx xxxx   10xx xxxx
                  char2 = str.charCodeAt(i++);
                  char3 = str.charCodeAt(i++);
                  out += String.fromCharCode(
                    ((c & 0x0f) << 12) |
                    ((char2 & 0x3f) << 6) |
                    ((char3 & 0x3f) << 0)
                  );
                  break;
              }
            }

            return out;
          }

          // https://static.jjwxc.net/scripts/jjcontent.js?ver=20220527

          const children = doc.querySelector(
            "#contentlets, #contentvars"
          )?.children;
          if (!children) {
            throw new Error("获取章节失败");
          }
          const data: Record<string, string> = {};
          Array.from(children).forEach(
            (item) =>
            (data[item.getAttribute("name") as string] = item.getAttribute(
              "value"
            ) as string)
          );

          const novelid = parseInt(data["novelid"]);
          const chapterid = parseInt(data["chapterid"]);
          const _readerid = getCookie("readerid");
          if (!_readerid) {
            throw new Error("无法获取客户号");
          }
          const readerid = parseInt(_readerid);
          const accessKey = data["accessKey"];

          const _hash =
            novelid + "." + chapterid + "." + readerid + "." + accessKey;
          const hash = CryptoJS.MD5(_hash).toString();

          const convert = (input: string) => {
            let out = 0;
            for (let i = 0; i < input.length; i++) {
              out += input.charCodeAt(i);
            }
            return out;
          };
          const accessKeyConvert = convert(accessKey);
          const hashSlice =
            hash.slice(accessKeyConvert % hash.length) +
            hash.slice(0, accessKeyConvert % hash.length);
          let hashSlice16 = hashSlice.slice(0, 16);
          let hashSlice_16 = hashSlice.slice(-16);
          if (hash.charCodeAt(0)) {
            [hashSlice16, hashSlice_16] = [hashSlice_16, hashSlice16];
          }
          const cryptInfo = data["cryptInfo"];
          const _decrypedtCryptInfo = CryptoJS.DES.decrypt(
            cryptInfo,
            CryptoJS.enc.Utf8.parse(hashSlice16),
            {
              iv: CryptoJS.enc.Utf8.parse(hashSlice_16),
            }
          ).toString(CryptoJS.enc.Utf8);

          interface cryptInfo {
            time: number;
            key: string;
            ver: string;
          }

          const decrypedtCryptInfo = JSON.parse(
            atob(_decrypedtCryptInfo)
          ) as cryptInfo;
          const verifyTime = (obj: cryptInfo) => {
            if (new Date()["getTime"]() / 1000 - obj["time"] > 86400) {
              throw new Error(
                "章节内容解码失败，内容生成时间与当前设备时间相差过大，请刷新页面或校准当前设备时间。内容生成时间为:" +
                new Date(obj["time"] * 100).toLocaleString()
              );
            }
          };
          verifyTime(decrypedtCryptInfo);
          const md5sum = CryptoJS.MD5(
            decrypedtCryptInfo["key"] + decrypedtCryptInfo["time"] + readerid
          ).toString();
          const t =
            md5sum["slice"](accessKeyConvert % md5sum["length"]) +
            md5sum["slice"](0, accessKeyConvert % md5sum["length"]);
          const key = t.slice(0, 16);
          const iv = t.slice(-16);

          const decryptContent = CryptoJS.DES.decrypt(
            data["content"],
            CryptoJS.enc.Utf8.parse(key),
            { iv: CryptoJS.enc.Utf8.parse(iv) }
          ).toString(CryptoJS.enc.Utf8);
          return decryptContent;
        }

        const decryptContent = getDecryptContent();
        const decryptContentDoc = new DOMParser().parseFromString(
          decryptContent,
          "text/html"
        );

        function decryptCssEncrypt() {
          // 修复CSS加密文本
          // https://github.com/404-novel-project/novel-downloader/issues/521

          const cssText = Array.from(doc.querySelectorAll("style"))
            .map((s) => s.innerText)
            .join("\n");
          const ast = csstree.parse(cssText);

          csstree.walk(ast, function (node) {
            if (node.type === "Declaration" && node.property === "content") {
              const value = (
                (
                  node.value as csstree.Value
                ).children.toArray()?.[0] as csstree.StringNode
              ).value;

              const selectorList = (
                this.rule?.prelude as csstree.SelectorList
              ).children.toArray();
              for (const s of selectorList) {
                const _selector = (s as csstree.Selector).children.toArray();
                const selector = new Map(
                  _selector.map((sc) => [
                    sc.type,
                    (
                      sc as
                      | csstree.ClassSelector
                      | csstree.PseudoElementSelector
                    ).name,
                  ])
                );
                const classSelector = selector.get("ClassSelector");
                const pseudoClassSelector = selector.get("PseudoClassSelector");

                if (classSelector && pseudoClassSelector && value) {
                  const sNode = decryptContentDoc.querySelector(
                    `.${classSelector}`
                  );
                  if (sNode) {
                    const pNode = sNode.parentNode;

                    const iNode = decryptContentDoc.createElement("span");
                    iNode.id = `${classSelector}-${pseudoClassSelector}`;
                    iNode.innerText = value;

                    if (pseudoClassSelector === "before") {
                      pNode?.insertBefore(iNode, sNode);
                    } else if (pseudoClassSelector === "after") {
                      pNode?.insertBefore(iNode, sNode.nextSibling);
                    }
                  }
                }
              }
            }
          });

          csstree.walk(ast, function (node) {
            if (node.type === "Declaration" && node.property === "display") {
              const value = (
                (
                  node.value as csstree.Value
                ).children.toArray()?.[0] as csstree.Identifier
              ).name;

              const selectorList = (
                this.rule?.prelude as csstree.SelectorList
              ).children.toArray();
              for (const s of selectorList) {
                const _selector = (s as csstree.Selector).children.toArray();
                const selector = new Map(
                  _selector.map((sc) => [
                    sc.type,
                    (
                      sc as
                      | csstree.ClassSelector
                      | csstree.PseudoElementSelector
                    ).name,
                  ])
                );
                const classSelector = selector.get("ClassSelector");
                const pseudoClassSelector = selector.get("PseudoClassSelector");

                if (classSelector && pseudoClassSelector && value === "none") {
                  decryptContentDoc
                    .querySelector(`#${classSelector}-${pseudoClassSelector}`)
                    ?.remove();
                }
              }
            }
          });
        }
        decryptCssEncrypt();

        return decryptContentDoc.body.innerHTML;
      }

      const doc = await ggetHtmlDOM(chapterUrl, charset);
      const isPaidF = () => {
        return !!(
          !doc.querySelector("#buy_content") &&
          doc.querySelector("div.noveltext")
        );
      };

      if (isPaidF()) {
        const ChapterName = (
          doc.querySelector("div.noveltext h2") as HTMLElement
        ).innerText.trim();

        const content = document.createElement("div");
        content.innerHTML = decrypt(doc);
        rm("hr", true, content);
        const rawAuthorSayDom = doc.querySelector(".readsmall");
        let authorSayDom;
        let authorSayText;
        if (rawAuthorSayDom) {
          rm("hr", true, rawAuthorSayDom as HTMLElement);
          const { dom: adom, text: atext } = await cleanDOM(
            rawAuthorSayDom,
            "TM"
          );
          [authorSayDom, authorSayText] = [adom, atext];
        }
        rm("div", true, content);
        rms(["@无限好文，尽在晋江文学城"], content);
        let {
          dom: rawDom, // eslint-disable-line
          text: rawText,
          images, // eslint-disable-line
        } = await cleanDOM(content, "TM");
        if (rawAuthorSayDom && authorSayDom && authorSayText) {
          const hr = document.createElement("hr");
          authorSayDom.className = "authorSay";
          rawDom.appendChild(hr);
          rawDom.appendChild(authorSayDom);

          rawText = rawText + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
        }

        let finalDom = rawDom;
        let finalText = rawText;
        const [fontName, fontClassObj, fontStyleDom] = await getFont(doc);
        if (fontName && fontClassObj && fontStyleDom) {
          // Replace Text
          finalText = await replaceJjwxcCharacter(fontName, rawText);

          // DOM
          images.push(fontClassObj);
          finalDom = document.createElement("div");

          // Replace DOM innerHTML
          const replacedDom = document.createElement("div");
          replacedDom.innerHTML = await replaceJjwxcCharacter(
            fontName,
            rawDom.innerHTML
          );

          // Backup raw DOM
          finalDom.appendChild(fontStyleDom);
          rawDom.className = `${fontName} hide`;
          finalDom.appendChild(rawDom);

          finalDom.appendChild(replacedDom);
        }

        return {
          chapterName: ChapterName,
          contentRaw: content,
          contentText: finalText,
          contentHTML: finalDom,
          contentImages: images,
          additionalMetadate: null,
        };
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
    interface vipChapterInfo {
      downloadContent: ChapterInfo[];
    }
    interface ChapterInfo {
      chapterId: string; //"39",
      chapterName: string; //"另一种可能",
      chapterIntro: string; //"算是番外吗？",
      chapterSize: string; //"1484",
      chapterDate: string; //"2012-03-17 20:54:01",
      sayBody: string; //"\r\n原谅我挤牙膏一样的速度吧，最近各种卡文，各种想开新坑啊（给自己两个大耳瓜子= =）如果我某天我突然失踪了，不要担心，六月我还会回来的（再给自己两个大耳瓜子= =）尽量不坑（再再给自己两个大耳瓜子= =）",
      upDown: number; //1,
      update: number; //1,
      content: string; //"另一种可能\n
      isvip: number; //0,
      authorid: string; //"376815",
      autobuystatus: string; //"0",
      noteislock: string; //"1"
      message: string; //"[本章节已锁定]"
    }
    let retryTime = 0;
    function decodeVIPResopnce(responseHeader: string, responseText: string) {
      let v43, v38, dest;
      let accesskey = "accesskey", keyString = "keystring";
      const arr = responseHeader.trim().split(/[\r\n]+/);
      const headerMap = { "accesskey": "0", "keystring": "0" };
      arr.forEach((line) => {
        const parts = line.split(": ");
        const header = parts.shift();
        const value = parts.join(": ");
        if (header == "accesskey")
          accesskey = value;
        else if (header == "keystring")
          keyString = value;
      });
      const content = String(responseText);
      const accesskeyLen = accesskey.length;
      let v9 = 0;
      const v6 = String(accesskey[accesskeyLen - 1]).charCodeAt(0);
      for (let i = 0; i < accesskeyLen; i++) {
        v9 += accesskey[i].charCodeAt(0);
      }
      const v15 = v9 % keyString.length;
      const v17 = v9 / 65;
      const v18 = keyString.length;
      if (v17 + v15 > v18) {
        v43 = keyString.substring(v15, (v18 - v15) + v15)
      } else {
        v43 = keyString.substring(v15, v17 + v15)
      }
      const v32 = content.length;
      if ((v6 & 1) != 0) {
        v38 = content.substring(v32 - 12, v32)
        dest = content.substring(0, v32 - 12)
      } else {
        v38 = content.substring(0, 12);
        dest = content.substring(12, content.length);
      }
      const key = CryptoJS.MD5(v43 + v38).toString().substring(0, 8);
      const iv = CryptoJS.MD5(v38).toString().substring(0, 8);
      const keyHex = CryptoJS.enc.Utf8.parse(key);
      const ivHex = CryptoJS.enc.Utf8.parse(iv);
      let result = '{"message":"try again!"}';
      try {
        const decrypted = CryptoJS.DES.decrypt(dest, keyHex, {
          iv: ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        result = decrypted.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        //      log.debug(`请求content：${content}`);
        result = '{"message":"try again!"}';
      }
      return result;
    }
    function decodeVIPText(text: string) {
      const keyHex = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
      const ivHex = CryptoJS.enc.Utf8.parse("1ae2c94b");
      const decrypted = CryptoJS.DES.decrypt(text, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }

    function getCookieObj(pairKey: string) {
      const cookieStr = document.cookie;
      const pairList = cookieStr.split(";");
      for (let _i = 0, pairList_1 = pairList; _i < pairList_1.length; _i++) {
        const pair = pairList_1[_i];
        const _a = pair.trim().split("="),
          key = _a[0],
          value = _a[1];
        if (key == pairKey) return value;
      }
      return "error2333";
    }
    async function getChapterByApi(): Promise<ChapterParseObject> {
      let chapterGetInfoUrl = chapterUrl.replace("id", "Id");
      chapterGetInfoUrl = chapterGetInfoUrl.replace("id", "Id");
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://www.jjwxc.net/onebook.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://my.jjwxc.net/onebook_vip.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      //let sid = getCookieObj("token");
      if (isVIP) {
        // if (sid == "error2333"){
        //   log.error(
        //     `认证错误`
        //   );
        //   throw new Error(`认证错误`);
        // }else{
        if (typeof (unsafeWindow as UnsafeWindow).tokenOptions === "object") {
          const sid = (unsafeWindow as UnsafeWindow).tokenOptions?.Jjwxc;
          //sid = self.atob(decodeURIComponent(sid)).replace(/\|\|.*/, '').replace(/\|/, '_').replace(/\|.*/, '');
          // chapterGetInfoUrl = chapterGetInfoUrl.replace(
          //   "chapterId",
          //   "chapterIds"
          // );
          chapterGetInfoUrl +=
            "&versionCode=349&token=" + sid;
        } else {
          throw new Error(
            `当前需要手动捕获android版app token,详见github主页说明`
          );
        }
        //}
      }

      async function getChapterInfo(url: string): Promise<ChapterInfo> {
        log.debug(
          `请求地址: ${url}, Referrer: ${chapterUrl}, 重试次数: ${retryTime}`
        );
        return new Promise((resolve) => {
          _GM_xmlhttpRequest({
            url: url,
            headers: {
              //   accept: "application/json",
              referer: "http://android.jjwxc.net?v=349",
              //    not_tip: "updateTime",
              "user-agent": "Dalvik/2.1.0",
              //  "accept-encoding": "gzip",
            },
            method: "GET",
            onload: function (response) {
              if (response.status === 200) {
                retryTime = 0;
                if (isVIP) {
                  let decodeResponseText = String(response.responseText);
                  let resultI = JSON.parse('{"message":"try again!"}');
                  try {
                    resultI = JSON.parse(decodeResponseText);
                  } catch (e) {
                    decodeResponseText = decodeVIPResopnce(response.responseHeaders, String(response.responseText));
                  }
                  try {
                    resultI = JSON.parse(decodeResponseText);
                  } catch (e) {
                    log.debug(`json：${decodeResponseText}`);
                    resultI = JSON.parse('{"message":"try again!"}');
                  }
                  resolve(resultI);
                } else {
                  const resultI: ChapterInfo = JSON.parse(
                    response.responseText
                  );
                  resolve(resultI);
                }
              } else {
                const resultI: ChapterInfo = JSON.parse(
                  '{"message":"try again!"}'
                );
                resolve(resultI);
              }
            },
          });
        });
      }
      let result = await getChapterInfo(chapterGetInfoUrl.toString());
      while ("message" in result && result.message == "try again!") {
        retryTime++;
        if (retryTime > retryLimit) {
          retryTime = 0;
          log.error(`请求${chapterGetInfoUrl.toString()}$失败`);
          throw new Error(`请求${chapterGetInfoUrl.toString()}$失败`);
        }
        result = await getChapterInfo(chapterGetInfoUrl.toString());
      }
      retryTime = 0;
      if ("content" in result) {
        let content = result.content;
        if (isVIP) content = decodeVIPText(content);
        let postscript = result.sayBody;
        if (isVIP) postscript
        if (result.sayBody == null) postscript = " ";
        const contentRaw = document.createElement("pre");
        contentRaw.innerHTML = content;
        let contentText = content
          .split("\n")
          .map((p: string) => p.trim())
          .join("\n\n");
        const _contentHTML = document.createElement("div");
        _contentHTML.innerHTML = content
          .split("\n")
          .map((p: string) => p.trim())
          .map((p: string) => {
            if (p.length === 0) {
              return "<p><br/></p>";
            } else {
              return `<p>${p}</p>`;
            }
          })
          .join("\n");
        const contentHTML = document.createElement("div");
        contentHTML.className = "main";

        const hr = document.createElement("hr");
        const authorSayDom = document.createElement("div");
        authorSayDom.innerHTML = postscript
          .split("\n")
          .map((p: string) => {
            if (p.length === 0) {
              return "<p><br/></p>";
            } else {
              return `<p>${p}</p>`;
            }
          })
          .join("\n");

        contentHTML.appendChild(_contentHTML);
        contentHTML.appendChild(hr);
        contentHTML.appendChild(authorSayDom);

        contentRaw.innerHTML = [
          contentRaw.innerHTML,
          "-".repeat(20),
          postscript,
        ].join("\n\n");
        contentText = [contentText, "-".repeat(20), postscript].join("\n\n");
        await sleep(2000 + Math.round(Math.random() * 2000));
        return {
          chapterName,
          contentRaw,
          contentText,
          contentHTML,
          contentImages: null,
          additionalMetadate: null,
        };
      } else {
        await sleep(1000 + Math.round(Math.random() * 1000));
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
    if (isVIP) {
      if (typeof (unsafeWindow as UnsafeWindow).tokenOptions === "object") {
        return getChapterByApi();
      } else {
        return vipChapter();
      }
    } else {
      return getChapterByApi();
    }
  }
}
