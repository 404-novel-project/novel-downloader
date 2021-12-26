import { rm } from "../../lib/dom";
import { mkRuleClass } from "./template";

export const syosetu = () => {
  const getIntroDom = () => {
    const a = document.querySelector("#novel_ex > .more") as HTMLElement;
    if (a) {
      a.click();
    }
    return document.querySelector("#novel_ex") as HTMLElement;
  };

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".novel_title") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".novel_writername > a") as HTMLAnchorElement
    ).innerText.trim(),
    introDom: getIntroDom(),
    introDomPatch: (dom) => dom,
    coverUrl: null,
    aList: document.querySelectorAll("dl.novel_sublist2 dd.subtitle > a"),
    sections: document.querySelectorAll("div.chapter_title"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => {
      const content = document.createElement("div");
      const novelP = dom.querySelector("#novel_p");
      const novelHonbun = dom.querySelector("#novel_honbun");
      const novelA = dom.querySelector("#novel_a");
      if (novelP) {
        content.appendChild(novelP);
        const hr = dom.createElement("hr");
        content.appendChild(hr);
      }
      if (novelHonbun) {
        content.appendChild(novelHonbun);
      }
      if (novelA) {
        const hr = dom.createElement("hr");
        content.appendChild(hr);
        content.appendChild(novelA);
      }
      return content;
    },
    contentPatch: (dom) => dom,
  });
};

export const syosetuOrg = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector('div.ss > span[itemprop="name"]') as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        'div.ss span[itemprop="author"] > a'
      ) as HTMLAnchorElement
    )?.innerText.trim(),
    introDom: document.querySelector("div.ss:nth-child(2)") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll(
          'span[itemprop="keywords"] > a, a.alert_color'
        )
      ).map((a) => (a as HTMLAnchorElement).innerText);
      return additionalMetadate;
    },
    aList: document.querySelectorAll('tr[class^="bgcolor"] > td > a'),
    sections: document.querySelectorAll(
      'div.ss > table > tbody > tr > td[colspan="2"] > strong'
    ),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (doc) => doc.querySelector("div#maind > div.ss:nth-child(1)"),
    contentPatch: (dom) => {
      rm("p:nth-child(1)", false, dom);
      rm("div.novelnavi", true, dom);
      rm('div[style*="text-align:right;"]', true, dom);
      // https://syosetu.org/novel/270595/78.html
      rm("div#maegaki_open", true, dom);
      rm("div#atogaki_open", true, dom);
      dom.querySelectorAll('a[name="img"]').forEach((a) => {
        const img = document.createElement("img");
        img.src = (a as HTMLAnchorElement).href;
        img.alt = (a as HTMLAnchorElement).innerText;
        a.replaceWith(img);
      });
      return dom;
    },
  });
