import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { ggetHtmlDOM} from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

export class Zongheng extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    let bookUrl = document.location.href.replace("/showchapter/", "/book/");
    bookUrl = document.location.href.replace(/\?tabsName=.*$/, "");
    if (bookUrl != document.location.href) {
      document.location.href = bookUrl;
      return new Book({
        bookUrl,
        bookname:"1",
        author:"1",
        introduction:"1",
        introductionHTML:null,
        additionalMetadate: {},
        chapters: [],
      });
    }
    const match = bookUrl.match(/\/detail\/(\d+)/);
    const bookId = match ? match[1] : null;
    if (!bookId) {
      return new Book({
        bookUrl,
        bookname: "1",
        author: "1",
        introduction: "1",
        introductionHTML: null,
        additionalMetadate: {},
        chapters: [],
      });
    }
    const bookname = (
      document.querySelector(".book-info--title > span") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        "a.author-info--name"
      ) as HTMLElement
    ).innerText.trim();
    const introDom = document.querySelector("section.detail-work-info--introduction");
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("img.book-info--coverImage-img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info--tags > span")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    interface Tome {
      tomeId: number;
      tomeNo: number;
      tomeName: string;
      bookId: number;
      createTime: string;
      updateTime: string;
      ext1: string;
      ext2: string;
      level: number;
      tomeBrief: string;
    }

    interface ChapterView {
      tomeId: number;
      tomeName: string;
      chapterId: number;
      chapterName: string;
      wordNums: number;
      createTime: string;
      issueTime: string;
      price: number;
      status: number;
      level: number;
      bookId: number;
      everBuy: boolean;
      newChapter: boolean;
      contentType: number;
    }

    interface ChapterList {
      tome: Tome;
      startChapterId: number;
      chapterViewList: ChapterView[];
      tomeTotalWords: number;
      tomeTotalChapterNum: number;
    }

    interface Result {
      chapterList: ChapterList[];
      chapterSum: number;
      fpChapterId: number;
      fpChapterName: string;
    }

    interface ChapterList {
      code: number;
      message: string;
      result: Result;
    }
    async function getChapterList(bookId: string): Promise<ChapterList> {
      const url = `https://bookapi.zongheng.com/api/chapter/getChapterList`;
      const formData = new URLSearchParams();
      formData.append("bookId", bookId);
      return new Promise((resolve) => {
        _GM_xmlhttpRequest({
          url: url,
          headers: {
            Cookie: document.cookie,
            Origin: "https://www.zongheng.com",
            Referer: "https://www.zongheng.com/",
            "Content-Type": "application/x-www-form-urlencoded",

          },
          method: "POST",
          data: formData.toString(),
          onload: function (response) {
            if (response.status === 200) {
              const resultI: ChapterList = JSON.parse(
                response.responseText
              );
              resolve(resultI);
            } else {
              log.error(`post ${url} response status = ${response.status}`);
              const resultI: ChapterList = JSON.parse(
                '{"message":"天塌了"}'
              );
              resolve(resultI);
            }
          },
        });
      });
    }

    const chapters: Chapter[] = [];
    const result = await getChapterList(bookId);
    if (result.message && result.message === "成功") {
      let sectionNumber = 0;
      let chapterNumber = 0;
      for (const tome of result.result.chapterList) {
        sectionNumber++;
        const sectionName = tome.tome.tomeName;
        let sectionChapterNumber = 0;
        for (const chapterView of tome.chapterViewList) {
          sectionChapterNumber++;
          //https://read.zongheng.com/chapter/957220/60178463.html
          const chapterUrl = `https://read.zongheng.com/chapter/${bookId}/${chapterView.chapterId}.html`;
          const chapterName = chapterView.chapterName;
          chapterNumber++;
          const isVIP = chapterView.price > 0;
          const isPaid = chapterView.everBuy;
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
          if (isVIP && !isPaid) {
            chapter.status = Status.aborted;
          }
          chapters.push(chapter);
        }
      }
    } else {
      log.error(`获取目录失败 ${result.message}`);
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
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await ggetHtmlDOM(chapterUrl, charset);
      const ChapterName = (
        doc.querySelector("div.title_txtbox") as HTMLElement
      ).innerText.trim();
      const content = doc.querySelector("div.content") as HTMLElement;
      if (content) {
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
          chapterName: ChapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      } else {
        return {
          chapterName: ChapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }
    }

    async function vipChapter(): Promise<ChapterParseObject> {
      // Todo
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
