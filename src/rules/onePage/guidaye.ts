//import { rm } from "../../lib/dom";
import { mkRuleClass } from "./template";
import { log } from "../../log";

interface detail {
  total: number;
  pageSize: number;
  totalPage: number;
  list: [{
    id: string;
    title: string;
    pic: string;
  }]
}

const num = +(document.querySelector("div.pager > span:nth-child(1)") as HTMLElement).innerText.replace(/页次：.+\//g, "").trim();
const sid = (document.querySelector("div#bookiddata") as HTMLElement).dataset.sid || "";
const api = "https://b.guidaye.com/e/extend/bookpage/pages.php?id="+sid;
const htm = document.createElement("div");
log.info("[guidaye]"+"作品编号: "+sid+", 列表页数: "+num);
for (let i=0;i<num;i++) {
  log.info("获取列表："+i);
  const resp = await fetch(api, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'pageNum='+i
  });
  if (!resp.ok) {
    log.error("获取列表错误："+resp.status);
  }
  const result = (await resp.json()) as detail;
  result.list.forEach(list => {
    //console.log("href: "+list.pic+", text: "+list.title);
    const ul = document.createElement('a');
    ul.href = list.pic;
    ul.innerText = list.title;
    htm.appendChild(ul);
    return;
  });
}
log.info("[guidaye]列表生成完毕");

export const guidaye = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("div.book-describe > h1") as HTMLHeadElement
    ).innerText.trim(),
    author: (
      document.querySelector("div.book-describe > p") as HTMLAnchorElement
    ).innerText.trim().replace(/作者：|作品集/g, ""),
    introDom: document.querySelector("div.describe-html") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("div.book-img > img") as HTMLImageElement).src,
    //aList: document.querySelectorAll("ul.list > li > a"),
    aList: htm.querySelectorAll("a"),
    getContent: (doc) => doc.querySelector("div#nr1") as HTMLElement,
    contentPatch: (content) => {
      return content;
    },
  });
