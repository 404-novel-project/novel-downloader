import * as CryptoJS from "crypto-js";
import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { gfetch } from "../../../lib/http";
import { rm, rms } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { AttachmentClass } from "../../../main/Attachment";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Shubl extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "UTF-8";
    this.concurrencyLimit = 1;
    this.maxRunLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-title > span") as HTMLSpanElement
    ).innerText.trim();
    const author = (
      document.querySelector("div.username") as HTMLDivElement
    ).innerText.trim();
    const introDom = document.querySelector(".book-brief");
    const [introduction, introductionHTML] = await introDomHandle(
      introDom,
      (introDomI) => {
        rms(["简介："], introDomI);
        return introDomI;
      }
    );

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (document.querySelector(".book-img") as HTMLImageElement)
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.row > span.tag")
    ).map((span) => (span as HTMLSpanElement).innerText.trim());

    const chapters: Chapter[] = [];
    const chapterTitleList = Array.from(
      document.querySelectorAll(
        "#chapter_list > div.chapter > div.chapter-title"
      )
    ).map((div) => (div as HTMLDivElement).innerText.trim());
    const articlesList = document.querySelectorAll(
      "#chapter_list > div.chapter > div.articles"
    );
    const sectionLength = chapterTitleList.length;

    let chapterNumber = 0;
    for (let i = 0; i < sectionLength; i++) {
      const s = articlesList[i];
      const sectionNumber = i + 1;
      const sectionName = chapterTitleList[i];
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll("span.chapter_item");
      for (const c of Array.from(cs)) {
        chapterNumber++;
        sectionChapterNumber++;

        const a = c.querySelector("a");
        if (a) {
          const chapterName = a.innerText.trim();
          const chapterUrl = a.href;

          const isVIP = () => {
            if (c.childElementCount === 2) {
              return true;
            }
            return false;
          };

          const isPaid = () => {
            if (isVIP() && c.querySelector("i")?.className === "unlock") {
              return true;
            }
            return false;
          };

          const isLogin = () => {
            if (
              document.querySelector(
                "#header > div.container > div.right.pull-right"
              )?.childElementCount === 3
            ) {
              return true;
            }
            return false;
          };

          const chapter = new Chapter(
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            isVIP(),
            isPaid(),
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            this.chapterParse,
            this.charset,
            {}
          );
          if (isVIP() && !(isLogin() && isPaid())) {
            chapter.status = Status.aborted;
          }
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
    interface DecryptItem {
      content: string;
      keys: string[];
      accessKey: string;
    }
    function decrypt(item: DecryptItem) {
      let message = item.content;
      const keys = item.keys;
      const len = item.keys.length;
      const accessKey = item.accessKey;
      const accessKeyList = accessKey.split("");
      const charsNotLatinNum = accessKeyList.length;
      const output = [];
      output.push(
        keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]
      );
      output.push(keys[accessKeyList[0].charCodeAt(0) % len]);

      for (let i = 0; i < output.length; i++) {
        message = atob(message);
        const data = output[i];
        const iv = btoa(message.substr(0, 16));
        const keys255 = btoa(message.substr(16));
        const pass = CryptoJS.format.OpenSSL.parse(keys255);

        message = CryptoJS.AES.decrypt(pass, CryptoJS.enc.Base64.parse(data), {
          iv: CryptoJS.enc.Base64.parse(iv),
          format: CryptoJS.format.OpenSSL,
        }) as any;

        if (i < output.length - 1) {
          message = (message as any).toString(CryptoJS.enc.Base64);
          message = atob(message);
        }
      }

      return (message as any).toString(CryptoJS.enc.Utf8);
    }
    const rootPath = "https://www.shubl.com/";
    const chapterId = chapterUrl.split("/").slice(-1)[0];

    async function publicChapter(): Promise<ChapterParseObject> {
      async function chapterDecrypt(chapterIdt: string, refererUrl: string) {
        const accessKeyUrl = rootPath + "chapter/ajax_get_session_code";
        const chapterContentUrl =
          rootPath + "chapter/get_book_chapter_detail_info";

        interface AccessKeyObj {
          code: number;
          chapter_access_key: string;
        }
        log.debug(`[Chapter]请求 ${accessKeyUrl} Referer ${refererUrl}`);
        const accessKeyObj = await gfetch(accessKeyUrl, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Referer: refererUrl,
            Origin: document.location.origin,
            "X-Requested-With": "XMLHttpRequest",
          },
          data: `chapter_id=${chapterIdt}`,
          responseType: "json",
        })
          .then((response) => response.response)
          .catch((error) => log.error(error));

        const chapter_access_key = (accessKeyObj as AccessKeyObj)
          .chapter_access_key;

        interface ChapterContentObj {
          code: number;
          chapter_content: string;
          encryt_keys: string[];
          rad: number;
        }
        log.debug(`[Chapter]请求 ${chapterContentUrl} Referer ${refererUrl}`);
        const chapterContentObj = await gfetch(chapterContentUrl, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Referer: refererUrl,
            Origin: document.location.origin,
            "X-Requested-With": "XMLHttpRequest",
          },
          data: `chapter_id=${chapterIdt}&chapter_access_key=${chapter_access_key}`,
          responseType: "json",
        })
          .then((response) => response.response)
          .catch((error) => log.error(error));

        if ((chapterContentObj as ChapterContentObj).code !== 100000) {
          log.error(chapterContentObj);
          throw new Error(`下载 ${refererUrl} 失败`);
        }

        return decrypt({
          content: (chapterContentObj as ChapterContentObj).chapter_content,
          keys: (chapterContentObj as ChapterContentObj).encryt_keys,
          accessKey: chapter_access_key,
        });
      }

      const content = document.createElement("div");
      const decryptDate = await chapterDecrypt(chapterId, chapterUrl);

      content.innerHTML = decryptDate;
      rm(".chapter span", true, content);

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

    async function vipChapter(): Promise<ChapterParseObject> {
      async function vipChapterDecrypt(chapterIdi: string, refererUrl: string) {
        const parentWidth = 939.2;
        const setFontSize = "18";

        interface ImageSessionCodeObject {
          code: number;
          encryt_keys: string[];
          image_code: string;
          access_key: string;
        }

        const imageSessionCodeUrl =
          rootPath + "chapter/ajax_get_image_session_code";
        log.debug(`[Chapter]请求 ${imageSessionCodeUrl} Referer ${refererUrl}`);
        const imageSessionCodeObject = await gfetch(imageSessionCodeUrl, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            Referer: refererUrl,
            Origin: document.location.origin,
            "X-Requested-With": "XMLHttpRequest",
          },
          responseType: "json",
        })
          .then((response) => response.response)
          .catch((error) => log.error(error));

        if (
          (imageSessionCodeObject as ImageSessionCodeObject).code !== 100000
        ) {
          log.error(imageSessionCodeObject);
          throw new Error(`下载 ${refererUrl} 失败`);
        }

        const imageCode = decrypt({
          content: (imageSessionCodeObject as ImageSessionCodeObject)
            .image_code,
          keys: (imageSessionCodeObject as ImageSessionCodeObject).encryt_keys,
          accessKey: (imageSessionCodeObject as ImageSessionCodeObject)
            .access_key,
        });

        const vipCHapterImageUrlI =
          rootPath +
          "chapter/book_chapter_image?chapter_id=" +
          chapterIdi +
          "&area_width=" +
          parentWidth +
          "&font=undefined" +
          "&font_size=" +
          setFontSize +
          "&image_code=" +
          imageCode +
          "&bg_color_name=white" +
          "&text_color_name=white";

        return vipCHapterImageUrlI;
      }

      if (isPaid) {
        const vipCHapterImageUrl = await vipChapterDecrypt(
          chapterId,
          chapterUrl
        );
        log.debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
        const vipCHapterImageBlob = await gfetch(vipCHapterImageUrl, {
          method: "GET",
          headers: {
            Referer: chapterUrl,
            Accept:
              "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          },
          responseType: "blob",
        })
          .then((response) => response.response)
          .catch((error) => log.error(error));

        const vipCHapterName = `vipCHapter${chapterId}.png`;
        const vipCHapterImage = new AttachmentClass(
          vipCHapterImageUrl,
          vipCHapterName,
          "TM"
        );
        if (vipCHapterImageBlob) {
          vipCHapterImage.imageBlob = vipCHapterImageBlob as Blob;
          vipCHapterImage.status = Status.finished;
        }
        const contentImages = [vipCHapterImage];

        const img = document.createElement("img");
        img.src = vipCHapterName;
        img.alt = vipCHapterImageUrl;
        const contentHTML = document.createElement("div");
        contentHTML.appendChild(img);

        const contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;

        return {
          chapterName,
          contentRaw: contentHTML,
          contentText,
          contentHTML,
          contentImages,
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

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
