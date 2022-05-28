import {
  getExt,
  getAttachment,
  putAttachmentClassCache,
} from "../../../lib/attachments";
import { fetchWithRetry } from "../../../lib/http";
import { concurrencyRun } from "../../../lib/misc";
import { calculateSha1 } from "../../../lib/hash";
import { log } from "../../../log";
import { AttachmentClass } from "../../../main/Attachment";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { Status } from "../../../main/main";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class MangaBilibili extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "naive";
    this.concurrencyLimit = 1;
    this.streamZip = true;
  }

  public async bookParse() {
    const _comic_id = /\/mc(\d+)$/.exec(document.location.pathname)?.[1];
    if (!_comic_id) {
      throw new Error("获取 comic_id 失败！");
    }
    const comic_id = parseInt(_comic_id);
    const signIn = await isSignin(comic_id);
    const detail = await getDetail(comic_id);

    const bookUrl = document.location.href;
    const bookname = detail.title;
    const author = detail.author_name.join(", ");
    const introduction = detail.evaluate;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = detail.evaluate;
    const additionalMetadate = {} as BookAdditionalMetadate;
    getAttachment(detail.vertical_cover, this.attachmentMode, "vertical_cover-")
      .then((coverClass) => {
        additionalMetadate.cover = coverClass;
      })
      .catch((error) => log.error(error));
    additionalMetadate.tags = detail.styles;
    additionalMetadate.attachments = [];
    getAttachment(
      detail.horizontal_cover,
      this.attachmentMode,
      "horizontal_cover-"
    )
      .then((coverClass) => {
        additionalMetadate.attachments?.push(coverClass);
      })
      .catch((error) => log.error(error));
    const chapters = detail.ep_list.map((ep) => {
      const chapterUrl = `https://manga.bilibili.com/mc${comic_id}/${ep.id}?from=manga_detail`;
      const chapterNumber = ep.ord;
      const chapterName = [ep.short_title.trim(), ep.title.trim()].join(" ");
      const isVIP = ep.pay_gold !== 0;
      const isPaid = isVIP ? !ep.is_locked : true;
      const options: chapterOption = {
        comic_id,
        ep_id: ep.id,
      };
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP,
        isPaid,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options,
      });
      if (ep.is_locked || ep.type === 6) {
        chapter.status = Status.aborted;
      }
      return chapter;
    });

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });

    async function isSignin(comic_id: number) {
      const body = { comic_id };
      const resp = await fetch(
        "https://manga.bilibili.com/twirp/bookshelf.v1.Bookshelf/HasFavorite?device=pc&platform=web",
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
          method: "POST",
        }
      );
      return resp.ok;
    }

    async function getDetail(comic_id: number) {
      const url =
        "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail?device=pc&platform=web";
      const body = {
        comic_id,
      };
      const headers = {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
      };
      const init: RequestInit = {
        headers,
        body: JSON.stringify(body),
        method: "POST",
      };
      const resp = await fetch(url, init);
      const data = (await resp.json()) as ComicDetail;
      if (data.code === 0) {
        return data.data;
      } else {
        throw new Error("获取目录失败！");
      }
    }
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: chapterOption
  ): Promise<ChapterParseObject> {
    const paths = await getImageIndex(options.ep_id);

    const _outs: { path: string; obj: imageResult }[] = [];
    const worker = async (path: string) => {
      const obj = await getImage(path);
      const out = {
        path,
        obj,
      };
      _outs.push(out);
      return out;
    };
    await concurrencyRun(paths, 3, worker);
    _outs.sort((a, b) => paths.indexOf(a.path) - paths.indexOf(b.path));
    const outs = _outs.map((out) => out.obj);

    const dom = document.createElement("div");
    outs.forEach((o) => {
      const p = document.createElement("p");
      p.appendChild(o.dom);
      dom.appendChild(p);
    });
    const text = outs.map((o) => o.text).join("\n\n");
    const images = outs.map((o) => o.images);
    return {
      chapterName,
      contentRaw: dom,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate: null,
    };

    async function getImageIndex(ep_id: number): Promise<string[]> {
      const url =
        "https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web";
      const body = {
        ep_id,
      };
      const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      };
      const init: RequestInit = {
        headers,
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
        credentials: "include",
      };
      const resp = await fetch(url, init);
      const data = (await resp.json()) as GetImageIndex;
      if (data.code === 0) {
        const images = data.data.images;
        return images.map((i) => i.path);
      } else {
        throw new Error(
          `抓取章节图片索引失败！ ep_id： ${ep_id}, code: ${data.code}, mes: ${data.msg}`
        );
      }
    }

    interface imageResult {
      dom: HTMLImageElement;
      text: string;
      images: AttachmentClass;
    }

    async function getImage(path: string): Promise<imageResult> {
      const token = await getImageToken(path);
      if (token) {
        const img = await getImage(token);
        const _dom = document.createElement("img");
        _dom.setAttribute("data-src-address", img.name);
        _dom.alt = img.url;
        const _text = `![${img.url}](${img.name})`;
        log.info(`ep_id: ${options.ep_id}, path: ${path} 抓取成功！`);
        return {
          dom: _dom,
          text: _text,
          images: img,
        };
      }
      throw new Error("获取图片 " + path + " 失败！");

      interface Token {
        url: string;
        token: string;
      }

      async function getImageToken(path: string): Promise<Token | undefined> {
        const url =
          "https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web";
        const body = {
          urls: JSON.stringify([path]),
        };
        const headers = {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
        };
        const init: RequestInit = {
          headers,
          body: JSON.stringify(body),
          method: "POST",
          referrer: chapterUrl,
        };
        const resp = await fetch(url, init);
        const data = (await resp.json()) as ImageToken;
        if (data.code === 0) {
          return data.data[0];
        }
      }

      async function getImage(_token: Token): Promise<AttachmentClass> {
        const url = _token.url + "?token=" + _token.token;
        const headers = {
          Accept: "application/json, text/plain, */*",
        };
        const init: RequestInit = {
          headers,
          method: "GET",
        };
        const resp = await fetchWithRetry(url, init);
        const blob = await resp.blob();
        const hash = await calculateSha1(blob);
        const ext = await getExt(blob, url);
        const name = ["cm-", hash, ".", ext].join("");
        const imgClass = new AttachmentClass(url, name, "naive");
        imgClass.Blob = blob;
        imgClass.status = Status.finished;
        putAttachmentClassCache(imgClass);
        return imgClass;
      }
    }
  }
}

