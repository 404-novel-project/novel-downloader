import { mkRuleClass } from "./template";
import { Status } from "../../main/main";
import { chapterHiddenFix, nextPageParse } from "../../lib/rule";
import { rm, sandboxed } from "../../lib/dom";
import { Book } from "../../main/Book";
import { Chapter } from "../../main/Chapter";
import { table } from "../lib/linovelib";
import { log } from "../../log";
import { sleep } from "../../lib/misc";

const chapterFixSleepTime = 2000;
const concurrencyLimit = 1;
const sleepTime = 1200;
const maxSleepTime = 6000;
const maxRunLimit = 1;
export const linovelib = () => {
  const ToCurl = document.location.href;
  const bookUrl = ToCurl.replace(/\/catalog$/, ".html");
  return mkRuleClass({
    bookUrl,
    anotherPageUrl: bookUrl,
    ToCUrl: ToCurl,
    getBookname: () =>
      (
        document.querySelector(".book-meta > h1") as HTMLElement
      ).innerText.trim(),
    getAuthor: () =>
      (
        document.querySelector(
          ".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim(),
    getIntroDom: (doc) =>
      doc.querySelector(".book-dec > p:nth-child(1)") as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) =>
      (doc.querySelector(".book-img > img") as HTMLImageElement).src,
    additionalMetadatePatch: (additionalMetadate, doc) => {
      additionalMetadate.tags = Array.from(
        doc.querySelectorAll(".book-label a")
      ).map((a) => (a as HTMLAnchorElement).innerText.trim());
      return additionalMetadate;
    },
    getAList: () => document.querySelectorAll(".chapter-list li.col-4 > a"),
    getSections: () => document.querySelectorAll("#volume-list > div.volume"),
    getSName: (sElem) => (sElem.querySelector(".volume-info >h2") as HTMLElement)?.innerText.trim(),
    postHook: (chapter) => {
      if (chapter.chapterUrl.startsWith("javascript")) {
        chapter.status = Status.aborted;
      }
      return chapter;
    },
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const invalidTest = (c: Chapter) =>
          c.chapterUrl.startsWith("javascript");
        const getPrevHref = (doc: Document) =>
          doc.querySelector<HTMLAnchorElement>(".mlfy_page > a:nth-child(1)")
            ?.href;
        await chapterHiddenFix(
          book,
          invalidTest,
          getPrevHref,
          concurrencyLimit,
          chapterFixSleepTime,
        );
        return book;
      };
      return classThis;
    },
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#TextContent",
        domPatch: domFontFix,
        contentPatch: (_content) => {
          rm(".tp", true, _content);
          rm(".bd", true, _content);
          _content.querySelectorAll("img.lazyload").forEach((e) => {
            (e as HTMLImageElement).src = (e as HTMLElement).dataset.src || (e as HTMLImageElement).src;
            return e;
          });
          return _content;
        },
        getNextPage: (doc) =>
          (
            doc.querySelector(
              ".mlfy_page > a:nth-child(5)"
            ) as HTMLAnchorElement
          ).href,
        continueCondition: (_content, nextLink) =>
          new URL(nextLink).pathname.includes("_"),
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => {
      for (const k in table) {
        content.innerHTML = content.innerHTML.replaceAll(k, table[k]);
      }
      return content;
    },
    maxRunLimit: maxRunLimit,
    concurrencyLimit: concurrencyLimit,
    sleepTime: sleepTime,
    maxSleepTime: maxSleepTime,
  });
};

export const wlinovelib = () => {
  const bookUrl = document.location.href;
  const tocUrl = bookUrl.replace(/\.html/, "/catalog");

  interface ReadParams {
    // "/novel/3225/164492.html"
    url_previous: string;
    // "/novel/3225/164493_2.html",
    url_next: string;
    // "/novel/3225/catalog",
    url_index: string;
    // "/novel/3225.html",
    url_articleinfo: string;
    // "https://www.bilinovel.com/files/article/image/3/3225/3225s.jpg",
    url_image: string;
    // "https://www.bilinovel.com/",
    url_home: string;
    // "3225",
    articleid: string;
    // "曾经对我造成过精神创伤的女性们又开始关注我，但可惜的是为时已晚",
    articlename: string;
    // "/3",
    subid: string;
    // "御堂ユラギ",
    author: string;
    // "164493",
    chapterid: string;
    // "1",
    page: string;
    // "第五章「恋」与「罪」 第38话 老师的内裤",
    chaptername: string;
    // "0",
    chapterisvip: string;
    // "0",
    userid: string;
    // "1653293820"
    readtime: string;
  }

  function getReadParams(doc: Document): ReadParams | null {
    const script = Array.from(doc.querySelectorAll("script")).filter((s) =>
      s.innerHTML.includes("ReadParams")
    )?.[0];
    if (script) {
      // noinspection UnnecessaryLocalVariableJS
      const ReadParams = sandboxed(`${script.innerHTML}; return ReadParams;`);
      return ReadParams;
    } else {
      return null;
    }
  }

  return mkRuleClass({
    bookUrl,
    anotherPageUrl: tocUrl,
    ToCUrl: tocUrl,
    getBookname: () =>
      document
        .querySelector<HTMLHeadingElement>("h1.book-title")
        ?.innerText.trim() ?? "",
    getAuthor: () =>
      document
        .querySelector<HTMLSpanElement>(".book-rand-a > span")
        ?.innerText.trim() ?? "",
    getIntroDom: () =>
      document.querySelector(
        "#bookSummary > content:nth-child(1)"
      ) as HTMLElement,
    introDomPatch: (dom) => dom,
    getCoverUrl: () =>
      document.querySelector<HTMLImageElement>(".book-cover")?.src ?? null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll<HTMLElement>(".tag-small")
      ).map((a) => a.innerText.trim());
      return additionalMetadate;
    },
    getAList: (doc) => doc.querySelectorAll(".chapter-li-a "),
    getSections: (doc) => doc.querySelectorAll("li.chapter-bar.chapter-li"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    postHook: (chapter) => {
      if (chapter.chapterUrl.startsWith("javascript")) {
        chapter.status = Status.aborted;
      }
      return chapter;
    },
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const invalidTest = (c: Chapter) =>
          c.chapterUrl.startsWith("javascript");
        const getPrevHref = (doc: Document) => {
          const ReadParams = getReadParams(doc);
          if (ReadParams) {
            return document.location.origin + ReadParams.url_previous;
          } else {
            return;
          }
        };
        await chapterHiddenFix(
          book,
          invalidTest,
          getPrevHref,
          concurrencyLimit,
          chapterFixSleepTime,
        );
        return book;
      };
      return classThis;
    },
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#acontent",
        domPatch: domFontFix,
        contentPatch: (_content) => {
          rm(".cgo", true, _content);
          rm("script", true, _content);
          return _content;
        },
        getNextPage: (doc) => {
          const ReadParams = getReadParams(doc);
          if (ReadParams) {
            return document.location.origin + ReadParams.url_next;
          } else {
            return "";
          }
        },
        continueCondition: (_content, nextLink) => {
          if (nextLink === "") {
            return false;
          }
          return new URL(nextLink).pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (dom) => dom,
    maxRunLimit: maxRunLimit,
    concurrencyLimit: concurrencyLimit,
    sleepTime: sleepTime,
    maxSleepTime: maxSleepTime,
  });
};

