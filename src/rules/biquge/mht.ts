import { rm } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
import { nextPageParse } from "../lib/common";
import { bookParseTemp } from "./template";

export class Mht extends BaseRuleClass {
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
        rm("p[data-id]", true, _content);
        return _content;
      },
      (doc) =>
        (doc.querySelector(".bottem2 > a:nth-child(4)") as HTMLAnchorElement)
          .href,
      (_content, nextLink) => new URL(nextLink).pathname.includes("_")
    );
  }
}