interface ep {
  id: number;
  ord: number;
  read: 0 | 1;
  pay_mode: 0 | 1;
  is_locked: boolean;
  pay_gold: number;
  size: number;
  short_title: "174";
  is_in_free: boolean;
  title: string;
  cover: string;
  pub_time: string;
  comments: number;
  unlock_expire_at: string;
  unlock_type: 0;
  allow_wait_free: boolean;
  progress: "";
  like_count: number;
  chapter_id: number;
  type: number;
  extra: number;
}

interface ComicDetail {
  code: number;
  msg: string;
  data: {
    id: number;
    title: string;
    comic_type: number;
    page_default: number;
    page_allow: number;
    horizontal_cover: string;
    square_cover: string;
    vertical_cover: string;
    author_name: string[];
    styles: string[];
    last_ord: number;
    is_finish: number;
    status: number;
    fav: number;
    read_order: number;
    evaluate: string;
    total: number;
    ep_list: ep[];
    release_time: string;
    is_limit: number;
    read_epid: number;
    last_read_time: string;
    is_download: number;
    read_short_title: string;
    styles2: [
      {
        id: number;
        name: string;
      }
    ];
    renewal_time: string;
    last_short_title: string;
    discount_type: number;
    discount: number;
    discount_end: string;
    no_reward: boolean;
    batch_discount_type: number;
    ep_discount_type: number;
    has_fav_activity: boolean;
    fav_free_amount: number;
    allow_wait_free: boolean;
    wait_hour: number;
    wait_free_at: string;
    no_danmaku: number;
    auto_pay_status: number;
    no_month_ticket: boolean;
    immersive: boolean;
    no_discount: boolean;
    show_type: number;
    pay_mode: number;
    chapters: [];
    classic_lines: string;
    pay_for_new: number;
    fav_comic_info: {
      has_fav_activity: boolean;
      fav_free_amount: number;
      fav_coupon_type: number;
    };
    serial_status: number;
    series_info: {
      id: number;
      comics: [];
    };
    album_count: number;
    wiki_id: number;
    disable_coupon_amount: number;
    japan_comic: boolean;
    interact_value: string;
    temporary_finish_time: string;
    video: null;
    introduction: string;
    comment_status: number;
    no_screenshot: boolean;
    type: number;
    vomic_cvs: [];
    no_rank: boolean;
    presale_eps: [];
    presale_text: string;
    presale_discount: number;
  };
}

interface chapterOption {
  comic_id: number;
  ep_id: number;
}

interface GetImageIndexImage {
  path: string;
  x: number;
  y: number;
  video_path: "";
  video_size: "0";
}

