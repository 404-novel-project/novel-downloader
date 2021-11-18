import { getImageAttachment } from "../lib/attachments";
import { cleanDOM } from "../lib/cleanDOM";
import { getHtmlDOM } from "../lib/http";
import { rm } from "../lib/misc";
import { log } from "../log";
import {
  AttachmentClass,
  Book,
  BookAdditionalMetadate,
  Chapter,
  Status,
} from "../main";
import { BaseRuleClass, ChapterParseObject } from "../rules";
import { retryLimit } from "../setting";
import { introDomHandle } from "./lib/common";
export class Sfacg extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href.replace("/MainIndex/", "");
    const bookname = (
      document.querySelector("h1.story-title") as HTMLElement
    ).innerText.trim();

    const dom = await getHtmlDOM(bookUrl, undefined);
    const author = (
      dom.querySelector(".author-name") as HTMLElement
    ).innerText.trim();
    const introDom = dom.querySelector(".introduce");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      dom.querySelector("#hasTicket div.pic img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      dom.querySelectorAll("ul.tag-list > li.tag > a")
    ).map((a) => {
      rm("span.icn", false, a as HTMLAnchorElement);
      return (a as HTMLAnchorElement).innerText.trim().replace(/\(\d+\)$/, "");
    });
    if (dom.querySelector(".d-banner")) {
      const _beitouUrl = (
        dom.querySelector(".d-banner") as HTMLDivElement
      )?.style.backgroundImage.split('"');
      if (_beitouUrl?.length === 3) {
        const beitouUrl = _beitouUrl[1];
        const beitou = new AttachmentClass(
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
      const sectionName = (
        s.querySelector(".catalog-title") as HTMLElement
      ).innerText
        .replace(`【${bookname}】`, "")
        .trim();
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll(".catalog-list > ul > li > a");
      for (const c of Array.from(cs)) {
        const _chapterName = (c as HTMLLinkElement)
          .getAttribute("title")
          ?.trim();
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = _chapterName ? _chapterName : "";
        const chapterUrl = (c as HTMLLinkElement).href;

        let isVIP = false;
        const isPaid = null;
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
    const chapterId = chapterUrl.split("/").slice(-2, -1)[0];

    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      chapterName = (
        doc.querySelector("h1.article-title") as HTMLElement
      ).innerText.trim();
      const content = doc.querySelector(".article-content") as HTMLElement;
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

    async function vipChapter(): Promise<ChapterParseObject> {
      async function getvipChapterImage(
        vipChapterImageUrl: string,
        vipChapterName: string
      ) {
        let retryTime = 0;
        function fetchVipChapterImage(
          vipChapterImageUrlI: string
        ): Promise<Blob | null | void> {
          log.debug(
            `[Chapter]请求 ${vipChapterImageUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );

          return fetch(vipChapterImageUrlI, {
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
                  `[Chapter]请求 ${vipChapterImageUrlI} 失败 Referer ${chapterUrl}`
                );
                if (retryTime < retryLimit) {
                  retryTime++;
                  return fetchVipChapterImage(vipChapterImageUrlI);
                } else {
                  return null;
                }
              } else {
                return blob;
              }
            })
            .catch((error) => log.error(error));
        }

        const vipChapterImageBlob = await fetchVipChapterImage(
          vipChapterImageUrl
        );
        const vipChapterImage = new AttachmentClass(
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
        const chapterNameI = (
          dom.querySelector("h1.article-title") as HTMLElement
        ).innerText.trim();

        isPaid = dom.querySelector(".pay-section") === null;
        if (isPaid) {
          const vipChapterDom = dom.querySelector(
            ".article-content > #vipImage"
          ) as HTMLImageElement;
          if (vipChapterDom) {
            const vipChapterImageUrl = vipChapterDom.src;
            const vipChapterName = `vipCHapter${chapterId}.gif`;
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
              chapterName: chapterNameI,
              contentRaw: contentHTML,
              contentText,
              contentHTML,
              contentImages,
              additionalMetadate: null,
            };
          } else {
            return publicChapter();
          }
        }
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

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
