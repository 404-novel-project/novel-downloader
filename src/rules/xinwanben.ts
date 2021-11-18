import { htmlTrim } from "../lib/cleanDOM";
import { BaseRuleClass } from "../rules";
import { bookParseTemp } from "./biquge";
import { nextPageParse } from "./lib/common";

export class Xinwanben extends BaseRuleClass {
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
      introDomPatch: (introDom) => {
        const _bookname = introDom.innerHTML.match(/《(.*)》/);
        let bookname;
        if (_bookname?.length === 2) {
          bookname = _bookname[1];
        }
        introDom.querySelectorAll("p").forEach((p) => {
          const adList = [
            "还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！",
            "小说免费阅读地址：",
          ];
          for (const ad of adList) {
            if (p.innerText.includes(ad)) {
              p.remove();
            }
          }
        });
        introDom.innerHTML = introDom.innerHTML.replace(
          `${bookname}小说简介：`,
          ""
        );
        return introDom;
      },
      coverUrl: (document.querySelector("#fmimg > img") as HTMLImageElement)
        .src,
      chapterListSelector:
        "div.box_con:nth-child(5) > div:nth-child(2) > dl:nth-child(1)",
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
      (_content, doc) => {
        htmlTrim(_content);
        return _content;
      },
      (doc) => (doc.querySelector("#next_url") as HTMLAnchorElement).href,
      (_content, nextLink) => nextLink.includes("_")
    );
  }
}