interface GetImageIndex {
  code: number;
  msg: string;
  data: {
    path: string;
    images: GetImageIndexImage[];
    last_modified: string;
    host: string;
    video: {
      svid: string;
      filename: string;
      route: string;
      resource: [];
      raw_width: string;
      raw_height: string;
      raw_rotate: string;
      img_urls: [];
      bin_url: string;
      img_x_len: number;
      img_x_size: number;
      img_y_len: number;
      img_y_size: number;
    };
  };
}

interface ImageToken {
  code: 0;
  msg: "";
  data: [
    {
      url: string;
      token: string;
    }
  ];
}

// fetch("https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail?device=pc&platform=web", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "content-type": "application/json;charset=UTF-8",
//   },
//   "body": "{\"comic_id\":25550}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
/*
{
    "code": 0,
    "msg": "",
    "data": {
        "id": 25550,
        "title": "魔王与勇者与圣剑神殿",
        "comic_type": 1,
        "page_default": 2,
        "page_allow": 11,
        "horizontal_cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
        "square_cover": "http://i0.hdslb.com/bfs/manga-static/9d1278912a6ad514713a447dbbacd725f48b8bad.jpg",
        "vertical_cover": "http://i0.hdslb.com/bfs/manga-static/f6ba7e5e6ec0122729656832bbe49914d1fd5937.jpg",
        "author_name": [
            "阿羊"
        ],
        "styles": [
            "奇幻"
        ],
        "last_ord": 175,
        "is_finish": 0,
        "status": 0,
        "fav": 1,
        "read_order": 70,
        "evaluate": "RAIEO大陆，根据史书记载，这片大陆曾经充斥着恶魔与血腥，魔王艾尔菲用她的魔剑统领众魔族，那是最为黑暗的时代。后来光明勇士出现，打败了魔王，封印了她的魔力，让RAIEO大陆重获自由，并从此建立了可以和魔族对抗的圣剑之殿。后来勇者之名一直被继承下来，继承勇者名号的勇士都可以使用魔力强大的圣剑。",
        "total": 175,
        "ep_list": [
            {
                "id": 508894,
                "ord": 175,
                "read": 0,
                "pay_mode": 1,
                "is_locked": true,
                "pay_gold": 50,
                "size": 8553165,
                "short_title": "174",
                "is_in_free": false,
                "title": "共同的敌人",
                "cover": "https://i0.hdslb.com/bfs/manga-static/b59a4875235cc8e5b591dc9c37984dc027aa3d04.jpg",
                "pub_time": "2020-10-31 00:00:00",
                "comments": 16,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 7,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            …………
            {
                "id": 262261,
                "ord": 71,
                "read": 0,
                "pay_mode": 1,
                "is_locked": true,
                "pay_gold": 50,
                "size": 2280377,
                "short_title": "071",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 6,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 11,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 262260,
                "ord": 70,
                "read": 1,
                "pay_mode": 1,
                "is_locked": false,
                "pay_gold": 50,
                "size": 2242203,
                "short_title": "070",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 5,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 1,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 13,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 262259,
                "ord": 69,
                "read": 1,
                "pay_mode": 1,
                "is_locked": false,
                "pay_gold": 50,
                "size": 2234039,
                "short_title": "069",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 6,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 1,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 20,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 262258,
                "ord": 68,
                "read": 1,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2418406,
                "short_title": "068",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 43,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 124,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 262257,
                "ord": 67,
                "read": 0,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2053229,
                "short_title": "067",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 5,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 90,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 262256,
                "ord": 66,
                "read": 0,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2248413,
                "short_title": "066",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 14,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 91,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            …………
            {
                "id": 261673,
                "ord": 3,
                "read": 0,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2489591,
                "short_title": "003",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 21,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 485,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 261149,
                "ord": 2,
                "read": 0,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2388703,
                "short_title": "002",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 17,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 458,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            },
            {
                "id": 261145,
                "ord": 1,
                "read": 0,
                "pay_mode": 0,
                "is_locked": false,
                "pay_gold": 0,
                "size": 2052528,
                "short_title": "001",
                "is_in_free": false,
                "title": " ",
                "cover": "http://i0.hdslb.com/bfs/manga-static/70ef43d11e87ae0cfda4d816975af6cfead876b6.jpg",
                "pub_time": "2018-11-13 12:00:00",
                "comments": 33,
                "unlock_expire_at": "0000-00-00 00:00:00",
                "unlock_type": 0,
                "allow_wait_free": false,
                "progress": "",
                "like_count": 532,
                "chapter_id": 0,
                "type": 0,
                "extra": 0
            }
        ],
        "release_time": "",
        "is_limit": 0,
        "read_epid": 262260,
        "last_read_time": "2021-12-24 21:59:10",
        "is_download": 1,
        "read_short_title": "070",
        "styles2": [
            {
                "id": 998,
                "name": "奇幻"
            }
        ],
        "renewal_time": "",
        "last_short_title": "174",
        "discount_type": 0,
        "discount": 0,
        "discount_end": "0001-01-01 00:00:00",
        "no_reward": false,
        "batch_discount_type": 0,
        "ep_discount_type": 0,
        "has_fav_activity": false,
        "fav_free_amount": 0,
        "allow_wait_free": false,
        "wait_hour": 0,
        "wait_free_at": "0000-00-00 00:00:00",
        "no_danmaku": 0,
        "auto_pay_status": 0,
        "no_month_ticket": false,
        "immersive": false,
        "no_discount": false,
        "show_type": 0,
        "pay_mode": 1,
        "chapters": [],
        "classic_lines": "RAIEO大陆，根据史书记载，这片大陆曾经充斥着恶魔与血腥，魔王艾尔菲用她的魔剑统领众魔族，那是最为黑暗的时代。后来光明勇士出现，打败了魔王，封印了她的魔力，让RAIEO大陆重获自由，并从此建立了可以和魔族对抗的圣剑之殿。后来勇者之名一直被继承下来，继承勇者名号的勇士都可以使用魔力强大的圣剑。",
        "pay_for_new": 0,
        "fav_comic_info": {
            "has_fav_activity": false,
            "fav_free_amount": 0,
            "fav_coupon_type": 0
        },
        "serial_status": 0,
        "series_info": {
            "id": 0,
            "comics": []
        },
        "album_count": 0,
        "wiki_id": 128123,
        "disable_coupon_amount": 0,
        "japan_comic": false,
        "interact_value": "3260",
        "temporary_finish_time": "",
        "video": null,
        "introduction": "",
        "comment_status": 1,
        "no_screenshot": true,
        "type": 0,
        "vomic_cvs": [],
        "no_rank": true,
        "presale_eps": [],
        "presale_text": "",
        "presale_discount": 0
    }
}
*/

