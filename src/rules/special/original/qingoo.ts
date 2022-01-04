import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

export class Qingoo extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;

    const bookname = (
      document.querySelector(".title > dl > dd > h1") as HTMLElement
    ).innerText.trim();
    const author = (document.querySelector("#author") as HTMLElement).innerText
      .replace("作者：", "")
      .trim();

    const introDom = document.querySelector("#allDesc") as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(
        ".title > dl > dt > img:nth-child(1)"
      ) as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    interface ChapterObj {
      create_time: number; // 1569595830900,
      id: string; // "5b8a1844f71a513c492d6f3b",
      name: string; // "第一章 我是CV",
      sn: number; // 1,
      status: string; // "enable",
      updateTime: number; // 1569595830900,
      update_time: number; // 1569595830900,
      word_count: number; // 1066
    }
    const data: ChapterObj[] = (unsafeWindow as any).data;
    // https://www.qingoo.cn/book?name=%E9%BE%99%E7%A0%B4%E4%B9%9D%E5%A4%A9%E8%AF%80&author=%E6%9F%B3%E6%9E%AB&bookId=57a1d378e64f735585a54b9e&index=0
    const _linkTemp = (
      document.querySelector("#chapterItem")
        ?.firstElementChild as HTMLAnchorElement
    )?.href;
    const linkTemp = new URL(_linkTemp);

    for (const d of data) {
      const status = d.status;
      const chapterNumber = d.sn;
      const chapterName = d.name;
      linkTemp.searchParams.set("index", (chapterNumber - 1).toString());
      const chapterUrl = linkTemp.toString();
      const isVIP = false;
      const isPaid = false;
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP,
        isPaid,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {},
      });

      if (!status) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
    }

    const book = new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
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
    chapterName = (
      doc.querySelector("#content > h1") as HTMLHeadElement
    ).innerText.trim();
    const content = doc.querySelector("#content") as HTMLElement;
    if (content) {
      rm("div.header", false, content);
      rm("h1", false, content);
      rm("h6", false, content);
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
