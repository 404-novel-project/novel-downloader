import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { sandboxed } from "../../../lib/misc";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../../main";
import { BaseRuleClass } from "../../../rules";

export class Dmzj extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.streamZip = true;
    this.concurrencyLimit = 1;
    this.maxRunLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const isWwwHost = document.location.host === "www.dmzj.com";

    const bookDom = isWwwHost
      ? document.querySelector(".comic_deCon > h1 > a")
      : document.querySelector(".anim_title_text > a > h1");
    const bookname = (bookDom as HTMLElement).innerText.trim();
    const authorDom = isWwwHost
      ? document.querySelector(".comic_deCon_liO > li:nth-child(1)")
      : document.querySelector(
          ".anim-main_list > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > a:nth-child(1)"
        );
    const author = (authorDom as HTMLElement).innerText
      .replace("作者：", "")
      .trim();

    const introDom = isWwwHost
      ? document.querySelector(".comic_deCon_d")
      : (document.querySelector(".line_height_content") as HTMLElement);
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverDom = isWwwHost
      ? document.querySelector(".comic_i_img > a > img")
      : document.querySelector("#cover_pic");
    const coverUrl = (coverDom as HTMLImageElement).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const cos = isWwwHost
      ? document.querySelectorAll(
          "div.zj_list_con:nth-child(4) > ul.list_con_li > li"
        )
      : document.querySelectorAll(".cartoon_online_border > ul > li");
    let chapterNumber = 0;
    for (const co of Array.from(cos)) {
      chapterNumber++;
      const a = co.firstElementChild as HTMLAnchorElement;
      let chapterName;
      if (isWwwHost) {
        const span = a.lastElementChild as HTMLSpanElement;
        chapterName = span.innerText;
      } else {
        chapterName = a.innerText;
      }
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
    function getpicUrlList(docI: Document) {
      const imgPrefix = "https://images.dmzj.com/";

      const scriptElement = Array.from(
        docI.querySelectorAll("head > script")
      ).filter((s) => s.innerHTML.includes("eval("))[0];
      let pages = sandboxed(
        (scriptElement as HTMLScriptElement).innerText + ";return pages;"
      );
      pages = pages.replace(/\n/g, "");
      pages = pages.replace(/\r/g, "|");
      const info = sandboxed("return (" + pages + ")");
      if (info) {
        let picUrlListI;
        if (isWwwHost) {
          picUrlListI = info.page_url
            .split("|")
            .map((pic: string) => imgPrefix + pic);
        } else {
          picUrlListI = info.map((pic: string) => imgPrefix + pic);
        }
        return picUrlListI;
      }
    }

    log.debug(`[Chapter]请求 ${chapterUrl}`);
    const isWwwHost = document.location.host === "www.dmzj.com";
    const doc = await getHtmlDOM(chapterUrl, charset);
    const picUrlList = getpicUrlList(doc);
    if (picUrlList) {
      const content = document.createElement("div");
      for (const picUrl of picUrlList) {
        const pElem = document.createElement("p");
        const imgElem = document.createElement("img");

        imgElem.src = picUrl;
        pElem.appendChild(imgElem);
        content.appendChild(pElem);
      }
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    }

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
