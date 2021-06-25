import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  Status,
  Book,
} from "../main";
import { getHtmlDOM, cleanDOM, rm, gfetch } from "../lib";
import { ruleClass, chapterParseObject } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

namespace ciweimao {
  export interface ciweimaoWindow extends unsafeWindow {
    HB: any;
  }
}
export class ciweimao implements ruleClass {
  public imageMode: "naive" | "TM";
  public charset: string;
  public concurrencyLimit: number;
  public maxRunLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.charset = "UTF-8";
    this.concurrencyLimit = 1;
    this.maxRunLimit = 1;
  }

  public async bookParse() {
    const bookid = (<ciweimao.ciweimaoWindow>unsafeWindow).HB.book.book_id;
    const bookUrl = `https://www.ciweimao.com/book/${bookid}`;
    const bookname = (<HTMLElement>(
      document.querySelector(".book-catalog .hd h3")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".book-catalog .hd > p > a")
    )).innerText.trim();

    const dom = await getHtmlDOM(bookUrl, undefined);
    const introDom = dom.querySelector(".book-intro-cnt .book-desc");
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (<HTMLImageElement>dom.querySelector(".cover > img")).src;
    additionalMetadate.cover = new attachmentClass(
      coverUrl,
      `cover.${coverUrl.split(".").slice(-1)[0]}`,
      "TM"
    );
    additionalMetadate.cover.init();
    additionalMetadate.tags = Array.from(
      dom.querySelectorAll(".label-box > .label")
    ).map((span) => (<HTMLSpanElement>span).innerText.trim());

    const chapters: Chapter[] = [];
    const sections = document.querySelectorAll(
      ".book-chapter > .book-chapter-box"
    );
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLElement>s.querySelector(".sub-tit")).innerText;
      let sectionChapterNumber = 0;

      const cs = s.querySelectorAll(".book-chapter-list > li > a");
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (<HTMLLinkElement>c).innerText.trim();
        const chapterUrl = (<HTMLLinkElement>c).href;

        let isVIP = false;
        let isPaid = false;
        if (c.childElementCount) {
          isVIP = true;
          if (c.firstElementChild?.className === "icon-unlock") {
            isPaid = true;
          }
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
          this.charset,
          {}
        );
        const isLogin =
          document.querySelector(".login-info.ly-fr")?.childElementCount === 1
            ? true
            : false;
        if (isVIP && !(isLogin && isPaid)) {
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
    async function getChapterAuthorSay() {
      const doc = await getHtmlDOM(chapterUrl, undefined);
      const _chapter_author_says = doc.querySelectorAll(
        "#J_BookCnt .chapter.author_say"
      );
      let div_chapter_author_say: HTMLElement | undefined;
      if (_chapter_author_says.length !== 0) {
        let hr = document.createElement("hr");
        div_chapter_author_say = document.createElement("div");
        div_chapter_author_say.appendChild(hr);

        for (let _chapter_author_say of Array.from(_chapter_author_says)) {
          rm("i", true, <HTMLElement>_chapter_author_say);
          div_chapter_author_say.appendChild(_chapter_author_say);
        }
      }
      return div_chapter_author_say;
    }

    const chapter_id = chapterUrl.split("/").slice(-1)[0];

    async function publicChapter(): Promise<chapterParseObject> {
      async function chapterDecrypt(chapter_id: string, refererUrl: string) {
        const rootPath = "https://www.ciweimao.com/";
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
            Origin: "https://www.ciweimao.com",
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
            Origin: "https://www.ciweimao.com",
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

      const div_chapter_author_say = await getChapterAuthorSay();
      let content = document.createElement("div");
      let decryptDate = await chapterDecrypt(chapter_id, chapterUrl);

      content.innerHTML = decryptDate;
      rm(".chapter span", true, content);

      if (div_chapter_author_say) {
        content.appendChild(div_chapter_author_say);
      }

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
      const isLogin =
        document.querySelector(".login-info.ly-fr")?.childElementCount === 1
          ? true
          : false;
      if (isLogin && isPaid) {
        async function vipChapterDecrypt(
          chapter_id: string,
          refererUrl: string
        ) {
          const HB = (<ciweimao.ciweimaoWindow>unsafeWindow).HB;

          const parentWidth = 871;
          const setFontSize = "14";

          interface image_session_code_object {
            code: number;
            encryt_keys: string[];
            image_code: string;
            access_key: string;
          }
          const image_session_code_url =
            HB.config.rootPath + "chapter/ajax_get_image_session_code";
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
                Origin: "https://www.ciweimao.com",
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
            HB.config.rootPath +
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

        const div_chapter_author_say = await getChapterAuthorSay();

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

        let ddom, dtext, dimages;
        if (div_chapter_author_say) {
          let { dom, text, images } = await cleanDOM(
            div_chapter_author_say,
            "TM"
          );
          [ddom, dtext, dimages] = [dom, text, images];
        }

        const img = document.createElement("img");
        img.src = vipCHapterName;
        img.alt = vipCHapterImageUrl;
        const contentHTML = document.createElement("div");
        contentHTML.appendChild(img);
        if (ddom) {
          contentHTML.appendChild(ddom);
        }

        let contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;
        if (dtext) {
          contentText = contentText + "\n\n" + dtext;
        }

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
