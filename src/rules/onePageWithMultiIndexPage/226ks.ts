import { rm } from "../../lib/misc";
import { nextPageParse } from "../../lib/rule";
import { mkRuleClass } from "./template";

export const c226ks = () =>
  mkRuleClass({
    bookUrl: document.location.href.replace(/index_\d+\.html/, "index_1.html"),
    bookname: (
      document.querySelector(".info > .top > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        ".info > .top > .fix > p:nth-child(1)"
      ) as HTMLElement
    ).innerText
      .replace(/作(\s+)?者[：:]/, "")
      .trim(),
    introDom: document.querySelector(".desc") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector(".imgbox > img") as HTMLImageElement).src,
    getIndexUrls: () =>
      Array.from(document.querySelectorAll('[name="pageselect"] > option')).map(
        (opt) => document.location.origin + opt.getAttribute("value")
      ),
    getAList: (doc) =>
      doc.querySelectorAll(
        "div.section-box:nth-child(4) > ul:nth-child(1) > li > a"
      ),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const {
        chapterName: _chapterName,
        contentRaw,
        contentText,
        contentHTML,
        contentImages,
        additionalMetadate,
      } = await nextPageParse({
        chapterName,
        chapterUrl,
        charset,
        selector: "#content",
        contentPatch: (content, doc) => {
          rm("script", true, content);
          rm("div.posterror", false, content);
          rm("div[onclick]", true, content);
          const ad =
            '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
          content.innerHTML = content.innerHTML.replace(ad, "");
          return content;
        },
        getNextPage: (doc) =>
          (
            doc.querySelector(
              "div.section-opt.m-bottom-opt > a:nth-child(5)"
            ) as HTMLAnchorElement
          ).href,
        continueCondition: (_content, nextLink) => {
          const pathname = nextLink.split("/").slice(-1)[0];
          return pathname.includes("_");
        },
        enableCleanDOM: false,
      });
      return contentRaw;
    },
    contentPatch: (content) => content,
  });
