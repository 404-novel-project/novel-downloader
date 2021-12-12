import * as CryptoJS from "crypto-js";
import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm2 } from "../../../lib/misc";
import { getSectionName, introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate, Chapter, Status } from "../../../main";
import { BaseRuleClass } from "../../../rules";

type CryptoJStype = typeof CryptoJS;
export class Hanwujinian extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const anotherPageUrl = (
      document.querySelector("a.titleText_3") as HTMLAnchorElement
    ).href;
    const doc = await getHtmlDOM(anotherPageUrl, this.charset);

    const bookname = (
      document.querySelector("span.titleText_1") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("span.authorText_1") as HTMLElement
    ).innerText.trim();
    const introDom = document.querySelector("#introtext");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const coverUrl = (
      document.querySelector(".wR_JSAS > img") as HTMLImageElement
    ).src;
    const additionalMetadate: BookAdditionalMetadate = {};
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.labelBox_1 > span")
    ).map((span) => (span as HTMLElement)?.innerText.trim());

    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    let sectionName = null;
    const signIn = document.querySelector("#userMeun") !== null;

    const sections = doc.querySelectorAll(
      'div.wR_JS > div.wR_JC[style*="margin: 30px auto;"]'
    );
    const divList = doc.querySelectorAll("div.wR_JS > div.wR_JC > div.wR_JSAC");
    for (const divElem of Array.from(divList) as HTMLElement[]) {
      const aElem = divElem.querySelector("a") as HTMLAnchorElement;
      const chapterName = aElem.innerText.trim();
      const chapterUrl = aElem.href;
      if (sections.length !== 0) {
        const _sectionName = getSectionName(aElem, sections, (dom) =>
          (dom as HTMLElement).innerText.trim()
        );
        if (_sectionName !== sectionName) {
          sectionName = _sectionName;
          sectionNumber++;
          sectionChapterNumber = 0;
        }
      }
      chapterNumber++;
      sectionChapterNumber++;
      const icon = divElem.querySelector("img");
      const isVIP = icon !== null;
      const isPaid = isVIP ? icon.src.includes("lock_2_off.png") : false;
      const chapter: Chapter | void = new Chapter(
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
        { bookname }
      );
      if (chapter.isVIP) {
        if (signIn) {
          if (chapter.isPaid === false) {
            chapter.status = Status.aborted;
          }
        } else {
          chapter.status = Status.aborted;
        }
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
    const doc = await getHtmlDOM(chapterUrl, charset);
    const script = Array.from(doc.querySelectorAll("script")).filter((s) =>
      s.innerHTML.includes("var chapterContent")
    )?.[0];

    // tslint:disable-next-line: no-shadowed-variable
    const getContent = (CryptoJS: CryptoJStype, chapterContent: string) => {
      function AesDecrypt(content: string) {
        const keys = {
          key: "2018122911430000",
          iv: "048fe2a99140c0e6",
        };

        const key = CryptoJS.enc.Latin1.parse(keys.key);
        const iv = CryptoJS.enc.Latin1.parse(keys.iv);
        const d = CryptoJS.AES.decrypt(content, key, {
          iv,
          padding: CryptoJS.pad.ZeroPadding,
        });
        return d.toString(CryptoJS.enc.Utf8);
      }
      const text = decodeURI(AesDecrypt(chapterContent));
      const div = document.createElement("div");
      div.innerText = text;
      return div;
    };

    if (script) {
      const chapterContentLine = script.innerHTML
        .split("\n")
        .filter((l) => l.includes("var chapterContent"))?.[0];
      const content = new Function(
        "CryptoJS",
        `${chapterContentLine};return (${getContent.toString()})(CryptoJS, chapterContent);`
      )(CryptoJS) as HTMLElement;
      rm2(content, ["更多优惠快去下载寒武纪年小说APP哦"]);
      content.innerHTML = content.innerHTML.replaceAll("%3A", "：");
      content.innerHTML = content.innerHTML.replaceAll("++++【", "【");
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
