import { sleep } from "../../lib/misc";
import { rm, rm2, rms } from "../../lib/dom";
import { mkBiqugeClass } from "./template";

// 笔趣阁通用模板，无contentpatch可直接使用
export const common = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content
  );

export const gebiqu = () =>
  mkBiqugeClass(
    (introDom) => {
      rms([/如果您喜欢.+，别忘记分享给朋友/g], introDom);
      rm('a[href^="http://down.gebiqu.com"]', false, introDom);
      return introDom;
    },
    (content) => {
      rms([/"www.gebiqu.com"/g], content);
      return content;
    }
  );

export const luoqiuzw = () =>
  mkBiqugeClass(
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

export const lwxs9 = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      rm("div[align]", false, content);
      return content;
    }
  );

export const biquwx = () =>
  mkBiqugeClass(
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
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      rms(
        [
          /推荐都市大神老施新书:<a href="https:\/\/www\.tycqxs\.com\/[\d_]+\/" target="_blank">.+<\/a>/,
        ],
        content
      );
      return content;
    }
  );

export const dijiubook = () =>
  mkBiqugeClass(
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
    },
    (chapter) => {
      const url = new URL(chapter.chapterUrl);
      if (url.host === "m.dijiubook.net" || url.href.endsWith(".apk")) {
        return;
      }
      return chapter;
    }
  );

export const c25zw = () =>
  mkBiqugeClass(
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
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => {
      rms([`笔趣阁 www.xbiquge.so，最快更新.+ ！`], content);
      return content;
    }
  );

export const yruan = () =>
  mkBiqugeClass(
    (introDom) => {
      rm2(["本站提示：各位书友要是觉得"], introDom);
      return introDom;
    },
    (content) => content,
    3
  );

export const ranwen = () =>
  mkBiqugeClass(
    (introDom) => {
      rm2(["还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！"], introDom);
      return introDom;
    },
    (content) => content
  );

export const b5200 = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content,
    1
  );

export const bxwx333 = () =>
  mkBiqugeClass(
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
