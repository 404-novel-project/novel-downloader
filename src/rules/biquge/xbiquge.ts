import { getHtmlDOM } from "../../lib/http";
import { BaseRuleClass } from "../../rules";
import {
  bookParseTemp,
  ChapterParseOption,
  chapterParseTemp,
} from "./template";

export class Xbiquge extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = "GBK";
  }

  public async bookParse() {
    const self = this;
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (
        document.querySelector("#info > h1:nth-child(1)") as HTMLElement
      ).innerText.trim(),
      author: (
        document.querySelector("#info > p:nth-child(2)") as HTMLElement
      ).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: document.querySelector("#intro") as HTMLElement,
      introDomPatch: (introDom) => introDom,
      coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
        ?.src,
      chapterListSelector: "#list>dl",
      charset: "GBK",
      chapterParse: self.chapterParse,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    const dom = await getHtmlDOM(chapterUrl, charset);
    return chapterParseTemp({
      dom,
      chapterUrl,
      chapterName: (
        dom.querySelector(".bookname > h1:nth-child(1)") as HTMLElement
      ).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        content.innerHTML = content.innerHTML.replace(
          `笔趣阁 www.xbiquge.so，最快更新${
            (options as ChapterParseOption).bookname
          } ！`,
          ""
        );
        return content;
      },
      charset,
    });
  }
}
