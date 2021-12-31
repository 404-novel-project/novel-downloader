import { cleanDOM, convertFixWidthText } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { Book } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass } from "../../../rules";

export class Cool18 extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
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
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        false,
        false,
        null,
        null,
        null,
        this.chapterParse,
        this.charset,
        { bookname, author }
      );
      return chapter;
    });
    let i = 0;
    for (const chapter of chapters) {
      i++;
      chapter.chapterNumber = i;
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
    const dom = doc.querySelector(".show_content > pre");
    if (dom) {
      // 移除隐藏字符
      Array.from(dom.querySelectorAll('font[color*="E6E6DD"]')).forEach((f) =>
        f.remove()
      );
      // 移除换行
      Array.from(dom.querySelectorAll("br")).forEach((br) => {
        const previous = getPreviousSibling(br);
        const next = getNextSibling(br);
        if (previous instanceof Text && next instanceof Text) {
          if (
            Math.max(
              previous.textContent?.trim().length ?? 999,
              next.textContent?.trim().length ?? 999
            ) < 40
          ) {
            br.remove();
          }
        }
      });

      const contentRaw = document.createElement("div");
      const nodes = Array.from(dom.childNodes);
      if (nodes.length > 10) {
        let p = document.createElement("p");
        for (const node of nodes) {
          if (node instanceof Text) {
            const text = new Text(node.textContent?.trim());
            p.appendChild(text);
            continue;
          }
          if (node instanceof HTMLElement) {
            if (p.innerText.trim() !== "") {
              contentRaw.appendChild(p);
              p = document.createElement("p");
            }

            if (node instanceof HTMLParagraphElement) {
              if (node.innerText.trim() === "") {
                if (node.nextSibling instanceof Text) {
                  if (node.nextSibling.textContent?.trim() === "") {
                    if (
                      node.nextSibling.nextSibling instanceof
                        HTMLParagraphElement &&
                      node.nextSibling.nextSibling.innerText.trim() !== ""
                    ) {
                      node.remove();
                      continue;
                    }
                  } else {
                    node.remove();
                    continue;
                  }
                }
              }
              contentRaw.appendChild(node);
              continue;
            }

            contentRaw.appendChild(node);
            continue;
          }
        }

        if (p.innerText.trim() !== "") {
          contentRaw.appendChild(p);
        }

        const as = Array.from(contentRaw.querySelectorAll("a"));
        for (const node of as) {
          if (node instanceof HTMLAnchorElement) {
            if (
              node.nextSibling instanceof HTMLAnchorElement ||
              (node.nextSibling instanceof Text &&
                node.nextSibling.textContent?.trim() === "" &&
                node.nextSibling.nextSibling instanceof HTMLAnchorElement)
            ) {
              node.insertAdjacentElement(
                "afterend",
                document.createElement("br")
              );
              continue;
            }
          }
        }

        const ps = Array.from(contentRaw.querySelectorAll("p"));
        for (const node of ps) {
          const previousBrCount = getPreviousBrCount(node);
          if (previousBrCount > 1 && previousBrCount < 4) {
            removePreviousBr(node);
          }
        }
      } else {
        for (const node of nodes) {
          if (node instanceof Text && (node.textContent?.length ?? 0) > 200) {
            if (isFixWidthText(node)) {
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

function isFixWidthText(node: Text) {
  const ns = node.textContent?.split("\n").map((n) => n.trim()) ?? [];
  const nsLengths = ns.map((l) => l.length);
  if (Math.max(...nsLengths) < 40) {
    return true;
  }
  return false;
}

function getNextSibling(node: Element | Text) {
  if (node.nextSibling instanceof HTMLElement) {
    return node.nextSibling;
  }
  if (node.nextSibling instanceof Text) {
    if (node.nextSibling.textContent?.trim() !== "") {
      return node.nextSibling;
    } else {
      return node.nextSibling.nextSibling;
    }
  }
}

function getPreviousSibling(node: Element | Text) {
  if (node.previousSibling instanceof HTMLElement) {
    return node.previousSibling;
  }
  if (node.previousSibling instanceof Text) {
    if (node.previousSibling.textContent?.trim() !== "") {
      return node.previousSibling;
    } else {
      return node.previousSibling.previousSibling;
    }
  }
}

function getPreviousBrCount(node: Element | Text): number {
  const previous = getPreviousSibling(node);
  if (previous instanceof HTMLBRElement) {
    return getPreviousBrCount(previous) + 1;
  } else {
    return 0;
  }
}

function removePreviousBr(node: Element | Text): void {
  const previous = getPreviousSibling(node);

  if (node instanceof HTMLBRElement) {
    node.remove();
  }

  if (previous instanceof HTMLBRElement) {
    return removePreviousBr(previous);
  } else {
    return;
  }
}
