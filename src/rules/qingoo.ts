import { BookAdditionalMetadate, Chapter, Book, Status } from "../main";
import { BaseRuleClass } from "../rules";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class qingoo extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "UTF-8";
  }

  public async bookParse() {
    let bookUrl = document.location.href;

    const bookname = (<HTMLElement>(
      document.querySelector(".title > dl > dd > h1")
    )).innerText.trim();
    const author = (<HTMLElement>document.querySelector("#author")).innerText
      .replace("作者：", "")
      .trim();

    const introDom = <HTMLElement>document.querySelector("#allDesc");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".title > dl > dt > img:nth-child(1)")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    interface chapterObj {
      create_time: number; //1569595830900,
      id: string; //"5b8a1844f71a513c492d6f3b",
      name: string; //"第一章 我是CV",
      sn: number; //1,
      status: string; //"enable",
      updateTime: number; //1569595830900,
      update_time: number; //1569595830900,
      word_count: number; //1066
    }
    const data: chapterObj[] = (<any>unsafeWindow).data;
    // https://www.qingoo.cn/book?name=%E9%BE%99%E7%A0%B4%E4%B9%9D%E5%A4%A9%E8%AF%80&author=%E6%9F%B3%E6%9E%AB&bookId=57a1d378e64f735585a54b9e&index=0
    const _linkTemp = (<HTMLAnchorElement>(
      document.querySelector("#chapterItem")?.firstElementChild
    ))?.href;
    const linkTemp = new URL(_linkTemp);

    for (const d of data) {
      const status = d.status;
      const chapterNumber = d.sn;
      const chapterName = d.name;
      linkTemp.searchParams.set("index", (chapterNumber - 1).toString());
      const chapterUrl = linkTemp.toString();
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
        this.charset,
        {}
      );

      if (!status) {
        chapter.status = Status.aborted;
      }
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (<HTMLHeadElement>(
      doc.querySelector("#content > h1")
    )).innerText.trim();
    const content = <HTMLElement>doc.querySelector("#content");
    if (content) {
      rm("div.header", false, content);
      rm("h1", false, content);
      rm("h6", false, content);
      let { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    } else {
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }
  }
}
