import { sleep } from "../../lib/misc";
import { rm, rm2 } from "../../lib/dom";
import { Chapter } from "../../main/Chapter";
import { mkBiqugeClass } from "./template";

// 笔趣阁通用模板，无contentpatch可直接使用
export const common = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content
  );

// 笔趣阁通用模板，禁用怱略
export const common1 = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content,
    undefined,
    false
  );

export const c81book = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content
  );

export const gebiqu = () =>
  mkBiqugeClass(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace(
        /如果您喜欢.+，别忘记分享给朋友/g,
        ""
      );
      rm('a[href^="http://down.gebiqu.com"]', false, introDom);
      return introDom;
    },
    (content) => {
      content.innerHTML = content.innerHTML.replace(/"www.gebiqu.com"/g, "");
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
      ads.forEach(
        (adt) => (content.innerHTML = content.innerHTML.replace(adt, ""))
      );
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
      introDom.innerHTML = introDom.innerHTML.replace(
        /本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/,
        ""
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
      content.innerHTML = content.innerHTML.replace(
        /推荐都市大神老施新书:<a href="https:\/\/www\.tycqxs\.com\/[\d_]+\/" target="_blank">.+<\/a>/,
        ""
      );
      return content;
    }
  );

export const dijiubook = () =>
  mkBiqugeClass(
    (introDom) => {
      introDom.innerHTML = introDom.innerHTML.replace("本书网址：", "");
      rm('a[href^="https://dijiubook.net/"]', false, introDom);

      rm(
        "dl > dt:nth-of-type(2)",
        false,
        document.querySelector("#list") as HTMLElement
      );
      document
        .querySelectorAll('#list a[href^="https://m.dijiubook.net"]')
        .forEach((elem) => elem.parentElement?.remove());
      document
        .querySelectorAll('#list a[href$=".apk"]')
        .forEach((elem) => elem.parentElement?.remove());

      return introDom;
    },
    (content) => {
      rm("a", true, content);
      rm('img[src$="alipay.png"]', true, content);
      return content;
    },
    1,
    undefined,
    undefined,
    (classThis: any) => {
      classThis.maxRunLimit = 1;
      const chapterParse = classThis.chapterParse;
      classThis.chapterParse = async (...args: any[]) => {
        const obj = await chapterParse(...args);
        await sleep(3000 * Math.random());
        return obj;
      };
    }
  );

export const c25zw = () =>
  mkBiqugeClass(
    (introDom) => {
      introDom.querySelector("font")?.parentElement?.remove();
      introDom.innerHTML = introDom.innerHTML.replace("简介:", "");
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
    (content, options) => {
      content.innerHTML = content.innerHTML.replace(
        `笔趣阁 www.xbiquge.so，最快更新${options.bookname} ！`,
        ""
      );
      return content;
    }
  );

export const yruan = () =>
  mkBiqugeClass(
    (introDom) => {
      rm2(introDom, ["本站提示：各位书友要是觉得"]);
      return introDom;
    },
    (content) => content,
    3
  );

export const ranwen = () =>
  mkBiqugeClass(
    (introDom) => {
      rm2(introDom, ["还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！"]);
      return introDom;
    },
    (content) => content,
    undefined,
    undefined,
    /全文阅读/
  );

export const b5200 = () =>
  mkBiqugeClass(
    (introDom) => introDom,
    (content) => content,
    1
  );
