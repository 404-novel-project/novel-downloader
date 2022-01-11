import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

export class Pixiv extends BaseRuleClass {
  public constructor() {
    super();
    this.imageMode = "TM";
  }

  public async bookParse() {
    const self = this;
    const _lang = document.documentElement.getAttribute("lang");
    const lang: Record<string, string> = _lang ? { lang: _lang } : {};
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
      const obj = await getPreloadData(document.location.href, self.charset);
      if (obj) {
        const { novel } = obj;
        if (novel) {
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
    }
    if (!bookG) {
      throw new Error("初始化图书信息失败！");
    }
    return bookG;

    async function series(id: number) {
      const seriesMetaBody = await getSeriesMeta(id);
      if (seriesMetaBody) {
        const bookUrl = "https://www.pixiv.net/novel/series/" + id.toString();
        const bookname = seriesMetaBody.title;
        const author = seriesMetaBody.userName;
        const introduction = seriesMetaBody.caption;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;

        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = seriesMetaBody.firstEpisode.url;
        if (coverUrl) {
          getImageAttachment(coverUrl, self.imageMode, "cover-")
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
          const chapterName = `#${sc.series.contentOrder} ${sc.title}`;
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
          chapters.push(chapter);
        }

        const book = new Book({
          bookUrl,
          bookname,
          author,
          introduction,
          introductionHTML,
          additionalMetadate,
          chapters,
        });
        return book;
      }
    }
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
      if (tumeng.error === false) {
        return tumeng.body.page.user.id;
      }
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
      if (seriesMeta.error === false) {
        return seriesMeta.body;
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
        url: "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg";
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
            seriesContents: SeriesContent[];
          };
        }
        const _seriesContents = (await resp.json()) as SeriesContents;
        if (_seriesContents.error === false) {
          seriesContents.push(..._seriesContents.body.seriesContents);
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
        getImageAttachment(coverUrl, self.imageMode, "cover-")
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
      contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
      await loadPixivimage(contentRaw, bookId, _lang, userId);

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

      const book = new Book({
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters,
      });
      return book;
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
    const obj = await getPreloadData(chapterUrl, charset);
    if (obj) {
      const { novel } = obj;
      if (novel) {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
        await loadPixivimage(
          contentRaw,
          options.id,
          options.lang,
          options.userId
        );
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
    return {
      chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
      additionalMetadate: null,
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
  textEmbeddedImages: null;
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

async function loadPixivimage(
  dom: HTMLElement,
  nid: string,
  lang: string | null,
  userId: string | undefined
) {
  const images = dom.innerHTML.matchAll(/\[pixivimage:(\d+)\]/g);
  for (const match of images) {
    await mapper(match as [string, string]);
  }
  return dom;

  async function mapper([str, id]: [string, string]) {
    const imgSrc = await getImage(id);
    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      dom.innerHTML = dom.innerHTML.replaceAll(str, img.outerHTML);
    }
  }
  async function getImage(id: string) {
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
    if (illusts.error === false) {
      const originalUrl = illusts.body[`${id}-1`].illust.images.original;
      return originalUrl;
    } else {
      console.error(`获取插图失败: pixivimage:${id}`);
      return;
    }
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
/// https://www.pixiv.net/ajax/novel/series_content/1407757?limit=10&last_order=0&order_by=asc&lang=en
{
  "error": false,
  "message": "",
  "body": {
    "seriesContents": [
      {
        "id": "12494766",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 1 },
        "title": "\u3010\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK\uff0c\u5982\u6b64\u6b8b\u9177\u73af\u5883\u4e2d\u7684JK\u5374\u662f\u53e6\u4e00\u56de\u4e8b 1-5\u8bdd ",
        "commentHtml": "",
        "tags": [
          "\u7ffb\u8bd1",
          "ts",
          "JK",
          "\u559c\u5267",
          "\u767e\u5408",
          "\u6b3a\u51cc",
          "\u3044\u3058\u3081"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 15608,
        "bookmarkCount": 202,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1583609836,
        "reuploadTimestamp": 1624611733,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12503270",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 2 },
        "title": "\u3010\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK\uff0c\u5982\u6b64\u6b8b\u9177\u73af\u5883\u4e2d\u7684JK\u5374\u662f\u53e6\u4e00\u56de\u4e8b 6-13\u8bdd \u4e00\u90e8\u7ed3\u675f",
        "commentHtml": "",
        "tags": [
          "R-18",
          "\u3044\u3058\u3081",
          "JK",
          "\u5267\u60c5",
          "\u4e2d\u56fd\u8bed",
          "\u767e\u5408",
          "TS"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 15905,
        "bookmarkCount": 118,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1583720807,
        "reuploadTimestamp": 1601829116,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12520190",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 3 },
        "title": "\u3010\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u60f3\u6210\u4e3aJK 14-17\u8bdd",
        "commentHtml": "",
        "tags": [
          "TS",
          "\u4e2d\u56fd\u8bed",
          "\u5267\u60c5",
          "\u6b3a\u51cc",
          "\u767e\u5408",
          "\u7ffb\u8bd1",
          "\u9006\u540e\u5bab",
          "\u641e\u7b11",
          "\u559c\u5267"
        ],
        "restrict": 0,
        "xRestrict": 0,
        "isOriginal": false,
        "textLength": 11941,
        "bookmarkCount": 76,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1583984381,
        "reuploadTimestamp": 1601829146,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12619932",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 4 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 18-23\u8bdd",
        "commentHtml": "",
        "tags": [
          "JK",
          "\u5267\u60c5",
          "\u559c\u5267",
          "\u641e\u7b11",
          "\u4e2d\u56fd\u8a9e",
          "\u7ffb\u8bd1"
        ],
        "restrict": 0,
        "xRestrict": 0,
        "isOriginal": false,
        "textLength": 14473,
        "bookmarkCount": 70,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1585513170,
        "reuploadTimestamp": 1601829130,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12619935",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 5 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 24-28\u8bdd 25\u8bddh\u6682\u7f3a",
        "commentHtml": "",
        "tags": [
          "R-18",
          "\u5267\u60c5",
          "JK",
          "\u7ffb\u8bd1",
          "\u6b3a\u51cc",
          "\u51cc\u8fb1",
          "TS"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 12759,
        "bookmarkCount": 76,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1585513283,
        "reuploadTimestamp": 1624611722,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12620535",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 6 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 29-31\u8bdd H\u56de",
        "commentHtml": "",
        "tags": ["R-18", "TS", "JK", "\u7ffb\u8bd1", "\u4e2d\u56fd\u8a9e"],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 14245,
        "bookmarkCount": 100,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1585534649,
        "reuploadTimestamp": 1624611712,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12744129",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 7 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 32-35\u8bdd  H\u56de",
        "commentHtml": "\u8fd9\u6b21\u662f\u597d\u597d\u7684h\u620f",
        "tags": [
          "R-18",
          "JK",
          "\u4e2d\u56fd\u8a9e",
          "\u4e2d\u6587",
          "\u767e\u5408",
          "\u7ffb\u8bd1",
          "TS",
          "\u591ap",
          "\u9006\u540e\u5bab"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 18752,
        "bookmarkCount": 109,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1587298305,
        "reuploadTimestamp": 1624611701,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "12793602",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 8 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 36-38\u8bdd \u7b97\u6709H\uff1f",
        "commentHtml": "",
        "tags": [
          "R-18",
          "JK",
          "TS",
          "\u767e\u5408",
          "\u591ap",
          "\u4e2d\u56fd\u8bed",
          "\u7ffb\u8bd1"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 9716,
        "bookmarkCount": 75,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1587918872,
        "reuploadTimestamp": 1624611687,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "13118198",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 9 },
        "title": "\u3010web\u7ffb\u8bd1\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 39-41\u8bdd",
        "commentHtml": "\u5267\u60c5\u7ae0 \u4e0b\u8bdd\u5f00\u59cb\u8089",
        "tags": [
          "R-18",
          "JK",
          "\u4e2d\u6587",
          "\u641e\u7b11",
          "\u6b3a\u51cc",
          "\u7ffb\u8bd1",
          "\u767e\u5408"
        ],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 10568,
        "bookmarkCount": 84,
        "url": "https://s.pximg.net/common/images/novel_thumb/novel_thumb_5_s.jpg",
        "uploadTimestamp": 1591847002,
        "reuploadTimestamp": 1624590416,
        "isBookmarkable": true,
        "bookmarkData": null
      },
      {
        "id": "13596451",
        "userId": "3475140",
        "series": { "id": 1407757, "viewableType": 0, "contentOrder": 10 },
        "title": "\u3010H\u5927\u7ae0\u3011\u867d\u7136\u4e5f\u66fe\u68a6\u60f3\u6210\u4e3aJK 42-43\u8bdd \u590d\u66f4\u4e86\uff01\u8865\u5145\u4e86\u5fd8\u8bb0\u768442\u8bdd ",
        "commentHtml": "",
        "tags": ["R-18", "TS", "JK", "\u8c03\u6559", "loli"],
        "restrict": 0,
        "xRestrict": 1,
        "isOriginal": false,
        "textLength": 11043,
        "bookmarkCount": 94,
        "url": "https://i.pximg.net/c/150x150_80/novel-cover-master/img/2020/08/26/01/27/27/13596451_e4a7814cce7c22da447fd4204f483c07_master1200.jpg",
        "uploadTimestamp": 1598372847,
        "reuploadTimestamp": 1624590345,
        "isBookmarkable": true,
        "bookmarkData": null
      }
    ]
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
