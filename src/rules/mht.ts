import { ruleClass } from "../rules";
import { getHtmlDOM, cleanDOM, rm } from "../lib";
import { bookParseTemp } from "./biquge";
import { log } from "../log";

export class mht implements ruleClass {
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
    log.debug(`[Chapter]请求 ${chapterUrl}`);
    let nowUrl = chapterUrl;
    let doc = await getHtmlDOM(chapterUrl, charset);
    const content = document.createElement("div");

    let flag = false;
    do {
      const _content = <HTMLElement>doc.querySelector("#content");
      rm("p[data-id]", true, _content);
      for (const _c of Array.from(_content.childNodes)) {
        content.appendChild(_c);
      }

      const nextLink = (<HTMLAnchorElement>(
        doc.querySelector(".bottem2 > a:nth-child(4)")
      )).href;

      if (new URL(nextLink).pathname.includes("_")) {
        if (nextLink !== nowUrl) {
          flag = true;
        } else {
          log.error("网站页面出错，URL： " + nowUrl);
          flag = false;
        }
      } else {
        flag = false;
      }
      if (flag) {
        log.debug(`[Chapter]请求 ${nextLink}`);
        nowUrl = nextLink;
        doc = await getHtmlDOM(nextLink, charset);
      }
    } while (flag);

    let { dom, text, images } = await cleanDOM(content, "TM");
    return {
      chapterName: chapterName,
      contentRaw: content,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate: null,
    };
  }
}
