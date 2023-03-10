import { sleep } from "../../lib/misc";
import { rm, rm2, rms } from "../../lib/dom";
import { mkBiquge } from "./template";
import { htmlTrim } from "../../lib/cleanDOM";

const commonContentPatch = (content: HTMLElement) => {
  rm("script", true, content);
  rm("div[style]", true, content);
  rm("div[align]", true, content);
  return content;
};
// 笔趣阁通用模板，无contentpatch可直接使用
export const common = () =>
  mkBiquge((introDom) => introDom, commonContentPatch);

export const gebiqu = () =>
  mkBiquge(
    (introDom) => {
      rms([/如果您喜欢.+，别忘记分享给朋友/g], introDom);
      rm('a[href^="http://down.gebiqu.com"]', false, introDom);
      return introDom;
    },
    (content) => {
      rms([/"www.gashuw.com"/g], content);
      return content;
    }
  );

export const luoqiuzw = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => {
      const ad = content.firstElementChild as HTMLParagraphElement;
      if (ad.innerText.includes("天才一秒记住本站地址：")) {
        ad.remove();
      }
      const ads = ["记住网址m.luoqｉｕｘｚｗ．ｃｏｍ"];
      rms(ads, content);
      return content;
    }
  );

export const biquwx = () =>
  mkBiquge(
    (introDom) => {
      rms(
        [
          /本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/,
        ],
        introDom
      );
      return introDom;
    },
    (content) => content,
    1
  );

export const tycqxs = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => {
      rm("a", true, content);
      rms(["推荐都市大神老施新书:"], content);
      return content;
    }
  );

export const dijiubook = () =>
  mkBiquge(
    (introDom) => {
      rms(["本书网址："], introDom);
      return introDom;
    },
    (content) => {
      rm("a", true, content);
      rm('img[src$="alipay.png"]', true, content);
      return content;
    },
    1,
    (classThis: any) => {
      classThis.maxRunLimit = 1;
      const chapterParse = classThis.chapterParse;
      classThis.chapterParse = async (...args: any[]) => {
        const obj = await chapterParse(...args);
        await sleep(3000 * Math.random());
        return obj;
      };
      return classThis;
    },
    (chapter) => {
      const url = new URL(chapter.chapterUrl);
      if (url.host === "m.dijiuben.com" || url.href.endsWith(".apk")) {
        return;
      } else {
        return chapter;
      }
    }
  );

export const c25zw = () =>
  mkBiquge(
    (introDom) => {
      introDom.querySelector("font")?.parentElement?.remove();
      rms(["简介:"], introDom);
      return introDom;
    },
    (content) => {
      rm(".bottem", false, content);
      return content;
    }
  );

export const xbiquge = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => {
      rms([`笔趣阁 www.xbiquge.so，最快更新.+ ！`], content);
      return content;
    }
  );

export const yruan = () =>
  mkBiquge(
    (introDom) => {
      rm2(["本站提示：各位书友要是觉得"], introDom);
      return introDom;
    },
    (content) => content,
    3
  );

export const ranwen = () =>
  mkBiquge(
    (introDom) => {
      rm2(["还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！"], introDom);
      return introDom;
    },
    (content) => content
  );

export const b5200 = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => content,
    1
  );

export const bxwx333 = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => {
      content.querySelector("#xuanchuan")?.parentElement?.remove();
      rm("div[style]", true, content);
      rm(".bottem2", true, content);
      return content;
    },
    undefined,
    undefined,
    undefined,
    "#zjneirong"
  );

export const xbiqugeLa = () =>
  mkBiquge(
    (introDom) => {
      introDom.querySelector("font")?.parentElement?.remove();
      return introDom;
    },
    (content) => {
      rm2(["手机站全新改版升级地址"], content);
      return content;
    },
    1
  );

export const shuquge = () =>
  mkBiquge(
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
      rm2(["请记住本书首发域名：", "www.shuquge.com"], content);
      return content;
    },
    1
  );

export const xyqxs = () =>
  mkBiquge(
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
  mkBiquge(
    (introDom) => {
      rm2(
        ["无弹窗免费全文阅读为转载作品", "无弹窗推荐地址", "简介："],
        introDom
      );
      return introDom;
    },
    (content) => {
      rm("script", true, content);
      rm("div[style]", true, content);
      rm("div[align]", true, content);
      rm2(["https://www.lvsewx.com/books", "请记住本书首发域名"], content);
      htmlTrim(content);
      return content;
    }
  );

export const yqxs = () =>
  mkBiquge(
    (introDom) => {
      rms(["<span>简介：</span>"], introDom);
      rm2(["推荐地址："], introDom);
      return introDom;
    },
    (content) => {
      rm("script", true, content);
      rm('div[align="center"]', false, content);
      rm2(["//www.yqxs.cc/html/", "请记住本书首发域名"], content);
      return content;
    }
  );

export const dingdiann = () =>
  mkBiquge(
    (introDom) => introDom,
    (content) => {
      rm("div", false, content);
      rm("script", true, content);
      rm2(["www.dingdiann.net", "最新全本："], content);
      htmlTrim(content);
      return content;
    },
    5
  );
