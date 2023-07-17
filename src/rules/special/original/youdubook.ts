import { log } from "../../../log";
import { getAttachment } from "../../../lib/attachments";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Chapter } from "../../../main/Chapter";
import { Status } from "../../../main/main";
import { cleanDOM } from "../../../lib/cleanDOM";
import { sleep } from "../../../lib/misc";

export class Youdubook extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookId = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
    const apiBase = "https://pre-api.youdubook.com";
    const ossBase = "https://oss.youdubook.com";
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    const site = 1;
    const baseHeader: Record<string, string> = {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
      Site: site.toString(),
    };
    const signIn = token !== "";

    const webNovelDetailUrl = new URL(`${apiBase}/api/webNovelDetail`);
    webNovelDetailUrl.searchParams.set("novel_id", bookId);
    const respW = await fetch(webNovelDetailUrl.href, {
      credentials: "include",
      headers: {
        "Cache-Control": "max-age=0",
        ...baseHeader,
      },
      method: "GET",
      mode: "cors",
    });
    const webNovelDetail = (await respW.json()) as webNovelDetail;
    if (webNovelDetail.code !== 200) {
      throw new Error("获取书籍信息出错！");
    }
    const bookname = webNovelDetail.data.novel_name;
    const author = webNovelDetail.data.novel_author;
    const introduction = webNovelDetail.data.novel_info;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = introduction;
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = `${ossBase}${webNovelDetail.data.novel_cover}`;
    getAttachment(coverUrl, this.attachmentMode, "cover-")
      .then((coverClass) => {
        additionalMetadate.cover = coverClass;
      })
      .catch((error) => log.error(error));
    additionalMetadate.tags = webNovelDetail.data.novel_tags
      .split(",")
      .map((t) => t.trim());
    additionalMetadate.tags.push(webNovelDetail.data.type_name);
    additionalMetadate.lastModified = webNovelDetail.data.novel_uptime;

    const directoryListUrl = new URL(`${apiBase}/api/directoryList`);
    directoryListUrl.searchParams.set("nid", bookId);
    directoryListUrl.searchParams.set("orderBy", "0");
    const respD = await fetch(directoryListUrl.href, {
      credentials: "include",
      headers: baseHeader,
      method: "GET",
      mode: "cors",
    });
    const directoryList = (await respD.json()) as directoryList;
    if (directoryList.code !== 200) {
      throw new Error("获取目录信息失败！");
    }
    const volumes = directoryList.data.volume.reduce((obj, vol) => {
      obj[vol.volume_id] = {
        name: vol.volume_name,
        order: vol.volume_order,
        desc: vol.volume_desc,
      };
      return obj;
    }, {} as { [index: number]: { name: string; order: number; desc: string } });
    const chapters: Chapter[] = [];
    let i = 0;
    let tSectionName = null;
    let s = 0;
    let sc = 0;
    for (const c of directoryList.data.data) {
      i++;
      const chapterUrl = "";
      const chapterName = c.chapter_name;
      const chapterNumber = i;

      const isVIP = c.chapter_ispay === 1;
      const isPaid = c.is_subscribe === 1;

      const sectionName = volumes[c.chapter_vid].name;
      if (tSectionName !== sectionName) {
        tSectionName = sectionName;
        s++;
        sc = 0;
      }
      const sectionNumber = s;
      sc++;
      const sectionChapterNumber = sc;

      const options: chapterOptions = {
        nid: c.chapter_nid,
        vid: c.chapter_vid,
        chapter_id: c.chapter_id,
        chapter_order: c.chapter_order,
        apiBase,
        headers: baseHeader,
      };

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
        options,
      });
      if (signIn) {
        if (chapter.isVIP && chapter.isPaid === false) {
          chapter.status = Status.aborted;
        }
      } else {
        if (chapter.isVIP) {
          chapter.status = Status.aborted;
        }
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
    options: chapterOptions
  ): Promise<ChapterParseObject> {
    const readNewUrl = new URL(`${options.apiBase}/api/readNew`);
    readNewUrl.searchParams.set("nid", options.nid.toString());
    readNewUrl.searchParams.set("vid", options.vid.toString());
    readNewUrl.searchParams.set("chapter_id", options.chapter_id.toString());
    readNewUrl.searchParams.set(
      "chapter_order",
      options.chapter_order.toString()
    );
    readNewUrl.searchParams.set("showpic", false.toString());
    readNewUrl.searchParams.set("is_cut", "");

    const resp = await fetch(readNewUrl.href, {
      credentials: "include",
      headers: options.headers,
      method: "GET",
      mode: "cors",
    });
    const readNew = (await resp.json()) as readNew;
    if (readNew.code !== 200) {
      throw new Error("获取章节内容失败！ " + JSON.stringify(options));
    }
    const contentRaw = document.createElement("p");
    contentRaw.innerText = readNew.data.content;
    const { dom, text, images } = await cleanDOM(contentRaw, "TM");
    await sleep(4200 * Math.random());
    return {
      chapterName,
      contentRaw,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate: { lastModified: readNew.data.chapter_uptime },
    };
  }
}

