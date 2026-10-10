import * as CryptoJS from "crypto-js";
import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";

export class Ciyuanji extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;

    interface TagObj {
      tagId: number;
      tagName: string;
    }

    interface BookObj {
      bookId: number;
      bookName: string;
      authorId: number;
      authorName: string;
      authorPhoto: string;
      authorNotes: string;
      firstClassify: number;
      firstClassifyName: string;
      wordCount: number;
      imgUrl: string;
      blurryImgUrl: string;
      notes: string;
      endState: string;
      latestUpdateTime: string;
      latestChapterId: number;
      latestChapterName: string;
      copyright: number;
      bookState: string;
      isVip: string;
      copyrightName: string;
      copyrightNotes: string;
      imgAlt: string;
      chapterCount: number;
      ticketMonthCount: number;
      ticketDayCount: number;
      bladeCount: number;
      rewardAmount: number;
      pvCount: number;
      pvTop: number;
      topStr: string;
      isRack: string;
      tagList: TagObj[];
      totalMonthCount: number;
      isFee: string;
      firstChapterId: number;
      firstChapterName: string;
      isAutoSub: string;
    }

    const bookObject: BookObj = (unsafeWindow as any).__NEXT_DATA__.props.pageProps.book;
    const bookId = bookObject.bookId;
    const bookname = bookObject.bookName;
    const author = bookObject.authorName;
    const introDom = document.createElement("div");
    introDom.innerHTML = bookObject.notes.replace("/\n/g", "<br/><br/>");
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = bookObject.imgUrl;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = bookObject.tagList.map(
      (tagobj) => tagobj.tagName
    );

    interface ChapterObj {
      chapterId: number;
      chapterName: string;
      sortNum: number;
      wordCount: number;
      price: string;
      isFee: "0" | "1";
      isBuy: "0" | "1";
      volumeId: number;
      title: string;
      volumeSortNum: number;
      copyright: number;
    }

    interface BookChapterObj {
      bookId: number;
      bookName: string;
      authorName: string;
      endState: "1" | "2";
      latestChapterId: number;
      latestChapterName: string;
      chapterList: ChapterObj[];
      copyright: number;
    }

    const bookChapterObject: BookChapterObj = (unsafeWindow as any).__NEXT_DATA__.props.pageProps.bookChapter;
    const chapterList = bookChapterObject.chapterList;

    const chapters: Chapter[] = [];
    let chapterNumber = 0;
    let sectionName = null;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    for (const chapterObj of chapterList) {
      const chapterId = chapterObj.chapterId;
      const chapterUrl = `${document.location.origin}/chapter/${bookId}_${chapterId}`;
      const chapterName = chapterObj.chapterName;
      const _sectionName = chapterObj.title;
      if (sectionName !== _sectionName) {
        sectionName = _sectionName;
        sectionNumber++;
        sectionChapterNumber = 0;
      }
      chapterNumber++;
      sectionChapterNumber++;
      const isVIP = chapterObj.isFee === "1";
      const isPaid = chapterObj.isBuy === "1";
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
        options: {},
      });
      if (chapter.isVIP && !chapter.isPaid) {
        chapter.status = Status.aborted;
      }
      chapters.push(chapter);
    }
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

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    const data = {
      key: "ZUreQN0Epkpxh3pooWOgixjTfPwumCTYWzYTQ7SMgDnqFLQ1s9tqpVhkGf02we89moQwhSQ07DVzc3LWupRgbVvm29aYeY7zyFN",
      type1: "PC-Token",
      type2: "PC-UserInfo",
      type3: "PC-Enum",
      type4: "PC-IsActivityStart",
      f: "NpkTYvpvhJjEog8Y051gQDHmReY54z5t3F0zSd9QEFuxWGqfC8g8Y4GPuabq0KPdxArlji4dSnnHCARHnkqYBLu7iIw55ibTo18",
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function encrypt(input: string) {
      if (input && "string" === typeof input) {
        const key = CryptoJS.enc.Utf8.parse(data.key);
        return CryptoJS.DES.encrypt(input, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }).toString();
      }
    }

    function decrypt(input: string) {
      if (input && "string" === typeof input) {
        input = input.replace(/\n/g, "");
        const key = CryptoJS.enc.Utf8.parse(data.key);
        return CryptoJS.DES.decrypt(input, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
      }
    }

    const doc = await getHtmlDOM(chapterUrl, charset);

    interface ChapterObject {
      price: string;
      isFee: string;
      isBuy: string;
      failType: string;
      chapterId: number;
      chapterName: string;
      volumeId: number;
      bookId: number;
      wordCount: number;
      content: string;
      sortNum: number;
      remark: string | null;
      title: string;
      volumeSortNum: number;
      contentUpdateTime: string | null;
      imgList: string[] | null;
    }

    const nextDataElement = doc.getElementById("__NEXT_DATA__");
    if (!nextDataElement) {
      throw new Error("无法找到'__NEXT_DATA__'，下载失败");
    }
    const __NEXT_DATA__ = JSON.parse(nextDataElement.innerHTML);
    const pageProps = (__NEXT_DATA__ as any).props.pageProps;
    const chapterObj: ChapterObject = pageProps.chapterContent;
    if (!chapterObj || !chapterObj.content) {
      throw new Error("无法解析'chapterContent'，下载失败");
    }
    const content = document.createElement("div");
    const chapterContent = decrypt(chapterObj.content);
    if (chapterContent) {
      content.innerHTML = chapterContent.replace(/\n/g, "<br/><br/>");
      const { dom, text, images } = await cleanDOM(content, "TM");
      return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
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

/*
// $attrs: book
// window.__NEXT_DATA__.props.pageProps.book
{
    "bookId": 5028,
    "bookName": "被病娇包围的我只想日常",
    "authorId": 5170,
    "authorName": "嘀嘀哩嘀嘀",
    "authorPhoto": "https://img.ciyuanji.com/files/2021/06/28/a0ba042e01314c2699746b06fb3c5114.jpg",
    "authorNotes": "不过一条咸鱼罢了。",
    "firstClassify": 6,
    "firstClassifyName": "青春日常",
    "wordCount": 698885,
    "imgUrl": "https://img.ciyuanji.com/files/2021/06/30/d5eed18ed17d4b8791b5a34ba0c884a6.jpg",
    "blurryImgUrl": "https://img.ciyuanji.com/files/2021/06/30/d5eed18ed17d4b8791b5a34ba0c884a6.jpg",
    "notes": "【次元姬官方读者群：593728373】\n【作者个人读者群：468687689】\n沈逸：病娇是一种很可怕的生物，尤其当你没有办法拒绝她的时候...\n沈妍：哈？我似乎听见哥哥在说不好的话了呢~\n邹孤晴：沈同学，文学部下课后需要苦力。而且我也有些话想和你一个人说，你不会拒绝的，对吧。\n吴可欣：啊啊~~被青梅竹马嫌弃什么的根本不要呀，呼呼，看来只能启动修正程序了。\n一个“普通”的男子高中生，因为热爱推理与灵异无意中被卷入多人的恋爱旋涡，之后难道就是喜闻乐见的后宫与修罗场？\n才不是啊！你见过谁家后宫会用菜刀砍人的吗！\n被病娇包围的我只想回归日常而已啊！",
    "endState": "2",
    "latestUpdateTime": "2021-11-21 13:45:12",
    "latestChapterId": 2293968,
    "latestChapterName": "第三十八章 跑路英雄",
    "copyright": 1,
    "bookState": "8",
    "isVip": "1",
    "copyrightName": "次元姬",
    "copyrightNotes": "免责声明：本书已独家正版授权火文科技，如有问题可联系：kefu@huowenkeji.com，读者交流请加QQ群：744969981",
    "imgAlt": "被病娇包围的我只想日常",
    "chapterCount": 286,
    "ticketMonthCount": 26,
    "ticketDayCount": 8230,
    "bladeCount": 690,
    "rewardAmount": 60600,
    "pvCount": 763982,
    "pvTop": 2484,
    "topStr": "排同类书TOP 1%",
    "isRack": "0",
    "tagList": [
      { "tagId": 241, "tagName": "病娇" },
      { "tagId": 215, "tagName": "萝莉" },
      { "tagId": 59, "tagName": "修罗场" },
      { "tagId": 60, "tagName": "恋爱" },
      { "tagId": 19, "tagName": "后宫" }
    ],
    "totalMonthCount": 646,
    "isFee": "1",
    "firstChapterId": 2224599,
    "firstChapterName": "第一章 夜",
    "isAutoSub": "0"
}
*/
/*
// $router: "/bookDetails/catalog"
// data: bookChapter
// window.__NEXT_DATA__.props.pageProps.bookChapter
{
  "bookId": 6042,
  "bookName": "末世：我黑暗召唤师的身份被曝光了",
  "authorName": "晓夜圆舞曲",
  "endState": "2",
  "latestChapterId": 2294220,
  "latestChapterName": "第九十六章 为大局着想，你们不能杀我",
  "chapterList": [
    {
      "chapterId": 2281194,
      "chapterName": "第一章 只要被救过的人反杀，我就成神？",
      "sortNum": 10001,
      "wordCount": 2508,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281511,
      "chapterName": "第二章 那个渣男竟然舍得抛弃你？",
      "sortNum": 10002,
      "wordCount": 2679,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281568,
      "chapterName": "第三章 李纯欲这个名字很羞耻吧？",
      "sortNum": 10003,
      "wordCount": 2722,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281709,
      "chapterName": "第四章 她身上怎么干干净净的？",
      "sortNum": 10004,
      "wordCount": 2479,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281792,
      "chapterName": "第五章 闺蜜相残",
      "sortNum": 10005,
      "wordCount": 2186,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281849,
      "chapterName": "第六章 纯欲，你对我真是用心良苦",
      "sortNum": 10006,
      "wordCount": 2533,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2281907,
      "chapterName": "第七章 你到底吃了多少根火腿肠",
      "sortNum": 10007,
      "wordCount": 2063,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2290658,
      "chapterName": "第六十三章 我李纯欲怎么又被人惦记了？",
      "sortNum": 10063,
      "wordCount": 2591,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2290742,
      "chapterName": "上架感言，唠嗑唠嗑",
      "sortNum": 10064,
      "wordCount": 1696,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2290930,
      "chapterName": "第六十四章 他死了，你就恢复单身了（求自动订阅）",
      "sortNum": 10065,
      "wordCount": 2038,
      "price": "10.19",
      "isFee": "1",
      "isBuy": "1",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2290960,
      "chapterName": "第六十五章 我什么都答应你们",
      "sortNum": 10066,
      "wordCount": 2049,
      "price": "10.24",
      "isFee": "1",
      "isBuy": "1",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2290978,
      "chapterName": "第六十六章 我李纯欲长相甜美，怎么可能是凶手",
      "sortNum": 10067,
      "wordCount": 2041,
      "price": "10.20",
      "isFee": "1",
      "isBuy": "1",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2290989,
      "chapterName": "第六十七章 李纯欲要被气晕了",
      "sortNum": 10068,
      "wordCount": 2163,
      "price": "10.81",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2291035,
      "chapterName": "第六十八章 虫族的品阶",
      "sortNum": 10069,
      "wordCount": 2044,
      "price": "10.22",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2294220,
      "chapterName": "第九十六章 为大局着想，你们不能杀我",
      "sortNum": 10097,
      "wordCount": 2228,
      "price": "11.14",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24953,
      "title": "正文",
      "volumeSortNum": 1,
      "copyright": 1
    }
  ],
  "copyright": 1
}
*/
/*
{
  "bookId": 5013,
  "bookName": "mei博士，我氜猊仙人",
  "authorName": "鬼火少女鸭",
  "endState": "1",
  "latestChapterId": 2286395,
  "latestChapterName": "作者新书了《我草，遇见女神》",
  "chapterList": [
    {
      "chapterId": 2223081,
      "chapterName": "1.雪下的相遇",
      "sortNum": 10001,
      "wordCount": 2340,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 22569,
      "title": "念念不忘",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2223449,
      "chapterName": "2.念",
      "sortNum": 10002,
      "wordCount": 2338,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 22569,
      "title": "念念不忘",
      "volumeSortNum": 1,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2236823,
      "chapterName": "上架感言",
      "sortNum": 10080,
      "wordCount": 104,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 22569,
      "title": "念念不忘",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2237223,
      "chapterName": "76.塞西莉亚，生日快乐",
      "sortNum": 10081,
      "wordCount": 2081,
      "price": "10.40",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 22569,
      "title": "念念不忘",
      "volumeSortNum": 1,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2238684,
      "chapterName": "87.宇宙风暴（一卷结束）",
      "sortNum": 10092,
      "wordCount": 2058,
      "price": "10.29",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 22569,
      "title": "念念不忘",
      "volumeSortNum": 1,
      "copyright": 1
    },
    {
      "chapterId": 2238686,
      "chapterName": "1.天命财产→减10086",
      "sortNum": 20001,
      "wordCount": 2160,
      "price": "10.80",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 23235,
      "title": "第二崩坏",
      "volumeSortNum": 2,
      "copyright": 1
    },
    {
      "chapterId": 2239355,
      "chapterName": "2.西琳",
      "sortNum": 20002,
      "wordCount": 2062,
      "price": "10.31",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 23235,
      "title": "第二崩坏",
      "volumeSortNum": 2,
      "copyright": 1
    },
    {
      "chapterId": 2239356,
      "chapterName": "3.居家好男人",
      "sortNum": 20003,
      "wordCount": 2083,
      "price": "10.41",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 23235,
      "title": "第二崩坏",
      "volumeSortNum": 2,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2273254,
      "chapterName": "34.输了可不能哭鼻子哦",
      "sortNum": 30035,
      "wordCount": 2053,
      "price": "10.26",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24005,
      "title": "未来旅行",
      "volumeSortNum": 3,
      "copyright": 1
    },
    {
      "chapterId": 2273700,
      "chapterName": "35.离开",
      "sortNum": 30036,
      "wordCount": 2063,
      "price": "10.31",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24005,
      "title": "未来旅行",
      "volumeSortNum": 3,
      "copyright": 1
    },
    {
      "chapterId": 2274235,
      "chapterName": "1.德丽莎:我可以的",
      "sortNum": 40001,
      "wordCount": 2069,
      "price": "10.34",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24619,
      "title": "露娜的日常生活",
      "volumeSortNum": 4,
      "copyright": 1
    },
    …………
    {
      "chapterId": 2282514,
      "chapterName": "26.结局",
      "sortNum": 40026,
      "wordCount": 2219,
      "price": "11.09",
      "isFee": "1",
      "isBuy": "0",
      "volumeId": 24619,
      "title": "露娜的日常生活",
      "volumeSortNum": 4,
      "copyright": 1
    },
    {
      "chapterId": 2286395,
      "chapterName": "作者新书了《我草！遇见女神》",
      "sortNum": 40027,
      "wordCount": 153,
      "price": "0.00",
      "isFee": "0",
      "isBuy": "0",
      "volumeId": 24619,
      "title": "露娜的日常生活",
      "volumeSortNum": 4,
      "copyright": 1
    }
  ],
  "copyright": 1
}
*/

/*
// $route
{
  "_custom": {
    "type": "router",
    "abstract": true,
    "value": {
      "path": "/chapter/2268756",
      "query": { "bookId": "5847" },
      "params": { "chapterId": "2268756" },
      "fullPath": "/chapter/2268756?bookId=5847",
      "name": "chapter-chapterId",
      "meta": {}
    }
  }
}

//chapter
// window.__NEXT_DATA__.props.pageProps.chapterContent
// 次元姬已改为扁平结构：章节信息直接挂在 chapterContent 上，
// 加密正文在 content 字段，不再有嵌套的 chapter 对象和 chapterContentFormat 字段。
{
  "price": "0.00",
  "isFee": "0",
  "isBuy": "0",
  "failType": "7",
  "chapterId": 2266759,
  "chapterName": "第一章 转生了！史莱姆？",
  "volumeId": 24424,
  "bookId": 5824,
  "wordCount": 2101,
  "content": "Qr7U3V7ScsAu/tCdkD/idzt9SP7cVB34tGw1NwFzxiLgNTaRFpWMbq5mtrB1o+kankST809qp6qI\nU1N...",
  "sortNum": 10001,
  "remark": "——————————\n一键三连~啊果咭果咭，原来走错了，这里不是X站啊~",
  "title": "黑森林的史莱姆",
  "volumeSortNum": 1,
  "contentUpdateTime": null,
  "imgList": null
}
*/

// function sign(e, t) {
//   var n = Object(n_814.a)(),
//     r = new Date().getTime(),
//     param = encrypt(JSON.stringify(y(y({}, e), {}, { timestamp: r }))),
//     o = n_n_465()(
//       Object(n_464.a)(
//         "param="
//           .concat(param, "&requestId=")
//           .concat(n, "&timestamp=")
//           .concat(r, "&key=")
//           .concat(data.f)
//       )
//     );
//   return {
//     requestId: n,
//     timestamp: r,
//     param: t ? encodeURIComponent(param) : param,
//     sign: "string" != typeof o ? o : o.toLocaleUpperCase(),
//   };
// }
