import { rm } from "../../../lib/dom";
import { mkRuleClass } from "../template";

const currentPageIndexBox = document.querySelector('.p-eplist');

// Attempt to get the first and last page anchors
const firstPageAnchor = document.querySelector('.c-pager__item--first');
const lastPageAnchor = document.querySelector('.c-pager__item--last');

if (firstPageAnchor && lastPageAnchor) {
  // Fallback to the current URL if href is null, it means we're on the last or first page
  const currentURL = window.location.pathname + window.location.search;
  const lastPageHref = lastPageAnchor.getAttribute('href') ? lastPageAnchor.getAttribute('href'): currentURL;
  const firstPageHref = firstPageAnchor.getAttribute('href') ? firstPageAnchor.getAttribute('href'): currentURL;

  // Extract the page numbers from the URLs
  const hrefLastPageMatch = lastPageHref ? lastPageHref.match(/(.*\/\?p=)(\d+)/) : null;
  const hrefFirstPageMatch = firstPageHref ? firstPageHref.match(/(.*\/\?p=)(\d+)/) : null;

  const baseUrl = hrefLastPageMatch ? hrefLastPageMatch[1] : hrefFirstPageMatch ? hrefFirstPageMatch[1] : '';
  const lastPageNumber = hrefLastPageMatch ? parseInt(hrefLastPageMatch[2], 10) : 1;
  const currentPageNumberMatch = currentURL.match(/(.*\/\?p=)(\d+)/);
  const currentPageNumber = currentPageNumberMatch ? parseInt(currentPageNumberMatch[2], 10) : 1;

  // Function to fetch content and append children, modified to return the fetch Promise
  const fetchAndAppendContent = async (pageNumber: number, insertAfterCurrentBox: boolean) => {
    try {
      const response = await fetch(`${baseUrl}${pageNumber}`);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const pageIndexBox = doc.querySelector('.p-eplist');
      if (pageIndexBox && currentPageIndexBox) {
        const childrenArray = Array.from(pageIndexBox.children);
        if (insertAfterCurrentBox) {
          childrenArray.forEach(child => {
            currentPageIndexBox.appendChild(child.cloneNode(true));
          });
        } else {
          childrenArray.reverse().forEach(child => {
            currentPageIndexBox.insertBefore(child.cloneNode(true), currentPageIndexBox.firstChild);
          });
        }
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    }
  };

  // Fetch previous pages' content
  for (let i = currentPageNumber - 1; i > 0; i--) {
    await fetchAndAppendContent(i, false);
  }
  
  // If lastPageNumber is -1, it indicates we are on the last page
  const endPageNumber = lastPageNumber === -1 ? currentPageNumber : lastPageNumber;
  
  // Fetch next pages' content
  for (let i = currentPageNumber + 1; i <= endPageNumber; i++) {
    await fetchAndAppendContent(i, true);
  }  
}


export const syosetu = () => {
  const getIntroDom = () => {
    const a = document.querySelector("#novel_ex > .more") as HTMLElement;
    if (a) {
      a.click();
    }
    return document.querySelector("#novel_ex") as HTMLElement;
  };
  const getAList = () => {
    const _aList = document.querySelectorAll(
      "body > div.l-container > main > article > div.p-eplist > div > a"
    );
    if (_aList.length !== 0) {
      return _aList;
    } else {
      const a = document.createElement("a");
      a.href = document.location.href;
      a.innerText = (
        document.querySelector(".p-novel__title") as HTMLElement
      )?.innerText;
      return [a];
    }
  };

  const getNsfw = () => {
    const host = document.location.host;
    return host === "novel18.syosetu.com";
  };

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".p-novel__title") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "div.p-novel__author"
      ) as HTMLAnchorElement
    ).innerText,
    introDom: getIntroDom(),
    introDomPatch: (dom) => dom,
    coverUrl: null,
    aList: getAList(),
    sections: document.querySelectorAll(".p-eplist__chapter-title"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => {
      const content = document.createElement("div");
      const novelP = dom.querySelector(".p-novel__text--preface");
      const novelHonbun = dom.querySelector(".p-novel__text:not(.p-novel__text--preface):not(.p-novel__text--afterword)");
      const novelA = dom.querySelector(".p-novel__text--afterword");
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
    nsfw: getNsfw(),
    needLogin: getNsfw(),
    language: "ja",
  });
};

export const syosetuOrg = () => {
  const getAList = () => {
    const _aList = document.querySelectorAll('tr[class^="bgcolor"] > td > a');
    if (_aList.length !== 0) {
      return _aList;
    } else {
      const a = document.createElement("a");
      a.href = document.location.href;
      a.innerText = (
        document.querySelector(
          "div.ss:nth-child(1) > p:nth-child(1) > span:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      )?.innerText;
      return [a];
    }
  };
  const aList = getAList();

  const getIntroDom = () => {
    if (
      aList.length === 1 &&
      (aList[0] as HTMLAnchorElement).href === document.location.href
    ) {
      return undefined;
    }
    return document.querySelector("div.ss:nth-child(2)") as HTMLElement;
  };

  return mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(
        'div.ss > span[itemprop="name"], div.ss:nth-child(1) > p:nth-child(1) > span:nth-child(1) > a:nth-child(1)'
      ) as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        'div.ss span[itemprop="author"] > a, div.ss:nth-child(1) > p:nth-child(1) > a:nth-child(2)'
      ) as HTMLAnchorElement
    )?.innerText.trim(),
    introDom: getIntroDom(),
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
    aList,
    sections: document.querySelectorAll(
      'div.ss > table > tbody > tr > td[colspan="2"] > strong'
    ),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (doc) => {
      if (
        aList.length === 1 &&
        (aList[0] as HTMLAnchorElement).href === document.location.href
      ) {
        return doc.querySelector("div#maind > div.ss:nth-child(2)");
      }
      return doc.querySelector("div#maind > div.ss:nth-child(1)");
    },
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
    language: "ja",
  });
};
