import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2, rms } from "../../lib/dom";
import { mkBiqugeClassNextPage } from "./template";

export const dingdiann = () =>
  mkBiqugeClassNextPage(
    (introDom) => introDom,
    (content, doc) => {
      rm("div[align]", false, content);
      rm("script", true, content);

      const removelist = [
        "一秒记住，精彩小说无弹窗免费阅读！",
        "&lt;/a　:&gt;",
        "--&gt;&gt;",
        "本章未完，点击下一页继续阅读",
      ];
      rms(removelist, content);
      htmlTrim(content);
      return content;
    },
    (doc) =>
      (doc.querySelector(".bottem2 > a:nth-child(4)") as HTMLAnchorElement)
        .href,
    (_content, nextLink) =>
      _content.innerText.includes("本章未完，点击下一页继续阅读")
  );

export const mht = () =>
  mkBiqugeClassNextPage(
    (introDom) => introDom,
    (content, doc) => {
      rm("p[data-id]", true, content);
      htmlTrim(content);
      return content;
    },
    (doc) =>
      (doc.querySelector(".bottem2 > a:nth-child(4)") as HTMLAnchorElement)
        .href,
    (_content, nextLink) => new URL(nextLink).pathname.includes("_")
  );

export const xinwanben = () =>
  mkBiqugeClassNextPage(
    (introDom) => {
      const _bookname = introDom.innerHTML.match(/《(.*)》/);
      let bookname;
      if (_bookname?.length === 2) {
        bookname = _bookname[1];
      }
      const adList = [
        "还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！",
        "小说免费阅读地址：",
      ];
      rm2(adList, introDom);
      rms([`${bookname}小说简介：`], introDom);
      return introDom;
    },
    (content, doc) => {
      const filters = [
        "手机用户输入地址",
        "提示：浏览器搜索",
        "把本站分享那些需要的小伙伴！找不到书请留言！",
      ];
      rm2(filters, content);
      htmlTrim(content);
      return content;
    },
    (doc) => (doc.querySelector("#next_url") as HTMLAnchorElement).href,
    (_content, nextLink) => new URL(nextLink).pathname.includes("_")
  );

export const biqu55 = () =>
  mkBiqugeClassNextPage(
    (introDom) => introDom,
    (content, doc) => {
      rm2(["精彩小说无弹窗免费阅读！"], content);
      htmlTrim(content);
      return content;
    },
    (doc) =>
      (
        doc.querySelector(
          'div.bottem2 > a[rel="next"]:nth-child(3)'
        ) as HTMLAnchorElement
      ).href,
    (_content, nextLink) =>
      /[\d_]+\.html$/.exec(nextLink)?.[0].includes("_") ?? false
  );
