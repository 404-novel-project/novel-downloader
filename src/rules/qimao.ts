import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class qimao extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    let bookUrl = document.location.href;

    const bookname = (<HTMLElement>(
      document.querySelector("h2.tit")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".p-name > a")
    )).innerHTML.trim();

    const introDom = <HTMLElement>(
      document.querySelector(".book-introduction .article")
    );
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(".poster-pic > img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".qm-tags > a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    //虽然有第一卷标识，但并没有发现有多卷的图书
    const chapters: Chapter[] = [];
    const cos = document.querySelectorAll(
      '.chapter-directory > dd > div[sort-type="ascending"] a'
    );
    let chapterNumber = 0;
    for (const aElem of Array.from(cos)) {
      chapterNumber++;
      const chapterName = (<HTMLAnchorElement>aElem).innerText;
      const chapterUrl = (<HTMLAnchorElement>aElem).href;
      const isVIP = () => {
        if (aElem.childElementCount) {
          return true;
        } else {
          return false;
        }
      };
      const isPaid = () => {
        //Todo
        return false;
      };
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP(),
        isPaid(),
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
        {}
      );
      const isLogin = () => {
        //Todo
        return false;
      };
      if (isVIP() && !(isLogin() && chapter.isPaid)) {
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
    async function publicChapter(): Promise<chapterParseObject> {
      log.debug(`[Chapter]请求 ${chapterUrl}`);
      let doc = await getHtmlDOM(chapterUrl, charset);
      chapterName = (<HTMLElement>doc.querySelector(".title")).innerText.trim();

      const content = <HTMLElement>doc.querySelector(".article");
      if (content) {
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

    async function vipChapter(): Promise<chapterParseObject> {
      //Todo
      return {
        chapterName: chapterName,
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
