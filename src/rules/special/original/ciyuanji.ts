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
import { sandboxed } from "../../../lib/dom";

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
      id: number;
      chapterId: number;
      chapterName: string;
      volumeId: number;
      bookId: number;
      wordCount: number;
      content: null;
      chapterContentFormat: string;
      sortNum: number;
      createTime: string;
      updateTime: null;
      isDelete: "0";
      remark: null;
      title: string;
      volumeSortNum: number;
      thirdChapterId: null;
      thirdBookId: null;
      contentUpdateTime: string;
    }

    const __NEXT_DATA__ = JSON.parse(doc.querySelectorAll("script")[0].innerHTML);
    const chapterObj: ChapterObject = (__NEXT_DATA__ as any).props.pageProps.chapterContent.chapter;
    const content = document.createElement("div");
    const chapterContent = decrypt(chapterObj.chapterContentFormat);
    if (chapterContent) {
      content.innerHTML = chapterContent;
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
// window.props.pageProps.chapterContent.chapter
{
  "id": 2268756,
  "chapterId": 2268756,
  "chapterName": "第一章：堂主说副堂主",
  "volumeId": 24481,
  "bookId": 5847,
  "wordCount": 3259,
  "content": null,
  "chapterContentFormat": "5V74ELiyUCE1Hvf/3/80pp96PF6Z0YhxDZeHhS/xyvg7FC5a5EaWA8JOaQLmIrAOtrTwG/12H0Cd\nwTxAWSB1IZ3YuWL2qwRmZ1SpSW6/gK7bfH1xbqE+KmO+z+BhDzcOw7E9JSEyr9aeMlwWq8ysFB9F\nYosy1OtG7zQuoC2nmO2E83LYPJtJvtvUGPsXA4XU1el/=...",
  "sortNum": 10001,
  "createTime": "2021-09-13 14:49:08",
  "updateTime": null,
  "isDelete": "0",
  "remark": null,
  "title": "正文",
  "volumeSortNum": 1,
  "thirdChapterId": null,
  "thirdBookId": null,
  "contentUpdateTime": "2021-09-13 14:49:09"
}
*/
/*
{
  "id": 2290960,
  "chapterId": 2290960,
  "chapterName": "第六十五章 我什么都答应你们",
  "volumeId": 24953,
  "bookId": 6042,
  "wordCount": 2049,
  "content": null,
  "chapterContentFormat": "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",
  "sortNum": 10066,
  "createTime": "2021-11-13 14:24:53",
  "updateTime": null,
  "isDelete": "0",
  "remark": null,
  "title": "正文",
  "volumeSortNum": 1,
  "thirdChapterId": null,
  "thirdBookId": null,
  "contentUpdateTime": "2021-11-17 17:25:53"
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
