import { getHtmlDOM } from "../../lib/http";
import { rms } from "../../lib/misc";
import { mkRuleClass } from "./template";

export const baihexs = () => {
  const bookUrl = document.location.href;
  const bookId = /(\d+)\/?$/.exec(document.location.href)?.[1];
  if (!bookId) {
    throw Error("获取书籍信息出错！");
  }

  return mkRuleClass({
    bookUrl,
    bookname: (
      document.querySelector(".block_txt2 > h2 > a") as HTMLAnchorElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".block_txt2 > p:nth-child(4)"
      ) as HTMLParagraphElement
    ).innerText
      .replace("作者：", "")
      .trim(),
    introDom: document.querySelector(".intro_info") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: (document.querySelector(".block_img2 > img") as HTMLImageElement)
      ?.src,
    getIndexUrls: async () => {
      const contentPageUrl = `${document.location.origin}/wapbook-${bookId}`;
      const doc = await getHtmlDOM(contentPageUrl + "/", document.characterSet);
      const a = doc.querySelector(
        "div.page > a:nth-last-child(1)"
      ) as HTMLAnchorElement;
      const maxNumber = /(\d+)\/?$/.exec(a.href)?.[1];
      if (!maxNumber) {
        throw Error("获取章节列表时出错！");
      }
      const indexUrls: string[] = [];
      for (let i = 1; i <= parseInt(maxNumber, 10); i++) {
        const url = contentPageUrl + `_${i}/`;
        indexUrls.push(url);
      }
      return indexUrls;
    },
    getAList: (doc) => doc.querySelectorAll(".chapter > li > a"),
    getContent: (doc) => doc.querySelector("#nr1"),
    contentPatch: (dom) => {
      const ads: (string | RegExp)[] = [
        /请牢记：百合小说网.+免费最快更新无防盗无防盗/,
      ];
      rms(ads, dom);
      return dom;
    },
    concurrencyLimit: 3,
  });
};
