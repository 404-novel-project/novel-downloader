import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, console_debug } from "../lib";

export class c226ks implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse(chapterParse: ruleClass["chapterParse"]) {
    const bookUrl = document.location.href.replace(
      /index_\d+\.html/,
      "index_1.html"
    );
    const bookname = (<HTMLElement>(
      document.querySelector(".info > .top > h1")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".info > .top > .fix > p:nth-child(1)")
    )).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    let introduction: string | null;
    let introductionHTML: HTMLElement | null;
    const introDom = <HTMLElement>document.querySelector(".desc");
    if (introDom === null) {
      introduction = null;
      introductionHTML = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
      introductionHTML = introCleanDom;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector(".imgbox > img"))
      .src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();

    const chapters: Chapter[] = [];
    const indexUrls = Array.from(
      document.querySelectorAll('[name="pageselect"] > option')
    ).map((opt) => document.location.origin + opt.getAttribute("value"));
    let lis: HTMLElement[] = [];

    for (const indexUrl of indexUrls) {
      console_debug(`[chapter]请求${indexUrl}`);
      const dom = await getHtmlDOM(indexUrl, "UTF-8");
      const ul = dom.querySelector(
        "div.row.row-section > div > div:nth-child(4) > ul"
      );
      if (ul?.childElementCount) {
        lis = lis.concat(<HTMLElement[]>Array.from(ul.children));
      }
    }

    const chapterList = lis.filter((obj) => obj !== undefined);
    let chapterNumber = 0;
    for (let i = 0; i < chapterList.length; i++) {
      const node = <HTMLElement>chapterList[i];
      chapterNumber++;
      const a = <HTMLLinkElement>node.firstElementChild;
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
        chapterParse,
        "UTF-8"
      );
      chapters.push(chapter);
    }

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
      introductionHTML: introductionHTML,
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

    chapterName = (<HTMLElement>dom.querySelector("h1.title")).innerText.trim();

    const content = <HTMLElement>dom.querySelector("#content");
    const ad =
      '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
    content.innerHTML = content.innerHTML.replace(ad, "");
    if (content) {
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