interface chapterOptions {
  nid: number;
  vid: number;
  chapter_id: number;
  chapter_order: number;
  apiBase: string;
  headers: Record<string, string>;
}

interface propLog {
  id: number;
  user_id: number;
  novel_id: number;
  type: number;
  msg: string;
  add_time: number;
  created_at: string;
  updated_at: string;
  user_nickname: string;
}

interface novel3 {
  novel_name: string;
  novel_cover: string;
  novel_info: string;
  novel_uptime: number;
  novel_id: number;
  type_id: number;
  second_type: number;
  novel_process: number;
  novel_newcid: number;
  type_name: string;
  second_typename: string;
  novel_process_name: string;
  novel_copyright_name: string;
  channel_name: null;
  sign_name: string;
  sell_name: string;
  scan_rank_status_name: string;
}

interface novel2 {
  novel_id: number;
  novel_name: string;
  novel_cover: string;
  novel_author: string;
  novel_info: string;
  novel_tags: string;
  novel_wordnumber: number;
  type_name: string;
  third_type_name: string;
  second_type_name: string;
  first_type_name: string;
  novel_uptime: number;
  novel_sex: number;
  type_id: number;
  second_type: number;
  novel_process: number;
  novel_process_name: string;
  author_id: number;
  user_id: number;
  site_status: number;
}

interface novel {
  novel_id: number;
  novel_name: string;
  novel_cover: string;
  novel_process_name: string;
  novel_copyright_name: string;
  channel_name: null;
  sign_name: string;
  sell_name: string;
  scan_rank_status_name: string;
}

interface urge {
  number: number;
  urge_uid: number;
  user_nickname: string;
  user_head: string;
  user_id: number;
  fan_level: number;
  fan_name: string;
}

interface fans {
  fans_user_id: number;
  fans_exp: number;
  user_id: number;
  user_nickname: string;
  user_head: string;
  fan_level: number;
  fan_name: string;
}

interface comment {
  id: number;
  novel_id: number;
  form_uid: number;
  comment_content: string;
  img: [];
  like_num: number;
  istop: number;
  isbest: number;
  count: number;
  last_reply_user_id: number;
  last_reply_id: number;
  last_reply_time: number;
  is_delete: number;
  create_time: number;
  filter_content: string;
  isding: number;
  fanslevel: number;
  fanslevelname: string;
  user_id: number;
  user_nickname: string;
  user_head: string;
  user_finance_level: number;
  user_finance_level_name: string;
  is_author: number;
  author_nickname: string;
}

