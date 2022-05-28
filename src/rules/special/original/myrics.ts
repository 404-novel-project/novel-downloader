import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { getImageAttachment } from "../../../lib/attachments";
import { log } from "../../../log";
import { range } from "../../../lib/misc";
import pLimit from "p-limit";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { getHtmlDOM } from "../../../lib/http";
import { cleanDOM } from "../../../lib/cleanDOM";

export class Myrics extends BaseRuleClass {
  constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 5;
  }

  public async bookParse(): Promise<Book> {
    const bookId = document.location.href.split("/").slice(-1)[0];
    const csrf_token = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (!(bookId && csrf_token)) {
      throw new Error("初始化失败！找不到 bookId 或 csrf-token");
    }

    const novelDetailUrl = `https://www.myrics.com/authors/api_novel_detailed/${bookId}`;
    const authorDetailUrl = `https://www.myrics.com/novels/api_author_detailed/${bookId}`;
    const menuUrl = "https://www.myrics.com/novels/menu";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrf_token,
    };

    const novelDetailResp = await fetch(novelDetailUrl, {
      credentials: "include",
      headers,
      body: "null",
      method: "POST",
      mode: "cors",
    });
    const _novelDetail =
      (await novelDetailResp.json()) as apiResponse<novelDetail>;
    if (!_novelDetail.isSuccess) {
      throw new Error("请求书籍详情失败！");
    }
    const novelDetail = _novelDetail.data;

    const authorDetailResp = await fetch(authorDetailUrl, {
      credentials: "include",
      headers,
      method: "POST",
      mode: "cors",
    });
    const _authroDetail =
      (await authorDetailResp.json()) as apiResponse<authorDetail>;
    if (!_authroDetail.isSuccess) {
      throw new Error("请求作者详情失败！");
    }
    const authroDetail = _authroDetail.data;

    const bookUrl = document.location.href;
    const tocUrl = document.location.href + "/menu";
    const bookname = novelDetail.title;
    const author = authroDetail.pen_name;
    const introduction = novelDetail.long_summary;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = introduction;
    const additionalMetadate: BookAdditionalMetadate = {
      tags: [...novelDetail.geners, novelDetail.type],
      ids: bookId,
      language: "zh",
    };

    const coverUrl = novelDetail.image;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((img) => {
          additionalMetadate.cover = img;
        })
        .catch((error) => log.error(error));
    }

    const isLogin = () => {
      // 基于有无签到按钮判断是否登录
      return (
        Array.from(document.querySelectorAll("a")).filter(
          (a) => a.getAttribute("@click") === "checkin"
        ).length !== 0
      );
    };

    const getMenuRequestInit = (page: number): RequestInit => ({
      credentials: "include",
      headers: headers,
      referrer: "https://www.myrics.com/novels/6747/menu",
      body: JSON.stringify({
        page_limit: 12,
        id: bookId,
        sort: "asc",
        page,
      }),
      method: "POST",
      mode: "cors",
    });
    const getMenu = async (page: number) => {
      const resp = await fetch(menuUrl, getMenuRequestInit(page));
      const _menu = (await resp.json()) as apiResponse<menu>;
      if (!_menu.isSuccess) {
        throw new Error(`获取第${page}页目录失败！`);
      }
      return _menu.data;
    };
    const limit = pLimit(this.concurrencyLimit);
    const getChapters = async (): Promise<Chapter[]> => {
      const loginStatus = isLogin();

      const { total_page } = await getMenu(1);
      const _menus = range(total_page, 1).map((page) => {
        return limit(() => getMenu(page));
      });
      const menus = await Promise.all(_menus);
      // noinspection UnnecessaryLocalVariableJS
      const chapters = menus
        .map((m) => {
          return m.list.map((item) => {
            const chapterId = item.id;
            const chapterUrl = `https://www.myrics.com/chapters/${chapterId}`;
            const chapterNumber = parseInt(item.id);
            const chapterName = `${item.sort}. ${item.title}`;
            const isVIP = item.coin !== 0;
            const isPaid = item?.had_paid ?? false;
            const sectionNumber = item.part;
            const sectionName = `卷${sectionNumber}`;
            const sectionChapterNumber = item.part;
            const isAdult = item.is_adult;
            const chapter = new Chapter({
              bookUrl,
              bookname,
              chapterUrl,
              chapterNumber,
              chapterName,
              isVIP,
              isPaid,
              sectionName,
              sectionNumber,
              sectionChapterNumber,
              chapterParse: this.chapterParse,
              charset: this.charset,
              options: { bookId, chapterId, created_at: item.created_at },
            });
            if (chapter.isVIP && !chapter.isPaid) {
              chapter.status = Status.aborted;
            }
            if (!loginStatus && isAdult) {
              chapter.status = Status.aborted;
            }
            return chapter;
          });
        })
        .reduce((arr, cur) => {
          arr.push(...cur);
          return arr;
        }, []);
      return chapters;
    };

    const chapters = await getChapters();
    let i = 0;
    for (const chapter of chapters) {
      chapter.chapterNumber = i;
      i++;
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
    book.ToCUrl = tocUrl;
    return book;
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: chapterOption
  ): Promise<ChapterParseObject> {
    const doc = await getHtmlDOM(chapterUrl, charset);
    const _chapterName =
      doc.querySelector<HTMLHeadElement>(".container > h1")?.innerText;
    if (_chapterName) {
      chapterName = _chapterName;
    }
    const content = doc.querySelector<HTMLDivElement>(".container > .wysiwyg");
    if (content) {
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: {
          lastModified: new Date(options.created_at).getTime(),
        },
      };
    } else {
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
}

