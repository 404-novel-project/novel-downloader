import { GmWindow } from "../../../global";
import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, getHtmlDomWithRetry } from "../../../lib/http";
import { deepcopy } from "../../../lib/misc";
import { rm, rms } from "../../../lib/dom";
import { getSectionName, introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { ExpectError, Status } from "../../../main/main";
import { AttachmentClass } from "../../../main/Attachment";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

// noinspection HtmlUnknownTarget,HtmlUnknownAnchorTarget,HtmlUnknownAttribute,HtmlRequiredAltAttribute
export class Longmabook extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
    this.nsfw = true;
  }

  public async bookParse() {
    const isLogin = Boolean(
      document.querySelector('a[href="/?act=signinlst"]')
    );
    if (!isLogin) {
      alert("小说下载器：海棠文化线上文学城需登录后方可下载！请登录帐号。");
      throw new ExpectError("海棠文化线上文学城需登录后方可浏览！");
    }
    const self = this;
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(
        "#mypages > div:nth-child(8) > div:nth-child(1) > h4"
      ) as HTMLHeadElement
    ).innerText;
    const author = (
      document.querySelector("#writerinfos a") as HTMLAnchorElement
    ).innerText;

    const _urlSearch = new URLSearchParams(document.location.search);
    const bookId = _urlSearch.get("bookid");
    if (!bookId) {
      throw new Error("获取 bookid 出错");
    }
    const bookwritercode = _urlSearch.get("bookwritercode");

    const introDom = document
      .querySelector("#mypages > div:nth-child(8) > div:nth-child(1)")
      ?.cloneNode(true) as HTMLElement;
    let [introduction, introductionHTML]: [
      string | null,
      HTMLElement | null,
      AttachmentClass[] | null
    ] = [null, null, null];
    if (introDom) {
      rm("div", true, introDom);
      rm("textarea", true, introDom);
      rm("font", true, introDom);
      rm("b", true, introDom);
      rm("span", true, introDom);
      rm("h4", true, introDom);
      rm("img", true, introDom);
      rms([/【作品编号：\d+】|【作品編號：\d+】/, "\n)\n"], introDom);
      [introduction, introductionHTML] = await introDomHandle(
        introDom,
        undefined
      );
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector(
        "#mypages > div:nth-child(8) > div:nth-child(1) > img"
      ) as HTMLImageElement
    )?.src.replace("_s.", "_b.");
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
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

    const showbooklistAPIUrl = document.location.origin + "/showbooklist.php";
    const initShowbooklistParams = {
      ebookid: bookId as string,
      pages: "1",
      showbooklisttype: "1",
    };
    const getInitObj = (
      showbooklistParams: typeof initShowbooklistParams
    ): RequestInit => ({
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: new URLSearchParams(showbooklistParams).toString(),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });

    const getPages = (doc: Document) => {
      const aList = doc.querySelectorAll("a[onclick^=showbooklist]");
      const getPageNumber = (a: Element) => {
        const s = a.getAttribute("onclick");
        if (s) {
          const n = /'(\d+)'\)/.exec(s)?.slice(-1)[0];
          if (n) {
            return parseInt(n, 10);
          }
        }
      };
      const _ns = Array.from(aList)
        .map(getPageNumber)
        .filter((n) => n !== undefined) as number[];
      return Array.from(new Set(_ns)).sort();
    };

    const getChapters = (doc: Document) =>
      doc.querySelectorAll('span[uk-icon="file-text"] + a');
    const getSections = (doc: Document) =>
      doc.querySelectorAll('span[uk-icon="folder"] + b > font');
    const getSName = (sElem: Element) =>
      (sElem as HTMLElement).innerText.trim();
    const getIsVip = (a: Element) =>
      a.parentElement?.innerText.includes("$") ?? false;
    const getIsPaid = (a: Element) =>
      a.parentElement?.innerText.includes("已購買") ?? false;

    interface ChapterObj {
      chapterName: string;
      chapterUrl: string;
      _sectionName: string | null;
      isVip: boolean;
      isPaid: boolean;
    }

    const getChapterObjs = (doc: Document): ChapterObj[] => {
      const chapterAList = getChapters(doc);
      const sections = getSections(doc);
      return Array.from(chapterAList).map((a) => {
        const chapterName = (a as HTMLAnchorElement).innerText;
        const chapterUrl = (a as HTMLAnchorElement).href;
        const _sectionName = getSectionName(a, sections, getSName);
        const isVip = getIsVip(a);
        let isPaid = false;
        if (isVip) {
          isPaid = getIsPaid(a);
        }
        return {
          chapterName,
          chapterUrl,
          _sectionName,
          isVip,
          isPaid,
        };
      });
    };

    const chapterObjs: ChapterObj[] = [];
    const initDoc = await getHtmlDomWithRetry(
      showbooklistAPIUrl,
      self.charset,
      getInitObj(initShowbooklistParams)
    );
    if (initDoc) {
      chapterObjs.push(...getChapterObjs(initDoc));
      const pages = getPages(initDoc);
      if (pages.length !== 0) {
        for (const page of pages) {
          const showbooklistParams = deepcopy(initShowbooklistParams);
          showbooklistParams.pages = page.toString();
          const doc = await getHtmlDomWithRetry(
            showbooklistAPIUrl,
            self.charset,
            getInitObj(showbooklistParams)
          );
          if (doc) {
            chapterObjs.push(...getChapterObjs(doc));
          }
        }
      }
    }

    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const {
      chapterName,
      chapterUrl,
      _sectionName,
      isVip: isVIP,
      isPaid,
    } of chapterObjs) {
      if (_sectionName !== sectionName) {
        sectionName = _sectionName;
        sectionNumber++;
        sectionChapterNumber = 0;
      }
      chapterNumber++;
      sectionChapterNumber++;
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
        options: { bookId, bookwritercode },
      });
      if (chapter.isVIP && !chapter.isPaid) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
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
    options: chapterOptions
  ) {
    const self = this;
    const doc = await getHtmlDOM(chapterUrl, charset);
    if (
      doc.body.innerHTML.includes(
        "您目前正在海棠清水區，只能觀看清水認證文章。"
      )
    ) {
      if (!(window as GmWindow).stopFlag) {
        alert(
          "您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。"
        );
        (window as GmWindow).stopController.abort();
      }
      throw new Error(
        "您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。"
      );
    }

    const getPaperidAndVercodechk = () => {
      const ss = Array.from(doc.querySelectorAll("script")).filter((s) =>
        s.innerText.includes("vercodechk")
      )[0];
      // { paperid: '6630136', vercodechk: 'd1c5b18464d8bb7587b83593641625a5'}
      const m = ss.innerText.match(
        /{\spaperid:\s'(\d+)',\svercodechk:\s'(\w+)'}/
      );
      if (m?.length === 3) {
        const [paperidInner, vercodechkInner] = m.slice(1) as [string, string];
        return [paperidInner, vercodechkInner];
      }
      throw new Error("获取 paperid, vercodechk 失败！");
    };
    const [paperid, vercodechk] = getPaperidAndVercodechk();

    const nullObj = {
      chapterName,
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
    let contentImages: AttachmentClass[] = [];

    const [imagesDom, imagesText, imagesImages] = await getImages();
    const [mainDom, mainText, mainImages] = await getMainContent();
    const [authorDom, authorText, authorImages] = await getAuthorSay();
    const [eggDom, eggText, eggImages] = await getEgg();

    if (imagesDom) {
      content.appendChild(imagesDom);
      contentText += imagesText + "\n\n";
      if (imagesImages) {
        contentImages = contentImages.concat(imagesImages);
      }
    }

    // Main Content
    content.appendChild(mainDom);
    contentText += mainText;
    if (mainImages) {
      contentImages = contentImages.concat(mainImages);
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

    if (eggDom) {
      const hr = document.createElement("hr");
      eggDom.className = "egg";
      content.appendChild(hr);
      content.appendChild(eggDom);
      contentText += "\n\n" + "-".repeat(20) + "\n\n" + eggText;
      if (eggImages) {
        contentImages = contentImages.concat(eggImages);
      }
    }

    return {
      chapterName,
      contentRaw: content,
      contentText,
      contentHTML: content,
      contentImages,
      additionalMetadate: null,
    };

    async function getImages(): Promise<
      [HTMLElement | null, string | null, AttachmentClass[] | null]
    > {
      const imageDom = document.createElement("div");
      Array.from(
        doc.querySelectorAll(
          "#mypages > div:nth-child(10) > div:nth-child(2) > div:nth-child(6) > ul > li:nth-child(14) > img"
        )
      ).forEach((img) => imageDom.appendChild(img.cloneNode(true)));
      const { dom, text, images } = await cleanDOM(
        imageDom,
        self.attachmentMode
      );
      return [dom, text, images];
    }

    async function getMainContent(): Promise<
      [HTMLElement, string, AttachmentClass[]]
    > {
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
          paperid,
          vercodechk,
        }).toString(),
        method: "POST",
        mode: "cors",
      });
      const contentMain = document.createElement("div");
      contentMain.innerHTML = await resp.text();
      rm('img[src="/images/fullcolor.png"]', true, contentMain);
      const { dom, text, images } = await cleanDOM(
        contentMain,
        self.attachmentMode
      );
      return [dom, text, images];
    }

    async function getAuthorSay(): Promise<
      [HTMLElement, string, AttachmentClass[]] | [null, null, null]
    > {
      const authorSayDom = doc.querySelector("#colorpanelwritersay");
      if (authorSayDom) {
        const { dom, text, images } = await cleanDOM(
          authorSayDom,
          self.attachmentMode
        );
        return [dom, text, images];
      } else {
        return [null, null, null];
      }
    }

    // 获取彩蛋
    async function getEgg(): Promise<
      [HTMLElement, string, AttachmentClass[]] | [null, null, null]
    > {
      const hasEgg = Array.from(
        doc.querySelectorAll<HTMLAnchorElement>('a[href="#gopapergbook"]')
      )
        .map((node) => node.innerText.trim())
        .some((text) => text === "發表心得留言");

      if (hasEgg) {
        // const resp = await fetch(
        //   document.location.origin + "/showpapereggs.php",
        //   {
        //     credentials: "include",
        //     headers: {
        //       Accept: "*/*",
        //       "Content-Type":
        //         "application/x-www-form-urlencoded; charset=UTF-8",
        //       "X-Requested-With": "XMLHttpRequest",
        //     },
        //     referrer: chapterUrl,
        //     body: new URLSearchParams({
        //       paperid,
        //       bookwritercode: options.bookwritercode,
        //     }).toString(),
        //     method: "POST",
        //     mode: "cors",
        //   }
        // );
        // const eggHTML = await resp.text();
        // if (
        //   eggHTML.includes(
        //     "<img src='/images/fullcolor.png' class='fullimg'><a href='#gopapergbook' uk-icon='commenting'>下方留下評論後可完成敲蛋!</a>"
        //   )
        // ) {
        //   const text = "本章含有彩蛋，但并未敲开。";
        //   const dom = document.createElement("div");
        //   dom.innerText = text;
        //   return [dom, text, []];
        // } else {
        const eggDOM = doc.querySelector("div#eggsarea" + paperid) as HTMLElement;
        let eggHTML = "<h4> 彩蛋 </h4>";
        if (!eggDOM) {
          eggHTML += "<p> 未找到彩蛋</p>";
        }
        else if (eggDOM.innerText.trim() === '') {
          eggHTML += "<p> 本章含有彩蛋，但并未敲开。</p>";
        }
        else eggHTML += eggDOM.innerHTML;
        const eggDom = document.createElement("div");
        eggDom.innerHTML = eggHTML;
        rm('img[src="/images/fullcolor.png"]', true, eggDom);
        const { dom, text, images } = await cleanDOM(
          eggDom,
          self.attachmentMode
        );
        return [dom, text, images];
        // }
      } else {
        return [null, null, null];
      }
    }
  }
}

interface chapterOptions {
  bookId: string;
  bookwritercode: string;
}
