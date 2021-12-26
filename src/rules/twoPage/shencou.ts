import { rm, rm2 } from "../../lib/dom";
import { ReferrerMode } from "../../main/main";
import { mkRuleClass } from "./tempate";

export const shencou = () => {
  const anotherPageUrl = (
    document.querySelector(
      "#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)"
    ) as HTMLAnchorElement
  ).href;

  return mkRuleClass({
    bookUrl: document.location.href,
    anotherPageUrl,
    getBookname: (doc) =>
      (
        document.querySelector(
          "#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      ).innerText.trim(),
    getAuthor: (doc) =>
      (
        document.querySelector(
          "#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
        ) as HTMLElement
      ).innerText
        .replace("小说作者：", "")
        .trim(),
    getIntroDom: (doc) =>
      document.querySelector(
        "#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)"
      ) as HTMLElement,
    introDomPatch: (el) => {
      rm("a", true, el);
      rm(".hottext", true, el);
      rm2(el, ["论坛回帖，推荐本书，都可以得积分。每天送50积分"]);
      return el;
    },
    getCoverUrl: (doc) =>
      (
        document.querySelector(
          "#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1) > img:nth-child(1)"
        ) as HTMLImageElement
      )?.src,
    getAList: (doc) => doc.querySelectorAll("div.zjbox ol > li > a"),
    getSections: (doc) => doc.querySelectorAll("div.zjbox div.ttname > h2"),
    getSName: (s) => (s as HTMLElement).innerText.trim(),
    getContent: (doc) => {
      doc.body.innerHTML = doc.body.innerHTML.replace(
        '<script language="javascript">GetFont();</script>',
        '<div id="content" class="fonts_mesne">'
      );
      doc.body.innerHTML = doc.body.innerHTML.replace("<center>", "</div>");
      return doc.querySelector("#content");
    },
    contentPatch: (dom) => {
      rm("h1", true, dom);
      rm("div[id^=BookSee]", true, dom);
      return dom;
    },
    cleanDomOptions: {
      referrerMode: ReferrerMode.custom,
      customReferer: "http://www.wenku8.net",
    },
  });
};
