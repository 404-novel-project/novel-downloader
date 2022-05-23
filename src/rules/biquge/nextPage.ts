import { htmlTrim } from "../../lib/cleanDOM";
import { rm2, rms } from "../../lib/dom";
import { mkBiqugeNextPage } from "./template";

export const xinwanben = () =>
  mkBiqugeNextPage(
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
    (content) => {
      const filters = [
        "手机用户输入地址",
        "提示：浏览器搜索",
        "把本站分享那些需要的小伙伴！找不到书请留言！",
        "【完本神站】",
      ];
      rm2(filters, content);
      htmlTrim(content);
      return content;
    },
    (doc) => (doc.querySelector("#next_url") as HTMLAnchorElement).href,
    (_content, nextLink) => new URL(nextLink).pathname.includes("_")
  );

export const yyun = () =>
  mkBiqugeNextPage(
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
    (content) => {
      const filters = [
        "提示♂浏览器♂搜索♂",
        "长夜读:一秒记住",
        "【烟云小说】",
        "【m.yyun.net】",
      ];
      rm2(filters, content);
      htmlTrim(content);
      return content;
    },
    (doc) =>
      (doc.querySelector(".bottem2 > a:nth-child(3)") as HTMLAnchorElement)
        .href,
    (_content, nextLink) => new URL(nextLink).pathname.includes("_")
  );