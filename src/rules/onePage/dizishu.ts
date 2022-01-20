import { getHtmlDOM, getText } from "../../lib/http";
import { deDuplicate } from "../../lib/rule";
import { Book } from "../../main/Book";
import { mkRuleClass } from "./template";

export const dizishu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".book-text > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".book-text > span") as HTMLElement
    ).innerText
      .replace("著", "")
      .trim(),
    introDom: document.querySelector(".intro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("#fengmian img") as HTMLImageElement)
      ?.src,
    aList: document.querySelectorAll("#list > .book-chapter-list .cf li > a"),
    sections: document.querySelectorAll("#list > .book-chapter-list > h3"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const script1 = Array.from(doc.querySelectorAll("script"))
        .filter((s) => s.innerHTML.includes("chapterid="))?.[0]
        ?.innerHTML.split("\n")
        .filter(
          (line) =>
            !(
              line.includes("cpstr=") ||
              line.includes("get_content()") ||
              line.includes("xid=")
            )
        )
        .join("\n");
      const script2 = Array.from(doc.querySelectorAll("script"))
        .filter((s) => s.innerHTML.includes("ssid"))?.[0]
        ?.innerHTML.split("\n")
        .filter((line) => line.includes("var ssid") || line.includes("var hou"))
        .join("\n");
      const request = new Function(`${script2};${script1};
const xid=Math.floor(bookid/1000);
const url = \`${document.location.origin}/files/article/html\${ssid}/\${xid}/\${bookid}/\${chapterid}\${hou}\`;
return new Request(url, {
    headers: {
    accept: "text/plain, */*; q=0.01",
    "x-requested-with": "XMLHttpRequest",
    },
    referrer: "${document.location.origin}",
    method: "GET",
    mode: "cors",
    credentials: "include",
});`)() as Request;
      const text = await getText(request, charset);
      const cctxt = new Function(`${text};return cctxt;`)() as string;
      if (cctxt) {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = cctxt;
        return contentRaw;
      } else {
        return null;
      }
    },
    contentPatch: (content) => content,
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
