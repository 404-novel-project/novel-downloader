import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
  Book,
} from "../main";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { getImageAttachment } from "../lib/attachments";
import { getHtmlDOM } from "../lib/http";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { retryLimit } from "../setting";
import { introDomHandle } from "./lib/common";
import { log } from "../log";
export class sfacg extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace("/MainIndex/", "");
    const bookname = (<HTMLElement>(
      document.querySelector("h1.story-title")
    )).innerText.trim();

    const dom = await getHtmlDOM(bookUrl, undefined);
    const author = (<HTMLElement>(
      dom.querySelector(".author-name")
    )).innerText.trim();
    const introDom = dom.querySelector(".introduce");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>(
      dom.querySelector("#hasTicket div.pic img")
    )).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }
    additionalMetadate.tags = Array.from(
      dom.querySelectorAll("ul.tag-list > li.tag > a")
    ).map((a) => {
      rm("span.icn", false, <HTMLAnchorElement>a);
      return (<HTMLAnchorElement>a).innerText.trim().replace(/\(\d+\)$/, "");
    });
    if (dom.querySelector(".d-banner")) {
      const _beitouUrl = (<HTMLDivElement>(
        dom.querySelector(".d-banner")
      ))?.style.backgroundImage.split('"');
      if (_beitouUrl?.length === 3) {
        const beitouUrl = _beitouUrl[1];
        const beitou = new attachmentClass(
          beitouUrl,
          `beitou.${beitouUrl.split(".").slice(-1)[0]}`,
          "TM"
        );
        beitou.init();
        additionalMetadate.attachments = [beitou];
      }
    }

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(".story-catalog");
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLElement>(
        s.querySelector(".catalog-title")
      )).innerText
        .replace(`【${bookname}】`, "")
        .trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll(".catalog-list > ul > li > a");
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
        const _chapterName = (<HTMLLinkElement>c).getAttribute("title")?.trim();
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = _chapterName ? _chapterName : "";
        const chapterUrl = (<HTMLLinkElement>c).href;

        let isVIP = false;
        let isPaid = null;
        if (
          c.childElementCount &&
          c.firstElementChild?.getAttribute("class") === "icn_vip"
        ) {
          isVIP = true;
        }
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
          "UTF-8",
          {}
        );
        const isLogin =
          document.querySelector(".user-bar > .top-link > .normal-link")
            ?.childElementCount === 3
            ? true
            : false;
        if (isVIP && !isLogin) {
          chapter.status = Status.aborted;
        }
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
    const chapter_id = chapterUrl.split("/").slice(-2, -1)[0];

    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("h1.article-title")
      )).innerText.trim();
      const content = <HTMLElement>dom.querySelector(".article-content");
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
      async function getvipChapterImage(
        vipChapterImageUrl: string,
        vipChapterName: string
      ) {
        let retryTime = 0;
        function fetchVipChapterImage(
          vipChapterImageUrl: string
        ): Promise<Blob | null> {
          log.debug(
            `[Chapter]请求 ${vipChapterImageUrl} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );

          return fetch(vipChapterImageUrl, {
            headers: {
              accept:
                "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            },
            referrer: chapterUrl,
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          })
            .then((response) => response.blob())
            .then((blob) => {
              if (blob.size === 53658 || blob.size === 42356) {
                log.error(
                  `[Chapter]请求 ${vipChapterImageUrl} 失败 Referer ${chapterUrl}`
                );
                if (retryTime < retryLimit) {
                  retryTime++;
                  return fetchVipChapterImage(vipChapterImageUrl);
                } else {
                  return null;
                }
              } else {
                return blob;
              }
            });
        }

        const vipChapterImageBlob = await fetchVipChapterImage(
          vipChapterImageUrl
        );
        const vipChapterImage = new attachmentClass(
          vipChapterImageUrl,
          vipChapterName,
          "naive"
        );
        if (vipChapterImageBlob) {
          vipChapterImage.imageBlob = vipChapterImageBlob;
          vipChapterImage.status = Status.finished;
        } else {
          vipChapterImage.status = Status.failed;
        }
        return vipChapterImage;
      }

      const isLogin =
        document.querySelector(".user-bar > .top-link > .normal-link")
          ?.childElementCount === 3
          ? true
          : false;
      if (isLogin) {
        const dom = await getHtmlDOM(chapterUrl, charset);
        const chapterName = (<HTMLElement>(
          dom.querySelector("h1.article-title")
        )).innerText.trim();

        const isPaid = dom.querySelector(".pay-section") === null;
        if (isPaid) {
          const vipChapterDom = <HTMLImageElement>(
            dom.querySelector(".article-content > #vipImage")
          );
          if (vipChapterDom) {
            const vipChapterImageUrl = vipChapterDom.src;
            const vipChapterName = `vipCHapter${chapter_id}.gif`;
            const vipChapterImage = await getvipChapterImage(
              vipChapterImageUrl,
              vipChapterName
            );
            const contentImages = [vipChapterImage];
            const img = document.createElement("img");
            img.src = vipChapterName;
            img.alt = vipChapterImageUrl;
            const contentHTML = document.createElement("div");
            contentHTML.appendChild(img);

            const contentText = `VIP章节，请打开HTML文件查看。\n![${vipChapterImageUrl}](${vipChapterName})`;

            return {
              chapterName: chapterName,
              contentRaw: contentHTML,
              contentText: contentText,
              contentHTML: contentHTML,
              contentImages: contentImages,
              additionalMetadate: null,
            };
          } else {
            return publicChapter();
          }
        }
      }
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
