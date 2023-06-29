import { rm, rms } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const boqugew = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1.bookTitle") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector("p.booktag > a:first-child") as HTMLAnchorElement
    ).innerText.replace(/作(\s+)?者[：:]/, "").trim(),
    introDom: document.querySelector("p#bookIntro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("img.img-thumbnail") as HTMLImageElement).src,
    aList: document.querySelectorAll("div#list-chapterAll > dl > dd > a"),
    getContent: (doc) => doc.querySelector("div#htmlContent") as HTMLElement,
    contentPatch: (content) => {
      rms([
        "记住网址m.ｂｏｑｕgew．ｃｏｍ",
        "一秒记住ｈｔｔｐ://ｍ．boqugeｗ．ｃｏｍ",
        "首发网址ｈｔｔp://m.ｂｏｑｕｇｅｗ.com"
      ], content);
      rm("br", true, content);
      return content;
    },
  });
