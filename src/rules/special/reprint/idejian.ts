import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { ggetHtmlDOM, ggetText } from "../../../lib/http";
import { rm } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

export class Idejian extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.maxRunLimit = 1;
    this.sleepTime = 500;
    this.maxSleepTime = 3000;
    this.concurrencyLimit = 1;
  }



  public async bookParse() {
    const bookUrl = document.location.href;
    const _bookID = bookUrl.match(/\/(\d+)\/$/);
    const bookID = _bookID && _bookID[1];
    let catelogFlag = 0;
    async function bookCatelog() {
      if (!catelogFlag) {
        await catelog(1);
      }
    }
    async function catelog(page: number) {
      if (page > parseInt(document.querySelector('#catelog')?.getAttribute('size')?? '0')) {
        catelogFlag = 1;
        await fetch(`https://www.idejian.com/catelog/${bookID}/1?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          //timeout: 2900
        })
          .then(response => response.json())
          .then(data => {
            if (data.html) {
              document.getElementById('catelog')?.insertAdjacentHTML('beforeend', data.html);
              catelog(page + 1);
            } else {
              catelogFlag = 1;
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        return;
      }
    }
    await bookCatelog();
    const bookname = (
      document.querySelector(".detail_bkname > a") as HTMLElement
    ).innerText.trim();
    const _author = (document.querySelector(".detail_bkauthor") as HTMLElement)
      .childNodes[0];
    let author = "佚名";
    if (_author && _author.textContent) {
      author = _author.textContent.trim();
    }

    const introDom = document.querySelector(".brief_con") as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".book_img > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.detail_bkgrade > span")
    ).map((span) => (span as HTMLSpanElement).innerText.trim());

    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(".catelog_list > li > a");
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (aElem as HTMLAnchorElement).innerText;
      const chapterUrl = (aElem as HTMLAnchorElement).href;
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
      chapters.push(chapter);
    }

    // 初始化章节前清除 Cookie
    document.cookie = "";

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
  ) {
    interface Apiwechat {
      code: number;
      msg: string;
      body: {
        inShelf: number;
        pageTitle: string;
        content: string;
        cssLists: string[];
        chapterId: string;
        bookInfo: {
          bookAuthor: string;
          bookId: number;
          bookName: string;
          picUrl: string;
          category: string;
          bookPrice: number;
          bookType: number;
          chapterCount: number;
          copyrightCode: string;
          schemes: number[];
          wapCanRead: boolean;
        };
        newestChapter: {
          lastChapter: string;
          lastChapterUrl: string;
          updateTime: string;
        };
      };
    }
    const chapterTrueUrl = chapterUrl.replace("https://www.idejian.com", "https://wechat.idejian.com/api/wechat").replace(".html","");
    log.debug(`[Chapter]请求 ${chapterTrueUrl}，Refer：${chapterUrl}`);
    const chapter: Apiwechat = await new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: chapterTrueUrl,
        headers: {'cache-control': 'no-cache','accept-encoding': 'gzip' },
        method: "GET",
        onload: function (response) {
          if (response.status === 200) {
            const resultI: Apiwechat = JSON.parse(
              response.responseText
            );
            resolve(resultI);
          }
          else {
            log.error(`response status = ${response.status}`);
            const resultI: Apiwechat = JSON.parse(
              `{"msg":"ND error"}`
            );
            resolve(resultI);
          }
        }
      })
    });    
    if (chapter.msg === "ND error")
      throw new Error("chapter get error");
    const content = chapter.body.content;
    if (content) {
      const Dcontent = document.createElement("div");
      Dcontent.innerHTML = content;
      const { dom, text, images } = await cleanDOM(Dcontent, "TM");
      return {
        chapterName,
        contentRaw: Dcontent,
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
