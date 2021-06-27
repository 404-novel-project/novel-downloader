import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm, getImageAttachment } from "../lib";
import { introDomHandle } from "./lib/common";

namespace uukanshu {
  export interface uukanshuWindow extends unsafeWindow {
    reverse(button: HTMLButtonElement): void;
  }
}

export class uukanshu implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;
  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("dd.jieshao_content > h1 > a")
    )).innerText
      .replace("最新章节", "")
      .trim();
    const author = (<HTMLElement>(
      document.querySelector("dd.jieshao_content > h2 > a")
    )).innerText.trim();

    const introDom = <HTMLElement>(
      document.querySelector("dd.jieshao_content > h3")
    );
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom, (introDom) => {
      introDom.innerHTML = introDom.innerHTML
        .replace(/^.+简介：\s+www.uukanshu.com\s+/, "")
        .replace(/\s+https:\/\/www.uukanshu.com/, "")
        .replace(/－+/, "");
      return introDom;
    });

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector("a.bookImg > img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const chapters: Chapter[] = [];
    const button = <HTMLButtonElement>(
      document.querySelector('span[onclick="javascript:reverse(this);"]')
    );
    const reverse = (<uukanshu.uukanshuWindow>unsafeWindow).reverse;
    if (button.innerText === "顺序排列") {
      reverse(button);
    }
    const chapterList = <HTMLElement[] | undefined>(
      document.getElementById("chapterList")?.childNodes
    );
    if (chapterList && chapterList.length !== 0) {
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (let i = 0; i < chapterList.length; i++) {
        const li = chapterList[i];
        if (li.className === "volume") {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = li.innerText;
        } else {
          chapterNumber++;
          sectionChapterNumber++;
          const a = <HTMLLinkElement>li.firstElementChild;
          const chapterName = a.innerText;
          const chapterUrl = a.href;
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
    const dom = await getHtmlDOM(chapterUrl, charset);

    chapterName = (<HTMLElement>dom.querySelector("#timu")).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#contentbox");
    if (content) {
      rm(".ad_content", true, content);
      const contentReplace = [
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[cＣｃ][oＯｏ][mＭｍ]/g,
        /[UＵ]*看书[（\\(].*?[）\\)]文字首发。/,
        /"请记住本书首发域名：。"/g,
        /"笔趣阁手机版阅读网址："/g,
        /"小说网手机版阅读网址："/g,
        /"https:\/\/"/g,
        /"http:\/\/"/g,
      ];
      for (let r of contentReplace) {
        content.innerHTML = content.innerHTML.replace(r, "");
      }
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
