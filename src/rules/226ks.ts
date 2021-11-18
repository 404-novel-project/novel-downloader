import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { log } from "../log";
import { Book, BookAdditionalMetadate, Chapter } from "../main";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";

export class C226ks extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace(
      /index_\d+\.html/,
      "index_1.html"
    );
    const bookname = (
      document.querySelector(".info > .top > h1") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector(
        ".info > .top > .fix > p:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = document.querySelector(".desc") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(".imgbox > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const indexUrls = Array.from(
      document.querySelectorAll('[name="pageselect"] > option')
    ).map((opt) => document.location.origin + opt.getAttribute("value"));
    let lis: HTMLElement[] = [];

    for (const indexUrl of indexUrls) {
      log.debug(`[chapter]请求${indexUrl}`);
      const dom = await getHtmlDOM(indexUrl, "UTF-8");
      const ul = dom.querySelector(
        "div.row.row-section > div > div:nth-child(4) > ul"
      );
      if (ul?.childElementCount) {
        lis = lis.concat(Array.from(ul.children) as HTMLElement[]);
      }
    }

    const chapterList = lis.filter((obj) => obj !== undefined);
    let chapterNumber = 0;
    for (const node of chapterList) {
      chapterNumber++;
      const a = node.firstElementChild as HTMLLinkElement;
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
        null,
        null,
        null,
        this.chapterParse,
        "UTF-8",
        {}
      );
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
    const doc = await getHtmlDOM(chapterUrl, charset);

    chapterName = (
      doc.querySelector("h1.title") as HTMLElement
    ).innerText.trim();

    const content = doc.querySelector("#content") as HTMLElement;
    const ad =
      '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
    content.innerHTML = content.innerHTML.replace(ad, "");
    if (content) {
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
