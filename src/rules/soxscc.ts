import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { introDomHandle } from "./lib/common";

export class soxscc implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLHeadElement>(
      document.querySelector(".xiaoshuo > h1")
    )).innerText.trim();
    const author = (<HTMLAnchorElement>(
      document.querySelector(".xiaoshuo > h6:nth-child(3) > a")
    )).innerText.trim();
    const introDom = document.querySelector("#intro");
    const [introduction, introductionHTML, introCleanimages] = introDomHandle(
      introDom,
      (introDom) => {
        rm("span.tags", false, introDom);
        rm("q", true, introDom);
        return introDom;
      }
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".book_cover > img")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const novel_list = document.querySelector(
      "div.novel_list[id]"
    ) as HTMLDivElement;
    const sections = Array.from(novel_list.children);
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLDListElement;
      const sectionName = (<HTMLElement>section.querySelector("dt > b"))
        ?.innerText;
      const cos = Array.from(section.querySelectorAll("dd > a"));

      let sectionChapterNumber = 0;
      for (const a of cos) {
        chapterNumber++;
        sectionChapterNumber++;
        const chapterUrl = (<HTMLAnchorElement>a).href;
        const chapterName = (<HTMLAnchorElement>a).innerText;
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
          chapterParse,
          "UTF-8",
          { bookname: bookname }
        );
        chapters.push(chapter);
      }
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      introductionHTML: introductionHTML,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    interface options {
      bookname: string;
    }
    const doc = await getHtmlDOM(chapterUrl, charset);
    const bookname = (<options>options).bookname;

    chapterName = (<HTMLElement>(
      doc.querySelector(".read_title > h1")
    )).innerText.trim();

    const content = <HTMLElement>doc.querySelector("div.content[id]");
    if (content) {
      const ad = `您可以在百度里搜索“${bookname} 搜小说(www.soxscc.net)”查找最新章节！`;
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
      let { dom, text, images } = cleanDOM(content, "TM");
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
