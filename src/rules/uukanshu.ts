import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass, ruleClassNamespace } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";

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

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href;
    const bookname = (<HTMLElement>(
      document.querySelector("dd.jieshao_content > h1 > a")
    )).innerText
      .replace("最新章节", "")
      .trim();
    const author = (<HTMLElement>(
      document.querySelector("dd.jieshao_content > h2 > a")
    )).innerText.trim();

    let introduction: string | null;
    const introDom = <HTMLElement>(
      document.querySelector("dd.jieshao_content > h3")
    );
    if (introDom === null) {
      introduction = null;
    } else {
      introDom.innerHTML = introDom.innerHTML
        .replace(/^.+简介：\s+www.uukanshu.com\s+/, "")
        .replace(/\s+https:\/\/www.uukanshu.com/, "")
        .replace(/－+/, "");
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector("a.bookImg > img")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

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
            chapterParse,
            "GBK"
          );
          chapters.push(chapter);
        }
      }
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      additionalMetadate: additionalMetadate,
      chapters: chapters,
    };
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string
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
        "请记住本书首发域名：。",
        "笔趣阁手机版阅读网址：",
        "小说网手机版阅读网址：",
        "https://",
        "http://",
      ];
      for (let r of contentReplace) {
        content.innerHTML = content.innerHTML.replace(r, "");
      }
      let { dom, text, images } = cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
      };
    } else {
      return {
        chapterName: chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
      };
    }
  }
}
