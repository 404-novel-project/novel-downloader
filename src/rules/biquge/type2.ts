import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2, rms } from "../../lib/dom";
import { mkBiqugeClass } from "./template";

export const shuquge = () =>
  mkBiqugeClass(
    (introDom) => {
      document.querySelector(".noshow")?.classList.remove("noshow");
      if (document.querySelector(".showall")) {
        (document.querySelector(".showall") as HTMLElement).innerHTML = "";
      }

      rms(
        [
          /作者：.+所写的《.+》无弹窗免费全文阅读为转载作品,章节由网友发布。/,
          /推荐地址：https?:\/\/www\.shuquge\.com\/txt\/\d+\/index\.html/g,
        ],
        introDom
      );
      return introDom;
    },
    (content) => {
      rm2(content, ["请记住本书首发域名：", "www.shuquge.com"]);
      return content;
    },
    1
  );

export const xyqxs = () =>
  mkBiqugeClass(
    (introDom) => {
      rms(
        [/推荐地址：https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/index\.html/g],
        introDom
      );
      return introDom;
    },
    (content) => {
      rm("div[style]", true, content);
      rm("script", true, content);
      rm('div[align="center"]', false, content);
      rms(
        [
          "请记住本书首发域名：www.xyqxs.cc。笔趣阁手机版阅读网址：m.xyqxs.cc",
          /\(https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/\d+\.html\)/,
        ],
        content
      );
      return content;
    }
  );

export const lusetxt = () =>
  mkBiqugeClass(
    (introDom) => {
      rm2(introDom, [
        "无弹窗免费全文阅读为转载作品",
        "无弹窗推荐地址",
        "简介：",
      ]);
      return introDom;
    },
    (content) => {
      rm("script", true, content);
      rm("div[style]", true, content);
      rm("div[align]", true, content);
      rm2(content, ["https://www.lusetxt.com/books", "请记住本书首发域名"]);
      htmlTrim(content);
      return content;
    }
  );

export const yqxs = () =>
  mkBiqugeClass(
    (introDom) => {
      rms(["<span>简介：</span>"], introDom);
      rm2(introDom, ["推荐地址："]);
      return introDom;
    },
    (content) => {
      rm("script", true, content);
      rm('div[align="center"]', false, content);
      rm2(content, ["//www.yqxs.cc/html/", "请记住本书首发域名"]);
      return content;
    }
  );
