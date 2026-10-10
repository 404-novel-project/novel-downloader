import { rm, rm2, rms } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "./template";

export const c18kanshu = () => {
  const isIndexPage = document.location.pathname.endsWith("index.html");
  const getText = (selector: string) =>
    (document.querySelector(selector) as HTMLElement | null)?.innerText.trim() ??
    "";

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: isIndexPage
      ? getText("h1").replace(/目录$/, "")
      : getText("div.jieshao h1"),
    author: isIndexPage
      ? ""
      : getText("div.jieshao div.msg > em:first-child > a"),
    introDom: isIndexPage
      ? undefined
      : (document.querySelector(
          "div.jieshao div.intro > div > p"
        ) as HTMLElement),
    introDomPatch: (dom) => dom,
    coverUrl: isIndexPage
      ? (document.querySelector('meta[property="og:image"]') as HTMLMetaElement)
          ?.content ?? null
      : (document.querySelector(
          "div.jieshao div.lf img"
        ) as HTMLImageElement)?.src ?? null,
    getIndexPages: async () => {
      if (isIndexPage) {
        return [document];
      }
      const indexUrl =
        (document.querySelector("a.indexinfoad") as HTMLAnchorElement | null)
          ?.href ?? new URL("index.html", document.location.href).href;
      return [await getHtmlDOM(indexUrl, "UTF-8")];
    },
    getAList: (doc) => doc.querySelectorAll("div.mulu > ul > li > a.infoad"),
    getContent: (doc) => doc.querySelector("div.yd_text2"),
    contentPatch: (content) => {
      rm("script, #br_tip", true, content);
      rm2([/^[\s.]+$/, /转码失败/, /本章完/, /^相关：/], content);
      rms([/readx;\s*/g], content);
      return content;
    },
    nsfw: true,
  });
};
