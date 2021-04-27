import { BookAdditionalMetadate, attachmentClass, Chapter, Status } from "../main";
import { getHtmlDOM, cleanDOM, co, cosCompare } from "../lib";
import {
  ruleClass,
  ruleClassNamespace,
  chapterParseObject,
  retryLimit,
} from "../rules";

export class sfacg implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookUrl = document.location.href.replace("/MainIndex/", "");
    const bookname = (<HTMLElement>(
      document.querySelector("h1.story-title")
    )).innerText.trim();

    let introduction: string | null;
    const dom = await getHtmlDOM(bookUrl, undefined);
    const author = (<HTMLElement>(
      dom.querySelector(".author-name")
    )).innerText.trim();
    const introDom = dom.querySelector(".introduce");
    if (introDom === null) {
      introduction = null;
    } else {
      let {
        dom: introCleanDom,
        text: introCleantext,
        images: introCleanimages,
      } = cleanDOM(introDom, "TM");
      introduction = introCleantext;
    }

    const additionalMetadate: BookAdditionalMetadate = {};
    let coverUrl = (<HTMLImageElement>(
      dom.querySelector("#hasTicket div.pic img")
    )).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();
    additionalMetadate.tags = Array.from(
      dom.querySelectorAll("ul.tag-list > li.tag > a")
    ).map((a) => (<HTMLAnchorElement>a).innerText.trim());

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(".story-catalog");

    const cos: co[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLElement>(
        s.querySelector(".catalog-title")
      )).innerText
        .replace(`【${bookname}】`, "")
        .trim();

      const cs = s.querySelectorAll(".catalog-list > ul > li > a");
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
        const _chapterName = (<HTMLLinkElement>c).getAttribute("title")?.trim();
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
        const co: co = {
          bookUrl: bookUrl,
          bookname: bookname,
          chapterUrl: chapterUrl,
          chapterName: chapterName,
          isVIP: isVIP,
          isPaid: isPaid,
          sectionName: sectionName,
          sectionNumber: sectionNumber,
          sectionChapterNumber: j,
        };
        cos.push(co);
      }
    }

    let chapterNumber = 0;
    cos.sort(cosCompare);
    for (let i = 0; i < cos.length; i++) {
      chapterNumber++;
      let {
        bookUrl,
        bookname,
        chapterUrl,
        chapterName,
        isVIP,
        isPaid,
        sectionName,
        sectionNumber,
        sectionChapterNumber,
      } = cos[i];
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
        chapterParse,
        "UTF-8"
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

    return {
      bookUrl: bookUrl,
      bookname: bookname,
      author: author,
      introduction: introduction,
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
    const chapter_id = chapterUrl.split("/").slice(-2, -1)[0];

    async function publicChapter(): Promise<chapterParseObject> {
      const dom = await getHtmlDOM(chapterUrl, charset);
      const chapterName = (<HTMLElement>(
        dom.querySelector("h1.article-title")
      )).innerText.trim();
      const content = <HTMLElement>dom.querySelector(".article-content");
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

    async function vipChapter(): Promise<chapterParseObject> {
      async function getvipChapterImage(
        vipChapterImageUrl: string,
        vipChapterName: string
      ) {
        let retryTime = 0;
        function fetchVipChapterImage(
          vipChapterImageUrl: string
        ): Promise<Blob | null> {
          console.debug(
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
                console.error(
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
      };
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
