import { ruleClass } from "../rules";
import { htmlTrim, rm } from "../lib";
import { bookParseTemp } from "./biquge";
import { nextPageParse } from "./lib/common";

export class dingdiann implements ruleClass {
  public imageMode: "naive" | "TM";

  public constructor() {
    this.imageMode = "TM";
  }

  public async bookParse() {
    const self = this;
    return bookParseTemp({
      bookUrl: document.location.href,
      bookname: (<HTMLElement>(
        document.querySelector("#info > h1:nth-child(1)")
      )).innerText.trim(),
      author: (<HTMLElement>(
        document.querySelector("#info > p:nth-child(2)")
      )).innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
      introDom: <HTMLElement>document.querySelector("#intro"),
      introDomPatch: (introDom) => introDom,
      coverUrl: (<HTMLImageElement>document.querySelector("#fmimg > img")).src,
      chapterListSelector: "#list>dl",
      charset: "UTF-8",
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
    return nextPageParse(
      chapterName,
      chapterUrl,
      charset,
      "#content",
      (_content) => {
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
      (doc) =>
        (<HTMLAnchorElement>doc.querySelector(".bottem2 > a:nth-child(4)"))
          .href,
      (_content, nextLink) =>
        _content.innerText.includes("本章未完，点击下一页继续阅读")
    );
  }
}
