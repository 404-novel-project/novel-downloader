import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2, rms } from "../../lib/dom";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

const $ = <T extends Element>(selector: string) =>
  document.querySelector<T>(selector);
const $$ = <T extends Element>(selector: string) =>
  document.querySelectorAll<T>(selector);

export const xbyuan = () =>
  mkRuleClass({
    bookUrl: location.href,
    bookname: $<HTMLHeadingElement>("#info h1")!.innerText.trim(),
    author: $<HTMLSpanElement>("#info .small > span")!.innerText.trim(),
    introDom: $<HTMLElement>("#intro > p")!,
    introDomPatch: (_) => _,
    coverUrl: $<HTMLImageElement>("#fmimg img")!.src,
    aList:
      $$<HTMLDListElement>("#list dl")[1].querySelectorAll<HTMLAnchorElement>(
        "a"
      ),
    async getContentFromUrl(chapterUrl, chapterName, charset) {
      const { contentRaw } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#nr_content > p",
        contentPatch(content, doc) {
          rm("a", true, content);
          const ads = [
            "精华书阁",
            "最新章节！",
            "最快更新，为了您下次还能查看到本书的最快更新，请务必保存好书签！",
            "https://www.xbyuan.com",
          ];
          rm2(ads, content);
          rms(["(本章未完，请点击下一页继续阅读)"], content);
          htmlTrim(content);
          return content;
        },
        getNextPage(doc) {
          return doc.querySelector<HTMLAnchorElement>("#nexturl")!.href;
        },
        continueCondition(content, nextLink) {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
      });
      return contentRaw;
    },
    contentPatch: (content) => {
      content.innerHTML = content.innerHTML
        .replaceAll("「", "“")
        .replaceAll("」", "”");
      return content;
    },
  });
