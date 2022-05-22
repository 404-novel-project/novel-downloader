import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import * as CryptoJS from "crypto-js";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { getImageAttachment } from "../../../lib/attachments";
import { log } from "../../../log";

export class Iqingguo extends BaseRuleClass {
  public constructor() {
    super();
    this.concurrencyLimit = 2;
    this.attachmentMode = "TM";
  }

  public async bookParse(): Promise<Book> {
    const bookId = new URLSearchParams(document.location.search).get("id");
    if (!bookId) {
      throw new Error("无法找到 bookId!");
    }

    const bookPath = `/v1/books/${bookId}/cover`;
    const catalogPath = `/v1/books/${bookId}/catalog`;

    const bookData = (await get<{ cover: book; others: book[] }>(bookPath))
      .cover;
    const catalogData = await get<chapter[]>(catalogPath);

    const bookUrl = document.location.href;
    const bookname = bookData.name;
    const author = bookData.user.author;
    const introduction = bookData.description;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = introduction;
    const coverUrl = bookData.url;
    const additionalMetadate: BookAdditionalMetadate = {
      lastModified: bookData.latestModified,
      tags: [bookData.genre, bookData.subGenre],
      language: "zh",
      ids: bookId,
    };
    if (coverUrl) {
      getImageAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((img) => {
          additionalMetadate.cover = img;
        })
        .catch((error) => log.error(error));
    }
    const chapters = catalogData.map((c) => {
      const chapterUrl =
        "https://www.iqingguo.com/book/reading?" +
        new URLSearchParams({ id: bookId, cid: c.id }).toString();
      return new Chapter({
        bookUrl,
        bookname,
        chapterUrl,
        chapterNumber: c.sn,
        chapterName: c.name,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: {
          bookId,
          chapterId: c.id,
        },
      });
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
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: chapterOptions
  ): Promise<ChapterParseObject> {
    const chapterPath = `/v1/chapters/${options.chapterId}`;
    const data = await get<chapterDetail>(chapterPath);
    chapterName = data.name;
    const contentRaw = document.createElement("div");
    contentRaw.innerText = data.content;
    const { dom, text, images } = await cleanDOM(contentRaw, "TM");
    const additionalMetadate: ChapterAdditionalMetadate = {
      lastModified: data.updateTime,
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

// https://www.iqingguo.com/_nuxt/2d2f134.js
function sign(path: string, params?: Record<string, string>) {
  params = params ?? {};
  Object.assign(params, {
    packageName: "com.iqingoo.reader.web",
    t: Math.ceil(new Date().getTime() / 1e3),
  });

  const orderd: Record<string, string> = Object.keys(params)
    .sort()
    .reduce((obj, key) => {
      obj[key] = (params as Record<string, string>)[key];
      return obj;
    }, {} as Record<string, string>);

  const l = path + "?" + new URLSearchParams(orderd).toString();
  orderd.sign = CryptoJS.MD5(decodeURI(l)).toString(CryptoJS.enc.Hex);
  return orderd;
}

async function get<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const origin = "https://iqg-api.qingoo.cn";
  const parm = sign(path, params);
  const url = origin + path + "?" + new URLSearchParams(parm).toString();
  const resp = await fetch(url, {
    headers: {
      accept: "application/json, text/plain, */*",
    },
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const _data = (await resp.json()) as apiResponse<T>;
  if (_data.code !== 200) {
    throw new Error("请求出错！ " + url);
  }
  return _data.data;
}

interface chapterOptions {
  bookId: string;
  chapterId: string;
}

interface chapter {
  id: string; //"628a40ffd9e9677766ff5a48",
  name: string; //"第401章  登门造访",
  sn: number; //401
}

interface chapterDetail extends chapter {
  bookId: string; //"621dc5c3d9e9677ba6a09f0c"
  content: string; //小说正文
  updateTime: number; //1653227775852
}

interface user {
  id: string; //"5fcdefd0d9e9676cf9c43282",
  author: string; //"晓看天色",
  follwerCount: number; //11,
  image: string; //"http://img.qingoo.cn/img/null.jpg",
  follow: boolean; //false
}

interface book {
  id: string; //"621dc5c3d9e9677ba6a09f0c",
  name: string; //"穿书后，我变成了世界第一反矫达人",
  description: string; //"苏离言作为钢铁直女，单身孤寡了二十年。\n月老给她牵的红线，哪怕是个钢丝，她都能剪断。\n就是这样的她，一不小心穿越进总裁虐文书里，还成了被虐的女主。\n苏离言觉得——\n这书里的人，除了老娘，都特么有病！\n面对为了给母亲治病，苦苦不肯离婚的女主，苏离言翻了翻白眼。\n“离婚财产分一半，与其巴着男人受虐，不如多去读点书。”\n面对霸道总裁附体的男主，时不时还给她来个壁咚床咚，苏离言无语。\n“大哥这是得了什么病？可曾吃过什么药？小学生都没你这么中二了好吧？”\n",
  genre: string; //"现代言情",
  attribute: "serialize" | "finish";
  status: string; //"enable",
  imageId: string; //"6247f48db26c3a389a9d4712",
  bannerId: string | null;
  subGenre: string; //"豪门世家",
  created: number; //1646118339969,
  latestModified: number; //1653227775852,
  lastChapterId: string; //"628a40ffd9e9677766ff5a48",
  lastChapterSn: number; //401,
  lastChapterName: string; //"第401章  登门造访",
  firstChapterId: string; //"621dc63ed9e9677ba6a09f21",
  firstChapterSn: 1;
  firstChapterName: string; //"第1章 穿越",
  author: string; //"晓看天色",
  userId: string; //"5fcdefd0d9e9676cf9c43282",
  wordCount: number; //403067;
  subscribeCount: number | null;
  clickCount: number; //0;
  readCount: number; //12083;
  keepRate7: number; //0;
  keepRate1: number; //0;
  dayPv: number; //15;
  weekPv: number; //411;
  monthPv: number | null;
  bannerConfig: null;
  follwerCount: number; //11;
  commentCount: number | null;
  follow: boolean; //false;
  authorImage: string; //"http://img.qingoo.cn/img/null.jpg",
  score: number; //0;
  scoreNumber: number; //0;
  supportFans: number; //0;
  gender: string; //"girl",
  chapter: chapter;
  user: user;
  fansImages: [];
  fansValue: null;
  lastChapterUpdate: number; //1653126316771;
  url: string; //"http://img.qingoo.cn/img/6247f48db26c3a389a9d4712.jpg",
  bannerUrl: string; //""
}

interface apiResponse<T> {
  code: number; //200
  data: T;
  message: string; //"success"
}