// await fetch("https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web", {
//     "credentials": "omit",
//     "headers": {
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/json;charset=utf-8",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://manga.bilibili.com/mc30751/653011",
//     "body": "{\"ep_id\":653013}",
//     "method": "POST",
//     "mode": "cors"
// });
/*
{
	"code": 0,
	"msg": "",
	"data": {
		"path": "/bfs/manga/30751/653013/data.index.2504d66e?token=14664580a968094b76b23af4e688e718&ts=61c5bbab",
		"images": [
			{
				"path": "/bfs/manga/be3ecec32ec184c5117a676b1887af78c1c24603.jpg",
				"x": 1280,
				"y": 1666,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/20d1f60457925c05f3bbeb587d8e8415ed4dbd13.jpg",
				"x": 1280,
				"y": 1948,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f1a8867f438bd01c8469c64e4f878a8853f157d8.jpg",
				"x": 1280,
				"y": 2862,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/21acffc84abaef937e392258aad5cdb45aa20eef.jpg",
				"x": 1280,
				"y": 2579,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/b50fa424c4cd1437b00b52bdced0a1b78cf7c452.jpg",
				"x": 1280,
				"y": 3290,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6829fe2742414588564de6ce99eb7cf4242a587b.jpg",
				"x": 1280,
				"y": 3121,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/9c090a5c800f3838d77c9726a4f0518eba480fca.jpg",
				"x": 1280,
				"y": 1791,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/00352de07a98618c52bebf942548f21c76880f2a.jpg",
				"x": 1280,
				"y": 1790,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/0a513ed4201d47667a78c5db56eb329441d67182.jpg",
				"x": 1280,
				"y": 1825,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/9bc1074efe7ade42252e10fb578810896cda7116.jpg",
				"x": 1280,
				"y": 1825,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/7841d9423cf092e2500abb23d5da998a0012b88d.jpg",
				"x": 1280,
				"y": 3326,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6b1629713142e9b58170e771eedf063f5178cf16.jpg",
				"x": 1280,
				"y": 1707,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/9e5efe1f5dc44779f43e2b6ecedc0c6afa59672c.jpg",
				"x": 1280,
				"y": 1707,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/e2307e47c8f3be1187a59d5827a5b4c3d6dbed69.jpg",
				"x": 1280,
				"y": 2553,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/5e6079334eb0b2cf229211c7db3bb3533960ac02.jpg",
				"x": 1280,
				"y": 2553,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/67b71f8a10685e3a33d33a55c8f67abbffcd8329.jpg",
				"x": 1280,
				"y": 2326,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/b6b3df127d41c33ad05d1437bf8952fbbb3276d1.jpg",
				"x": 1280,
				"y": 2263,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/3f3c52ff4a21f18d784355135b890cc1aa9593af.jpg",
				"x": 1280,
				"y": 2262,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/97983440fcee4494396fd84e22c51865104914b8.jpg",
				"x": 1280,
				"y": 1759,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/cc73a415c00df8bb81731d4acdb0b349df0880f7.jpg",
				"x": 1280,
				"y": 1759,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f7ee379358d6daf1149f062d645f6b297e4fe762.jpg",
				"x": 1280,
				"y": 1769,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/57b49e1fccec1d3a76271cab560d64707ac2500c.jpg",
				"x": 1280,
				"y": 1768,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1025ec38bb713a3513f36095623d90b3740afb88.jpg",
				"x": 1280,
				"y": 2031,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/75779eb3a4ad01ea89fb882966bc9474b2fc5407.jpg",
				"x": 1280,
				"y": 2030,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/c9317eef8ea02f46df5a09dabd5d5aae3524b4fb.jpg",
				"x": 1280,
				"y": 3080,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/297068f7700a5cceb66692f6ea5edb95256a9244.jpg",
				"x": 1280,
				"y": 2077,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/8f1a2365c0970786d228700e3d8005a14914935c.jpg",
				"x": 1280,
				"y": 2076,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/92f6539eac7d38e45a1d1a778d2bdf0b2b293e71.jpg",
				"x": 1280,
				"y": 1478,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/c0182cc932387ac72f6e9ac7eb4a19b741856d50.jpg",
				"x": 1280,
				"y": 2134,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/0c7ec54f8815ccfce0248d5fdd28ff4767c52f22.jpg",
				"x": 1280,
				"y": 2133,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/83bc69be69e7b2340f7ee5b4787feb9b4aa61828.jpg",
				"x": 1280,
				"y": 1906,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/7dcccae8c2ee5ed2bf37658a9ad239eb8f9e1c26.jpg",
				"x": 1280,
				"y": 1906,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d5a22af8a8bf37a9c593b00336146fe011857975.jpg",
				"x": 1280,
				"y": 2307,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/75a3bf30c7528c49f10149ea3e5a570c3fa4d3b8.jpg",
				"x": 1280,
				"y": 2306,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/00be7476e3b0cd0386117b30e64537734212f9b1.jpg",
				"x": 1280,
				"y": 2948,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6dd879ac34b50904ca46f1348bf1ee35c3e4319d.jpg",
				"x": 1280,
				"y": 2625,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/46b9e03c56f92ba8652be9ee4aab82804f8fc6f8.jpg",
				"x": 1280,
				"y": 2363,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/c59b3101762da601b4de5f17de36f768ce23c942.jpg",
				"x": 1280,
				"y": 2363,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f40cb2137de1d97beb655fc5614958cb411dac78.jpg",
				"x": 1280,
				"y": 2732,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/4d30feba77935e3cd64172000cb352da488354a9.jpg",
				"x": 1280,
				"y": 3114,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/27b454439d5098b3ffa4aee06b4d3919bbfe2d0e.jpg",
				"x": 1280,
				"y": 1773,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/ea4b19da8ace1eedbf1b0f81c6a372bf002220bd.jpg",
				"x": 1280,
				"y": 1772,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f50575a485db7eac8c45f6f847eb98df5f44c499.jpg",
				"x": 1280,
				"y": 3023,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/ad4c5b4778312e769fc056464a3cc41d74291055.jpg",
				"x": 1280,
				"y": 1659,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/3dc31a30b2623b7fb752b0356c15e8d9481dcd2a.jpg",
				"x": 1280,
				"y": 2248,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/37a61abb49d3068416ea1a71e537ec7e59f82a23.jpg",
				"x": 1280,
				"y": 2248,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/825a6758b1b515cf1f86d4290f175b239a83ff06.jpg",
				"x": 1280,
				"y": 2775,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/97335139d44b9815c8bcbf4eb95c60aff87d1568.jpg",
				"x": 1280,
				"y": 2207,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1f92af5d58e93e5db30edfadcb37241389ef179f.jpg",
				"x": 1280,
				"y": 2391,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/2ebb29b62ea2458fbf6214551fd86a072ec23c90.jpg",
				"x": 1280,
				"y": 1998,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/a225668ff529c4d2183fd8170904d2174d2e5d04.jpg",
				"x": 1280,
				"y": 1998,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/3689b0180f58f3f252180c630c4d6ef5fd110e15.jpg",
				"x": 1280,
				"y": 3127,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/446e83b8daac881df7fe9b6e00b34d04693bdd72.jpg",
				"x": 1280,
				"y": 3083,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6bb99ee0bf163d90f439172c04b65012b757e97d.jpg",
				"x": 1280,
				"y": 3083,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/90afd27898606cb35eaccf6bc2696883a27dbe4a.jpg",
				"x": 1280,
				"y": 1821,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/5caf21ea8b5f9c936ab9d2e22267844864aa5a78.jpg",
				"x": 1280,
				"y": 1820,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/a1e4ab0e7dc241d03c0ffa1b34f5b9ad0328926a.jpg",
				"x": 1280,
				"y": 2353,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1c606000fcd319014a7c86a83093ca1d83dc2375.jpg",
				"x": 1280,
				"y": 2352,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/87af9052c3590728a3011cda2516ce05fe3fb2e7.jpg",
				"x": 1280,
				"y": 1690,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/ed5f910201709f92a7ba7e902fe2a997a26f45c5.jpg",
				"x": 1280,
				"y": 1689,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/2b6cd706946440794e27702d1ed099f5b44ca341.jpg",
				"x": 1280,
				"y": 2476,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/61a39ee058d08de5dd18794faae5ccec267226a7.jpg",
				"x": 1280,
				"y": 2475,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f4ad36af8f61976ebbeb444d1a0b2c37d929b706.jpg",
				"x": 1280,
				"y": 1818,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d662baf969f0e8e353bf4a31142ccf35c427c6ca.jpg",
				"x": 1280,
				"y": 1818,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d41749e4928bd1468073b378495af3a2a30fd939.jpg",
				"x": 1280,
				"y": 2188,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/22f5f05c62a992163bd9da7b7da56c5a509191f2.jpg",
				"x": 1280,
				"y": 2187,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/7792bd33459a550bde86dc9f4bf9801abaf8520e.jpg",
				"x": 1280,
				"y": 3216,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/771bdf6fcbeea4037f8eebec5a438fb66e6bc841.jpg",
				"x": 1280,
				"y": 2449,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/461f36e996bed50868cbdd44a307d98cef6b65ae.jpg",
				"x": 1280,
				"y": 2448,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/b8b3578ba2083cf0b215f119c13c1b4f7af9a93c.jpg",
				"x": 1280,
				"y": 2487,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/4e1e5056c84ee4f979bd439be00637731a376fdb.jpg",
				"x": 1280,
				"y": 2487,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/704140f69e92f085192d75469e79d3c4af67fff5.jpg",
				"x": 1280,
				"y": 2992,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f1ee75f4cabd0a7fd4ff7a99023433478e263720.jpg",
				"x": 1280,
				"y": 2641,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/ad1ba9c7e46bc48d249857d31c43c31f2ea80586.jpg",
				"x": 1280,
				"y": 2253,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/98d6555236ef98001034e96889674bee2ed26d8c.jpg",
				"x": 1280,
				"y": 2252,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/2a9e9f8da461fedc9404c6d8fb1acd8e767583cf.jpg",
				"x": 1280,
				"y": 2085,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/e1c61b523f55b10fa87e91aba20f62394d0160a7.jpg",
				"x": 1280,
				"y": 2084,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/afffaa0ffef9233558f13a667deb974aca604737.jpg",
				"x": 1280,
				"y": 2055,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/721d375b5d25ccae97b4560a80a93c5b0ed9b19d.jpg",
				"x": 1280,
				"y": 2195,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/8696cf5ee2c0cf4e0fe761984f58c968b0b143dd.jpg",
				"x": 1280,
				"y": 2195,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/575393c149532af9ab7adb237f6303e2c0d97496.jpg",
				"x": 1280,
				"y": 1799,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6fb42e4d034d05784954cccc5c2207ce290c80b5.jpg",
				"x": 1280,
				"y": 1799,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/29498a7a7663ad15c059de493840614328b4a4f6.jpg",
				"x": 1280,
				"y": 2303,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/662b88e48213059a7ba97edd54c53eefd9b3d87a.jpg",
				"x": 1280,
				"y": 2588,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/efd6e2a05b9b865070064178d0fd73e11ad02f36.jpg",
				"x": 1280,
				"y": 2588,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/15b01260e6d94a65794f551206127e9d467ece11.jpg",
				"x": 1280,
				"y": 3262,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/de3b0d6b3bbb8b8c348a22738c53e2de5bccd913.jpg",
				"x": 1280,
				"y": 3059,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/228bafe1153d32b9f37abd55fcbd3b91d9d5e6df.jpg",
				"x": 1280,
				"y": 1520,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f91815a1d90f28e3a28bf075df0cb73ca2763e36.jpg",
				"x": 1280,
				"y": 2751,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/0f27226fbb5082d01e6423c0d19c51c097771be8.jpg",
				"x": 1280,
				"y": 1956,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/107011f2fca5fde70008d06541692c96455e1df4.jpg",
				"x": 1280,
				"y": 1956,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/21eb01a8fa949946d7560bd6edc5ade603b07ba0.jpg",
				"x": 1280,
				"y": 3124,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/77ef72457f7312f1c40e4f3234803e51a7258d60.jpg",
				"x": 1280,
				"y": 2165,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1257c526056a622419818b755ad6266f2e81e9ff.jpg",
				"x": 1280,
				"y": 2165,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/31dea99246a7c9aa12d672e4a33c9b038fa54821.jpg",
				"x": 1280,
				"y": 3311,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/a1410b00130ff9167b463e49ee32a41aba015970.jpg",
				"x": 1280,
				"y": 1802,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1c8c526ea9fe532c482eb820627aecffd2f44cd1.jpg",
				"x": 1280,
				"y": 1802,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1202a3b4d919ca79fecdc70ae8b08015e187ccba.jpg",
				"x": 1280,
				"y": 2251,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/351407b54359bae29e63103ee8af923244bdbbeb.jpg",
				"x": 1280,
				"y": 2250,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/bc1b56a53db1090bc901bebd8bccbffdb00e935e.jpg",
				"x": 1280,
				"y": 1830,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/718de3cb0e763f76df2232ad746b6cf67b240360.jpg",
				"x": 1280,
				"y": 1830,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/5b9320a1143109ade63c0d4f92e225c20b7f3fbf.jpg",
				"x": 1280,
				"y": 1916,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/210d1f0d9352143bb2fe4d1b4a62cc77b045b544.jpg",
				"x": 1280,
				"y": 1915,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1b92f2d7e8a6d1d6b0fe1b374df6865d0996e80c.jpg",
				"x": 1280,
				"y": 2918,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/82aea4a8869a6764533f4ed139fcb7beddefc9d9.jpg",
				"x": 1280,
				"y": 3316,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/bc8b749231d9d44dcfe9dd0198abe856bed1da6b.jpg",
				"x": 1280,
				"y": 2073,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6598b89830579bb968f3cdbeac7cdcd09db2f767.jpg",
				"x": 1280,
				"y": 2072,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/678d1ecda9d88b37e0e4d1850df32925dc44ff15.jpg",
				"x": 1280,
				"y": 2196,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d57c6a6c30e61c04d38f02d0d136da4ebfd33b25.jpg",
				"x": 1280,
				"y": 1672,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d90f53e0bd02037a4d0d5448e109f7c2945592d7.jpg",
				"x": 1280,
				"y": 1671,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/6f82d14cc16c47be7f0c584dc2063d94c3fb9d79.jpg",
				"x": 1280,
				"y": 2122,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f3536d2782a5e8fe0deda0ca33348791e375291a.jpg",
				"x": 1280,
				"y": 2122,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/8378fcace0c43c20f690b229fbc2e38b0e68cd69.jpg",
				"x": 1280,
				"y": 1583,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/4f3ccd4cde5d15ee11fab52249ac6bc70618b10b.jpg",
				"x": 1280,
				"y": 2774,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/b320de5c0662f8b361c02cd165465da5c493cb31.jpg",
				"x": 1280,
				"y": 1750,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/93f102b9d0200f0d069ef8d286b3bd61c8909af6.jpg",
				"x": 1280,
				"y": 1750,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/85adb71e29165b506c97d6ed9dc3ddd9531ad566.jpg",
				"x": 1280,
				"y": 1950,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/de9f866e3bf0e6d67b43752fe96bfd2089f7ed15.jpg",
				"x": 1280,
				"y": 1949,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/4ebdb83177b4bb05b88c132217b26e90f4c980e0.jpg",
				"x": 1280,
				"y": 1707,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/65c9bf09e0d23e9fa4a42e7dec0dd61fdf07fb77.jpg",
				"x": 1280,
				"y": 1706,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/d99cd93ab7c9d8bea74e5eb63182040f0141a479.jpg",
				"x": 1280,
				"y": 2356,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1e2c48580d807416ddb9bf95429b71defed6c6cf.jpg",
				"x": 1280,
				"y": 2356,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/f0e33b33c9388ad9b0d954700aa040b55b725178.jpg",
				"x": 1280,
				"y": 2869,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/b3ebaf7776aa93f467b1e13c76e70994b5c077b4.jpg",
				"x": 1280,
				"y": 1330,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/1e03cfae477349c1ce0632b0648344f659968dde.jpg",
				"x": 1280,
				"y": 2072,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/30223434a68526c9b77235a52c59c1f2519c0b1f.jpg",
				"x": 1280,
				"y": 2071,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/7d273d4bbea6cd9c7b008c9eec667d6c32399d9c.jpg",
				"x": 1280,
				"y": 1749,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/83f136939e85170eef23373318c47daafe00d2e4.jpg",
				"x": 1280,
				"y": 1749,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/dd71895f64a80307101523ae30b4f683bf6ae20c.jpg",
				"x": 1280,
				"y": 3314,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/198cbe26c26af7c3412d2d093c55de30a6a88b87.jpg",
				"x": 1280,
				"y": 3314,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/ce034382b587f5f04b60d55c5fcb282c6911c9f3.jpg",
				"x": 1280,
				"y": 3313,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/9e178a4bacdd8c30f4e8541803c095322d86da71.jpg",
				"x": 1280,
				"y": 1708,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/682e1ad6d81e8a6afb191cd8f5abb27f00006120.jpg",
				"x": 1280,
				"y": 1707,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/33608d62987d4aa96f182bf3fb327c4bf8e64280.jpg",
				"x": 1280,
				"y": 2811,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/12f7615c8c1deb0e915b8bb008f1f119814a632c.jpg",
				"x": 1280,
				"y": 2408,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/de3cc6e6f5e31b15f8be694b89ec134a7131d82b.jpg",
				"x": 1280,
				"y": 2407,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/90d1f1d5f7d257a692ea2d015913bd79f969f393.jpg",
				"x": 1280,
				"y": 3132,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/69c18eab13da70532d7703fd00cc7045d89dfd31.jpg",
				"x": 1280,
				"y": 1883,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/3948093100cff89bb29b866f280054683f8f99e4.jpg",
				"x": 1280,
				"y": 1883,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/2085c219ec261d8b4795ecf151c8d398100a81aa.jpg",
				"x": 1280,
				"y": 2206,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/7ad1136ed7162d59e8c68c5bcba94bcaa2490587.jpg",
				"x": 1280,
				"y": 2205,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/3924bd4e86308a86def72f0d42bf7f3f65ea0027.jpg",
				"x": 1280,
				"y": 2469,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/472921eedeffc353861ec3617ddec5792b5c2fe6.jpg",
				"x": 1280,
				"y": 1942,
				"video_path": "",
				"video_size": "0"
			},
			{
				"path": "/bfs/manga/45332a8ab1e765953ab0945d40106e34eeb3fc84.jpg",
				"x": 1280,
				"y": 2190,
				"video_path": "",
				"video_size": "0"
			}
		],
		"last_modified": "2021-10-23 13:48:47",
		"host": "https://manga.hdslb.com",
		"video": {
			"svid": "",
			"filename": "",
			"route": "",
			"resource": [],
			"raw_width": "0",
			"raw_height": "0",
			"raw_rotate": "0",
			"img_urls": [],
			"bin_url": "",
			"img_x_len": 10,
			"img_x_size": 160,
			"img_y_len": 10,
			"img_y_size": 90
		}
	}
}
*/