interface webNovelDetail {
  code: number;
  message: string;
  data: {
    novel_id: number;
    author_id: number;
    novel_name: string;
    novel_cover: string;
    novel_info: string;
    novel_wordnumber: number;
    novel_startcid: number;
    novel_newcname: string;
    novel_newcid: number;
    novel_author: string;
    novel_uptime: number;
    novel_createtime: number;
    novel_tags: string;
    novel_process: number;
    type_id: number;
    second_type: number;
    rec_ticket: number;
    novel_status: number;
    novel_sex: number;
    novel_sign_id: number;
    novel_sell: number;
    novel_hotvalue: number;
    novel_comment_number: number;
    site_status: number;
    medal: [];
    last_novel_growroad: string;
    type_name: string;
    second_typename: string;
    rewardcount: number;
    propscount: number;
    commentlist: comment[];
    comment_number: number;
    firstfans: fans[];
    firsturge: urge[];
    is_shelf: boolean;
    is_subscribe: number;
    is_popup: number;
    month_ticket: number;
    urgenum: string;
    vipwordnum: string;
    chapter_id: number;
    chapter_cid: number;
    chapter_order: number;
    chapter_vid: number;
    chapter_ispay: number;
    chapter_name: string;
    chapter_uptime: number;
    price: number;
    user_id: number;
    same_rec: novel[];
    read_this_novel: novel[];
    bzqt: novel2[];
    author_page: {
      author_id: number;
      user_id: number;
      author_status: number;
      author_nickname: string;
      author_info: string;
      author_notice: string;
      author_time: number;
      author_toptime: number;
      novel_number: number;
      novel_sign_number: number;
      novel_words_number: number;
      sign_status: number;
      level_id: number;
      is_column: number;
      column_id: number;
      column_sign: number;
      column_count: number;
      user_head: string;
      level: string;
      days: number;
      novelsum: number;
      wordersum: number;
      novels: novel3[];
      author_status_name: string;
      sign_status_name: string;
    };
    user_fans: {
      fan_exp: number;
      fan_level: number;
      fan_name: string;
      user_head: string;
    };
    user_props_log: propLog[];
    novel_process_name: string;
    novel_copyright_name: string;
    channel_name: string;
    sign_name: string;
    sell_name: string;
    scan_rank_status_name: string;
  };
}

interface chapter {
  chapter_id: number; //669182,
  chapter_islogin: number; //0,
  chapter_isvip: number; //0,
  chapter_ispay: number; //0,
  chapter_number: number; //2096,
  chapter_name: string; //"第一章    流血的东京",
  chapter_nid: number; //51019,
  chapter_vid: number; //61622,
  chapter_cid: number; //677972,
  chapter_order: number; //181338,
  chapter_time: number; //1611885666,
  chapter_uptime: number; //1611885666
  chapter_pirce?: string; //"11.88"
  is_subscribe?: number;
}

interface volume {
  volume_id: number; //61622,
  volume_name: string; //"第一卷",
  volume_order: number; //5,
  volume_desc: string; //"暂无简介"
}

interface directoryList {
  code: number;
  message: string;
  data: {
    volume: volume[];
    data: chapter[];
  };
}

interface readNew {
  code: number;
  message: string;
  data: {
    chapter_id: number;
    chapter_status: number;
    chapter_islogin: number;
    chapter_isvip: number;
    chapter_ispay: number;
    chapter_istxt: number;
    chapter_number: number;
    chapter_name: string;
    chapter_nid: number;
    chapter_vid: number;
    chapter_cid: number;
    chapter_order: number;
    chapter_path: null;
    chapter_time: number;
    chapter_uptime: number;
    subscribe_number: number;
    chip_in_number: number;
    segment_comment_number: number;
    chapter_comment_number: number;
    now_subscribe_number: number;
    volume: {
      volume_id: number;
      volume_name: string;
      volume_nid: number;
      volume_desc: string;
      volume_order: number;
      volume_time: number;
      is_first: number;
    };
    chapter_say: null;
    content: string;
    prev_chapter: number;
    prev_chapter_order: number;
    prev_chapter_ispay: number;
    prev_chapter_is_subscribe: number;
    next_chapter: number;
    next_chapter_order: number;
    next_chapter_ispay: number;
    next_chapter_is_subscribe: number;
    is_subscribe: number;
    chapter_comment: [];
    auto_subscribe: number;
    is_popup: number;
    price: number;
    user_gold2?: number;
  };
}
