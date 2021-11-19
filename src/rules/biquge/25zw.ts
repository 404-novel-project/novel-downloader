import { getHtmlDOM } from "../../lib/http";
import { rm } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
import { bookParseTemp, chapterParseTemp } from "./template";

export class C25zw extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
    this.charset = document.charset;
  }

  public async bookParse() {
    const self = this;
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (
        document.querySelector("#info h1:nth-of-type(1)") as HTMLElement
      ).innerText
        .trim()
        .replace(/最新章节$/, ""),
      author: (
        document.querySelector("#info > p:nth-child(2)") as HTMLElement
      ).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: document.querySelector("#intro") as HTMLElement,
      introDomPatch: (introDom) => {
        introDom.querySelector("font")?.parentElement?.remove();
        introDom.innerHTML = introDom.innerHTML.replace("简介:", "");
        return introDom;
      },
      coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
        .src,
      chapterListSelector: "#list>dl",
      charset: document.charset,
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
        dom.querySelector(".zhangjieming > h1") as HTMLElement
      ).innerText.trim(),
      contenSelector: "#content",
      contentPatch: (content) => {
        rm(".bottem", false, content);
        return content;
      },
      charset,
    });
  }
}
