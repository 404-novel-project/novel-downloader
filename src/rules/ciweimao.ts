import { BookAdditionalMetadate, ImageClass, Chapter } from "../main";
import { getHtmlDOM, cleanDOM, rm, gfetch, co, cosCompare } from "../lib";
import {
  ruleClass,
  ruleClassNamespace,
  bookParseObject,
  chapterParseObject,
} from "../rules";

namespace ciweimao {
  export interface ciweimaoWindow extends unsafeWindow {
    HB: any;
  }
}
export class ciweimao implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse(chapterParse: ruleClassNamespace.chapterParse) {
    const bookid = (<ciweimao.ciweimaoWindow>unsafeWindow).HB.book.book_id;
    const bookUrl = `https://www.ciweimao.com/book/${bookid}`;
    const bookname = (<HTMLElement>(
      document.querySelector(".book-catalog .hd h3")
    )).innerText.trim();
    const author = (<HTMLElement>(
      document.querySelector(".book-catalog .hd > p > a")
    )).innerText.trim();

    let introduction: string | null;
    const dom = await getHtmlDOM(bookUrl, undefined);
    const introDom = dom.querySelector(".book-intro-cnt .book-desc");
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
    const coverUrl = (<HTMLImageElement>dom.querySelector(".cover > img")).src;
    additionalMetadate.cover = new ImageClass(
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

    const cos: co[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (<HTMLElement>s.querySelector(".sub-tit")).innerText;

      const cs = s.querySelectorAll(".book-chapter-list > li > a");
      for (let j = 0; j < cs.length; j++) {
        const c = cs[j];
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

    cos.sort(cosCompare);
    for (let i = 0; i < cos.length; i++) {
      const chapterNumber = i + 1;
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
    async function publicChapter(): Promise<chapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, undefined);
      const chapter_id = chapterUrl.split("/").slice(-1)[0];

      const _chapter_author_says = doc.querySelectorAll(
        "#J_BookCnt .chapter.author_say"
      );
      let div_chapter_author_say;
      if (_chapter_author_says.length !== 0) {
        let hr = document.createElement("hr");
        div_chapter_author_say = document.createElement("div");
        div_chapter_author_say.appendChild(hr);

        for (let _chapter_author_say of Array.from(_chapter_author_says)) {
          rm("i", true, <HTMLElement>_chapter_author_say);
          div_chapter_author_say.appendChild(_chapter_author_say);
        }
      }

      async function chapterDecrypt(chapter_id: string, refererUrl: string) {
        const rootPath = "https://www.ciweimao.com/";
        const access_key_url = rootPath + "chapter/ajax_get_session_code";
        const chapter_content_url =
          rootPath + "chapter/get_book_chapter_detail_info";

        interface access_key_obj {
          code: number;
          chapter_access_key: string;
        }
        console.debug(`[Chapter]请求 ${access_key_url} Referer ${refererUrl}`);
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
        console.debug(
          `[Chapter]请求 ${chapter_content_url} Referer ${refererUrl}`
        );
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
          console.error(chapter_content_obj);
          throw new Error(`下载 ${refererUrl} 失败`);
        }

        return decrypt({
          content: (<chapter_content_obj>chapter_content_obj).chapter_content,
          keys: (<chapter_content_obj>chapter_content_obj).encryt_keys,
          accessKey: chapter_access_key,
        });
      }

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

      let content = document.createElement("div");
      let decryptDate = await chapterDecrypt(chapter_id, chapterUrl);

      content.innerHTML = decryptDate;
      rm(".chapter span", true, content);

      if (div_chapter_author_say) {
        content.appendChild(div_chapter_author_say);
      }

      let { dom, text, images } = cleanDOM(content, "TM");
      return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
      };
    }

    async function vipChapter(): Promise<chapterParseObject> {
      if (isPaid) {
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