interface chapterOption {
  bookId: string;
  chapterId: string;
  created_at: string;
}

interface novelDetail {
  id: number;
  title: string;
  short_summary: string;
  long_summary: string;
  category: string;
  comment_count: number;
  word_count: number;
  view_count: number;
  collect_count: number;
  subscribe_count: number;
  finish_type: string;
  had_send_finish_request: false;
  has_coin_chapter: true;
  is_finished: false;
  type_id: number;
  type: string;
  exclusive_type_id: number;
  is_auth: number;
  is_adaptation: number;
  exclusive_type: string;
  geners: string[];
  image: string;
  test_image: string;
  genre_id: number[];
}

interface authorDetail {
  id: string;
  pen_name: string;
  title: string;
  cover_image: string;
  facebook_url: string;
  weibo_url: string;
  description: string;
  gift_enable: boolean;
  collect_enable: boolean;
}

interface chapter {
  id: string;
  sort: string;
  part: number;
  title: string;
  word_count: number;
  view_count: number;
  coin_type: number;
  coin: number;
  is_adult: boolean;
  comment_count: number;
  created_at: string;
  published_at: string;
  had_paid?: boolean;
  published_enable: boolean;
}

interface menu {
  page: number;
  total_page: number;
  list: chapter[];
  sort: "desc" | "asc";
}

interface apiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

/*
await fetch("https://www.myrics.com/authors/api_novel_detailed/6747", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-CSRFToken": "yQ2YeUpP7KOLsNsDrBKXb45deb5NsTwK6fnhI4t1mm3kiVO00ovMshnrplc81NPm",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://www.myrics.com/novels/6747",
    "body": "null",
    "method": "POST",
    "mode": "cors"
});
{
  "isSuccess": true,
  "message": "",
  "data": {
    "id": 6747,
    "title": "性癮少女",
    "short_summary": "（高H肉合集）性癮少女各種找操&挨操的故事",
    "long_summary": "肉文//無節操//18禁\n\n【現代篇】十八線女演員的性癮日常\n【現代篇平行世界】高中女生一步步淪爲性癮分子\n\n【古代篇】侯府不受寵庶女靠着牀上功夫攪亂朝綱\n\n注意：現代篇與現代篇平行世界中的人物沒有關聯\n————\n\n其他喫肉合集，《大奶宮女靠身體上位》《孤兒院裏的受辱少女》《鄉下來的大奶小保姆》《傻子少女淪爲肉便器》《純情少女淪喪復仇路》《綠茶少女》《野人爸爸》《西遊記豔情》《真實乙女遊戲》《支教女教師》《變態教授》《星際怪物》《鄉村寡婦》《肉便器修女》等\n\n【GB系列】《外科醫生》\n\n【文案介紹見319、801】\n\n【更多中短篇肉合集見《緋聞少年》《快穿之淫魔養成》，更多無節操肉《極致墮落》】\n\n**由於無法調整章節順序，所以會出現章節亂入的情況，帶來的不便請諒解",
    "category": "BG",
    "comment_count": 272,
    "word_count": 5297921,
    "view_count": 538666,
    "collect_count": 2333,
    "subscribe_count": 1802,
    "finish_type": "連載中",
    "had_send_finish_request": false,
    "has_coin_chapter": true,
    "is_finished": false,
    "type_id": 0,
    "type": "原創",
    "exclusive_type_id": 2,
    "is_auth": 2,
    "is_adaptation": 1,
    "exclusive_type": "以後再說",
    "geners": [
      "東方玄幻",
      "宮廷謀略",
      "古代",
      "現代"
    ],
    "image": "https://cdn.myrics.com/novel_cover_images/822a23e0-ba6e-4546-a2b4-521725ce72c4.png",
    "test_image": "https://myrics-test.s3.ap-east-1.amazonaws.com/novel_cover_novel_cover_images/822a23e0-ba6e-4546-a2b4-521725ce72c4.png",
    "genre_id": [
      5,
      13,
      38,
      40
    ]
  }
}
*/

