import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
  Book,
} from "../main";
import { rm } from "../lib/misc";
import { cleanDOM } from "../lib/cleanDOM";
import { gfetch } from "../lib/http";
import { getImageAttachment } from "../lib/attachments";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class shubl extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "UTF-8";
    this.concurrencyLimit = 1;
    this.maxRunLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (<HTMLSpanElement>(
      document.querySelector(".book-title > span")
    )).innerText.trim();
    const author = (<HTMLDivElement>(
      document.querySelector("div.username")
    )).innerText.trim();
    const introDom = document.querySelector(".book-brief");
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom, (introDom) => {
        introDom.innerHTML = introDom.innerHTML.replace("简介：", "");
        return introDom;
      });

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>document.querySelector(".book-img"))
      .src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("div.row > span.tag")
    ).map((span) => (<HTMLSpanElement>span).innerText.trim());

    const chapters: Chapter[] = [];
    const chapterTitleList = Array.from(
      document.querySelectorAll(
        "#chapter_list > div.chapter > div.chapter-title"
      )
    ).map((div) => (<HTMLDivElement>div).innerText.trim());
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
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
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
    interface decrypt_item {
      content: string;
      keys: string[];
      accessKey: string;
    }
    function decrypt(item: decrypt_item) {
      type Message = {};
      let message = item.content;
      let keys = item.keys;
      let len = item.keys.length;
      let accessKey = item.accessKey;
      let accessKeyList = accessKey.split("");
      let charsNotLatinNum = accessKeyList.length;
      let output = new Array();
      output.push(
        keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]
      );
      output.push(keys[accessKeyList[0].charCodeAt(0) % len]);

      for (let i = 0; i < output.length; i++) {
        message = atob(message);
        let data = output[i];
        let iv = btoa(message.substr(0, 16));
        let keys255 = btoa(message.substr(16));
        let pass = CryptoJS.format.OpenSSL.parse(keys255);

        message = <any>CryptoJS.AES.decrypt(
          pass,
          CryptoJS.enc.Base64.parse(data),
          {
            iv: CryptoJS.enc.Base64.parse(iv),
            format: CryptoJS.format.OpenSSL,
          }
        );

        if (i < output.length - 1) {
          message = (<any>message).toString(CryptoJS.enc.Base64);
          message = atob(message);
        }
      }

      return (<any>message).toString(CryptoJS.enc.Utf8);
    }

    const chapter_id = chapterUrl.split("/").slice(-1)[0];
    const rootPath = "https://www.shubl.com/";

    async function publicChapter(): Promise<chapterParseObject> {
      async function chapterDecrypt(chapter_id: string, refererUrl: string) {
        const access_key_url = rootPath + "chapter/ajax_get_session_code";
        const chapter_content_url =
          rootPath + "chapter/get_book_chapter_detail_info";

        interface access_key_obj {
          code: number;
          chapter_access_key: string;
        }
        log.debug(`[Chapter]请求 ${access_key_url} Referer ${refererUrl}`);
        const access_key_obj = await gfetch(access_key_url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Referer: refererUrl,
            Origin: document.location.origin,
            "X-Requested-With": "XMLHttpRequest",
          },
          data: `chapter_id=${chapter_id}`,
          responseType: "json",
        }).then((response) => response.response);
        const chapter_access_key = (<access_key_obj>access_key_obj)
          .chapter_access_key;

        interface chapter_content_obj {
          code: number;
          chapter_content: string;
          encryt_keys: string[];
          rad: number;
        }
        log.debug(`[Chapter]请求 ${chapter_content_url} Referer ${refererUrl}`);
        const chapter_content_obj = await gfetch(chapter_content_url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Referer: refererUrl,
            Origin: document.location.origin,
            "X-Requested-With": "XMLHttpRequest",
          },
          data: `chapter_id=${chapter_id}&chapter_access_key=${chapter_access_key}`,
          responseType: "json",
        }).then((response) => response.response);

        if ((<chapter_content_obj>chapter_content_obj).code !== 100000) {
          log.error(chapter_content_obj);
          throw new Error(`下载 ${refererUrl} 失败`);
        }

        return decrypt({
          content: (<chapter_content_obj>chapter_content_obj).chapter_content,
          keys: (<chapter_content_obj>chapter_content_obj).encryt_keys,
          accessKey: chapter_access_key,
        });
      }

      let content = document.createElement("div");
      let decryptDate = await chapterDecrypt(chapter_id, chapterUrl);

      content.innerHTML = decryptDate;
      rm(".chapter span", true, content);

      let { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    }

    async function vipChapter(): Promise<chapterParseObject> {
      if (isPaid) {
        async function vipChapterDecrypt(
          chapter_id: string,
          refererUrl: string
        ) {
          const parentWidth = 939.2;
          const setFontSize = "18";

          interface image_session_code_object {
            code: number;
            encryt_keys: string[];
            image_code: string;
            access_key: string;
          }

          const image_session_code_url =
            rootPath + "chapter/ajax_get_image_session_code";
          log.debug(
            `[Chapter]请求 ${image_session_code_url} Referer ${refererUrl}`
          );
          const image_session_code_object = await gfetch(
            image_session_code_url,
            {
              method: "POST",
              headers: {
                Accept: "application/json, text/javascript, */*; q=0.01",
                Referer: refererUrl,
                Origin: document.location.origin,
                "X-Requested-With": "XMLHttpRequest",
              },
              responseType: "json",
            }
          ).then((response) => response.response);

          if (
            (<image_session_code_object>image_session_code_object).code !==
            100000
          ) {
            log.error(image_session_code_object);
            throw new Error(`下载 ${refererUrl} 失败`);
          }

          const imageCode = decrypt({
            content: (<image_session_code_object>image_session_code_object)
              .image_code,
            keys: (<image_session_code_object>image_session_code_object)
              .encryt_keys,
            accessKey: (<image_session_code_object>image_session_code_object)
              .access_key,
          });

          const vipCHapterImageUrl =
            rootPath +
            "chapter/book_chapter_image?chapter_id=" +
            chapter_id +
            "&area_width=" +
            parentWidth +
            "&font=undefined" +
            "&font_size=" +
            setFontSize +
            "&image_code=" +
            imageCode +
            "&bg_color_name=white" +
            "&text_color_name=white";

          return vipCHapterImageUrl;
        }

        const vipCHapterImageUrl = await vipChapterDecrypt(
          chapter_id,
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
        }).then((response) => response.response);

        const vipCHapterName = `vipCHapter${chapter_id}.png`;
        const vipCHapterImage = new attachmentClass(
          vipCHapterImageUrl,
          vipCHapterName,
          "TM"
        );
        if (vipCHapterImageBlob) {
          vipCHapterImage.imageBlob = <Blob>vipCHapterImageBlob;
          vipCHapterImage.status = Status.finished;
        }
        const contentImages = [vipCHapterImage];

        const img = document.createElement("img");
        img.src = vipCHapterName;
        img.alt = vipCHapterImageUrl;
        const contentHTML = document.createElement("div");
        contentHTML.appendChild(img);

        let contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;

        return {
          chapterName: chapterName,
          contentRaw: contentHTML,
          contentText: contentText,
          contentHTML: contentHTML,
          contentImages: contentImages,
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

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
