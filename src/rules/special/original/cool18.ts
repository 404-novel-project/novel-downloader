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
        '.show_content > center > font[size="6"] > b'
      ) as HTMLElement
    ).innerText.trim();
    const matchs = /[【《](.+)[】》](.+)?作者：([^\s-]+)/.exec(title);
    let bookname = title;
    let author = "";
    if (matchs) {
      bookname = matchs[1];
      author = matchs[3];
    }
    const introduction = null;
    const introductionHTML = null;
    const additionalMetadate = {};
    const _aElems = Array.from(
      document.querySelectorAll(
        ".show_content > pre a, body > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > ul:nth-child(2) > li > a"
      )
    );
    const _a = document.createElement("a");
    _a.href = document.location.href;
    _a.innerText = title;
    _aElems.push(_a);
    const aElems = _aElems
      .filter((a) => {
        const href = (a as HTMLAnchorElement).href;
        const url = new URL(href);
        return (
          url.searchParams.get("act") === "threadview" &&
          url.searchParams.has("tid")
        );
      })
      .filter(
        (a) => (a as HTMLAnchorElement).innerText.includes("(无内容)") === false
      )
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
        '.show_content > center > font[size="6"] > b'
      ) as HTMLElement
    ).innerText
      .replace(`【${options.bookname}】`, "")
      .replace(`《${options.bookname}》`, "")
      .replace(`作者：${options.author}`, "")
      .trim();
    const dom = doc.querySelector(".show_content > pre, .show_content > div");
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
