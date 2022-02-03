import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm } from "../../../lib/dom";
import { getSectionName, introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { AttachmentClass } from "../../../main/Attachment";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { retryLimit } from "../../../setting";

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
    const [introduction, introductionHTML] = await introDomHandle(introDom);

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
    const chapterElems = document.querySelectorAll(".catalog-list a");
    const getName = (sElem: Element) =>
      (sElem.querySelector(".catalog-title") as HTMLElement).innerText
        .replace(`【${bookname}】`, "")
        .trim();

    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    let _sectionName = "";
    for (const elem of Array.from(chapterElems)) {
      const chapterName =
        (elem as HTMLAnchorElement).getAttribute("title")?.trim() ?? "";
      const chapterUrl = (elem as HTMLAnchorElement).href;
      const sectionName = getSectionName(elem, sections, getName);
      if (sectionName && _sectionName !== sectionName) {
        _sectionName = sectionName;
        sectionNumber++;
        sectionChapterNumber = 0;
      }
      chapterNumber++;
      sectionChapterNumber++;

      const isVip = () => {
        return (
          elem.childElementCount !== 0 &&
          elem.firstElementChild?.getAttribute("class") === "icn_vip"
        );
      };
      // 无法从章节列表判断章节支付情况
      const isPaid = null;
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: isVip(),
        isPaid,
        sectionName,
        sectionNumber,
        sectionChapterNumber,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {},
      });
      const isLogin = !document
        .querySelector(".user-bar > .top-link > .normal-link")
        ?.innerHTML.includes("您好，SF游客");
      if (chapter.isVIP && isLogin === false) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
    }

    const book = new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
    book.ToCUrl = document.location.href;
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
          ?.childElementCount === 3;
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
