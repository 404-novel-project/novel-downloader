import { htmlTrim } from "../../lib/cleanDOM";
import { rm } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
import { nextPageParse } from "../lib/common";
import { bookParseTemp } from "./template";

export class Dingdiann extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
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
        .src,
      chapterListSelector: "#list>dl",
      charset: "UTF-8",
      chapterParse: self.chapterParse,
    });
  }

  public async chapterParse(
    _chapterUrl: string,
    _chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    _charset: string,
    options: object
  ) {
    return nextPageParse({
      chapterName: _chapterName,
      chapterUrl: _chapterUrl,
      charset: _charset,
      selector: "#content",
      contentPatch: (_content, doc) => {
        rm("div[align]", false, _content);
        rm("script", true, _content);

        const removelist = [
          "一秒记住，精彩小说无弹窗免费阅读！",
          "&lt;/a　:&gt;",
          "--&gt;&gt;",
          "本章未完，点击下一页继续阅读",
        ];
        removelist.forEach(
          (removeStr) =>
            (_content.innerHTML = _content.innerHTML.replaceAll(removeStr, ""))
        );
        htmlTrim(_content);
        return _content;
      },
      getNextPage: (doc) =>
        (doc.querySelector(".bottem2 > a:nth-child(4)") as HTMLAnchorElement)
          .href,
      continueCondition: (_content, nextLink) =>
        _content.innerText.includes("本章未完，点击下一页继续阅读"),
    });
  }
}
