import { htmlTrim } from "../../lib/cleanDOM";
import { rm, rm2 } from "../../lib/dom";
import { mkBiqugeClass2 } from "./template";

export const shuquge = () =>
  mkBiqugeClass2(
    (introDom) => {
      document.querySelector(".noshow")?.classList.remove("noshow");
      if (document.querySelector(".showall")) {
        (document.querySelector(".showall") as HTMLElement).innerHTML = "";
      }

      introDom.innerHTML = introDom.innerHTML
        .replace(
          /作者：.+所写的《.+》无弹窗免费全文阅读为转载作品,章节由网友发布。/,
          ""
        )
        .replace(
          /推荐地址：https?:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g,
          ""
        );
      return introDom;
    },
    (content) => {
      content.innerHTML = content.innerHTML
        .replace(
          "请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com",
          ""
        )
        .replace(/https?:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
      return content;
    },
    1
  );

export const xyqxs = () =>
  mkBiqugeClass2(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /推荐地址：https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/index\.html/g,
        ""
      );
      return introDom;
    },
    (content) => {
      rm("div[style]", true, content);
      rm("script", true, content);
      rm('div[align="center"]', false, content);
      content.innerHTML = content.innerHTML
        .replace(
          "请记住本书首发域名：www.xyqxs.cc。笔趣阁手机版阅读网址：m.xyqxs.cc",
          ""
        )
        .replace(/\(https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/\d+\.html\)/, "");
      return content;
    }
  );

export const lusetxt = () =>
  mkBiqugeClass2(
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
