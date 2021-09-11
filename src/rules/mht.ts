import { BaseRuleClass } from "../rules";
import { rm } from "../lib/misc";
import { bookParseTemp } from "./biquge";
import { nextPageParse } from "./lib/common";

export class mht extends BaseRuleClass {
  public constructor() {
    super();
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
      (_content, doc) => {
        rm("p[data-id]", true, _content);
        return _content;
      },
      (doc) =>
        (<HTMLAnchorElement>doc.querySelector(".bottem2 > a:nth-child(4)"))
          .href,
      (_content, nextLink) => new URL(nextLink).pathname.includes("_")
    );
  }
}
