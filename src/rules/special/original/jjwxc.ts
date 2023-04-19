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
import * as CryptoJS from "crypto-js";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

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
          let fontNameI: string;
          let fontUrlI: string;

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

          const _fontName =
            document.querySelector("div.noveltext")?.classList[1];
          if (_fontName) {
            fontNameI = _fontName;
            fontUrlI =
              document.location.protocol +
              `//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
            return [fontNameI, fontUrlI];
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
        // https://static.jjwxc.net/scripts/jjcontent.js?ver=20220527

        const children = doc.querySelector("#contentvars")?.children;
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
        const _readerid = (unsafeWindow as JJWindow).getCookie("readerid");
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

        return CryptoJS.DES.decrypt(
          data["content"],
          CryptoJS.enc.Utf8.parse(key),
          { iv: CryptoJS.enc.Utf8.parse(iv) }
        ).toString(CryptoJS.enc.Utf8);
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
    interface vipChapterInfo{
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
    function decodeVIPText(text: string){ 
      const keyHex = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
      const ivHex = CryptoJS.enc.Utf8.parse("1ae2c94b");
      const decrypted = CryptoJS.DES.decrypt(text, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
    function getCookieObj(pairKey:string) {
      const cookieStr = document.cookie;
      const pairList = cookieStr.split(';');
      for (let _i = 0, pairList_1 = pairList; _i < pairList_1.length; _i++) {
        const pair = pairList_1[_i];
        const _a = pair.trim().split('='), key = _a[0], value = _a[1];
        if (key == pairKey) return value;
      }
      return "error2333";
    }
    async function getChapter(): Promise<ChapterParseObject> {
      let chapterGetInfoUrl = chapterUrl.replace("id", "Id");
      chapterGetInfoUrl = chapterGetInfoUrl.replace("id", "Id");
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://www.jjwxc.net/onebook.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://my.jjwxc.net/onebook_vip.php?",
        "https://android.jjwxc.net/androidapi/androidChapterBatchDownload?"
      );
      const sid = getCookieObj("sid");
      if (sid == "error2333")
        log.warn(
          `请登录一下m.jjwxc.net再使用！`
        );
      if (isVIP) {
        chapterGetInfoUrl = chapterGetInfoUrl.replace("chapterId", "chapterIds");
        chapterGetInfoUrl += "&versionCode=287&token=" + sid + "&noteislock=1";
      }
      async function getChapterInfo(url: string): Promise<ChapterInfo> {
        log.debug(
          `请求地址: ${url}, Referrer: ${chapterUrl}, 重试次数: ${retryTime}`
        );
        return new Promise((resolve) => {
          _GM_xmlhttpRequest({
            url: url,
            headers: {
              accept: "application/json",
              referer: "http://android.jjwxc.net?v=287",
              not_tip: "updateTime",
              "user-agent":
                "Mozilla/ 5.0(Linux; Android 12; Pixel 3 XL Build / SP1A.210812.016.C1; wv) AppleWebKit / 537.36(KHTML, like Gecko) Version / 4.0 Chrome / 108.0.5359.128 Mobile Safari / 537.36 / JINJIANG - Android / 287(Pixel3XL; Scale / 3.5)",
              "accept-encoding": "gzip",
            },
            method: "GET",
            onload: function (response) {
              if (response.status === 200) {
                retryTime = 0;
                if (isVIP) {
                  const resultI: vipChapterInfo = JSON.parse(response.responseText);
                  resolve(resultI.downloadContent[0]);
                } else {
                  const resultI: ChapterInfo = JSON.parse(response.responseText);
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
          log.error(`请求 ${chapterGetInfoUrl.toString()} 失败`);
          throw new Error(`请求 ${chapterGetInfoUrl.toString()} 失败`);
        }
        result = await getChapterInfo(chapterGetInfoUrl.toString());
      }
      retryTime = 0;
      if ("content" in result) {
        let content = result.content;
        if (isVIP)
          content = decodeVIPText(content);
        let postscript = result.sayBody;
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
      return getChapter(); //vipChapter();
    } else {
      return getChapter(); //publicChapter();
    }
  }
}
