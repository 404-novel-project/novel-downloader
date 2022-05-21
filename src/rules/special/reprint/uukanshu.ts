import { UnsafeWindow } from "../../../global";
import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm, rms } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

interface UukanshuObj {
  reverse(button: HTMLButtonElement): void;
}

type UukanshuWindow = UukanshuObj & UnsafeWindow;

export class Uukanshu extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector("dd.jieshao_content > h1 > a") as HTMLElement
    ).innerText
      .replace("最新章节", "")
      .trim();
    const author = (
      document.querySelector("dd.jieshao_content > h2 > a") as HTMLElement
    ).innerText.trim();

    const introDom = document.querySelector(
      "dd.jieshao_content > h3"
    ) as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(
      introDom,
      (introDomI) => {
        rms(
          [
            /^.+简介：\s+www\.uukanshu\.com\s+/,
            /\s+https:\/\/www\.uukanshu\.com/,
            /－+/,
          ],
          introDomI
        );
        return introDomI;
      }
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("a.bookImg > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const button = document.querySelector(
      'span[onclick="javascript:reverse(this);"]'
    ) as HTMLButtonElement;
    const reverse = (unsafeWindow as UukanshuWindow).reverse;
    if (button.innerText === "顺序排列") {
      reverse(button);
    }
    const chapterList = document.getElementById("chapterList")?.childNodes as
      | HTMLElement[]
      | undefined;
    if (chapterList && chapterList.length !== 0) {
      let chapterNumber = 0;
      let sectionNumber = 0;
      let sectionName = null;
      let sectionChapterNumber = 0;
      for (const li of Array.from(chapterList)) {
        if (li.className === "volume") {
          sectionNumber++;
          sectionChapterNumber = 0;
          sectionName = li.innerText;
        } else {
          chapterNumber++;
          sectionChapterNumber++;
          const a = li.firstElementChild as HTMLLinkElement;
          const chapterName = a.innerText;
          const chapterUrl = a.href;
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
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            chapterParse: this.chapterParse,
            charset: this.charset,
            options: {},
          });
          chapters.push(chapter);
        }
      }
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
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

    chapterName = (doc.querySelector("#timu") as HTMLElement).innerText.trim();

    const content = doc.querySelector("#contentbox") as HTMLElement;
    if (content) {
      rm(".ad_content", true, content);
      const contentReplace = [
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[cＣｃ][oＯｏ][mＭｍ]/g,
        /[UＵ]*看书[（\\(].*?[）\\)]文字首发。/,
        /请记住本书首发域名：。?/g,
        /笔趣阁手机版阅读网址：/g,
        /小说网手机版阅读网址：/g,
        /https:\/\//g,
        /http:\/\//g,
        /UU看书\s+欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在UU看书！UU看书。;?/g,
      ];
      rms(contentReplace, content);
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
