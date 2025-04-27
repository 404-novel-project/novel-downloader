import {
  cleanDOM,
  convertFixWidth,
  convertFixWidthText,
  isFixWidth,
} from "../../../lib/cleanDOM";
import {
  childNodesCopy,
  getNextSibling,
  getPreviousSibling,
  rm,
} from "../../../lib/dom";
import { getHtmlDOM } from "../../../lib/http";
import { Book } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass } from "../../../rules";

export class Cool18 extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.nsfw = true;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const doc = await getHtmlDOM(bookUrl, this.charset);
    const title = (
      doc.querySelector(
        'h1.main-title'
      ) as HTMLElement
    ).innerText.trim();
    const matchs = /[【《](.+)[】》](.+)?作者[:：]([^\s-]+)/.exec(title);
    let bookname = title;
    let author = "";
    if (matchs) {
      bookname = matchs[1];
      author = matchs[3];
    } else {
      bookname = title;
      author = (doc.querySelector("span.sender > a") as HTMLElement).innerText.trim();
    }
    const introduction = null;
    const introductionHTML = null;
    const additionalMetadate = {};
    const _aElems1 = Array.from(
      document.querySelectorAll(
        "#content-section > pre a"
      )
    );
    let _aElems2 = Array.from(
      document.querySelectorAll(
        "div.post-list  ul.post-items > li"
      )
    );
    const _a = document.createElement("a");
    _a.href = document.location.href;
    _a.innerText = title;
    _aElems1.push(_a);
    _aElems2 = _aElems2
      .filter((a) => {
        const aa = a.querySelector("a");
        const href = (aa as HTMLAnchorElement).href;
        const url = new URL(href);
        return (
          url.searchParams.get("act") === "threadview" &&
          url.searchParams.has("tid")
        );
      })
      .filter(
        (a) => (a as HTMLAnchorElement).innerText.includes("(0 bytes)") === false
      )
    _aElems2 = _aElems2.map((a) => a.querySelector("a") as HTMLAnchorElement);
    const aElems = _aElems1
      .concat(_aElems2)
      .filter((item, pos, self) => {
        // 去重
        // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        const urls = self.map((a) => (a as HTMLAnchorElement).href);
        const url = (item as HTMLAnchorElement).href;
        return urls.indexOf(url) === pos;
      })
      .sort((a: Element, b: Element) => {
        const _aTid = new URL((a as HTMLAnchorElement).href).searchParams.get(
          "tid"
        ) as string;
        const _bTid = new URL((b as HTMLAnchorElement).href).searchParams.get(
          "tid"
        ) as string;
        const aTid = parseInt(_aTid);
        const bTid = parseInt(_bTid);
        return aTid - bTid;
      }) as HTMLAnchorElement[];
    const chapters = aElems.map((a) => {
      const chapterUrl = a.href;
      const chapterNumber = -1;
      const chapterName = a.innerText
        .replace(`【${bookname}】`, "")
        .replace(`《${bookname}》`, "")
        .replace(`作者：${author}`, "")
        .trim();
      return new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: { bookname, author },
      });
    });
    let i = 0;
    for (const chapter of chapters) {
      i++;
      chapter.chapterNumber = i;
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
    options: {
      bookname: string;
      author: string;
    }
  ) {
    const doc = await getHtmlDOM(chapterUrl, charset);
    chapterName = (
      doc.querySelector(
        'h1.main-title'
      ) as HTMLElement
    ).innerText
      .replace(`【${options.bookname}】`, "")
      .replace(`《${options.bookname}》`, "")
      .replace(`作者：${options.author}`, "")
      .trim();
    const dom = doc.querySelector("#content-section > pre, #content-section > div");
    if (dom) {
      // 移除隐藏字符
      Array.from(dom.querySelectorAll('font[color*="E6E6DD"]')).forEach((f) =>
        f.remove()
      );

      const contentRaw = document.createElement("div");
      const nodes = Array.from(dom.childNodes);
      if (nodes.length > 10) {
        childNodesCopy(dom, contentRaw);
        rm("a", true, contentRaw);
        convertFixWidth(contentRaw);
      } else {
        for (const node of nodes) {
          if (node instanceof Text && (node.textContent?.length ?? 0) > 200) {
            if (isFixWidth(node)) {
              contentRaw.appendChild(convertFixWidthText(node));
              continue;
            } else {
              const div = document.createElement("div");
              div.innerText = node.textContent?.trim() ?? "";
              contentRaw.appendChild(div);
              continue;
            }
          }
          contentRaw.appendChild(node);
        }

        // 移除分隔空白<p>
        Array.from(contentRaw.querySelectorAll("p"))
          .filter(
            (p) =>
              p.innerText.trim() === "" &&
              getPreviousSibling(p) instanceof HTMLElement &&
              getNextSibling(p) instanceof HTMLElement
          )
          .forEach((p) => p.remove());
      }
      Array.from(contentRaw.querySelectorAll("center")).forEach((center) => {
        const div = document.createElement("div");
        while (center.firstChild) {
          div.appendChild(center.firstChild);
        }
        center.replaceWith(div);
      });

      const {
        dom: contentHTML,
        text: contentText,
        images: contentImages,
      } = await cleanDOM(contentRaw, "TM");
      return {
        chapterName,
        contentRaw,
        contentText,
        contentHTML,
        contentImages,
        additionalMetadate: null,
      };
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
}
