/// <reference path="pixiv.d.ts" />
import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Pixiv extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.needLogin = true;
    this.concurrencyLimit = 3;
  }

  public async bookParse(): Promise<Book> {
    const self = this;

    const meta = {
      lang: getLang(),
      // 2023-03-11
      // https://s.pximg.net/www/js/build/spa.299cd71d0d1d652e1071.js
      version: "0e6ff4f1fa77cd8630159156c6ca02363ac6e1a8",
    };

    if (document.location.pathname.startsWith("/novel/series")) {
      // 目录页
      const seriesID = /(\d+)\/?$/.exec(document.location.pathname)?.[0];
      if (!seriesID) {
        throw Error("not found seriesID!");
      }
      return doSeries(seriesID);
    } else {
      // 章节页
      const novelID = new URL(document.location.href).searchParams.get("id");
      if (!novelID) {
        throw Error("not found novelID");
      }
      const novel = await getNovel(novelID, meta.lang, meta.version);
      if (novel.seriesID) {
        return doSeries(novel.seriesID);
      } else {
        const bookUrl = `https://www.pixiv.net/novel/show.php?id=${novelID}`;
        const bookname = novel.title;
        const author = novel.userName;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerHTML = novel.description;
        if (novel.glossary) {
          const glossary = document.createElement("div");
          glossary.innerHTML = novel.glossary;
          introductionHTML.appendChild(glossary);
        }
        const introduction = introductionHTML.innerText;
        const additionalMetadate: BookAdditionalMetadate = {};
        getAttachment(novel.coverUrl, self.attachmentMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
        additionalMetadate.lastModified = new Date(novel.uploadDate).getTime();
        additionalMetadate.tags = novel.tags;
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl: bookUrl,
          chapterNumber: 0,
          chapterName: bookname,
          isVIP: false,
          isPaid: false,
          charset: self.charset,
          sectionName: null,
          sectionNumber: null,
          sectionChapterNumber: null,
          chapterParse: self.chapterParse,
          options: {
            id: novelID,
            lang: meta.lang,
            version: meta.version,
          },
        });
        return new Book({
          bookUrl,
          bookname,
          author,
          introduction,
          introductionHTML,
          additionalMetadate,
          chapters: [chapter],
        });
      }
    }

    async function doSeries(seriesID: string): Promise<Book> {
      const series = await getSeries(seriesID, meta.lang, meta.version);

      const bookUrl = `https://www.pixiv.net/novel/series/${seriesID}`;
      const bookname = series.bookname;
      const author = series.author;
      const introduction = series.introduction;
      const introductionHTML = document.createElement("div");
      introductionHTML.innerText = introduction;
      if (series.glossary) {
        const glossary = document.createElement("div");
        glossary.innerHTML = series.glossary;
        introductionHTML.appendChild(glossary);
      }
      const additionalMetadate: BookAdditionalMetadate = {};
      getAttachment(series.coverURL, self.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
      additionalMetadate.lastModified = series.lastModified;
      additionalMetadate.tags = series.tags;
      return new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters: series.chapterObjList.map((c) => {
          const { viewableType, ...cp } = c;
          const chapter = new Chapter({
            bookUrl,
            bookname,
            isVIP: false,
            isPaid: false,
            charset: self.charset,
            sectionName: null,
            sectionNumber: null,
            sectionChapterNumber: null,
            chapterParse: self.chapterParse,
            ...cp,
          });
          if (viewableType !== 0) {
            chapter.status = Status.aborted;
          }
          return chapter;
        }),
      });
    }
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: {
      id: string;
      lang: string;
      version: string;
    }
  ): Promise<ChapterParseObject> {
    const novel = await getNovel(options.id, options.lang, options.version);
    const contentDom = document.createElement("div");
    const contentRaw = document.createElement("div");
    contentRaw.innerText = novel.content;
    await loadPixivimage({
      dom: contentRaw,
      nid: options.id,
      textEmbeddedImages: novel.textEmbeddedImages,
    });
    replaceMark(contentRaw);
    if (novel.coverUrl) {
      const novelCover = document.createElement("img");
      novelCover.src = novel.coverUrl;
      contentDom.append(novelCover);
    }
    if (novel.glossary) {
      const glossary = document.createElement("div");
      glossary.innerHTML = novel.glossary;
      contentDom.append(glossary);
    }
    contentDom.append(contentRaw);
    const { dom, text, images } = await cleanDOM(contentDom, "TM");
    const additionalMetadate: ChapterAdditionalMetadate = {
      lastModified: new Date(novel.uploadDate).getTime(),
      tags: novel.tags,
    };
    
    return {
      chapterName,
      contentRaw,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate,
    };

    async function loadPixivimage({
      dom,
      nid,
      textEmbeddedImages,
    }: {
      dom: HTMLElement;
      nid: string;
      textEmbeddedImages: { [index: string]: TextEmbeddedImage } | null;
    }) {
      // pixivimage
      // https://www.pixiv.net/novel/show.php?id=19452298
      const pixivImages = dom.innerHTML.matchAll(/\[pixivimage:(\d+)]/g);
      for (const match of pixivImages) {
        await mapperPixivImage(match as [string, string]);
      }

      // uploadedimage
      // https://www.pixiv.net/novel/show.php?id=18384581
      const uploadedImages = dom.innerHTML.matchAll(/\[uploadedimage:(\d+)]/g);
      for (const match of uploadedImages) {
        mapperUploadedImage(match as [string, string]);
      }
      return dom;

      async function mapperPixivImage([str, id]: [string, string]) {
        const imgSrc = await getPixivImage(id);
        const img = document.createElement("img");
        img.src = imgSrc;
        const a = document.createElement("a");
        a.href = `https://www.pixiv.net/artworks/${id}`;
        a.appendChild(img);
        dom.innerHTML = dom.innerHTML.replaceAll(str, a.outerHTML);
      }

      async function getPixivImage(id: string) {
        const url = new URL(
          `https://www.pixiv.net/ajax/novel/${nid}/insert_illusts`
        );
        url.searchParams.append("id[]", `${id}-1`);
        url.searchParams.append("lang", options.lang);
        url.searchParams.append("version", options.version);

        const resp = await fetch(url.href, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          method: "GET",
          mode: "cors",
        });
        const illusts = (await resp.json()) as PixivResponse<InsertIllustsBody>;
        if (!illusts.error) {
          return illusts.body[`${id}-1`].illust.images.original;
        } else {
          throw new Error(`获取插图失败: pixivimage:${id}`);
        }
      }

      function mapperUploadedImage([str, id]: [string, string]) {
        const imgSrc = textEmbeddedImages?.[id].urls.original;
        if (imgSrc) {
          const img = document.createElement("img");
          img.src = imgSrc;
          dom.innerHTML = dom.innerHTML.replaceAll(str, img.outerHTML);
        }
      }
    }

    function replaceMark(dom: HTMLElement) {
      // chapter
      // [chapter:企画概要]
      // https://www.pixiv.net/novel/show.php?id=16142454
      const chapterMatchs = dom.innerHTML.matchAll(/\[chapter:(.*?)]/g);
      for (const match of chapterMatchs) {
        const [str, heading] = match;
        const strong = document.createElement("strong");
        strong.innerText = heading.trim();
        dom.innerHTML = dom.innerHTML.replace(str, strong.outerHTML);
      }

      // [newpage]
      // https://www.pixiv.net/novel/show.php?id=12304493
      const newpageMatchs = dom.innerHTML.matchAll(/\[newpage]/g);
      let page = 1;
      for (const match of newpageMatchs) {
        const [str] = match;
        page++;
        dom.innerHTML = dom.innerHTML.replace(
          str,
          `<hr/><a id="page${page}" data-keep="id" href="#"></a>`
        );
      }

      // jump
      // [jump:2]
      // https://www.pixiv.net/novel/show.php?id=16142454
      const jumpMatchs = dom.innerHTML.matchAll(/\[jump:(\d+)]/g);
      for (const match of jumpMatchs) {
        const [str, page] = match;
        const a = document.createElement("a");
        a.innerText = `To page ${page.trim()}`;
        a.href = `#page${page.trim()}`;
        dom.innerHTML = dom.innerHTML.replace(str, a.outerHTML);
      }

      // jumpuri
      // [[jumpuri:原文链接 > https://www.backchina.com/blog/250647/article-183780.html]]
      // https://www.pixiv.net/novel/show.php?id=17253845
      const jumpuriMatchs = dom.innerHTML.matchAll(
        /\[\[jumpuri:(.*?) (>|&gt;) (.*?)]]/gm
      );
      for (const match of jumpuriMatchs) {
        const [str, text, , href] = match;
        const a = document.createElement("a");
        a.innerText = text.trim();
        a.href = href.trim();
        dom.innerHTML = dom.innerHTML.replace(str, a.outerHTML);
      }

      // rb
      // [[rb:莉莉丝 > Lilith]]
      // https://www.pixiv.net/novel/show.php?id=13854092
      const rbMatchs = dom.innerHTML.matchAll(/\[\[rb:(.*?) (>|&gt;) (.*?)]]/g);
      for (const match of rbMatchs) {
        const [str, rb, , rt] = match;
        const ruby = document.createElement("ruby");

        const rbElem = document.createElement("rb");
        rbElem.innerText = rb.trim();
        ruby.appendChild(rbElem);

        const rpL = document.createElement("rp");
        rpL.innerText = "(";
        ruby.appendChild(rpL);

        const rtElem = document.createElement("rt");
        rtElem.innerText = rt.trim();
        ruby.appendChild(rtElem);

        const rpR = document.createElement("rp");
        rpR.innerText = ")";
        ruby.appendChild(rpR);

        dom.innerHTML = dom.innerHTML.replace(str, ruby.outerHTML);
      }
    }
  }
}