/*
await fetch("https://www.myrics.com/novels/api_author_detailed/6747", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "X-CSRFToken": "V37An5JVt5tRAPkxmFMuxeyoFudn4QRVtssTRfN7IHIqqXGUVsxjOrQCQEkIDKax",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://www.myrics.com/novels/6747/menu",
    "method": "POST",
    "mode": "cors"
});
{
	"isSuccess": true,
	"message": "",
	"data": {
		"id": "4252",
		"pen_name": "十八里街禁",
		"title": "",
		"cover_image": "https://cdn.myrics.com/author_profile_images/7a95e745-84ae-4ab0-979a-25babfc5ad46.png",
		"facebook_url": "",
		"weibo_url": "",
		"description": "完结作品：\nBL：《鬼面蛇夫》《小骚货》《兽国极品性奴》《性虐癖患者I》《不伦情事合集》《绝对侵占》《我亲爱的白月光》《伪装情人》《过期爱人》\nBG：《美男十八式》\n\n微博ID：十八里ice（不定期有小剧场掉落）\n",
		"gift_enable": true,
		"collect_enable": false
	}
}
*/

/*
await fetch("https://www.myrics.com/novels/menu", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-CSRFToken": "yQ2YeUpP7KOLsNsDrBKXb45deb5NsTwK6fnhI4t1mm3kiVO00ovMshnrplc81NPm",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://www.myrics.com/novels/6747",
    "body": "{\"id\":6747,\"sort\":\"desc\",\"page\":1}",
    "method": "POST",
    "mode": "cors"
});
{
	"isSuccess": true,
	"message": "",
	"data": {
		"page": 1,
		"total_page": 52,
		"list": [
			{
				"id": "223113",
				"sort": "1029",
				"part": 1,
				"title": "《警花淪喪3》提示與未知未來",
				"word_count": 545,
				"view_count": 16,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-18 00:52",
				"published_at": "2022-05-22 00:35",
				"published_enable": true
			},
			{
				"id": "223112",
				"sort": "1028",
				"part": 1,
				"title": "《警花淪喪3》審訊室裡的刺激H",
				"word_count": 16824,
				"view_count": 23,
				"coin_type": 3,
				"coin": 51,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-18 00:50",
				"published_at": "2022-05-21 00:35",
				"published_enable": true
			},
			{
				"id": "223111",
				"sort": "1027",
				"part": 1,
				"title": "《警花淪喪2》尿",
				"word_count": 361,
				"view_count": 57,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-18 00:47",
				"published_at": "2022-05-20 00:35",
				"published_enable": true
			},
			{
				"id": "223110",
				"sort": "1026",
				"part": 1,
				"title": "《警花淪喪2》壁kao/開/苞",
				"word_count": 15952,
				"view_count": 35,
				"coin_type": 3,
				"coin": 48,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-18 00:46",
				"published_at": "2022-05-19 00:30",
				"published_enable": true
			},
			{
				"id": "223109",
				"sort": "1025",
				"part": 1,
				"title": "《警花淪喪1》監獄裡的制服誘惑",
				"word_count": 2325,
				"view_count": 87,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-18 00:44",
				"published_at": "2022-05-18 00:44",
				"published_enable": true
			},
			{
				"id": "222250",
				"sort": "1024",
				"part": 1,
				"title": "《真實乙女6》被盯上？",
				"word_count": 406,
				"view_count": 47,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:43",
				"published_at": "2022-05-17 00:35",
				"published_enable": true
			},
			{
				"id": "222249",
				"sort": "1023",
				"part": 1,
				"title": "《真實乙女6》最完美的AV製作",
				"word_count": 10484,
				"view_count": 20,
				"coin_type": 3,
				"coin": 30,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:40",
				"published_at": "2022-05-16 00:35",
				"published_enable": true
			},
			{
				"id": "222248",
				"sort": "1022",
				"part": 1,
				"title": "《真實乙女6》總裁的原諒？",
				"word_count": 626,
				"view_count": 70,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:39",
				"published_at": "2022-05-15 00:30",
				"published_enable": true
			},
			{
				"id": "222247",
				"sort": "1021",
				"part": 1,
				"title": "《三國4》岳母捉姦",
				"word_count": 322,
				"view_count": 67,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:37",
				"published_at": "2022-05-14 00:05",
				"published_enable": true
			},
			{
				"id": "222245",
				"sort": "1020",
				"part": 1,
				"title": "《三國4》激戰/宮X",
				"word_count": 16678,
				"view_count": 21,
				"coin_type": 3,
				"coin": 51,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:35",
				"published_at": "2022-05-13 00:35",
				"published_enable": true
			},
			{
				"id": "222244",
				"sort": "1019",
				"part": 1,
				"title": "《三國4》曹丕X甄姬",
				"word_count": 761,
				"view_count": 80,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:34",
				"published_at": "2022-05-12 00:30",
				"published_enable": true
			},
			{
				"id": "222242",
				"sort": "1018",
				"part": 1,
				"title": "《爬床丫鬟4》公開馬車/震",
				"word_count": 9915,
				"view_count": 25,
				"coin_type": 3,
				"coin": 30,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:31",
				"published_at": "2022-05-11 00:30",
				"published_enable": true
			},
			{
				"id": "222241",
				"sort": "1017",
				"part": 1,
				"title": "《爬床丫鬟4》勾引馬伕",
				"word_count": 561,
				"view_count": 93,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-10 11:30",
				"published_at": "2022-05-10 11:30",
				"published_enable": true
			},
			{
				"id": "221749",
				"sort": "1016",
				"part": 1,
				"title": "《驢J懦夫2》電話出軌對峙",
				"word_count": 415,
				"view_count": 85,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-04 23:51",
				"published_at": "2022-05-09 00:35",
				"published_enable": true
			},
			{
				"id": "221748",
				"sort": "1015",
				"part": 1,
				"title": "《驢J懦夫2》窗邊大膽出軌",
				"word_count": 10129,
				"view_count": 37,
				"coin_type": 3,
				"coin": 30,
				"is_adult": true,
				"comment_count": 1,
				"created_at": "2022-05-04 23:49",
				"published_at": "2022-05-08 00:35",
				"published_enable": true
			},
			{
				"id": "221747",
				"sort": "1014",
				"part": 1,
				"title": "《驢J懦夫1》少婦被鄰居摸",
				"word_count": 1417,
				"view_count": 146,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-04 23:46",
				"published_at": "2022-05-07 15:00",
				"published_enable": true
			},
			{
				"id": "221746",
				"sort": "1013",
				"part": 1,
				"title": "《小宮女18》重口預警",
				"word_count": 381,
				"view_count": 134,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-04 23:43",
				"published_at": "2022-05-07 00:35",
				"published_enable": true
			},
			{
				"id": "221745",
				"sort": "1012",
				"part": 1,
				"title": "《小宮女18》雙飛/激烈5P",
				"word_count": 18570,
				"view_count": 52,
				"coin_type": 3,
				"coin": 57,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-04 23:41",
				"published_at": "2022-05-06 00:35",
				"published_enable": true
			},
			{
				"id": "221744",
				"sort": "1011",
				"part": 1,
				"title": "《小宮女18》敵國誘餌",
				"word_count": 766,
				"view_count": 138,
				"coin_type": 0,
				"coin": 0,
				"is_adult": false,
				"comment_count": 0,
				"created_at": "2022-05-04 23:40",
				"published_at": "2022-05-05 00:35",
				"published_enable": true
			},
			{
				"id": "221322",
				"sort": "1010",
				"part": 1,
				"title": "《支教少女10》求著還要",
				"word_count": 471,
				"view_count": 181,
				"coin_type": 0,
				"coin": 0,
				"is_adult": true,
				"comment_count": 0,
				"created_at": "2022-05-01 18:56",
				"published_at": "2022-05-04 00:35",
				"published_enable": true
			}
		],
		"sort": "desc"
	}
}
*/
