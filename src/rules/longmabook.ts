import {
  BookAdditionalMetadate,
  Chapter,
  Book,
  ExpectError,
  attachmentClass,
} from "../main";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { BaseRuleClass } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";
import { getImageAttachment } from "../lib/attachments";
import { rm } from "../lib/misc";
import { newWindow } from "../global";

export class longmabook extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse() {
    const isLogin = Boolean(
      document.querySelector('a[href="/?act=signinlst"]')
    );
    if (!isLogin) {
      alert("海棠文化线上文学城需登录后方可浏览！请登录帐号。");
      throw new ExpectError("海棠文化线上文学城需登录后方可浏览！");
    }
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(
        "#mypages > div:nth-child(8) > div:nth-child(1) > h4"
      ) as HTMLHeadElement
    ).innerText;
    const author = (
      document.querySelector("#writerinfos > a") as HTMLAnchorElement
    ).innerText;

    const _urlSearch = new URLSearchParams(document.location.search);
    const bookId = _urlSearch.get("bookid");
    const bookwritercode = _urlSearch.get("bookwritercode");

    const introDom = document
      .querySelector("#mypages > div:nth-child(8) > div:nth-child(1)")
      ?.cloneNode(true) as HTMLElement;
    let [introduction, introductionHTML, introCleanimages]: [
      string | null,
      HTMLElement | null,
      attachmentClass[] | null
    ] = [null, null, null];
    if (introDom) {
      rm("div", true, introDom);
      rm("textarea", true, introDom);
      rm("font", true, introDom);
      rm("b", true, introDom);
      rm("span", true, introDom);
      rm("h4", true, introDom);
      rm("img", true, introDom);
      introDom.innerHTML = introDom.innerHTML
        .replace(/【作品编号：\d+】|【作品編號：\d+】/, "")
        .replace("\n)\n", "");
      [introduction, introductionHTML, introCleanimages] = await introDomHandle(
        introDom
      );
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>(
      document.querySelector(
        "#mypages > div:nth-child(8) > div:nth-child(1) > img"
      )
    ))?.src.replace("_s.", "_b.");
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags =
      (
        document.querySelector(
          '#mypages > div:nth-child(8) > div:nth-child(1) > font[color="#800080"]'
        ) as HTMLFontElement
      )?.innerText
        .split("/")
        .map((item) => item.trim()) ?? [];

    const chapters: Chapter[] = [];
    const liList = document.querySelectorAll(
      `#showbooklist${bookId} > div > ul > li`
    );
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (let i = 0; i < liList.length; i++) {
      const li = liList[i];
      const uk_icon = li.querySelector("span")?.getAttribute("uk-icon");
      if (uk_icon === "folder") {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (<HTMLElement>(
          li.querySelector("b > font")
        ))?.innerText.trim();
      } else if (uk_icon === "file-text") {
        chapterNumber++;
        sectionChapterNumber++;
        const a = li.querySelector("a");
        const chapterName = a?.innerText.trim();
        const chapterUrl = a?.href;
        const isVIP = Boolean((<HTMLLIElement>li).innerText.match(/\$[\d\.]+/));

        if (chapterUrl && chapterName) {
          const chapter = new Chapter(
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            isVIP,
            null,
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            this.chapterParse,
            this.charset,
            { bookId: bookId, bookwritercode: bookwritercode }
          );
          chapters.push(chapter);
        }
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
    const self = this;
    const doc = await getHtmlDOM(chapterUrl, charset);
    if (
      doc.body.innerHTML.includes(
        "您目前正在海棠清水區，只能觀看清水認證文章。"
      )
    ) {
      if (!(window as newWindow & typeof globalThis).stopFlag) {
        alert(
          "您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。"
        );
        (window as newWindow & typeof globalThis).stopFlag = true;
      }
      throw new Error(
        "您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。"
      );
    }
    interface options {
      bookId: string;
      bookwritercode: string;
    }
    const nullObj = {
      chapterName: chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
      additionalMetadate: null,
    };
    if (doc.querySelector("#paperbuybtm")) {
      log.info(`[chapter]付费章节 ${chapterName} 未购买。`);
      return nullObj;
    }

    const content = document.createElement("div");
    let contentText = "";
    let contentImages: attachmentClass[] = [];

    const [imagesDom, imagesText, imagesImages] = await getImages();
    const [mainDom, mainText, mainImages] = await getMainContent();
    const [authorDom, authorText, authorImages] = await getAuthorSay();
    if (imagesDom) {
      content.appendChild(imagesDom);
      contentText += imagesText + "\n\n";
      if (imagesImages) {
        contentImages = contentImages.concat(imagesImages);
      }
    }
    if (mainDom) {
      content.appendChild(mainDom);
      contentText += mainText;
      if (mainImages) {
        contentImages = contentImages.concat(mainImages);
      }
    }
    if (authorDom) {
      const hr = document.createElement("hr");
      authorDom.className = "authorSay";
      content.appendChild(hr);
      content.appendChild(authorDom);
      contentText += "\n\n" + "-".repeat(20) + "\n\n" + authorText;
      if (authorImages) {
        contentImages = contentImages.concat(authorImages);
      }
    }
    return {
      chapterName: chapterName,
      contentRaw: content,
      contentText: contentText,
      contentHTML: content,
      contentImages: contentImages,
      additionalMetadate: null,
    };

    async function getImages(): Promise<
      [HTMLElement | null, string | null, attachmentClass[] | null]
    > {
      const imageDom = document.createElement("div");
      Array.from(
        doc.querySelectorAll(
          "#mypages > div:nth-child(10) > div:nth-child(2) > div:nth-child(6) > ul > li:nth-child(14) > img"
        )
      ).forEach((img) => imageDom.appendChild(img.cloneNode(true)));
      const { dom, text, images } = await cleanDOM(imageDom, self.imageMode);
      return [dom, text, images];
    }

    async function getMainContent(): Promise<
      [HTMLElement | null, string | null, attachmentClass[] | null]
    > {
      const getPaperidAndVercodechk = () => {
        const s = Array.from(doc.querySelectorAll("script")).filter((s) =>
          s.innerText.includes("vercodechk")
        )[0];
        // { paperid: '6630136', vercodechk: 'd1c5b18464d8bb7587b83593641625a5'}
        const m = s.innerText.match(
          /{\spaperid:\s'(\d+)',\svercodechk:\s'(\w+)'}/
        );
        if (m?.length === 3) {
          const [paperid, vercodechk] = m.slice(1) as [string, string];
          return [paperid, vercodechk];
        }
        return [null, null];
      };
      const [paperid, vercodechk] = getPaperidAndVercodechk();
      if (paperid && vercodechk) {
        const showpapercolorUrl =
          document.location.origin + "/showpapercolor.php";
        log.debug(`[chapter]正在请求${showpapercolorUrl}`);
        const resp = await fetch(showpapercolorUrl, {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "max-age=0",
          },
          referrer: chapterUrl,
          body: new URLSearchParams({
            paperid: paperid,
            vercodechk: vercodechk,
          }).toString(),
          method: "POST",
          mode: "cors",
        });
        const contentMain = document.createElement("div");
        contentMain.innerHTML = await resp.text();
        rm('img[src="/images/fullcolor.png"]', true, contentMain);
        const { dom, text, images } = await cleanDOM(
          contentMain,
          self.imageMode
        );
        return [dom, text, images];
      } else {
        return [null, null, null];
      }
    }

    async function getAuthorSay(): Promise<
      [HTMLElement | null, string | null, attachmentClass[] | null]
    > {
      const authorSayDom = doc.querySelector("#colorpanelwritersay");
      if (authorSayDom) {
        const { dom, text, images } = await cleanDOM(
          authorSayDom,
          self.imageMode
        );
        return [dom, text, images];
      } else {
        return [null, null, null];
      }
    }

    // 获取彩蛋
    // https://ebook.longmabook.com/?act=showpaper&paperid=6655348#gopapergbook
    function getEgg() {}
  }
}
