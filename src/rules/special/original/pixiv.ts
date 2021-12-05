import { getImageAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { log } from "../../../log";
import {
  Book,
  BookAdditionalMetadate,
  Chapter,
  ChapterAdditionalMetadate,
  Status,
} from "../../../main";
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
        const { preloadData, novel, user } = obj;
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
          const chapter = new Chapter(
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            false,
            false,
            null,
            null,
            null,
            self.chapterParse,
            self.charset,
            { id: sc.id }
          );
          chapters.push(chapter);
        }

        const book = new Book(
          bookUrl,
          bookname,
          author,
          introduction,
          introductionHTML,
          additionalMetadate,
          chapters
        );
        return book;
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
      let lastOrder: number = 0;
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
      additionalMetadate.languages = novel.language;

      const chapterUrl = bookUrl;
      const chapterName = bookname;
      const chapter = new Chapter(
        bookUrl,
        bookname,
        chapterUrl,
        1,
        chapterName,
        false,
        false,
        null,
        null,
        null,
        self.chapterParse,
        self.charset,
        {}
      );
      const contentRaw = document.createElement("div");
      contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
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

      const book = new Book(
        bookUrl,
        bookname,
        author,
        introduction,
        introductionHTML,
        additionalMetadate,
        chapters
      );
      return book;
    }
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    const obj = await getPreloadData(chapterUrl, charset);
    if (obj) {
      const { preloadData, novel, user } = obj;
      if (novel) {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
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
      "content": "　　“呜……又被分配到这种完全没有难度的委托了，到底什么时候才能把我当成大人呀。”\n\n　　通往乡村的小道上，身穿洁白修女服的年幼修女，纤细双腿包裹在白丝裤袜之中，雪糕玉足被一双简单到只有几根绑带的高跟凉鞋束缚，小小的脚趾尖端隔着丝袜透出粉红色，泛着珍珠般的质感，支撑起年幼修女不到30KG的轻盈娇躯。\n\n　　两条银发双马尾不时拂过幼年修女紧致的小翘臀，紫色双眸望向远方隐约可见的村落，一直紧抿的幼女樱唇终于翘起一抹弧度。\n\n　　“太好了，终于在太阳下山前赶到任务地点。”\n\n　　菲娜手中紧握可爱的粉色魔杖，迈着白丝幼女玉足奔向远处的小山村，圣白的修女服相当轻薄，逆光下似乎能透过布料看到修女服里上身真空的幼嫩身躯，不经意间被吹起的下摆证明了这点，修女服下的幼女只穿着一条无暇的白丝裤袜。\n\n　　教会的小修女菲娜，今年刚满**岁，被派到这座偏远的村庄调查村民频繁失踪事件，认为这是简单任务的菲娜独自一人上路，毕竟村民被野兽袭击叼走的事件常有发生，而山林中的猛兽在菲娜的魔法面前不堪一击。\n\n　　菲娜经过村口的小路，小巧的鼻尖忽然闻到一股怪异的甜腻气味，吸入身体之后心跳似乎加快了不少，附近异常安静，也没有看见耕作的村民。\n\n　　察觉到不对劲的菲娜紧握着小魔杖，白丝幼足坚定地踏入村庄，村子内部宁静祥和，小孩与老人坐在屋檐下安逸地晒着太阳，年轻村民四处走动，像是在忙活什么。\n\n　　鼻尖弥漫的甜腻气味愈来愈浓烈，幼年修女不由自主夹紧了发育良好的圆润大腿，紧贴着白丝裤袜的白虎肉唇溢出一丝晶莹的蜜液，濡湿裤袜后又吸附在肥嫩的骆驼趾上，勾勒出幼女阴户那诱人犯罪的嫩白形状。\n\n　　“这里的人……都好奇怪。”\n\n　　菲娜一路走到村子中央，发现这里的村民只是走来走去，装出一副忙碌的景象，就像是游戏里充当背景板的NPC，很诡异的出现在现实中。\n\n　　找到村长家后，菲娜小心翼翼敲门，里面无人回应，正当她转身要走，一直带着湿润气息的手突然搭上她稚嫩的肩膀，菲娜吓得急忙跳开，转身发现一个成熟的大姐姐将手收到袖子中，亲切的看着她。\n\n　　菲娜想询问刚才那种令她感到不舒服的湿润感觉，大姐姐却自顾自地抬起手只想村子的后山，“你是教会派来调查失踪事件的人吧，我是这座村子的村长，那些失踪的村民在出事前都去过后山，你应该去那里调查一下。”\n\n　　僵硬的语气就像是在捧读，菲娜点了点头，虽然目前为止不明白发生了什么，但教会的委托必须完成，大不了发现无法应对的危险之后再呼叫支援，教会里的强者能短时间内赶到这里。\n\n　　年幼修女迈向后山，就在她迈出村子的那一刻，整个村庄里的村民瞬间消失不见，只留下一地诡异的粘稠液体……\n\n　　“呜……这里的奇怪气味越来越浓厚了。”\n\n　　靠近后山，长时间吸入那种甜腻的气味让菲娜白嫩的肌肤泛起淡粉颜色，身体中的血流速度加快，心跳噗通噗通的，平坦的小腹中更是燃烧着一团火苗，蜜液已经把大腿内侧的裤袜完全濡湿，紧闭的白虎幼唇在前端探出一粒粉红，与白丝裤袜的摩擦让这具幼嫩身躯开始散发雌性荷尔蒙的气息。\n\n　　“呀——！”\n\n　　菲娜忽然脚下一滑，双脚踩在仿佛活物的地面上，挺翘的小屁股重重压到地上，啪叽溅起的奇怪液体瞬间浸透了白丝裤袜。\n\n　　撑到地面的双手触感软乎乎滑腻腻的，菲娜低头看去，发现地面不知何时覆盖了一层淡粉色的肉壁，四周的山洞褪去伪装，露出了它的真实面目。\n\n　　是触手怪！\n\n　　整个山洞都是由触手怪伪装而成的，蠕动的肉壁上长满了奇形怪状的触手，那些失踪的少女们此刻正被触手吊挂在肉壁上，全身上下的洞穴都在被触手无情侵犯，小腹胀大到堪比临产的孕妇，表情已经完全崩坏，变成了没有自我意识的触手便器。\n\n　　菲娜起身就跑，在教会的禁忌里，就明确告知遇见触手怪的第一应对方法是逃跑，白丝幼女的绑带凉鞋在逃跑过程中滑飞了出去，因为太紧张，以至于连魔杖掉在了原地都忘记捡，变成手无缚鸡之力修女的菲娜彻底慌了神，慌乱中的白丝雪糕再次滑倒，滑腻腻的地板刹不住车，一头撞进了厚实的触手肉壁之中。\n\n　　咕噜——\n\n　　肉壁被挤开一道缝隙，白丝幼女半个身体钻进其中，正要把整个身躯鸵鸟般埋进肉壁时，尴尬的事情发生了，挺翘的幼女蜜臀因为体积原因被卡在了外面，悬在空中的白丝玉足使劲挣扎也够不到地面，已经钻进去的上半身被厚实的肉壁紧紧挤压着，不断分泌出甜腻气味灌入幼女的肺中，随着呼吸循环游遍了整个身体。\n\n　　“要被触手吃掉了！”\n\n　　年幼修女发出悲鸣，因为身上的圣白修女服已经开始融化，稚嫩乳房毫无防备地紧贴在肉壁之上，下一步就该消化我的身体了吧。\n\n　　菲娜如此想着，放松身躯要在临终前向神明祈祷，冗长的祷告词还未开始，轻盈稚嫩的娇躯突然僵住，露在外边的十只圆润脚趾紧紧扣住，一个带着火热温度与湿粘触感的物体攀上她的幼女翘臀，并且不断地在臀肉上四处游动，最后停在幼女大腿中间的白虎嫩肉上，轻轻吸允**岁修女的蜜液。\n\n　　幼女顿时发出异样悲鸣，回忆着教科书上所描述的触手怪形状，不难想象正有一根滴答分泌粘液的触手趴在她的幼嫩雪臀上吸食淫液，隔着轻薄贴身的白丝裤袜，光滑鲜嫩的鲍肉竟是违背主人的意愿轻轻张开肥嫩的淫裂，露出里面不受任何保护的粉色嫩肉，淫液正从一个微微开合的小洞口里流出，把幼女阴户变成反射着水润光泽的可爱淫肉。\n\n　　显而易见，白丝修女的臀肉和阴户在触手怪面前没有任何反抗的心思，并且擅自分泌出幼女汁液供奉给触手怪大人品尝，丝毫不考虑主人的意见。\n\n　　紧贴阴户的白丝裤袜逐渐被溶解，幼女的性器官毫无保留地暴露在触手怪大人面前，小洞洞里吐出更多汁液，兴奋勃起的小豆豆也希望能和触手怪大人贴贴，菲娜弯起悬在空中的雪糕嫩足，试图用这个成年人能够一口吞进嘴里吸允舔舐的幼女雪糕勾引触手怪大人的注意力。\n\n　　“咿呀！”\n\n　　湿哒哒的触手忽然抽打了一下挺翘的雪臀，似乎对她的勾引很不满，致使菲娜睁大双眼，蜜裂里喷出一股透明的液体。\n\n　　幼女短小的尿道抵挡不住尿液的压力投降，卡在触手墙壁里的白丝尻肉没有一点羞耻心地喷出幼女圣水，两片无毛阴唇被水压冲得微微颤抖，终于等到菲娜清空了体内，她的意识已经开始模糊，雪臀不自主地蹭着触手怪大人，努力地把幼穴送到触手怪大人面前。\n\n　　触手怪大人在幼穴外面磨蹭了一会，似乎在迟疑要不要进入这个幼女的体内，谁知幼女淫臀抓住了这个发呆的机会，配合纤细的小蛮腰用力一挺，水嫩紧致的幼女腔内瞬间吞没了触手怪的前端，一股吸力从肉腔伸出传来，滋溜的一下，触手怪被淫荡的幼女强奸了！\n",
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
