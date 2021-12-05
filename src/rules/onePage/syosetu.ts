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
      const novelHonbun = dom.querySelector("#novel_honbun");
      const novelA = dom.querySelector("#novel_a");
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
