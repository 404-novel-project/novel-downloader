import * as CryptoJSGlobal from "crypto-js";
import { getImageAttachment } from "../../lib/attachments";
import { cleanDOM } from "../../lib/cleanDOM";
import { getHtmlDOM } from "../../lib/http";
import { log } from "../../log";
import { Book, BookAdditionalMetadate, Chapter } from "../../main";
import { BaseRuleClass } from "../../rules";
import { introDomHandle } from "../lib/common";

export class Xkzw extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector("#info > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();
    const author = (
      document.querySelector("#info > p:nth-child(2)") as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim();

    const introDom = document.querySelector("#intro") as HTMLElement;
    const [introduction, introductionHTML, introCleanimages] =
      await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#fmimg > img") as HTMLImageElement
    ).src;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];

    const bookid = (unsafeWindow as any).bookId;
    interface ChapterObject {
      chapterid: number;
      chaptername: string;
      isempty: number;
      originalurl: string;
      currenturl: string;
    }
    interface ColumnObject {
      columnname: string;
      columnid: number;
      chapterlist: ChapterObject[];
    }
    interface SiteChapterList {
      columnlist: ColumnObject[];
      chaptercount: number;
    }
    const apiUrl = [document.location.origin, "action.php"].join("/");
    log.debug(`[chapter]正在请求${apiUrl}`);
    const siteChapterList: SiteChapterList = await fetch(apiUrl, {
      headers: {
        accept: "application/json, text/javascript, */*",
        "content-type": "application/x-www-form-urlencoded",
        "x-requested-with": "XMLHttpRequest",
      },
      body: `action=clist&bookid=${bookid}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((error) => log.error(error));

    const dl1 = document.querySelector(
      "#wrapper > div.box_con:nth-child(7) > div:nth-child(1) > dl:nth-child(1)"
    );
    const dl2 = document.querySelector(
      "#wrapper > div.box_con:nth-child(11) > div:nth-child(1) > dl:nth-child(1)"
    );

    const mkList = (dl: Element | null): [ColumnObject[], ChapterObject[]] => {
      let tmpColumnName = "";
      const ttmpColumnList: ColumnObject[] = [];
      let ttmpChapterList: ChapterObject[] = [];
      if (dl?.childElementCount) {
        const dlc = Array.from(dl.children);
        for (let i = 0; i < dl.childElementCount; i++) {
          const node = dlc[i];
          if (i !== 0) {
            if (node.nodeName === "DD") {
              const a = node.firstElementChild as HTMLLinkElement;
              const chapterName = a.innerText;
              const chapterUrl = a.href;
              const chapterid = chapterUrl
                .split("/")
                .slice(-1)[0]
                .replace(".html", "");
              ttmpChapterList.push({
                chapterid: Number(chapterid) - bookid * 11,
                chaptername: chapterName,
                isempty: 0,
                originalurl: "",
                currenturl: "",
              });
            } else if (node.nodeName === "DT") {
              const tmpColumnObj: ColumnObject = {
                columnname: tmpColumnName,
                columnid: 0,
                chapterlist: ttmpChapterList,
              };
              ttmpColumnList.push(tmpColumnObj);
              tmpColumnName = (node as HTMLElement).innerText
                .replace(`《${bookname}》`, "")
                .trim();
              ttmpChapterList = [];
            }
          } else {
            tmpColumnName = (node as HTMLElement).innerText
              .replace(`《${bookname}》`, "")
              .trim();
          }
        }
      }
      return [ttmpColumnList, ttmpChapterList];
    };

    const [tmpColumnList, tmpChapterList] = mkList(dl1);
    const tcl = tmpChapterList.length;
    for (let i = 0; i < tcl; i++) {
      const tmpChapterObject = tmpChapterList.pop();
      if (tmpChapterObject) {
        siteChapterList.columnlist[0].chapterlist.unshift(tmpChapterObject);
      }
    }
    if (tmpColumnList.length !== 0) {
      const tmpColumnListLenght = tmpColumnList.length;
      for (let i = 0; i < tmpColumnListLenght; i++) {
        const tmpColumnObject = tmpColumnList.pop();
        if (tmpColumnObject) {
          siteChapterList.columnlist.unshift(tmpColumnObject);
        }
      }
    }

    const [tmpColumnList1, tmpChapterList1] = mkList(dl2);
    const tcl1 = tmpChapterList1.length;
    const cll = siteChapterList.columnlist.length;
    for (let i = 0; i < tcl1; i++) {
      const tmpChapterObject = tmpChapterList1.shift();
      if (tmpChapterObject) {
        siteChapterList.columnlist[cll - 1].chapterlist.push(tmpChapterObject);
      }
    }
    if (tmpColumnList1.length !== 0) {
      const tmpColumnListLenght = tmpColumnList1.length;
      for (let i = 0; i < tmpColumnListLenght; i++) {
        const tmpColumnObject = tmpColumnList1.shift();
        if (tmpColumnObject) {
          siteChapterList.columnlist.push(tmpColumnObject);
        }
      }
    }

    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const column of siteChapterList.columnlist) {
      sectionNumber++;
      sectionName = column.columnname;
      for (const sitechapter of column.chapterlist) {
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = sitechapter.chaptername;
        const chapterUrl =
          bookUrl + (sitechapter.chapterid + bookid * 11) + ".html";
        const isVIP = false;
        const isPaid = false;
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
    function runEval(CryptoJS: any) {
      function gettt1(str: any, keyStr: any, ivStr: any) {
        const key = CryptoJS.enc.Utf8.parse(keyStr);
        const iv = CryptoJS.enc.Utf8.parse(ivStr);
        const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.DES.decrypt(srcs, key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
      }

      function gettt2(str: any, keyStr: any, ivStr: any) {
        const key = CryptoJS.enc.Utf8.parse(keyStr);
        const iv = CryptoJS.enc.Utf8.parse(ivStr);
        const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.AES.decrypt(srcs, key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
      }

      function gettt3(str: any, keyStr: any, ivStr: any) {
        const key = CryptoJS.enc.Utf8.parse(keyStr);
        const iv = CryptoJS.enc.Utf8.parse(ivStr);
        const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.RC4.decrypt(srcs, key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
      }

      function getttn(str: any, keyStr: any, ivStr: any) {
        const key = CryptoJS.enc.Utf8.parse(keyStr);
        const iv = CryptoJS.enc.Utf8.parse(ivStr);
        const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.TripleDES.decrypt(srcs, key, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
      }

      function showttt1(dom: any) {
        const obj = dom.getElementById("other");
        const objTips = dom.getElementById("contenttips");

        if (obj) {
          let content = obj.innerHTML.trim();
          // eslint-disable-next-line radix
          const type = parseInt(content.substring(0, 1), 10);
          let key;
          let iv;

          if (type === 1) {
            key = content.substring(1, 9);
            iv = content.substring(9, 17);
            content = content.substring(17);
            obj.innerHTML = gettt1(content, key, iv);
            obj.style.display = "block";

            if (objTips) {
              objTips.remove();
            }
          } else if (type === 2) {
            key = content.substring(1, 33);
            iv = content.substring(33, 49);
            content = content.substring(49);
            obj.innerHTML = gettt2(content, key, iv);
            obj.style.display = "block";

            if (objTips) {
              objTips.remove();
            }
          } else if (type === 3) {
            key = content.substring(1, 9);
            iv = content.substring(9, 17);
            content = content.substring(17);
            obj.innerHTML = gettt3(content, key, iv);
            obj.style.display = "block";

            if (objTips) {
              objTips.remove();
            }
          } else {
            key = content.substring(1, 25);
            iv = content.substring(25, 33);
            content = content.substring(33);
            obj.innerHTML = getttn(content, key, iv);
            obj.style.display = "block";

            if (objTips) {
              objTips.remove();
            }
          }
        }
      }

      showttt1(doc);
    }

    const doc = await getHtmlDOM(chapterUrl, charset);
    runEval(CryptoJSGlobal);
    chapterName = (
      doc.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
    ).innerText.trim();

    const contentG = doc.querySelector("#content") as HTMLElement;
    if (contentG) {
      const { dom, text, images } = await cleanDOM(contentG, "TM");
      return {
        chapterName,
        contentRaw: contentG,
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
}