function getLang(): string {
  return document.querySelector("html")?.getAttribute("lang") ?? "en";
}

interface chapterObj {
  chapterUrl: string;
  chapterNumber: number;
  chapterName: string;
  options: {
    id: string;
    lang: string;
    version: string;
  };
  viewableType: number;
}
function getGlossary(data3: PixivResponse<GlossaryBody>) {
  if (data3.error)
    return null;
  let glossary = "<h2>设定集</h2>";
  for (let i = 0; i < data3.body.categories.length; i++) {
    const category = data3.body.categories[i];
    glossary += `<h3>${category.name}</h3>`
    for (let j = 0; j < category.items.length; j++) {
      const item = category.items[j];
      glossary += `<p><strong>${item.name}</strong>:${item.overview}</p>`;
      if (item.coverImage) {
        glossary += `<img src="${item.coverImage}">`;
      }
      if (item.detail) {
        glossary += `<p>${item.detail}</p>`;
      }
    }
  }
  return glossary;
}
async function getSeries(seriesID: string, lang: string, version: string) {
  const url = new URL(`https://www.pixiv.net/ajax/novel/series/${seriesID}`);
  url.searchParams.append("lang", lang);
  url.searchParams.append("version", version);

  const resp = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    method: "GET",
    mode: "cors",
  });
  const data = (await resp.json()) as PixivResponse<SeriesBody>;
  const seriesTotal = data.body.total;
  const chapterObjList: chapterObj[] = [];

  const limit = 30;
  let lastOrder = 0;
  while (lastOrder < seriesTotal) {
    const url2 = new URL(
      `https://www.pixiv.net/ajax/novel/series_content/${seriesID}`
    );
    url2.searchParams.append("limit", limit.toString());
    url2.searchParams.append("last_order", lastOrder.toString());
    url2.searchParams.append("order_by", "asc");
    url2.searchParams.append("lang", lang);
    url2.searchParams.append("version", version);

    const resp2 = await fetch(url2, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      mode: "cors",
    });
    const data2 = (await resp2.json()) as PixivResponse<SeriesContentBody>;
    const seriesContents = data2.body.page.seriesContents;
    const chapterObjs = seriesContents.map((s): chapterObj => {
      const id = s.id;
      return {
        chapterUrl: `https://www.pixiv.net/novel/show.php?id=${id}`,
        chapterName: s.title,
        chapterNumber: s.series.contentOrder,
        options: {
          id,
          lang,
          version,
        },
        viewableType: s.series.viewableType,
      };
    });
    chapterObjList.push(...chapterObjs);

    lastOrder = lastOrder + limit;
  }
  let glossary = null;
  if (data.body.hasGlossary) {
    const urlGlossary = new URL(`https://www.pixiv.net/ajax/novel/series/${seriesID}/glossary`);
      urlGlossary.searchParams.append("lang", lang);
      urlGlossary.searchParams.append("version", version);
      const resp3 = await fetch(urlGlossary, {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      const data3 = (await resp3.json()) as PixivResponse<GlossaryBody>;
      glossary = getGlossary(data3);
  }
    
  return {
    seriesID,
    seriesTotal,
    chapterObjList,
    bookname: data.body.title,
    author: data.body.userName,
    introduction: data.body.caption,
    coverURL: data.body.cover.urls.original,
    language: data.body.language,
    tags: data.body.tags,
    lastModified: data.body.updatedTimestamp,
    glossary: glossary,
  };
}

async function getNovel(novelID: string, lang: string, version: string) {
  const url = new URL(`https://www.pixiv.net/ajax/novel/${novelID}`);
  url.searchParams.append("lang", lang);
  url.searchParams.append("version", version);

  const resp = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    method: "GET",
    mode: "cors",
  });
  const data = (await resp.json()) as PixivResponse<NovelBody>;
  const glossary = null;
  // if (data.body.hasGlossary) {
  //   const urlGlossary = new URL(`https://www.pixiv.net/ajax/novel/${novelID}/glossary`);
  //   urlGlossary.searchParams.append("lang", lang);
  //   urlGlossary.searchParams.append("version", version);
  //   const resp3 = await fetch(urlGlossary, {
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //     method: "GET",
  //     mode: "cors",
  //   });
  //   const data3 = (await resp3.json()) as PixivResponse<GlossaryBody>;
  //   glossary = getGlossary(data3);
  // }
    
  return {
    title: data.body.title,
    userName: data.body.userName,
    content: data.body.content,
    description: data.body.description,
    uploadDate: data.body.uploadDate,
    coverUrl: data.body.coverUrl,
    tags: data.body.tags.tags.map((t) => t.tag),
    seriesID: data.body.seriesNavData?.seriesId.toString() ?? null,
    textEmbeddedImages: data.body.textEmbeddedImages,
    glossary: glossary,
  };
}
