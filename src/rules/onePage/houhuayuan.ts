import { getHtmlDOM } from "../../lib/http";
import { childNodesCopy, rm, rm2 } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const houhuayuan = () => {
  const seriesbox = document.querySelector(".seriesbox");
  let bookUrl: string;
  let bookname: string;
  let author = (document.querySelector("h3.author") as HTMLElement)?.innerText
    .replace(/♥|作者: /g, "")
    .trim();
  if (author === "") {
    author = "佚名";
  }
  const aList: Element[] = [];
  if (seriesbox) {
    const lis = seriesbox.querySelectorAll("ul.serieslist-ul > li");
    for (const li of Array.from(lis)) {
      if (li.className === "serieslist-li") {
        const a = li.querySelector("a");
        if (a) {
          aList.push(a);
        }
      } else if (li.className === "serieslist-li-current") {
        const a = document.createElement("a");
        a.innerText = (
          document.querySelector(".entry-title") as HTMLElement
        ).innerText.trim();
        a.href = document.location.href;
        aList.push(a);
      }
    }
    const aFirst = aList[0];
    bookname = (aFirst as HTMLAnchorElement).innerText
      .replace(/第.+章$|\s序$/, "")
      .trim();
    bookUrl = (aFirst as HTMLAnchorElement).href;
  } else {
    bookUrl = document.location.href;
    bookname = (
      document.querySelector(".entry-title") as HTMLElement
    ).innerText.trim();
    const a = document.createElement("a");
    a.innerText = bookname;
    a.href = bookUrl;
    aList.push(a);
  }
  return mkRuleClass({
    bookUrl,
    bookname,
    author,
    aList,
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const pageLinks = doc.querySelectorAll(
        ".page-links > a.post-page-numbers"
      );
      if (pageLinks) {
        const content = document.createElement("div");
        const _content0 = doc.querySelector("header + div.entry-content");
        if (_content0) {
          childNodesCopy(_content0, content);
        }
        const pageUrls = Array.from(pageLinks).map(
          (a) => (a as HTMLAnchorElement).href
        );
        for (const url of pageUrls) {
          const docc = await getHtmlDOM(url, charset);
          const _content1 = docc.querySelector("header + div.entry-content");
          if (_content1) {
            childNodesCopy(_content1, content);
          }
        }
        return content;
      } else {
        return doc.querySelector("header + div.entry-content") as HTMLElement;
      }
    },
    contentPatch: (dom) => {
      rm('div[id^="stage-"]', true, dom);
      rm('div[id^="zhaoz-"]', true, dom);
      rm("div.seriesbox", true, dom);
      rm("fieldset", true, dom);
      rm("div.wpulike", true, dom);
      rm(".simplefavorite-button", true, dom);
      rm(".page-links", true, dom);
      rm2(dom, [" – 蔷薇后花园", " – 黑沼泽俱乐部"]);
      Array.from(dom.querySelectorAll("img")).forEach(
        (img) => (img.src = img.getAttribute("data-src") ?? "")
      );
      return dom;
    },
    nsfw: true,
  });
};
