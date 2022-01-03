import { cleanDOM, convertFixWidthText } from "../../../lib/cleanDOM";
import {
  childNodesCopy,
  getNextSibling,
  getPreviousBrCount,
  getPreviousSibling,
  fullWidthLength,
  removePreviousBr,
  rm,
} from "../../../lib/dom";
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

    const book = new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
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

        // 移除超链接
        rm("a", true, contentRaw);

        if (isFixWidth(contentRaw)) {
          // 移除换行
          Array.from(contentRaw.querySelectorAll("br")).forEach((node) => {
            const previous = node.previousSibling;
            const next = node.nextSibling;
            if (
              previous instanceof Text &&
              next instanceof Text &&
              (previous.textContent
                ? fullWidthLength(previous.textContent)
                : 0) > 30 &&
              (previous.textContent
                ? fullWidthLength(previous.textContent)
                : 0) < 40
            ) {
              node.remove();
            }
          });

          // 合并 Text
          const group = (texts: Text[]) => {
            const out: Text[][] = [];

            let group: Text[] = [];
            let whole = "";
            for (const text of texts) {
              const w = text.wholeText;
              if (whole !== w) {
                if (group.length !== 0) {
                  out.push(group);
                }

                whole = w;
                group = [text];
              } else {
                group.push(text);
              }
            }
            if (group.length !== 0) {
              out.push(group);
            }
            return out;
          };
          const merge = (groups: Text[][]) => {
            for (const g of groups) {
              const old = g[0];
              const newText = new Text(old.wholeText);
              old.replaceWith(newText);

              g.forEach((t) => t.remove());
            }
          };
          const ts = Array.from(contentRaw.childNodes).filter(
            (node) =>
              node instanceof Text && node.wholeText !== node.textContent
          ) as Text[];
          const gts = group(ts);
          merge(gts);

          // 将 Text 转换为 <p>
          Array.from(contentRaw.childNodes)
            .filter((node) => node instanceof Text)
            .forEach((text) => {
              const p = document.createElement("p");
              convertFixWidthText(text as Text, 35, p);
              text.replaceWith(p);
            });

          // 移除分隔空白<p>
          Array.from(contentRaw.querySelectorAll("p"))
            .filter(
              (p) =>
                p.innerText.trim() === "" &&
                getPreviousSibling(p) instanceof HTMLElement &&
                getNextSibling(p) instanceof HTMLElement
            )
            .forEach((p) => p.remove());

          // 移除分隔<br>
          Array.from(contentRaw.querySelectorAll("p"))
            .filter((p) => getPreviousBrCount(p) === 2)
            .forEach((p) => removePreviousBr(p));

          if (isFixWidthP(contentRaw)) {
            // 合并 35 字符宽 <p>
            const ps = Array.from(contentRaw.querySelectorAll("p"));
            let text = "";
            for (const node of ps) {
              const n = node.innerText.trim();
              if (fullWidthLength(n) > 30 && fullWidthLength(n) < 40) {
                text = text + n;
                node.remove();
                continue;
              } else {
                if (text !== "") {
                  text = text + n;
                  const newP = document.createElement("p");
                  newP.innerText = text;
                  node.replaceWith(newP);
                  text = "";
                  continue;
                } else {
                  continue;
                }
              }
            }
          }
        }
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

function isFixWidth(node: Text | HTMLElement) {
  let ns: string[] | undefined;
  if (node instanceof Text) {
    ns = node.textContent?.split("\n").map((n) => n.trim()) ?? [];
  }
  if (node instanceof HTMLElement) {
    const reducer = (out: string[], cur: ChildNode) => {
      if (cur instanceof Text) {
        const t = cur.textContent?.trim() ?? "";
        if (t.includes("\n")) {
          t.split("\n")
            .map((n) => n.trim())
            .forEach((n) => out.push(n));
          return out;
        } else {
          out.push(t);
          return out;
        }
      } else {
        return out;
      }
    };
    ns = Array.from(node.childNodes).reduce(reducer, []);
  }
  if (!ns) {
    throw new Error("ns is null");
  }
  const lengths = ns.map((l) => fullWidthLength(l));
  const lt40 = lengths.filter((i) => i > 40).length;
  if (lt40 < 5) {
    return true;
  }
  return false;
}

function isFixWidthP(node: HTMLElement) {
  const lengths = Array.from(node.querySelectorAll("p")).map((p) =>
    fullWidthLength(p.innerText.trim())
  );
  const lt40 = lengths.filter((i) => i > 40).length;
  if (lt40 < 5) {
    return true;
  }
  return false;
}
