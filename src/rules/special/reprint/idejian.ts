import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { ggetHtmlDOM, ggetText } from "../../../lib/http";
import { rm } from "../../../lib/misc";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../../main";
import { BaseRuleClass } from "../../../rules";

export class Idejian extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.maxRunLimit = 5;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const _bookID = bookUrl.match(/\/(\d+)\/$/);
    const bookID = _bookID && _bookID[1];

    const bookname = (
      document.querySelector(".detail_bkname > a") as HTMLElement
    ).innerText.trim();
    const _author = (document.querySelector(".detail_bkauthor") as HTMLElement)
      .childNodes[0];
    let author = "佚名";
    if (_author && _author.textContent) {
      author = _author.textContent.trim();
    }

    const introDom = document.querySelector(".brief_con") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".book_img > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.detail_bkgrade > span")
    ).map((span) => (span as HTMLSpanElement).innerText.trim());

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(".catelog_list > li > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (aElem as HTMLAnchorElement).innerText;
      const chapterUrl = (aElem as HTMLAnchorElement).href;
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
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
        { bookID }
      );
      chapters.push(chapter);
    }

    // 初始化章节前清除 Cookie
    document.cookie = "";

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
      bookID: string;
    }

    const _chapterUrl = new URL(chapterUrl);
    _chapterUrl.hostname = "m.idejian.com";
    chapterUrl = _chapterUrl.toString();

    const referBaseUrl = "https://m.idejian.com/catalog";
    const _refer = new URL(referBaseUrl);
    _refer.searchParams.set("bookId", (options as Options).bookID);
    const referUrl = _refer.toString();

    const fakeUA =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Snapchat/10.77.5.59 (like Safari/604.1)";

    // 获取移动端Cookie
    if (document.cookie === "") {
      await ggetText(referUrl, charset, { headers: { "User-Agent": fakeUA } });
      await ggetText(chapterUrl, charset, {
        headers: { "User-Agent": fakeUA, Referer: referUrl },
      });
    }

    log.debug(`[Chapter]请求 ${chapterUrl}，Refer：${referUrl}`);
    const doc = await ggetHtmlDOM(chapterUrl, charset, {
      headers: { "User-Agent": fakeUA, Referer: referUrl },
    });
    chapterName = (
      doc.querySelector(".text-title-1") as HTMLElement
    ).innerText.trim();

    let content;
    if (doc.querySelectorAll("div.h5_mainbody").length === 1) {
      content = doc.querySelector("div.h5_mainbody") as HTMLElement;
    } else {
      content = doc.querySelectorAll("div.h5_mainbody")[1] as HTMLElement;
    }
    if (content) {
      rm("h1", false, content);
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