export async function domFontFix(dom: Document) {
  const FontJS = 'font|read||sheet|family|url|public|woff2';
  let isNeedFix = false;
  dom.querySelectorAll("script").forEach((script) => {
    if (script.innerHTML.includes(FontJS)) {
      isNeedFix = true;
    }
  });
  if (!isNeedFix) {
    return dom;
  }
  const domPatch = dom.querySelector("#TextContent p:nth-last-of-type(2)") as HTMLElement;
  if (domPatch) {
    domPatch.innerHTML = await replaceCharacter(domPatch.innerHTML);
  }
  return dom;
}
export async function replaceCharacter(
  inputText: string,
) {
  const fontName = "read.woff2";
  const fontlink = "https://www.linovelib.com/public/font/read.woff2";
  let outputText = "";
  const FontTable = await getFanqieFontTable(fontName, fontlink);
  if (FontTable) {
    // for (const Character in FontTable) {
    //   if (
    //     Object.prototype.hasOwnProperty.call(FontTable, Character)
    //   ) {
    //     const normalCharacter = FontTable[Character];
    //     outputText = outputText.replaceAll(Character, normalCharacter);
    //   }
    // }
    for(const Character of inputText) {
      if (Object.prototype.hasOwnProperty.call(FontTable, Character)) {
        const normalCharacter = FontTable[Character];
        outputText = outputText + normalCharacter;
      } else {
        outputText = outputText + Character;
      }
    }
    // outputText = outputText.replace(/\u200c/g, "");
  } else {
    return `[linovelib-font]字体对照表 ${fontName} 未找到,请前往https://github.com/404-novel-project/Universal_font_tables 提交字体链接, ${fontlink}`;
  }
  return outputText;
}

async function getFanqieFontTable(fontName: string, fontlink: string) {
  const FontTable = await fetchRemoteFont(fontName);
  if (!FontTable) {
    log.error(`[linovelib-font]字体对照表 ${fontName} 未找到,请前往https://github.com/404-novel-project/Universal_font_tables 提交字体链接, ${fontlink}`);
  } else {
    log.debug(`[linovelib-font]字体对照表 ${fontName}已找到,如果你认为字体对应有错误,请前往https://github.com/404-novel-project/Universal_font_tables 重新提交字体链接, ${fontlink}`);
  }
  return FontTable;
}

async function fetchRemoteFont(fontName: string) {
  const url = `https://fastly.jsdelivr.net/gh/404-novel-project/Universal_font_tables@main/${fontName}.json`;
  log.info(`[linovelib-font]开始请求远程字体对照表 ${fontName}`);
  const retryLimit = 10;
  let retry = retryLimit;
  while (retry > 0) {
    let responseStatus = -1;
    try {
      log.debug(`[linovelib-font]开始请求远程字体对照表 ${url}, 重试次数 ${retryLimit - retry + 1}`);
      const response = await new Promise<FontTable | undefined>((resolve, reject) => {
        GM_xmlhttpRequest({
          method: 'GET',
          url: url,
          onload: (response) => {
            responseStatus = response.status;
            if (response.status >= 200 && response.status < 300) {
              log.info(`[linovelib-font]远程字体对照表 ${fontName} 下载成功`);
              resolve(JSON.parse(response.responseText) as FontTable);
            }
            else {
              reject(new Error(`HTTP status ${response.status}`));
            }
          },
          onerror: (error) => {
            reject(error);
          }
        });
      });

      if (response) {
        return response;
      }
    } catch (error) {
      log.error(error);
      retry--;
      if (responseStatus === 404 || retry < 0) {
        log.info(`[linovelib-font]远程字体对照表 ${fontName} 下载失败`);
        return undefined;
      }
      else {
        await sleep(2000);
        continue;
      }
    }
  }
}

interface FontTable {
  [index: string]: string;
}
