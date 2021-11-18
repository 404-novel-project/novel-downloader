import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { rm } from "../lib/misc";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class Soxscc extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".xiaoshuo > h1") as HTMLHeadElement
    ).innerText.trim();
    const author = (
      document.querySelector(
        ".xiaoshuo > h6:nth-child(3) > a"
      ) as HTMLAnchorElement
    ).innerText.trim();
    const introDom = document.querySelector("#intro");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom, (introDomI) => {
        rm("span.tags", false, introDomI);
        rm("q", true, introDomI);
        return introDomI;
      });

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".book_cover > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const novelList = document.querySelector(
      "div.novel_list[id]"
    ) as HTMLDivElement;
    const sections = Array.from(novelList.children);
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLDListElement;
      const sectionName = (section.querySelector("dt > b") as HTMLElement)
        ?.innerText;
      const cos = Array.from(section.querySelectorAll("dd > a"));

      let sectionChapterNumber = 0;
      for (const a of cos) {
        chapterNumber++;
        sectionChapterNumber++;
        const chapterUrl = (a as HTMLAnchorElement).href;
        const chapterName = (a as HTMLAnchorElement).innerText;
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
          i + 1,
          sectionChapterNumber,
          this.chapterParse,
          "UTF-8",
          { bookname }
        );
        chapters.push(chapter);
      }
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
      bookname: string;
    }
    const doc = await getHtmlDOM(chapterUrl, charset);
    const bookname = (options as Options).bookname;

    chapterName = (
      doc.querySelector(".read_title > h1") as HTMLElement
    ).innerText.trim();

    const content = doc.querySelector("div.content[id]") as HTMLElement;
    if (content) {
      const ad = `您可以在百度里搜索“${bookname} .+(${document.location.hostname})”查找最新章节！`;
      content.innerHTML = content.innerHTML.replaceAll(ad, "");
      Array.from(content.querySelectorAll("p")).forEach((p) => {
        const adwords = [
          "最新章节地址：",
          "全文阅读地址：",
          "txt下载地址：",
          "手机阅读：",
          '为了方便下次阅读，你可以点击下方的"收藏"记录本次',
          "请向你的朋友（QQ、博客、微信等方式）推荐本书",
        ];
        for (const adword of adwords) {
          if (p.innerText.includes(adword)) {
            p.remove();
          }
        }
      });
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
