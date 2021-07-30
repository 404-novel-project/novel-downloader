import { BookAdditionalMetadate, Chapter, Book } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, getImageAttachment, rm } from "../lib";
import { introDomHandle } from "./lib/common";

export class ujxs implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const bookUrl =
      document.location.origin +
      document.location.pathname.replace(/^\/read/, "/book");
    const bookname = (<HTMLHeadingElement>(
      document.querySelector("#smallcons > h1")
    )).innerText.trim();
    const author = (<HTMLAnchorElement>(
      document.querySelector("#smallcons > span:nth-child(3) > a")
    )).innerText.trim();

    const doc = await getHtmlDOM(bookUrl, this.charset);
    const introDom = doc.querySelector("#bookintro");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>doc.querySelector(".img > img"))?.src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    const liList = document.querySelectorAll("#readerlist > ul > li");
    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < liList.length; i++) {
      const li = liList[i];
      if (li.getAttribute("class")) {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName =
          li.querySelector("h3")?.innerText.replace(bookname, "").trim() ??
          null;
      } else {
        const aElem = li.firstElementChild;
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (<HTMLAnchorElement>aElem).innerText;
        const chapterUrl = (<HTMLAnchorElement>aElem).href;
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
          { bookname: bookname }
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    const content = doc.querySelector(".read-content") as HTMLElement;
    if (content) {
      rm("script", true, content);
      const ads = [
        "【悠久小説網ωωω.ＵＪХＳ.ｎｅｔ】，免费小说无弹窗免费阅读！",
        "佰度搜索 【悠久小說網 ＷＷＷ.ＵＪХＳ．ＮＥＴ】 全集TXT电子书免费下载！",
      ];
      ads.forEach(
        (ad) => (content.innerHTML = content.innerHTML.replaceAll(ad, ""))
      );
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
