import { mkRuleClass } from "./template";
import { rm } from "../../lib/dom";

// https://hongxiuzhao.me/inc/font.min.css
const table: Record<string, string> = {
  "\ue2a9": "\u5634",
  "\ue2ba": "\u4e0b",
  "\ue2bb": "\u5934",
  "\ue2d1": "\u4f53",
  "\ue321": "\u515a",
  "\ue2a5": "\u5165",
  "\ue2b4": "\u7c97",
  "\ue2c4": "\u63a8",
  "\ue316": "\u6237",
  "\ue310": "\u9017",
  "\ue2a1": "\u5598",
  "\ue2a8": "\u8ff7",
  "\ue2cd": "\u94bb",
  "\ue307": "\u542e",
  "\ue30c": "\u7684",
  "\ue315": "\u8482",
  "\ue298": "\u9053",
  "\ue2ca": "\u5e72",
  "\ue2ad": "\u803b",
  "\ue2ef": "\u817f",
  "\ue294": "\u786c",
  "\ue2c9": "\u4e73",
  "\ue2c5": "\u7cbe",
  "\ue2fc": "\u7f69",
  "\ue317": "\u80a5",
  "\ue309": "\u8131",
  "\ue2e4": "\u6f0f",
  "\ue320": "\u5171",
  "\ue2ae": "\u88f8",
  "\ue2b7": "\u6d41",
  "\ue2b1": "\u8179",
  "\ue313": "\u80c0",
  "\ue2b0": "\u81c0",
  "\ue2e0": "\u8272",
  "\ue2d0": "\u9a9a",
  "\ue312": "\u6d1e",
  "\ue2c7": "\u54ac",
  "\ue2de": "\u6839",
  "\ue304": "\u5c3b",
  "\ue2a7": "\u7fd8",
  "\ue2f0": "\u7231",
  "\ue2db": "\u830e",
  "\ue2ed": "\u6c9f",
  "\ue2a2": "\u7ffb",
  "\ue29a": "\u6345",
  "\ue2e7": "\u5c3f",
  "\ue2d3": "\u638f",
  "\ue2b8": "\u6deb",
  "\ue2ea": "\u60c5",
  "\ue2ce": "\u6f6e",
  "\ue2c1": "\u9634",
  "\ue2b3": "\u8089",
  "\ue2d8": "\u88e4",
  "\ue2bc": "\u63d2",
  "\ue290": "\u64cd",
  "\ue29d": "\u634f",
  "\ue322": "\u4e60",
  "\ue29c": "\u8eab",
  "\ue2d6": "\u53c9",
  "\ue30b": "\u53e3",
  "\ue2e5": "\u75d2",
  "\ue30d": "\u889c",
  "\ue2a3": "\u63e1",
  "\ue2ff": "\u8f6f",
  "\ue2f3": "\u6db2",
  "\ue306": "\u4ea4",
  "\ue2d9": "\u62d4",
  "\ue2dc": "\u4e30",
  "\ue301": "\u67d4",
  "\ue311": "\u8170",
  "\ue303": "\u5439",
  "\ue305": "\u7206",
  "\ue2ec": "\u8bf1",
  "\ue2e2": "\u9f9f",
  "\ue2c2": "\u811a",
  "\ue2f1": "\u575a",
  "\ue2bd": "\u8214",
  "\ue2e6": "\u9876",
  "\ue30f": "\u5987",
  "\ue2b9": "\u5507",
  "\ue2bf": "\u5c44",
  "\ue2c6": "\u5a9a",
  "\ue30a": "\u9732",
  "\ue2f7": "\u7a74",
  "\ue2ab": "\u6478",
  "\ue2c3": "\u5c04",
  "\ue30e": "\u547b",
  "\ue2ee": "\u543b",
  "\ue299": "\u6bdb",
  "\ue2f4": "\u5973",
  "\ue2fb": "\u64a9",
  "\ue2cc": "\u6b32",
  "\ue2dd": "\u542b",
  "\ue2be": "\u6e29",
  "\ue295": "\u5978",
  "\ue308": "\u6c34",
  "\ue2af": "\u5f04",
  "\ue2b2": "\u9e21",
  "\ue2da": "\u5149",
  "\ue2f8": "\u767d",
  "\ue314": "\u554a",
  "\ue2e9": "\u52c3",
  "\ue2c8": "\u8210",
  "\ue291": "\u5ae9",
  "\ue29e": "\u82de",
  "\ue2b5": "\u80a4",
  "\ue2c0": "\u7ea4",
  "\ue2f6": "\u5c4c",
  "\ue2f9": "\u8dc3",
  "\ue2e1": "\u80f8",
  "\ue2f5": "\u5c3c",
  "\ue2eb": "\u808f",
  "\ue2cb": "\u629a",
  "\ue2df": "\u6d6a",
  "\ue300": "\u871c",
  "\ue2d4": "\u6ee1",
  "\ue2aa": "\u6252",
  "\ue302": "\u6413",
  "\ue292": "\u62b1",
  "\ue2e8": "\u8361",
  "\ue29f": "\u80a1",
  "\ue293": "\u63c9",
  "\ue2cf": "\u505a",
  "\ue29b": "\u50ac",
  "\ue2fd": "\u88d9",
  "\ue2b6": "\u633a",
  "\ue297": "\u5904",
  "\ue2fa": "\u5976",
  "\ue323": "\u4ea7",
  "\ue2e3": "\u836f",
  "\ue2d7": "\u6027",
  "\ue2a0": "\u63f4",
  "\ue2d2": "\u623f",
  "\ue2d5": "\u9633",
  "\ue2fe": "\u6ed1",
  "\ue296": "\u5438",
  "\ue2ac": "\u67de",
};

export const hongxiuzhao = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname:
      document
        .querySelector<HTMLHeadingElement>(".m-bookdetail div.f-fl > h1")
        ?.innerText.trim() ?? "",
    author:
      document
        .querySelector<HTMLAnchorElement>(".author > a:nth-child(1)")
        ?.innerText.trim() ?? "",
    introDom:
      document.querySelector<HTMLParagraphElement>(".summery") ?? undefined,
    introDomPatch: (dom) => {
      rm("strong", false, dom);
      rm("em", false, dom);
      return dom;
    },
    coverUrl: document.querySelector<HTMLImageElement>(".cover > img")?.src,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(".tags > a")
      ).map((a) => a.innerText.trim());
      return additionalMetadate;
    },
    aList: document.querySelectorAll(".m-chapters li > a"),
    getContent: (doc) => doc.querySelector(".article-content"),
    contentPatch: (content) => {
      rm("mark", true, content);
      rm("h1", true, content);
      rm("ins", true, content);
      rm("script", true, content);
      rm("p[style]", true, content);
      rm('a[href="https://hongxiuzh.com"]', true, content);

      for (const k in table) {
        content.innerHTML = content.innerHTML.replaceAll(k, table[k]);
      }
      return content;
    },
  });
