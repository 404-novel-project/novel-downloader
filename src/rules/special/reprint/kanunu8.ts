import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getMaxDepth, getNodeTextLength, rm } from "../../../lib/dom";
import { fetchAndParse } from "../../../lib/readability";
import {
  centerDetct,
  getSectionName,
  introDomHandle,
  softByValue,
} from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

export class Kanunu8 extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = document.title.split(" ")[0];
    const _authorAList = Array.from(document.querySelectorAll("a")).filter(
      (a) =>
        (a.href.includes("writer") || a.href.includes("/zj/")) &&
        a.href.includes(".html")
    );
    const authorElem = _authorAList
      .map((a) => [a, a.getBoundingClientRect().top] as [Element, number])
      .sort(softByValue)?.[0][0];
    const author =
      (authorElem as HTMLAnchorElement)?.innerText
        .replace("作品集", "")
        .replace("→", "")
        .trim() ?? "";
    const introDom = Array.from(document.body.querySelectorAll("td, p"))
      .filter((elem) => (elem as HTMLElement).innerText.length !== 0)
      .map((elem) => [elem, getNodeTextLength(elem)] as [Element, number])
      .sort(softByValue)
      .slice(-1)?.[0][0] as HTMLElement;
    let introduction: string | null = null,
      introductionHTML: HTMLElement | null = null;
    if (introDom) {
      rm("a", true, introDom);
      [introduction, introductionHTML] = await introDomHandle(introDom);
    }
    let aList: NodeListOf<Element> | Element[] | null = null;
    let sections: NodeListOf<Element> | null = null;
    let getName: ((sElem: Element) => string) | null = null;
    function aListFilter(a: Element) {
      const filters = ["writer", "/zj/", "index.html"];
      for (const f of filters) {
        if ((a as HTMLAnchorElement).href.includes(f)) {
          return false;
        }
      }
      return true;
    }
    if (document.querySelector("div.book")) {
      aList = Array.from(document.querySelectorAll("div.book a")).filter(
        aListFilter
      );
      sections = document.querySelectorAll(
        "div.book dl > dt, div.book td > strong"
      );
      getName = (sElem: Element) => (sElem as HTMLElement).innerText;
    } else {
      const tables = document.querySelectorAll("table");
      const _table = Array.from(tables)
        .map((tb) => [tb, getMaxDepth(tb)] as [Element, number])
        .filter((ds) => ds[1] === 4)
        .filter((ds) => centerDetct(ds[0])[0])
        .map(
          (ds) =>
            [
              ds[0],
              Array.from(ds[0].querySelectorAll("a")).filter(aListFilter)
                .length,
            ] as [Element, number]
        )
        .sort(softByValue);
      if (_table.length !== 0) {
        const table = _table.slice(-1)[0][0];
        aList = table.querySelectorAll("a");
        sections = table.querySelectorAll('td[align="center"]');
        getName = (sElem: Element) => (sElem as HTMLElement).innerText;
      }
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const _cover = Array.from(document.querySelectorAll("img")).filter(
      (img) => new URL(img.src).host === document.location.host
    );
    if (_cover.length === 1) {
      const coverUrl = _cover[0].src;
      if (coverUrl) {
        getImageAttachment(coverUrl, this.imageMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }
    }

    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    let sectionName = "";
    if (!aList) {
      throw Error("[BookParse]获取章节信息失败！");
    }
    for (const elem of Array.from(aList)) {
      const chapterName = (elem as HTMLAnchorElement).innerText.trim();
      const chapterUrl = (elem as HTMLAnchorElement).href;
      if (sections && getName) {
        const _sectionName = getSectionName(elem, sections, getName);
        if (_sectionName && sectionName !== _sectionName) {
          sectionName = _sectionName;
          sectionNumber++;
          sectionChapterNumber = 0;
        }
        chapterNumber++;
        sectionChapterNumber++;
      }

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
        this.charset,
        {}
      );
      chapters.push(chapter);
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
    const obj = await fetchAndParse(chapterUrl, this.charset);
    if (obj) {
      const content = obj.content as HTMLElement;
      rm("a", true, content);
      const { dom, text, images } = await cleanDOM(content, "TM");
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
}
