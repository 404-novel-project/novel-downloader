import { rm } from "../../../lib/dom";
import { BaseRuleClass } from "../../../rules";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { getHtmlDOM } from "../../../lib/http";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter } from "../../../main/Chapter";
import { introDomHandle } from "../../../lib/rule";
import { getAttachment } from "../../../lib/attachments";
import { log } from "../../../log";

export class esjzone extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
  }
  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-detail h2") as HTMLElement
    ).innerText.trim();
    const author = (
      Array.from(document.querySelectorAll('ul.book-detail li')).find(
        li => li.textContent && li.textContent.includes('作者:')
      )?.querySelector('a') as HTMLAnchorElement | null
    )?.innerText.trim() || "Unknown Author";
    const introDom = document.querySelector(".description") as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(
        'section.widget-tags.m-t-20 a.tag'
      )
    ).map((a) => (a as HTMLAnchorElement).innerText);
    const isVIP = false;
    const isPaid = false;
    const coverUrl = document.querySelector("div.product-gallery")?.querySelector("img")?.getAttribute("src") ?? null;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionName:string|null = null;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    function getAName(aElem: HTMLElement) {
      return aElem.querySelector("p")?.innerHTML.trim() ?? aElem?.innerText.trim();
    }
    const sectionList = document.querySelectorAll('#chapterList details');
    if (sectionList) {
      sectionList.forEach((sectionElem) => {
        sectionName = (sectionElem.querySelector('summary strong') as HTMLElement)?.innerText.trim() ?? null;
        const aList = sectionElem.querySelectorAll('a');
        sectionNumber++;
        sectionChapterNumber = 0;
        aList.forEach((aElem) => {
          const chapterUrl = (aElem as HTMLAnchorElement).href;
          const chapterName = getAName(aElem as HTMLElement);
          chapterNumber++;
          sectionChapterNumber++;
          chapters.push(new Chapter({
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
          }));
        });
      });
    } else {
      const aList = document.querySelectorAll('#chapterList a');
      aList.forEach((aElem) => {
        const chapterUrl = (aElem as HTMLAnchorElement).href;
        const chapterName = getAName(aElem as HTMLElement);
        chapterNumber++;
        sectionChapterNumber++;
        chapters.push(new Chapter({
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
        }));
      });
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
    const content = doc.querySelector('.forum-content') as HTMLElement;
    if (content) {
      rm('h3', true, content);
      rm('footer', true, content);
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
        contentImages: [],
        additionalMetadate: null,
      };
    }
  }
}
