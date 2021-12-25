import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, ggetHtmlDOM } from "../../../lib/http";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Lofter extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
    this.streamZip = true;
  }

  public async bookParse() {
    const bookUrl = document.location.origin;
    const author = JSON.parse(
      '"' + (unsafeWindow as any)._ntes_ntit.replaceAll("%", "\\") + '"'
    );
    const bookname = author + "的Lofter";
    const introduction =
      document
        .querySelector('meta[name="Description"]')
        ?.getAttribute("content")
        ?.replace(new RegExp(`^${author} - `), "") ?? null;
    let introductionHTML = null;
    if (introduction) {
      introductionHTML = document.createElement("p");
      introductionHTML.innerText = introduction;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const _avatar = document
      .querySelector('link[rel="shortcut icon"]')
      ?.getAttribute("href");
    if (_avatar) {
      const avatar = new URL(_avatar);
      avatar.search = "";
      const avatarUrl = avatar.toString();
      getImageAttachment(avatarUrl, this.imageMode, "avatar-")
        .then((avatarClass) => {
          additionalMetadate.cover = avatarClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const pageUrlSet: Set<string> = new Set();

    const indexPageUrls: string[] = [];
    const getPageUrl = async (url: string) => {
      log.info(`[chapter]正在抓取目录页：${url}`);
      const doc = await getHtmlDOM(url, undefined);

      // 获取博文链接
      const selector = `a[href^="${[document.location.origin, "post"].join(
        "/"
      )}"]`;
      const urlSet = new Set(
        Array.from(doc.querySelectorAll(selector)).map(
          (a) => (a as HTMLAnchorElement).href
        )
      );
      urlSet.forEach((item) => pageUrlSet.add(item));

      const selectorl = `a[href^="https://www.lofter.com/lpost"]`;
      const urlSetl = new Set(
        Array.from(doc.querySelectorAll(selectorl)).map(
          (a) => (a as HTMLAnchorElement).href
        )
      );
      urlSetl.forEach((item) => pageUrlSet.add(item));

      // 获取新目录页
      const getIndexPageNumber = (urlI: string) => {
        const _pageNumber = new URL(urlI).searchParams.get("page") ?? "1";
        const indexPageNumber = Number(_pageNumber);
        return indexPageNumber;
      };
      const nowIndexPageNumber = getIndexPageNumber(url);
      const indexPages = doc.querySelectorAll('a[href^="?page"]');
      for (const indexPage of Array.from(indexPages)) {
        const indexPageUrl = (indexPage as HTMLAnchorElement).href;
        const _indexPageUrlFormat = new URL(indexPageUrl);
        _indexPageUrlFormat.searchParams.delete("t");
        const indexPageUrlFormat = _indexPageUrlFormat.toString();
        const indexPageNumber = getIndexPageNumber(indexPageUrl);
        if (indexPageNumber !== nowIndexPageNumber) {
          if (!indexPageUrls.includes(indexPageUrlFormat)) {
            // 递归执行
            indexPageUrls.push(indexPageUrlFormat);
            await getPageUrl(indexPageUrl);
          }
        }
      }
    };

    await getPageUrl(document.location.href);

    let i = 0;
    for (const pageUrl of Array.from(pageUrlSet)) {
      const chapter = new Chapter(
        bookUrl,
        bookname,
        pageUrl,
        i,
        null,
        false,
        false,
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
        { author }
      );
      chapters.push(chapter);
      i++;
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
    interface Options {
      author: string;
    }
    async function post(): Promise<ChapterParseObject> {
      log.debug(`[chapter]请求页面：${chapterUrl}`);
      const doc = await getHtmlDOM(chapterUrl, charset);
      chapterName =
        doc
          .querySelector("title")
          ?.innerText.replace(
            new RegExp(`-${(options as Options).author}$`),
            ""
          )
          .replace("\n", "")
          .trim() ?? null;

      const selectors = [".ct .ctc", ".main .content", ".m-post .text"];
      let content;
      for (const selector of selectors) {
        const _content = doc.querySelector(selector) as HTMLElement;
        if (_content !== null) {
          content = _content;
          break;
        }
      }
      if (content) {
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
        throw new Error(`[chapter]未发现内容，url：${chapterUrl}`);
      }
    }
    async function lpost(): Promise<ChapterParseObject> {
      log.debug(`[chapter]请求页面：${chapterUrl}`);
      const doc = await ggetHtmlDOM(chapterUrl, charset);

      chapterName = (
        doc.querySelector("#title") as HTMLDivElement
      )?.innerText.trim();

      const content = doc.querySelector("#m-cnt .long-text") as HTMLElement;
      if (content) {
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
        throw new Error(`[chapter]未发现内容，url：${chapterUrl}`);
      }
    }

    if (new URL(chapterUrl).pathname.startsWith("/lpost/")) {
      return lpost();
    } else {
      return post();
    }
  }
}
