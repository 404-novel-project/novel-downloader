import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { BookAdditionalMetadate } from "../../../main/Book";
import { introDomHandle } from "../../../lib/rule";
import { getImageAttachment } from "../../../lib/attachments";
import { Chapter } from "../../../main/Chapter";
import { getHtmlDOM } from "../../../lib/http";
import { rm, rm2 } from "../../../lib/dom";
import { cleanDOM } from "../../../lib/cleanDOM";
import log from "loglevel";

// 69书吧
// https://www.69shu.com/

export class C69shu extends BaseRuleClass {
  public constructor() {
    super();
    this.concurrencyLimit = 5;
  }

  public async bookParse(): Promise<Book> {
    let { $, $$ } = this.makeQuery(document);

    const bookUrl = window.location.href;
    const bookname = $("h1")?.innerText;
    const author = $(".booknav2 > p:nth-child(2) > a")?.innerText;
    const tocUrl = $<HTMLAnchorElement>(".addbtn > a:nth-child(1)")?.href;
    if (!bookname || !author || !tocUrl) {
      log.info("书籍信息", { bookname, author, tocUrl });
      throw new Error("书籍信息获取失败！");
    }

    const introDom = $(".navtxt > p:nth-child(1)");
    const [intro, introHTML] = await introDomHandle(introDom);
    const meta: BookAdditionalMetadate = {};
    const coverUrl = $<HTMLImageElement>(".bookimg2 > img")?.src;
    if (coverUrl) {
      (async () => {
        try {
          meta.cover = await getImageAttachment(coverUrl, this.imageMode);
        } catch (e) {
          log.error(e);
        }
      })();
    }

    const chapterDoc = await getHtmlDOM(tocUrl, this.charset);
    ({ $, $$ } = this.makeQuery(chapterDoc));

    const chapterElements = $$<HTMLAnchorElement>("#catalog ul a");
    if (chapterElements.length === 0) {
      throw new Error("章节列表获取失败！");
    }

    const chapters: Chapter[] = [];
    for (const [i, a] of chapterElements.entries()) {
      chapters.push(
        new Chapter({
          bookUrl,
          bookname,
          chapterUrl: a.href,
          chapterNumber: i + 1,
          chapterName: a.innerText.trim(),
          isVIP: false,
          isPaid: null,
          sectionName: null,
          sectionNumber: null,
          sectionChapterNumber: null,
          chapterParse: this.chapterParse.bind(this),
          charset: this.charset,
          options: {},
        })
      );
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction: intro,
      introductionHTML: introHTML,
      additionalMetadate: meta,
      chapters,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: object
  ): Promise<ChapterParseObject> {
    let dom, text, images;
    dom = text = images = null;

    const doc = await getHtmlDOM(chapterUrl, charset);
    const { $ } = this.makeQuery(doc);

    chapterName = $("h1")?.innerText.trim() || chapterName;
    const content = $(".txtnav");

    if (content && chapterName) {
      rm(".hide720, .txtright, .bottom-ad", true, content);
      rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm, chapterName, "(本章完)"], content);
      ({ dom, text, images } = await cleanDOM(content, this.imageMode));
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

  // 简化选择器调用
  private makeQuery(doc: Document) {
    const $ = <T extends Element = HTMLElement>(s: string) =>
      doc.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) =>
      Array.from(doc.querySelectorAll<T>(s));
    return { $, $$ };
  }
}
