import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

const _lang = document.documentElement.getAttribute("lang");
const lang: Record<string, string> = _lang ? { lang: _lang } : {};

export class Pixiv extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.needLogin = true;
  }

  public async bookParse() {
    const self = this;
    const userId = await getUserId();
    let bookG: Book | undefined;

    if (document.location.pathname.startsWith("/novel/series")) {
      // 位于目录页
      const _seriesID = /(\d+)\/?$/.exec(document.location.pathname)?.[0];
      if (_seriesID) {
        const seriesID = parseInt(_seriesID, 10);
        bookG = await series(seriesID);
      }
    } else {
      // 位于章节页
      const chapterId = new URL(document.location.href).searchParams.get("id");
      if (chapterId) {
        const novel = await getChapterDate(chapterId);
        const seriesNavData = novel.seriesNavData;
        if (seriesNavData) {
          // 有目录
          const seriesID = seriesNavData.seriesId;
          bookG = await series(seriesID);
        } else {
          // 无目录
          bookG = await onePage(novel);
        }
      }
    }
    if (!bookG) {
      throw new Error("初始化图书信息失败！");
    }
    return bookG;

    async function getUserId() {
      const resp = await fetch(
        "https://www.pixiv.net/ajax/linked_service/tumeng",
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          method: "GET",
          mode: "cors",
        }
      );
      const tumeng = (await resp.json()) as tumeng;
      if (!tumeng.error) {
        return tumeng.body.page.user.id;
      }
    }

    async function series(id: number) {
      const seriesMetaBody = await getSeriesMeta(id);
      const bookUrl = "https://www.pixiv.net/novel/series/" + id.toString();
      const bookname = seriesMetaBody.title;
      const author = seriesMetaBody.userName;
      const introduction = seriesMetaBody.caption;
      const introductionHTML = document.createElement("div");
      introductionHTML.innerText = introduction;

      const additionalMetadate: BookAdditionalMetadate = {};
      const coverUrl = seriesMetaBody.firstEpisode.url;
      if (coverUrl) {
        getAttachment(coverUrl, self.attachmentMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }
      additionalMetadate.lastModified = seriesMetaBody.updatedTimestamp;

      const seriesContents = await getSeriesContents(
        id,
        seriesMetaBody.publishedContentCount
      );
      const chapters: Chapter[] = [];
      const chapterUrlBase = "https://www.pixiv.net/novel/show.php?id=";
      for (const sc of seriesContents) {
        const chapterUrl = chapterUrlBase + sc.id;
        const chapterNumber = sc.series.contentOrder;
        const chapterName = `#${sc.series.contentOrder} ${
          sc.title ?? ""
        }`.trim();
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: false,
          isPaid: false,
          sectionName: null,
          sectionNumber: null,
          sectionChapterNumber: null,
          chapterParse: self.chapterParse,
          charset: self.charset,
          options: { id: sc.id, lang: _lang, userId },
        });
        if (sc.series.viewableType !== 0) {
          chapter.status = Status.aborted;
        }
        chapters.push(chapter);
      }

      additionalMetadate.language = (
        await getPreloadData(chapters[0].chapterUrl, self.charset)
      )?.novel?.language;

      return new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters,
      });
    }

    async function getSeriesMeta(id: number) {
      const referrer = "https://www.pixiv.net/novel/series/" + id.toString();
      const apiMetaBase = "https://www.pixiv.net/ajax/novel/series/";
      const apiMeta =
        apiMetaBase +
        id.toString() +
        "?" +
        new URLSearchParams(lang).toString();

      interface SeriesMeta {
        error: boolean;
        message: string;
        body: {
          id: string;
          userId: string;
          userName: string;
          profileImageUrl: string;
          xRestrict: number;
          isOriginal: boolean;
          isConcluded: boolean;
          genreId: string;
          title: string;
          caption: string;
          publishedContentCount: number;
          publishedTotalCharacterCount: number;
          lastPublishedContentTimestamp: number;
          createdTimestamp: number;
          updatedTimestamp: number;
          createDate: string;
          updateDate: string;
          firstNovelId: string;
          latestNovelId: string;
          displaySeriesContentCount: 5;
          shareText: string;
          total: number;
          firstEpisode: {
            url: string;
          };
          watchCount: null;
          isWatched: boolean;
          isNotifying: boolean;
          hasGlossary: boolean;
          extraData: {
            meta: {
              title: string;
              description: string;
              canonical: string;
              ogp: {
                type: string;
                title: string;
                description: string;
                image: string;
              };
              twitter: {
                card: string;
                site: string;
                title: string;
                description: string;
                image: string;
              };
            };
          };
          zoneConfig: {
            header: {
              url: string;
            };
            footer: {
              url: string;
            };
            responsive: {
              url: string;
            };
            rectangle: {
              url: string;
            };
          };
        };
      }

      const respMeta = await fetch(apiMeta, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer,
        method: "GET",
        mode: "cors",
      });
      const seriesMeta = (await respMeta.json()) as SeriesMeta;
      if (!seriesMeta.error) {
        return seriesMeta.body;
      } else {
        throw new Error("series ajax failed! series ID: " + id);
      }
    }

    async function getSeriesContents(
      id: number,
      publishedContentCount: number
    ) {
      const referrer = "https://www.pixiv.net/novel/series/" + id.toString();
      const apiBase = "https://www.pixiv.net/ajax/novel/series_content/";
      const api = apiBase + id.toString();
      let lastOrder = 0;
      const getSearchParams = () => ({
        limit: "10",
        last_order: lastOrder.toString(),
        order_by: "asc",
        ...lang,
      });

      interface SeriesContent {
        id: string;
        userId: string;
        series: { id: number; viewableType: number; contentOrder: number };
        title: string;
        commentHtml: string;
        tags: string[];
        restrict: number;
        xRestrict: number;
        isOriginal: boolean;
        textLength: number;
        bookmarkCount: number;
        url: string;
        uploadTimestamp: number;
        reuploadTimestamp: number;
        isBookmarkable: boolean;
        bookmarkData: null;
      }

      const seriesContents: SeriesContent[] = [];
      while (lastOrder < publishedContentCount) {
        const url =
          api + "?" + new URLSearchParams(getSearchParams()).toString();
        const resp = await fetch(url, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          referrer,
          method: "GET",
          mode: "cors",
        });

        interface SeriesContents {
          error: boolean;
          message: string;
          body: {
            tagTranslation: [];
            thumbnails: {
              illust: [];
              novel: [];
              novelSeries: [];
              novelDraft: [];
            };
            illustSeries: [];
            requests: [];
            users: [];
            page: {
              seriesContents: SeriesContent[];
            };
          };
        }

        const _seriesContents = (await resp.json()) as SeriesContents;
        if (!_seriesContents.error) {
          seriesContents.push(..._seriesContents.body.page.seriesContents);
        }
        lastOrder = lastOrder + 10;
      }
      return seriesContents;
    }

    async function onePage(novel: NovelObj) {
      const bookUrl = document.location.href;
      const bookId = new URL(document.location.href).searchParams.get(
        "id"
      ) as string;
      const bookname = novel.title;
      const author = novel.userName;
      const introductionHTML = document.createElement("div");
      introductionHTML.innerHTML = novel.description;
      const introduction = introductionHTML.innerText;

      const additionalMetadate: BookAdditionalMetadate = {};
      const coverUrl = novel.coverUrl;
      if (coverUrl) {
        getAttachment(coverUrl, self.attachmentMode, "cover-")
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }
      additionalMetadate.lastModified = new Date(novel.uploadDate).getTime();
      additionalMetadate.tags = novel.tags.tags.map((t) => t.tag);
      additionalMetadate.language = novel.language;

      const chapterUrl = bookUrl;
      const chapterName = bookname;
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber: 1,
        chapterName,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: self.chapterParse,
        charset: self.charset,
        options: {},
      });
      const contentRaw = document.createElement("div");
      contentRaw.innerText = novel.content;
      await loadPixivimage({
        dom: contentRaw,
        nid: bookId,
        lang: _lang,
        userId,
        textEmbeddedImages: novel.textEmbeddedImages,
      });
      replaceMark(contentRaw);

      const { dom, text, images } = await cleanDOM(contentRaw, "TM");
      chapter.contentRaw = contentRaw;
      chapter.contentHTML = dom;
      chapter.contentText = text;
      chapter.contentImages = images;
      chapter.additionalMetadate = {
        lastModified: new Date(novel.uploadDate).getTime(),
        tags: novel.tags.tags.map((t) => t.tag),
      };
      chapter.status = Status.finished;
      const chapters = [chapter];

      return new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters,
      });
    }
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: chapterOptions
  ) {
    const novel = await getChapterDate(options.id);
    const contentRaw = document.createElement("div");
    contentRaw.innerText = novel.content;
    await loadPixivimage({
      dom: contentRaw,
      nid: options.id,
      lang: options.lang,
      userId: options.userId,
      textEmbeddedImages: novel.textEmbeddedImages,
    });
    replaceMark(contentRaw);
    const { dom, text, images } = await cleanDOM(contentRaw, "TM");
    const additionalMetadate: ChapterAdditionalMetadate = {
      lastModified: new Date(novel.uploadDate).getTime(),
      tags: novel.tags.tags.map((t) => t.tag),
    };
    return {
      chapterName,
      contentRaw,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate,
    };
  }
}