// await fetch("https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web", {
//     "credentials": "omit",
//     "headers": {
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/json;charset=utf-8",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://manga.bilibili.com/mc30751/653013",
//     "body": "{\"urls\":\"[\\\"/bfs/manga/be3ecec32ec184c5117a676b1887af78c1c24603.jpg@1088w.jpg\\\"]\"}",
//     "method": "POST",
//     "mode": "cors"
// });
/*
{
	"code": 0,
	"msg": "",
	"data": [
		{
			"url": "https://manga.hdslb.com/bfs/manga/be3ecec32ec184c5117a676b1887af78c1c24603.jpg@1088w.jpg",
			"token": "7b0527efe981234b22adfd3465b4858e&ts=61c5bbac"
		}
	]
}
*/

// await fetch("https://manga.hdslb.com/bfs/manga/be3ecec32ec184c5117a676b1887af78c1c24603.jpg@1088w.jpg?token=7b0527efe981234b22adfd3465b4858e&ts=61c5bbac", {
//     "credentials": "omit",
//     "headers": {
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "cross-site"
//     },
//     "referrer": "https://manga.hdslb.com/bfs/manga/be3ecec32ec184c5117a676b1887af78c1c24603.jpg@1088w.jpg?token=7b0527efe981234b22adfd3465b4858e&ts=61c5bbac",
//     "method": "GET",
//     "mode": "cors"
// });
