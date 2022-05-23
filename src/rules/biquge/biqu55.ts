import { rm2 } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";
import { mkRuleClass } from "../onePage/template";
import { baseOnePage } from "./template";

export const biqu55 = () =>
  mkRuleClass({
    ...baseOnePage((introDom) => introDom, 5),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const script = Array.from(doc.querySelectorAll("script"))
        .filter((s) => s.innerHTML.includes("article_id"))?.[0]
        ?.innerHTML.split("\n")
        .filter((line) => !line.includes("lastread.set"))
        .join("\n");
      const request = new Function(`${script};
const url = "https://www.biqu55.net/home/index/ajaxchapter";
const payload = new URLSearchParams({
    id: article_id,
    eKey: hash,
    cid: chapter_id,
    basecid: chapter_id,
});
return new Request(url, {
    headers: {
    accept: "application/json, text/javascript, */*; q=0.01",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest",
    },
    body: payload.toString(),
    method: "POST",
    mode: "cors",
    credentials: "include",
});`)() as Request;
      const resp = await fetch(request);
      const json = (await resp.json()) as ajaxchapter;
      if (json.status === "success") {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = json.info.content;
        return contentRaw;
      } else {
        return null;
      }
    },
    contentPatch: (content) => {
      rm2(["数据和书签与电脑站同步，无广告清新阅读"], content);
      return content;
    },
  });

interface ajaxchapter {
  status: string;
  info: {
    content: string;
    title: string;
    link: string;
    rewriteurl: string;
    nextcid: number;
    prevcid: number;
  };
}