interface chapterOptions {
  id: string;
  lang: string | null;
  userId: string | undefined;
}

interface Tag {
  tag: string;
  locked: boolean;
  deletable: boolean;
  userId: string;
  userName: string;
}

interface SeriesNavDataOtherObj {
  title: string;
  order: number;
  id: string;
  available: boolean;
}

interface SeriesNavData {
  seriesType: "novel";
  seriesId: number;
  title: string;
  isConcluded: boolean;
  isReplaceable: boolean;
  isWatched: boolean;
  isNotifying: boolean;
  order: number;
  next: SeriesNavDataOtherObj | null;
  prev: SeriesNavDataOtherObj | null;
}

interface OtherNovelObj {
  id: string;
  title: string;
  xRestrict: number;
  restrict: number;
  url: string;
  tags: string[];
  userId: string;
  userName: string;
  profileImageUrl: string;
  textCount: number;
  description: string;
  isBookmarkable: boolean;
  bookmarkData: null;
  bookmarkCount: null;
  isOriginal: boolean;
  marker: null;
  titleCaptionTranslation: { workTitle: null; workCaption: null };
  createDate: string;
  updateDate: string;
  isMasked: boolean;
  seriesId: string;
  seriesTitle: string;
  isUnlisted: boolean;
}

interface textEmbeddedImage {
  novelImageId: string;
  sl: string;
  urls: {
    "480mw": string;
    "1200x1200": string;
    "128x128": string;
    original: string;
  };
}

interface NovelObj {
  bookmarkCount: number;
  commentCount: number;
  markerCount: number;
  createDate: string;
  uploadDate: string;
  description: string;
  id: string;
  title: string;
  likeCount: number;
  pageCount: string;
  userId: string;
  userName: string;
  viewCount: number;
  isOriginal: boolean;
  isBungei: boolean;
  xRestrict: number;
  restrict: number;
  content: string;
  coverUrl: string;
  suggestedSettings: {
    viewMode: number;
    themeBackground: number;
    themeSize: null;
    themeSpacing: null;
  };
  isBookmarkable: boolean;
  bookmarkData: null;
  likeData: boolean;
  pollData: null;
  marker: null;
  tags: {
    authorId: string;
    isLocked: boolean;
    tags: Tag[];
    writable: boolean;
  };
  seriesNavData: SeriesNavData | null;
  descriptionBoothId: null;
  descriptionYoutubeId: null;
  comicPromotion: null;
  fanboxPromotion: null;
  contestBanners: [];
  contestData: null;
  request: null;
  imageResponseOutData: [];
  imageResponseData: [];
  imageResponseCount: 0;
  userNovels: {
    [index: string]: OtherNovelObj | null;
  };
  hasGlossary: false;
  zoneConfig: {
    responsive: {
      url: string;
    };
    rectangle: {
      url: string;
    };
    "500x500": {
      url: string;
    };
    header: {
      url: string;
    };
    footer: {
      url: string;
    };
    expandedFooter: {
      url: string;
    };
    logo: {
      url: string;
    };
    relatedworks: {
      url: string;
    };
  };
  extraData: {
    meta: {
      title: string;
      description: string;
      canonical: string;
      descriptionHeader: string;
      ogp: {
        description: string;
        image: string;
        title: string;
        type: "article";
      };
      twitter: {
        description: string;
        image: string;
        title: string;
        card: "summary_large_image";
      };
    };
  };
  titleCaptionTranslation: { workTitle: null; workCaption: null };
  isUnlisted: boolean;
  language: string;
  textEmbeddedImages: null | {
    [index: string]: textEmbeddedImage;
  };
  commentOff: number;
}

interface UserObj {
  userId: string;
  name: string;
  image: string;
  imageBig: string;
  premium: boolean;
  isFollowed: boolean;
  isMypixiv: boolean;
  isBlocking: boolean;
  background: null;
  sketchLiveId: null;
  partial: number;
  acceptRequest: true;
  sketchLives: [];
}

interface PreloadData {
  timestamp: string;
  novel: {
    [index: string]: NovelObj;
  };
  user: {
    [index: string]: UserObj;
  };
}

async function getPreloadData(chapterUrl: string, charset: string) {
  const doc = await getHtmlDOM(chapterUrl, charset);
  const _preloadData = doc
    .querySelector("meta#meta-preload-data")
    ?.getAttribute("content");
  if (_preloadData) {
    const preloadData = JSON.parse(_preloadData) as PreloadData;
    let novel;
    const _novel = Object.entries(preloadData.novel);
    if (_novel.length !== 0) {
      novel = _novel[0][1];
    }
    let user;
    const _user = Object.entries(preloadData.user);
    if (_user.length !== 0) {
      user = _user[0][1];
    }
    return { preloadData, novel, user };
  }
}

