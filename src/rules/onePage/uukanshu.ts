import { UnsafeWindow } from "../../global";
import { mkRuleClass } from "./template";
import { rm, rms } from "../../lib/dom";

export const uukanshu = () => {
  type UukanshuWindow = {
    reverse(button: HTMLButtonElement): void;
  } & UnsafeWindow;
  const button = document.querySelector(
    'span[onclick="javascript:reverse(this);"]'
  ) as HTMLButtonElement;
  const reverse = (unsafeWindow as UukanshuWindow).reverse;
  if (button.innerText === "顺序排列") {
    reverse(button);
  }

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("dd.jieshao_content > h1 > a") as HTMLElement
    ).innerText
      .replace("最新章节", "")
      .trim(),
    author: (
      document.querySelector("dd.jieshao_content > h2 > a") as HTMLElement
    ).innerText.trim(),
    introDom: document.querySelector("dd.jieshao_content > h3") as HTMLElement,
    introDomPatch: (dom) => {
      rms(
        [
          /^.+简介：\s+www\.uukanshu\.com\s+/,
          /\s+https:\/\/www\.uukanshu\.com/,
          /－+/,
        ],
        dom
      );
      return dom;
    },
    coverUrl: (document.querySelector("a.bookImg > img") as HTMLImageElement)
      .src,
    aList: document.querySelectorAll("#chapterList > li > a"),
    sections: document.querySelectorAll("#chapterList > li.volume"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("#contentbox") as HTMLElement,
    contentPatch: (content) => {
      rm(".ad_content", true, content);
      const adReplace = [
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
        /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[cＣｃ][oＯｏ][mＭｍ]/g,
        /[UＵ]*看书[（\\(].*?[）\\)]文字首发。/,
        /请记住本书首发域名：。?/g,
        /笔趣阁手机版阅读网址：/g,
        /小说网手机版阅读网址：/g,
        /https:\/\//g,
        /http:\/\//g,
        /UU看书\s+欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在UU看书！UU看书。;?/g,
      ];
      rms(adReplace, content);
      return content;
    },
  });
};
