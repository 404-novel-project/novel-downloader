import { floatBuster } from "../lib/adBlocker";

export interface UIObject {
  type: "jump" | "download" | "error";
  jumpFunction?: () => void;
  isSettingSeen?: boolean;
}

const defaultObject: UIObject = {
  type: "download",
};
const errorObject: UIObject = {
  type: "error",
};

export function getUI(): () => UIObject {
  const host: string = document.location.host;
  switch (host) {
    case "wap.ishuquge.org": {
      return () => {
        const id = /(\d+)\.html$/.exec(document.location.pathname)?.[1];
        if (!id) {
          return errorObject;
        }
        return {
          type: "jump",
          jumpFunction() {
            document.location.href = `https://www.ishuquge.org/txt/${id}/index.html`;
          },
        };
      };
    }
    case "m.wanben.info": {
      return () => ({
        type: "jump",
        jumpFunction() {
          document.location.host = "www.wanben.info";
        },
      });
    }
    case "www.tadu.com": {
      return () => {
        const re = /^\/book\/\d+\/?$/;
        if (re.test(document.location.pathname)) {
          return defaultObject;
        } else {
          return errorObject;
        }
      };
    }
    case "www.kanunu8.com": {
      return () => {
        if (
          document.body.innerHTML.includes("作者：") ||
          document.body.innerHTML.includes("作者:") ||
          document.body.innerHTML.includes("内容简介")
        ) {
          return defaultObject;
        } else {
          return errorObject;
        }
      };
    }
    case "www.ciyuanji.com": {
      return () => {
        if (document.location.pathname.startsWith("/bookDetails/info")) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.pathname = document.location.pathname.replace(
                "/bookDetails/info",
                "/bookDetails/catalog"
              )),
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "ebook.longmabook.com":
    case "www.longmabookcn.com":
    case "ebook.lmbooks.com":
    case "www.lmebooks.com":
    case "www.haitbook.com":
    case "www.htwhbook.com":
    case "www.myhtebook.com":
    case "www.lovehtbooks.com":
    case "www.myhtebooks.com":
    case "www.myhtlmebook.com":
    case "jp.myhtebook.com":
    case "jp.myhtlmebook.com":
    case "ebook.urhtbooks.com":
    case "www.urhtbooks.com":
    case "www.newhtbook.com":
    case "www.lvhtebook.com":
    case "jp.lvhtebook.com":
    case "www.htlvbooks.com": {
      return () => {
        const params = new URLSearchParams(document.location.search);
        if (
          params.get("act") === "showinfo" &&
          params.has("bookwritercode") &&
          params.has("bookid")
        ) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    case "m.sfacg.com": {
      return () => {
        const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
        if (bookId) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
          };
        } else {
          return errorObject;
        }
      };
    }
    case "book.sfacg.com": {
      return () => {
        const jump = /^\/Novel\/\d+\/?$/.test(document.location.pathname);
        if (jump) {
          const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
          if (bookId) {
            return {
              type: "jump",
              jumpFunction: () =>
                (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
            };
          } else {
            return errorObject;
          }
        } else {
          return defaultObject;
        }
      };
    }
    case "m.lvsewx.com": {
      return () => ({
        type: "jump",
        jumpFunction: () => (document.location.host = "www.lvsewx.com"),
      });
    }
    case "www.cool18.com": {
      return () => {
        const url = new URL(document.location.href);
        if (
          url.searchParams.get("act") === "threadview" &&
          url.searchParams.has("tid")
        ) {
          return defaultObject;
        } else {
          return errorObject;
        }
      };
    }
    case "www.zongheng.com":
    case "book.zongheng.com":
    case "huayu.zongheng.com": {
      const style = document.createElement("style");
      style.innerHTML = `
          img {
            font-size: 1em;
          }
        `;
      document.head.appendChild(style);
      return () => {
        if (document.location.pathname.startsWith("/book/")) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.pathname = document.location.pathname.replace(
                /^\/book\//,
                "/showchapter/"
              )),
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.17k.com": {
      return () => {
        if (document.location.pathname.startsWith("/book/")) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.pathname = document.location.pathname.replace(
                /^\/book\//,
                "/list/"
              )),
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.linovelib.com": {
      return () => {
        if (document.location.pathname.endsWith(".html")) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.pathname = document.location.pathname.replace(
                /\.html$/,
                "/catalog"
              )),
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.bilinovel.com": {
      return () => {
        if (document.location.pathname.endsWith("/catalog")) {
          return {
            type: "jump",
            jumpFunction: () =>
            (document.location.pathname = document.location.pathname.replace(
              /\/catalog$/,
              ".html"
            )),
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "masiro.me": {
      return () => {
        if (document.querySelector(".error-box")) {
          return errorObject;
        } else {
          return defaultObject;
        }
      };
    }
    case "www.ywggzy.com":
    case "www.yiruan.la":
    case "www.ishuquge.org":
    case "www.gashuw.com":
    case "www.81book.com":
    case "www.81zw.com":
    case "www.fuguoduxs.com":
    case "www.shubaowa.org":
    case "www.aixiaxs.net":
    case "www.banzhuer.org":
    case "www.007zw.com":
    case "www.wanben.info":
    case "www.mht99.com":
    case "www.xbiquge.tw":
    case "www.xsbiquge.la":
    case "www.luoqiuzw.com":
    case "dijiuben.com":
    case "www.biquzw.la":
    case "www.i25zw.com":
    case "www.tycqzw.com":
    case "www.ranwen.la":
    case "www.b5200.net":
    case "www.yqxsge.cc":
    case "www.bixia3.com":
    case "www.quanshuzhai.com":
    case "www.ibiquge.la": {
      return () => {
        floatBuster();
        return defaultObject;
      };
    }
    case "new-read.readmoo.com": {
      return () => ({ type: "download", isSettingSeen: false });
    }
    case "www.myrics.com": {
      return () => {
        if (document.location.pathname.endsWith("/menu")) {
          return {
            type: "jump",
            jumpFunction: () => {
              document.location.pathname = document.location.pathname.replace(
                /\/menu$/,
                ""
              );
            },
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.piaotia.com": {
      return () => {
        if (document.location.pathname.startsWith("/list/")) {
          return {
            type: "jump",
            jumpFunction: () => {
              const p =
                document.location.pathname.match(/\/list\/(\w+)\//)?.[1];
              if (!p) {
                return errorObject;
              }
              document.location.pathname = `/${p}/`;
            },
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.soxscc.net":
    case "www.soxscc.org":
    case "www.soxs.cc":
    case "www.soxscc.cc":
    case "www.soshuwu.com": {
      return () => {
        if (document.location.pathname.startsWith("/book/")) {
          return {
            type: "jump",
            jumpFunction: () => {
              document.location.pathname = document.location.pathname
                .replace(/^\/book/, "")
                .replace(/\.html/, "/");
            },
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "www.wenku8.net": {
      return () => {
        if (document.location.pathname.startsWith("/book/")) {
          return {
            type: "jump",
            jumpFunction: () => {
              const href = document.querySelector<HTMLAnchorElement>(
                "#content > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > span:nth-child(1) > fieldset:nth-child(1) > div:nth-child(2) > a:nth-child(1)"
              )?.href;
              if (href) {
                document.location.href = href;
              } else {
                return errorObject;
              }
            },
          };
        } else {
          return defaultObject;
        }
      };
    }
    case "hongxiuzhao.me": {
      return () => {
        if (document.querySelector(".cover")) {
          return defaultObject;
        } else {
          return errorObject;
        }
      };
    }
    case "www.quanzhifashi.com":
    case "www.42zw.la":
    case "www.boqugew.com":
    case "www.qbtr.cc":
    case "b.guidaye.com":
    case "www.qimao.com": {
      return () => {
        document.querySelector("li.qm-tab-list-item:nth-child(2) > div")?.dispatchEvent(new MouseEvent('click'));
        return defaultObject;
      };
    }
    default: {
      return () => {
        return defaultObject;
      };
    }
  }
}