async function getChapterDate(chapterId: string) {
  const apiBase = "https://www.pixiv.net/ajax/novel/";
  const url = apiBase + chapterId + "?" + new URLSearchParams(lang).toString();

  const resp = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    method: "GET",
    mode: "cors",
  });
  const data = (await resp.json()) as {
    error: boolean;
    message: string;
    body: NovelObj;
  };
  if (!data.error) {
    return data.body;
  } else {
    throw new Error("chpater ajax failed! Chapter ID: " + chapterId);
  }
}

async function loadPixivimage({
  dom,
  nid,
  lang,
  userId,
  textEmbeddedImages,
}: {
  dom: HTMLElement;
  nid: string;
  lang: string | null;
  userId: string | undefined;
  textEmbeddedImages: { [index: string]: textEmbeddedImage } | null;
}) {
  const pixivImages = dom.innerHTML.matchAll(/\[pixivimage:(\d+)]/g);
  for (const match of pixivImages) {
    await mapperPixivImage(match as [string, string]);
  }

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
    const baseUrl = `https://www.pixiv.net/ajax/novel/${nid}/insert_illusts`;
    const url = new URL(baseUrl);
    url.searchParams.set("id[]", `${id}-1`);
    if (lang) {
      url.searchParams.set("lang", lang);
    }
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (userId) {
      headers["x-user-id"] = userId;
    }
    const resp = await fetch(url.href, {
      credentials: "include",
      headers,
      method: "GET",
      mode: "cors",
    });
    const illusts = (await resp.json()) as illusts;
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

/*
/// https://www.pixiv.net/ajax/novel/series/7790652
{
  "error": false,
  "message": "",
  "body": {
    "id": "7790652",
    "userId": "15952588",
    "userName": "\u6653\u7f8e\u7130",
    "profileImageUrl": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_170.png",
    "xRestrict": 1,
    "isOriginal": true,
    "isConcluded": false,
    "genreId": "11",
    "title": "\u4fee\u5973\u83f2\u5a1c\u7684\u5815\u843d\u7b14\u8bb0",
    "caption": "\u91d1\u4e3b\u7238\u7238\u7ea6\u7a3f\uff0c\u7ecf\u540c\u610f\u516c\u5f00\uff0c\u540e\u7eed\u4f1a\u6162\u6162\u66f4\u65b0",
    "publishedContentCount": 5,
    "publishedTotalCharacterCount": 18249,
    "lastPublishedContentTimestamp": 1635067900,
    "createdTimestamp": 1630857760,
    "updatedTimestamp": 1635067900,
    "createDate": "2021-09-06T01:02:40+09:00",
    "updateDate": "2021-10-24T18:31:40+09:00",
    "firstNovelId": "15963004",
    "latestNovelId": "16283900",
    "displaySeriesContentCount": 5,
    "shareText": "[R-18] \u4fee\u5973\u83f2\u5a1c\u7684\u5815\u843d\u7b14\u8bb0 | \u6653\u7f8e\u7130 #pixiv",
    "total": 5,
    "firstEpisode": {
      "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/09/06/01/03/54/15963004_88cc0e6778d0185770df3bf5cecb2a81_master1200.jpg"
    },
    "watchCount": null,
    "isWatched": false,
    "isNotifying": false,
    "hasGlossary": false,
    "extraData": {
      "meta": {
        "title": "\u0022\u4fee\u5973\u83f2\u5a1c\u7684\u5815\u843d\u7b14\u8bb0\u0022/\u0022\u6653\u7f8e\u7130\u0022 Series [pixiv]",
        "description": "\u91d1\u4e3b\u7238\u7238\u7ea6\u7a3f\uff0c\u7ecf\u540c\u610f\u516c\u5f00\uff0c\u540e\u7eed\u4f1a\u6162\u6162\u66f4\u65b0",
        "canonical": "https://www.pixiv.net/novel/series/7790652",
        "ogp": {
          "type": "article",
          "title": "\u0022\u4fee\u5973\u83f2\u5a1c\u7684\u5815\u843d\u7b14\u8bb0\u0022/\u0022\u6653\u7f8e\u7130\u0022 Series [pixiv]",
          "description": "\u91d1\u4e3b\u7238\u7238\u7ea6\u7a3f\uff0c\u7ecf\u540c\u610f\u516c\u5f00\uff0c\u540e\u7eed\u4f1a\u6162\u6162\u66f4\u65b0",
          "image": "https://embed.pixiv.net/novel_series.php?id=7790652\u0026mdate=20211024183140"
        },
        "twitter": {
          "card": "summary_large_image",
          "site": "@pixiv",
          "title": "[R-18] \u4fee\u5973\u83f2\u5a1c\u7684\u5815\u843d\u7b14\u8bb0",
          "description": "\u91d1\u4e3b\u7238\u7238\u7ea6\u7a3f\uff0c\u7ecf\u540c\u610f\u516c\u5f00\uff0c\u540e\u7eed\u4f1a\u6162\u6162\u66f4\u65b0",
          "image": "https://embed.pixiv.net/novel_series.php?id=7790652\u0026mdate=20211024183140"
        }
      }
    },
    "zoneConfig": {
      "header": {
        "url": "https://pixon.ads-pixiv.net/show?zone_id=header\u0026format=js\u0026s=1\u0026up=0\u0026a=28\u0026ng=r\u0026l=en\u0026uri=%2Fajax%2Fnovel%2Fseries%2F_PARAM_\u0026is_spa=1\u0026K=36b607bf7d1b8\u0026ab_test_digits_first=42\u0026uab=21\u0026yuid=NGgVRmI\u0026suid=Pgx30gqxibsesa61i\u0026num=61ac70a9549"
      },
      "footer": {
        "url": "https://pixon.ads-pixiv.net/show?zone_id=footer\u0026format=js\u0026s=1\u0026up=0\u0026a=28\u0026ng=r\u0026l=en\u0026uri=%2Fajax%2Fnovel%2Fseries%2F_PARAM_\u0026is_spa=1\u0026K=36b607bf7d1b8\u0026ab_test_digits_first=42\u0026uab=21\u0026yuid=NGgVRmI\u0026suid=Pgx30gqxiflacc7ox\u0026num=61ac70a9374"
      },
      "responsive": {
        "url": "https://pixon.ads-pixiv.net/show?zone_id=illust_responsive\u0026format=js\u0026s=1\u0026up=0\u0026a=28\u0026ng=r\u0026l=en\u0026uri=%2Fajax%2Fnovel%2Fseries%2F_PARAM_\u0026is_spa=1\u0026K=36b607bf7d1b8\u0026ab_test_digits_first=42\u0026uab=21\u0026yuid=NGgVRmI\u0026suid=Pgx30gqxii5vu37op\u0026num=61ac70a9838"
      },
      "rectangle": {
        "url": "https://pixon.ads-pixiv.net/show?zone_id=illust_rectangle\u0026format=js\u0026s=1\u0026up=0\u0026a=28\u0026ng=r\u0026l=en\u0026uri=%2Fajax%2Fnovel%2Fseries%2F_PARAM_\u0026is_spa=1\u0026K=36b607bf7d1b8\u0026ab_test_digits_first=42\u0026uab=21\u0026yuid=NGgVRmI\u0026suid=Pgx30gqxiklymqvfk\u0026num=61ac70a9891"
      }
    }
  }
}
*/

/*
/// https://www.pixiv.net/ajax/novel/series_content/1510998?limit=30&last_order=30&order_by=asc&lang=en&version=dbd33ea0520571f085dc4ec3561342365b178c7a
{
  "error": false,
  "message": "",
  "body": {
    "tagTranslation": [],
    "thumbnails": {
      "illust": [],
      "novel": [
        {
          "id": "14845068",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0859-60\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/13/17/00/01/14845068_877c2e2f108f376063ff8174a9c73930_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6793,
          "wordCount": 3362,
          "readingTime": 1018,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 131,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-13T17:00:01+09:00",
          "updateDate": "2021-03-13T17:00:01+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14846975",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0861-62\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/13/21/30/00/14846975_dbb6c981f636b99060709f9aa2edb76e_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 5886,
          "wordCount": 3028,
          "readingTime": 882,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 129,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-13T21:30:00+09:00",
          "updateDate": "2021-03-13T21:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14851620",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0863-64\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/14/11/30/01/14851620_4de9e0a9a7140273dfb1e7b84ec3ff6c_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6620,
          "wordCount": 3438,
          "readingTime": 993,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 139,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-14T11:30:00+09:00",
          "updateDate": "2021-03-14T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14853594",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0865-66\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/14/17/00/01/14853594_9e1762dfbf7e669033b57f220c4e23cc_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 5932,
          "wordCount": 2912,
          "readingTime": 889,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 134,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-14T17:00:00+09:00",
          "updateDate": "2021-03-14T17:00:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14859864",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0867-68\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/15/11/30/00/14859864_85427515a992924ed5e0b1f48384aaef_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6015,
          "wordCount": 3019,
          "readingTime": 902,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 131,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-15T11:30:00+09:00",
          "updateDate": "2021-03-15T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14861292",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0869-70\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/15/18/00/01/14861292_54ad485753afbb8f9724a46bde5d2313_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u9b54\u6cd5\u5c11\u5973"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 5710,
          "wordCount": 2983,
          "readingTime": 856,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 132,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-15T18:00:01+09:00",
          "updateDate": "2021-03-15T18:00:01+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14865777",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0871-72\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/16/11/30/00/14865777_f3237c8d2d58062e66932941e6a61f98_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 5830,
          "wordCount": 2777,
          "readingTime": 874,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 138,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-16T11:30:00+09:00",
          "updateDate": "2021-03-16T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14867105",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0873-74\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/16/18/00/01/14867105_59ef2e837489da0efd80f72174c82b55_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6210,
          "wordCount": 2889,
          "readingTime": 931,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 115,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-16T18:00:01+09:00",
          "updateDate": "2021-03-16T18:00:01+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14871443",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0875-76\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/17/11/30/00/14871443_06ac43c61fdb5285a51cdb1155702dbc_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6202,
          "wordCount": 2882,
          "readingTime": 930,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 140,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-17T11:30:00+09:00",
          "updateDate": "2021-03-17T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14909317",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0877-82\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/23/11/30/00/14909317_7d69dab609f5f488965a52433343224f_master1200.jpg",
          "tags": [
            "R-18",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "TS",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 17935,
          "wordCount": 8813,
          "readingTime": 2690,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 180,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-23T11:30:00+09:00",
          "updateDate": "2021-03-23T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14914622",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0883-84\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/24/11/30/00/14914622_bc55a04ad26044b5e54a2ff13deb4658_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u9ed1\u517d",
            "\u957f\u7bc7"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 7008,
          "wordCount": 3674,
          "readingTime": 1051,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 184,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-24T11:30:00+09:00",
          "updateDate": "2021-03-24T20:53:12+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14919987",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0885-86\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/25/11/30/00/14919987_37a7bd91c188c0af7a4f6c046f65ef2d_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9053\u5177",
            "\u8c03\u6559",
            "\u9ed1\u517d"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6431,
          "wordCount": 3330,
          "readingTime": 964,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 165,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-25T11:30:00+09:00",
          "updateDate": "2021-03-25T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14925359",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0887-88\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/26/11/30/00/14925359_d61eec3c0c379fb434b228a4d958783a_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7",
            "\u9ed1\u517d"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 5578,
          "wordCount": 2945,
          "readingTime": 836,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 157,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-26T11:30:00+09:00",
          "updateDate": "2021-03-26T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14931457",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0889-90\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/27/11/30/00/14931457_ae215959a1424fb8fdec6ea436a3c271_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u8c03\u6559",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6201,
          "wordCount": 3357,
          "readingTime": 930,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 174,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-27T11:30:00+09:00",
          "updateDate": "2021-03-27T11:30:00+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "14992263",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0891-94\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/04/05/17/47/16/14992263_a99da952c2fd91814116558b4baead29_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 13087,
          "wordCount": 6801,
          "readingTime": 1963,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 188,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-04-05T17:47:16+09:00",
          "updateDate": "2021-04-05T17:47:16+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "15043895",
          "title": " \u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0895-100\uff09\uff08\u7b2c\u4e09\u5377\u5b8c\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/04/14/21/07/49/15043895_deab25fc4e3252a6c92e1e76fff911a8_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d",
            "\u8c03\u6559"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 17262,
          "wordCount": 8965,
          "readingTime": 2589,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 315,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-04-14T21:07:49+09:00",
          "updateDate": "2021-04-14T21:07:49+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17162315",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08101-102\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/09/22/16/36/17162315_99b708ef96f6eda402db3ef6cb1b3411_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 7863,
          "wordCount": 4172,
          "readingTime": 1179,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 255,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-09T22:16:36+09:00",
          "updateDate": "2022-03-09T22:16:36+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17174495",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08103-104\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/11/23/54/08/17174495_b224e4a22b0487f8adc79e76a22ee92a_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 8103,
          "wordCount": 4246,
          "readingTime": 1215,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 204,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-11T23:54:08+09:00",
          "updateDate": "2022-03-11T23:54:08+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17186563",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08105-106\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/13/17/11/24/17186563_f878753bd65bb56566a537eff74421f5_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u65e0\u9650",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6308,
          "wordCount": 3301,
          "readingTime": 946,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 184,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-13T17:11:24+09:00",
          "updateDate": "2022-03-13T17:11:24+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17193909",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08107-111\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/14/16/01/05/17193909_a699f4d2aafa828b52bb7928a6d72477_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c",
            "\u65e0\u9650"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 17952,
          "wordCount": 8375,
          "readingTime": 2692,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 186,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-14T16:01:05+09:00",
          "updateDate": "2022-03-14T16:01:05+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17193916",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08112-114\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/14/16/02/51/17193916_43b986c3443f7251c9bbad7b5b1dbafd_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 9853,
          "wordCount": 4904,
          "readingTime": 1477,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 177,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-14T16:02:51+09:00",
          "updateDate": "2022-03-14T16:02:51+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17193923",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08115-116\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/14/16/04/24/17193923_96b2e6b5508f373dd1504454ddd4448d_master1200.jpg",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c",
            "\u6076\u5815"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6619,
          "wordCount": 2908,
          "readingTime": 992,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 301,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-14T16:04:24+09:00",
          "updateDate": "2022-03-14T16:04:24+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "17218544",
          "title": "\u7b2c\u4e00\u767e\u4e00\u5341\u4e03\u7ae0  \u865a\u62df\u4e0e\u73b0\u5b9e",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2022/03/18/18/24/26/17218544_3b63fe016da68090d59724ae1b2a6918_master1200.jpg",
          "tags": [
            "R-18",
            "\u4e2d\u6587",
            "\u8c03\u6559",
            "\u6027\u8f6c",
            "\u5200\u5251\u795e\u57df",
            "\u4e2d\u56fd\u8a9e",
            "\u5c0f\u8aac"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 6620,
          "wordCount": 3089,
          "readingTime": 993,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 639,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2022-03-18T18:24:26+09:00",
          "updateDate": "2022-03-18T18:24:26+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 0
        },
        {
          "id": "19181776",
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08118-119\uff09",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/02/27/11/30/00/14752774_bd1fc41b5990c2ac650ea7b798cea436_master1200.jpg",
          "tags": [
            "R-18",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u6027\u8f6c",
            "TS",
            "\u4e9a\u4e1d\u5a1c",
            "\u6076\u5815",
            "\u6539\u9020"
          ],
          "userId": "37150097",
          "userName": "\u95f2\u8bfb",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2019/01/08/00/46/41/15230976_dc219b51a951405995c5c798320e1be5_50.jpg",
          "textCount": 7809,
          "wordCount": 3464,
          "readingTime": 1171,
          "useWordCount": false,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 383,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2023-01-27T19:08:43+09:00",
          "updateDate": "2023-01-27T19:08:43+09:00",
          "isMasked": false,
          "seriesId": "1510998",
          "seriesTitle": "\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\uff08\u6b63\u7bc7\uff09",
          "isUnlisted": false,
          "aiType": 1
        }
      ],
      "novelSeries": [],
      "novelDraft": []
    },
    "illustSeries": [],
    "requests": [],
    "users": [],
    "page": {
      "seriesContents": [
        {
          "id": "14845068",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 31 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0859-60\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6793,
          "characterCount": 6793,
          "wordCount": 3362,
          "useWordCount": false,
          "readingTime": 1018,
          "bookmarkCount": 131,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/13/17/00/01/14845068_877c2e2f108f376063ff8174a9c73930_master1200.jpg",
          "uploadTimestamp": 1615622401,
          "reuploadTimestamp": 1615622401,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14846975",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 32 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0861-62\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 5886,
          "characterCount": 5886,
          "wordCount": 3028,
          "useWordCount": false,
          "readingTime": 882,
          "bookmarkCount": 129,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/13/21/30/00/14846975_dbb6c981f636b99060709f9aa2edb76e_master1200.jpg",
          "uploadTimestamp": 1615638600,
          "reuploadTimestamp": 1615638600,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14851620",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 33 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0863-64\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6620,
          "characterCount": 6620,
          "wordCount": 3438,
          "useWordCount": false,
          "readingTime": 993,
          "bookmarkCount": 139,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/14/11/30/01/14851620_4de9e0a9a7140273dfb1e7b84ec3ff6c_master1200.jpg",
          "uploadTimestamp": 1615689000,
          "reuploadTimestamp": 1615689000,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14853594",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 34 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0865-66\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u89e6\u624b",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 5932,
          "characterCount": 5932,
          "wordCount": 2912,
          "useWordCount": false,
          "readingTime": 889,
          "bookmarkCount": 134,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/14/17/00/01/14853594_9e1762dfbf7e669033b57f220c4e23cc_master1200.jpg",
          "uploadTimestamp": 1615708800,
          "reuploadTimestamp": 1615708800,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14859864",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 35 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0867-68\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u9b54\u6cd5\u5c11\u5973",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6015,
          "characterCount": 6015,
          "wordCount": 3019,
          "useWordCount": false,
          "readingTime": 902,
          "bookmarkCount": 131,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/15/11/30/00/14859864_85427515a992924ed5e0b1f48384aaef_master1200.jpg",
          "uploadTimestamp": 1615775400,
          "reuploadTimestamp": 1615775400,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14861292",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 36 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0869-70\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u9b54\u6cd5\u5c11\u5973"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 5710,
          "characterCount": 5710,
          "wordCount": 2983,
          "useWordCount": false,
          "readingTime": 856,
          "bookmarkCount": 132,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/15/18/00/01/14861292_54ad485753afbb8f9724a46bde5d2313_master1200.jpg",
          "uploadTimestamp": 1615798801,
          "reuploadTimestamp": 1615798801,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14865777",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 37 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0871-72\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u89e6\u624b",
            "\u8c03\u6559",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 5830,
          "characterCount": 5830,
          "wordCount": 2777,
          "useWordCount": false,
          "readingTime": 874,
          "bookmarkCount": 138,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/16/11/30/00/14865777_f3237c8d2d58062e66932941e6a61f98_master1200.jpg",
          "uploadTimestamp": 1615861800,
          "reuploadTimestamp": 1615861800,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14867105",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 38 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0873-74\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6210,
          "characterCount": 6210,
          "wordCount": 2889,
          "useWordCount": false,
          "readingTime": 931,
          "bookmarkCount": 115,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/16/18/00/01/14867105_59ef2e837489da0efd80f72174c82b55_master1200.jpg",
          "uploadTimestamp": 1615885201,
          "reuploadTimestamp": 1615885201,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14871443",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 39 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0875-76\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6202,
          "characterCount": 6202,
          "wordCount": 2882,
          "useWordCount": false,
          "readingTime": 930,
          "bookmarkCount": 140,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/17/11/30/00/14871443_06ac43c61fdb5285a51cdb1155702dbc_master1200.jpg",
          "uploadTimestamp": 1615948200,
          "reuploadTimestamp": 1615948200,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14909317",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 40 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0877-82\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "TS",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 17935,
          "characterCount": 17935,
          "wordCount": 8813,
          "useWordCount": false,
          "readingTime": 2690,
          "bookmarkCount": 180,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/23/11/30/00/14909317_7d69dab609f5f488965a52433343224f_master1200.jpg",
          "uploadTimestamp": 1616466600,
          "reuploadTimestamp": 1616466600,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14914622",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 41 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0883-84\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u9ed1\u517d",
            "\u957f\u7bc7"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 7008,
          "characterCount": 7008,
          "wordCount": 3674,
          "useWordCount": false,
          "readingTime": 1051,
          "bookmarkCount": 184,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/24/11/30/00/14914622_bc55a04ad26044b5e54a2ff13deb4658_master1200.jpg",
          "uploadTimestamp": 1616553000,
          "reuploadTimestamp": 1616586792,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14919987",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 42 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0885-86\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9053\u5177",
            "\u8c03\u6559",
            "\u9ed1\u517d"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6431,
          "characterCount": 6431,
          "wordCount": 3330,
          "useWordCount": false,
          "readingTime": 964,
          "bookmarkCount": 165,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/25/11/30/00/14919987_37a7bd91c188c0af7a4f6c046f65ef2d_master1200.jpg",
          "uploadTimestamp": 1616639400,
          "reuploadTimestamp": 1616639400,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14925359",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 43 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0887-88\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u957f\u7bc7",
            "\u9ed1\u517d"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 5578,
          "characterCount": 5578,
          "wordCount": 2945,
          "useWordCount": false,
          "readingTime": 836,
          "bookmarkCount": 157,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/26/11/30/00/14925359_d61eec3c0c379fb434b228a4d958783a_master1200.jpg",
          "uploadTimestamp": 1616725800,
          "reuploadTimestamp": 1616725800,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14931457",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 44 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0889-90\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u8c03\u6559",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6201,
          "characterCount": 6201,
          "wordCount": 3357,
          "useWordCount": false,
          "readingTime": 930,
          "bookmarkCount": 174,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/03/27/11/30/00/14931457_ae215959a1424fb8fdec6ea436a3c271_master1200.jpg",
          "uploadTimestamp": 1616812200,
          "reuploadTimestamp": 1616812200,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "14992263",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 45 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0891-94\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 13087,
          "characterCount": 13087,
          "wordCount": 6801,
          "useWordCount": false,
          "readingTime": 1963,
          "bookmarkCount": 188,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/04/05/17/47/16/14992263_a99da952c2fd91814116558b4baead29_master1200.jpg",
          "uploadTimestamp": 1617612436,
          "reuploadTimestamp": 1617612436,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "15043895",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 46 },
          "title": " \u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff0895-100\uff09\uff08\u7b2c\u4e09\u5377\u5b8c\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u9ed1\u517d",
            "\u8c03\u6559"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 17262,
          "characterCount": 17262,
          "wordCount": 8965,
          "useWordCount": false,
          "readingTime": 2589,
          "bookmarkCount": 315,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/04/14/21/07/49/15043895_deab25fc4e3252a6c92e1e76fff911a8_master1200.jpg",
          "uploadTimestamp": 1618402069,
          "reuploadTimestamp": 1618402069,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17162315",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 47 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08101-102\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 7863,
          "characterCount": 7863,
          "wordCount": 4172,
          "useWordCount": false,
          "readingTime": 1179,
          "bookmarkCount": 255,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/09/22/16/36/17162315_99b708ef96f6eda402db3ef6cb1b3411_master1200.jpg",
          "uploadTimestamp": 1646831796,
          "reuploadTimestamp": 1646831796,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17174495",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 48 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08103-104\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 8103,
          "characterCount": 8103,
          "wordCount": 4246,
          "useWordCount": false,
          "readingTime": 1215,
          "bookmarkCount": 204,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/11/23/54/08/17174495_b224e4a22b0487f8adc79e76a22ee92a_master1200.jpg",
          "uploadTimestamp": 1647010448,
          "reuploadTimestamp": 1647010448,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17186563",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 49 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08105-106\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u65e0\u9650",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6308,
          "characterCount": 6308,
          "wordCount": 3301,
          "useWordCount": false,
          "readingTime": 946,
          "bookmarkCount": 184,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/13/17/11/24/17186563_f878753bd65bb56566a537eff74421f5_master1200.jpg",
          "uploadTimestamp": 1647159084,
          "reuploadTimestamp": 1647159084,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17193909",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 50 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08107-111\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c",
            "\u65e0\u9650"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 17952,
          "characterCount": 17952,
          "wordCount": 8375,
          "useWordCount": false,
          "readingTime": 2692,
          "bookmarkCount": 186,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/14/16/01/05/17193909_a699f4d2aafa828b52bb7928a6d72477_master1200.jpg",
          "uploadTimestamp": 1647241265,
          "reuploadTimestamp": 1647241265,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17193916",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 51 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08112-114\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u65e0\u9650",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 9853,
          "characterCount": 9853,
          "wordCount": 4904,
          "useWordCount": false,
          "readingTime": 1477,
          "bookmarkCount": 177,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/14/16/02/51/17193916_43b986c3443f7251c9bbad7b5b1dbafd_master1200.jpg",
          "uploadTimestamp": 1647241371,
          "reuploadTimestamp": 1647241371,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17193923",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 52 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08115-116\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "TS",
            "\u4e2d\u56fd\u8a9e",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u6027\u8f6c",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u4e9a\u4e1d\u5a1c",
            "\u6076\u5815"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6619,
          "characterCount": 6619,
          "wordCount": 2908,
          "useWordCount": false,
          "readingTime": 992,
          "bookmarkCount": 301,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/14/16/04/24/17193923_96b2e6b5508f373dd1504454ddd4448d_master1200.jpg",
          "uploadTimestamp": 1647241464,
          "reuploadTimestamp": 1647241464,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "17218544",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 53 },
          "title": "\u7b2c\u4e00\u767e\u4e00\u5341\u4e03\u7ae0  \u865a\u62df\u4e0e\u73b0\u5b9e",
          "commentHtml": "",
          "tags": [
            "R-18",
            "\u4e2d\u6587",
            "\u8c03\u6559",
            "\u6027\u8f6c",
            "\u5200\u5251\u795e\u57df",
            "\u4e2d\u56fd\u8a9e",
            "\u5c0f\u8aac"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 6620,
          "characterCount": 6620,
          "wordCount": 3089,
          "useWordCount": false,
          "readingTime": 993,
          "bookmarkCount": 639,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2022/03/18/18/24/26/17218544_3b63fe016da68090d59724ae1b2a6918_master1200.jpg",
          "uploadTimestamp": 1647595466,
          "reuploadTimestamp": 1647595466,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 0
        },
        {
          "id": "19181776",
          "userId": "37150097",
          "series": { "id": 1510998, "viewableType": 0, "contentOrder": 54 },
          "title": "\u3010\u65e0\u9650\u4e4b\u6deb\u795e\u7684\u8bc5\u5492\u3011\uff08118-119\uff09",
          "commentHtml": "",
          "tags": [
            "R-18",
            "\u4e2d\u6587",
            "\u5c0f\u8aac",
            "\u8c03\u6559",
            "\u5200\u5251\u795e\u57df",
            "\u6027\u8f6c",
            "TS",
            "\u4e9a\u4e1d\u5a1c",
            "\u6076\u5815",
            "\u6539\u9020"
          ],
          "restrict": 0,
          "xRestrict": 1,
          "isOriginal": false,
          "textLength": 7809,
          "characterCount": 7809,
          "wordCount": 3464,
          "useWordCount": false,
          "readingTime": 1171,
          "bookmarkCount": 383,
          "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/02/27/11/30/00/14752774_bd1fc41b5990c2ac650ea7b798cea436_master1200.jpg",
          "uploadTimestamp": 1674814123,
          "reuploadTimestamp": 1674814123,
          "isBookmarkable": true,
          "bookmarkData": null,
          "aiType": 1
        }
      ]
    }
  }
}
*/

/*
/// https://www.pixiv.net/ajax/novel/series_content/1407757?limit=10&last_order=10&order_by=asc&lang=en
{
  "error": false,
  "message": "",
  "body": {
    "seriesContents": [
      {
        "id": "13819848",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 11 },
        "title": "\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK44-47\u8bdd",
        "commentHtml": "",
        "tags": ["JK", "\u4e2d\u56fd\u8a9e", "\u559c\u5267", "\u767e\u5408"],
        "restrict": 0,
        "xRestrict": 0,
        "isOriginal": false,
        "textLength": 9610,
        "bookmarkCount": 59,
        "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2020/09/30/17/40/33/13819848_bc3ebd665e4fee4c5ac94fef81230b72_master1200.jpg",
        "uploadTimestamp": 1601455233,
        "reuploadTimestamp": 1624590382,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "15487474",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 12 },
        "title": "\u66f4\u65b048\u8bdd",
        "commentHtml": "",
        "tags": [
          "R-18",
          "\u767e\u5408",
          "\u641e\u7b11",
          "\u53cc\u5934\u9f99",
          "\u5947\u5e7b",
          "\u8f6c\u751f"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 5996,
        "bookmarkCount": 67,
        "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/06/25/01/02/42/15487474_c76e4e0545218ebef3aaa0c71ade7598_master1200.jpg",
        "uploadTimestamp": 1624550562,
        "reuploadTimestamp": 1624550562,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "15552479",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 13 },
        "title": "\u65b049\u8bdd",
        "commentHtml": "",
        "tags": ["R-18", "\u7ffb\u8bd1", "JK", "TS", "\u559c\u5267"],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 2759,
        "bookmarkCount": 47,
        "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/07/05/11/31/56/15552479_5efa1fc3feb38f107211248e3a0cc6b4_master1200.jpg",
        "uploadTimestamp": 1625452316,
        "reuploadTimestamp": 1625452316,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "16460435",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 14 },
        "title": "\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK-50\u8bdd",
        "commentHtml": "",
        "tags": ["R-18", "JK", "\u559c\u5267", "\u767e\u5408", "\u8f6c\u751f"],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 2865,
        "bookmarkCount": 36,
        "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2021/11/21/17/49/24/16460435_42fa6f4500d086c497373e3fe3d60920_master1200.jpg",
        "uploadTimestamp": 1637484564,
        "reuploadTimestamp": 1637484564,
        "isBookmarkable": true,
        "bookmarkData": null
      }
    ]
  }
}
*/

/*
/// https://www.pixiv.net/novel/show.php?id=16127661
/// preload-data
{
  "timestamp": "2021-12-05T16:42:29+09:00",
  "novel": {
    "15963004": {
      "bookmarkCount": 773,
      "commentCount": 1,
      "markerCount": 21,
      "createDate": "2021-09-05T16:03:54+00:00",
      "uploadDate": "2021-09-05T16:03:54+00:00",
      "description": "金主爸爸约稿，经同意公开，这是第一章试读，后续会慢慢更新。&lt;br /&gt;约稿可加主页的QQ。",
      "id": "15963004",
      "title": "第一章 触手怪被幼女强奸了！",
      "likeCount": 702,
      "pageCount": "1",
      "userId": "15952588",
      "userName": "晓美焰",
      "viewCount": 5579,
      "isOriginal": true,
      "isBungei": false,
      "xRestrict": 1,
      "restrict": 0,
      "content": "……………………",
      "coverUrl": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/09/06/01/03/54/15963004_88cc0e6778d0185770df3bf5cecb2a81_master1200.jpg",
      "suggestedSettings": {
        "viewMode": 2,
        "themeBackground": 0,
        "themeSize": null,
        "themeSpacing": null
      },
      "isBookmarkable": true,
      "bookmarkData": null,
      "likeData": false,
      "pollData": null,
      "marker": null,
      "tags": {
        "authorId": "15952588",
        "isLocked": false,
        "tags": [
          {
            "tag": "R-18",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "百合",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "扶她",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "乳汁",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "触手",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "触手服",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          },
          {
            "tag": "精液中出",
            "locked": true,
            "deletable": false,
            "userId": "15952588",
            "userName": "晓美焰"
          }
        ],
        "writable": true
      },
      "seriesNavData": {
        "seriesType": "novel",
        "seriesId": 7790652,
        "title": "修女菲娜的堕落笔记",
        "isConcluded": false,
        "isReplaceable": false,
        "isWatched": false,
        "isNotifying": false,
        "order": 1,
        "next": {
          "title": "第二章 我是你姐姐，你是我妈妈",
          "order": 2,
          "id": "15994824",
          "available": true
        },
        "prev": null
      },
      "descriptionBoothId": null,
      "descriptionYoutubeId": null,
      "comicPromotion": null,
      "fanboxPromotion": null,
      "contestBanners": [],
      "contestData": null,
      "request": null,
      "imageResponseOutData": [],
      "imageResponseData": [],
      "imageResponseCount": 0,
      "userNovels": {
        "16486822": null,
        "16482303": null,
        "16450358": null,
        "16387812": null,
        "16387791": null,
        "16329813": null,
        "16283920": null,
        "16283900": null,
        "16041882": null,
        "16029553": null,
        "16006997": null,
        "15994824": {
          "id": "15994824",
          "title": "第二章 我是你姐姐，你是我妈妈",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/09/11/05/22/48/15994824_de28d1b6bea1be5b14a7a3ffe3a3ed25_master1200.jpg",
          "tags": [
            "R-18",
            "百合",
            "扶她",
            "乳汁",
            "触手",
            "触手服",
            "精液中出",
            "怀孕",
            "母女",
            "魔物娘"
          ],
          "userId": "15952588",
          "userName": "晓美焰",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_50.png",
          "textCount": 3576,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": null,
          "isOriginal": true,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-09-11T05:22:48+09:00",
          "updateDate": "2021-09-11T05:22:48+09:00",
          "isMasked": false,
          "seriesId": "7790652",
          "seriesTitle": "修女菲娜的堕落笔记",
          "isUnlisted": false
        },
        "15963004": {
          "id": "15963004",
          "title": "第一章 触手怪被幼女强奸了！",
          "xRestrict": 1,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/09/06/01/03/54/15963004_88cc0e6778d0185770df3bf5cecb2a81_master1200.jpg",
          "tags": [
            "R-18",
            "百合",
            "扶她",
            "乳汁",
            "触手",
            "触手服",
            "精液中出"
          ],
          "userId": "15952588",
          "userName": "晓美焰",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_50.png",
          "textCount": 2664,
          "description": "金主爸爸约稿，经同意公开，这是第一章试读，后续会慢慢更新。&lt;br /&gt;约稿可加主页的QQ。",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": 773,
          "isOriginal": true,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-09-06T01:03:54+09:00",
          "updateDate": "2021-09-06T01:03:54+09:00",
          "isMasked": false,
          "seriesId": "7790652",
          "seriesTitle": "修女菲娜的堕落笔记",
          "isUnlisted": false
        },
        "14779754": {
          "id": "14779754",
          "title": "第八章 控制塔",
          "xRestrict": 0,
          "restrict": 0,
          "url": "https://i.pximg.net/c/600x600/novel-cover-master/img/2021/03/03/01/12/44/14779754_325ee3378db5994b2052daccc3000a4f_master1200.jpg",
          "tags": [
            "乳汁",
            "性转",
            "扶她",
            "百合",
            "科幻",
            "触手",
            "触手服",
            "魔物娘"
          ],
          "userId": "15952588",
          "userName": "晓美焰",
          "profileImageUrl": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_50.png",
          "textCount": 4557,
          "description": "",
          "isBookmarkable": true,
          "bookmarkData": null,
          "bookmarkCount": null,
          "isOriginal": false,
          "marker": null,
          "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
          "createDate": "2021-03-03T01:12:44+09:00",
          "updateDate": "2021-03-03T01:12:44+09:00",
          "isMasked": false,
          "seriesId": "1515376",
          "seriesTitle": "奴隶开局真是糟透了",
          "isUnlisted": false
        },
        "14779714": null,
        "14779704": null,
        "14779693": null,
        "14779680": null,
        "14779669": null,
        "14779653": null,
        "14779645": null,
        "14011849": null,
        "14011844": null
      },
      "hasGlossary": false,
      "zoneConfig": {
        "responsive": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=illust_responsive&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=r&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976h4vgyr46&amp;num=61ac6d6578"
        },
        "rectangle": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=illust_rectangle&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=r&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976lgtzcqln&amp;num=61ac6d6549"
        },
        "500x500": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=bigbanner&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=g&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976o0k8eiim&amp;num=61ac6d65685"
        },
        "header": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=header&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=r&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976q84w4mhl&amp;num=61ac6d65150"
        },
        "footer": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=footer&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=r&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976serjdax4&amp;num=61ac6d65233"
        },
        "expandedFooter": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=multiple_illust_viewer&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=g&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976v4ye5pg7&amp;num=61ac6d65357"
        },
        "logo": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=logo_side&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=r&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx302976yuxzaxj2&amp;num=61ac6d65272"
        },
        "relatedworks": {
          "url": "https://pixon.ads-pixiv.net/show?zone_id=relatedworks&amp;format=js&amp;s=1&amp;up=0&amp;a=28&amp;ng=g&amp;l=en&amp;uri=%2Fnovel%2Fshow.php&amp;is_spa=1&amp;K=36b607bf7d1b8&amp;ab_test_digits_first=42&amp;uab=21&amp;yuid=NGgVRmI&amp;suid=Pgx3029772lvv54if&amp;num=61ac6d65553"
        }
      },
      "extraData": {
        "meta": {
          "title": "[R-18] #1 第一章 触手怪被幼女强奸了！ | 修女菲娜的堕落笔记 - Novel series by 晓美焰 - pixiv",
          "description": "\"第一章 触手怪被幼女强奸了！\" is episode no. 1 of the novel series \"修女菲娜的堕落笔记\". It includes tags such as \"百合\", \"乳汁\" and more.\n金主爸爸约稿，经同意公开，这是第一章试读，后续会慢慢更新。\n约稿可加主页的QQ。",
          "canonical": "https://www.pixiv.net/novel/show.php?id=15963004",
          "descriptionHeader": "The Works \"第一章 触手怪被幼女强奸了！\" includes tags such as \"R-18\", \"百合\" and more.",
          "ogp": {
            "description": "金主爸爸约稿，经同意公开，这是第一章试读，后续会慢慢更新。\n约稿可加主页的QQ。",
            "image": "https://embed.pixiv.net/novel.php?id=15963004&amp;mdate=20210906010354",
            "title": "[R-18] #1 第一章 触手怪被幼女强奸了！ | 修女菲娜的堕落笔记 - Novel series by 晓美焰 - pixiv",
            "type": "article"
          },
          "twitter": {
            "description": "金主爸爸约稿，经同意公开，这是第一章试读，后续会慢慢更新。\n约稿可加主页的QQ。",
            "image": "https://embed.pixiv.net/novel.php?id=15963004&amp;mdate=20210906010354",
            "title": "[R-18] 第一章 触手怪被幼女强奸了！",
            "card": "summary_large_image"
          }
        }
      },
      "titleCaptionTranslation": { "workTitle": null, "workCaption": null },
      "isUnlisted": false,
      "language": "zh-cn",
      "textEmbeddedImages": null,
      "commentOff": 0
    }
  },
  "user": {
    "15952588": {
      "userId": "15952588",
      "name": "晓美焰",
      "image": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_50.png",
      "imageBig": "https://i.pximg.net/user-profile/img/2016/07/30/07/25/53/11269349_e1361db77d01968338db6f33d860efb5_170.png",
      "premium": false,
      "isFollowed": true,
      "isMypixiv": false,
      "isBlocking": false,
      "background": null,
      "sketchLiveId": null,
      "partial": 0,
      "acceptRequest": true,
      "sketchLives": []
    }
  }
}
*/

// await fetch("https://www.pixiv.net/ajax/linked_service/tumeng", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0",
//         "Accept": "application/json",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://www.pixiv.net/novel/show.php?id=9381850",
//     "method": "GET",
//     "mode": "cors"
// });

interface tumeng {
  error: false;
  message: string;
  body: {
    page: {
      user: {
        id: string;
        name: string;
        comment: string;
        profileImageUrl: string;
        followerCount: number;
        linkState: string;
        updateDatetime: null;
        enableCustomProfile: boolean;
        customProfile: null;
        profileImageConfigured: boolean;
        meta: {
          f0: boolean;
        };
      };
      works: [];
      totalItemCount: number;
    };
    tagTranslation: [];
    thumbnails: {
      illust: [];
      novel: [];
      novelSeries: [];
      novelDraft: [];
    };
    illustSeries: [];
    requests: [];
    users: [];
  };
}

// await fetch("https://www.pixiv.net/ajax/novel/9381850/insert_illusts?id%5B%5D=67841765-1&lang=en", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0",
//         "Accept": "application/json",
//         "Accept-Language": "en-US,en;q=0.5",
//         "x-user-id": "xxxxxxx",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://www.pixiv.net/novel/show.php?id=9381850",
//     "method": "GET",
//     "mode": "cors"
// });

interface illustTag {
  tag: string;
  userId: string;
}

interface illusts {
  error: boolean;
  message: string;
  body: {
    [index: string]: {
      visible: boolean;
      unavailableType: null;
      illust: {
        title: string;
        description: string;
        restrict: number;
        xRestrict: number;
        sl: number;
        tags: illustTag[];
        images: {
          small: string;
          medium: string;
          original: string;
        };
      };
      user: {
        id: string;
        name: string;
        image: string;
      };
      id: string;
      page: number;
    };
  };
}
