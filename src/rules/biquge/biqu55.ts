import { rm2 } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { deDuplicate } from "../../lib/rule";
import { Book } from "../../main/Book";
import { mkRuleClass } from "../onePage/template";

export const biqu55 = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("#info h1, .info > h2") as HTMLElement
    ).innerText
      .trim()
      .replace(/最新章节$/, ""),
    author: (
      document.querySelector(
        "#info > p:nth-child(2), #info > div:nth-child(2), .small > span:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim(),
    introDom: document.querySelector("#intro, .intro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (
        document.querySelector(
          "#fmimg > img, .info > .cover > img"
        ) as HTMLImageElement
      )?.src ?? null,
    aList: document.querySelectorAll("#list a, .listmain a"),
    sections: document.querySelectorAll("#list dt, .listmain dt"),
    getSName: (sElem) => {
      const b = sElem.querySelector("b");
      if (b) {
        return (b as HTMLElement).innerText;
      }
      return (sElem as HTMLElement).innerText;
    },
    postHook: (chapter) => {
      if (chapter.sectionName) {
        if (chapter.sectionName.includes("《")) {
          chapter.sectionName = chapter.sectionName
            .replace(`《${chapter.bookname}》`, "")
            .trim();
        } else {
          chapter.sectionName = chapter.sectionName
            .replace(chapter.bookname, "")
            .trim();
        }
      }
      return chapter;
    },
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const script = Array.from(doc.querySelectorAll("script"))
        .filter((s) => s.innerHTML.includes("article_id"))?.[0]
        ?.innerHTML.split("\n")
        .filter((line) => !line.includes("lastread.set"))
        .join("\n");
      const request = new Function(`${script};
const url = "https://www.biqu55.net/home/index/ajaxchapter";
const payload = new URLSearchParams({
    id: article_id,
    eKey: hash,
    cid: chapter_id,
    basecid: chapter_id,
});
return new Request(url, {
    headers: {
    accept: "application/json, text/javascript, */*; q=0.01",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest",
    },
    body: payload.toString(),
    method: "POST",
    mode: "cors",
    credentials: "include",
});`)() as Request;
      const resp = await fetch(request);
      const json = (await resp.json()) as ajaxchapter;
      if (json.status === "success") {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = json.info.content;
        return contentRaw;
      } else {
        return null;
      }
    },
    contentPatch: (content) => {
      rm2(["数据和书签与电脑站同步，无广告清新阅读"], content);
      return content;
    },
    concurrencyLimit: 5,
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const chapters = book.chapters;
        book.chapters = deDuplicate(chapters);
        return book;
      };
      return classThis;
    },
  });

interface ajaxchapter {
  status: string;
  info: {
    content: string;
    title: string;
    link: string;
    rewriteurl: string;
    nextcid: number;
    prevcid: number;
  };
}
