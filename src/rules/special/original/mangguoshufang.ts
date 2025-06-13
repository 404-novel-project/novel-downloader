import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

interface ApiResponse {
  code: number;
  msg: string;
  count: number; // number of propreties in data?
  data: {
    novel?: {
      novel_author: string;
      novel_chapter: string; // number of chapters
      novel_cover: string; // cover image URL
      novel_id: string; // number in string
      novel_info: string; // description
      novel_newcid: string; // latest(new) chapter id
      novel_newcname: string; // latest(new) chapter name
      novel_pinyin: string; // pinyin of novel name
      novel_process: string; // unknown
      novel_startcid: string; // start chapter id
      novel_startcname: string; // start chapter name
      novel_wordnumber: string; // total word count
      type_id: string; // genre id
      type_name: string; // genre name
    };
    chapter?: {
      author_id: string; // number in string
      chapter_cid: string; // unknown
      chapter_id: string; // number in string
      chapter_islogin: string; // unknown
      chapter_ispay: string; // is paid? "0" = no
      chapter_istxt: string; // is text? "0" = no, "1" = yes
      chapter_isvip: string; // is VIP? "0" = no, "1" = yes
      chapter_name: string; // chapter name
      chapter_nid: string; // novel id
      chapter_number: string; // unknown
      chapter_order: string; // unknown
      chapter_status: string; // unknown
      chapter_time: string; // timestamp of chapter creation in mangguoshufang
      chapter_type: string; // "公众章节"
      chapter_vid: string; // unknown?
      content: string[]; // array of content strings, each string is a paragraph
      is_content: boolean; // unknown
      is_sub: number; // unknown
      novel_id: string; // novel id
      type_id: string; // genre id
      volume_desc: string; // volume description "正文内容"
      volume_name: string; // volume name "正文"
    };
    prev?: {
      chapter_id: string; // number in string. 0 if no chapter.
      chapter_name: string; // chapter name. empty if no chapter.
    };
    next?: {
      chapter_id: string; // number in string. 0 if no chapter.
      chapter_name: string; // chapter name. empty if no chapter.
    };
    price?: {
      sell_month: string; // number in string
      sell_all: string; // number in string
      sell_number: string; // number in string
    };
  };
}

export class Mangguoshufang extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
    this.sleepTime = 500;
    this.maxSleepTime = 2000;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".x-detail__info--title") as HTMLElement
    )?.innerText.trim();
    const author = (
      document.querySelector(".x-detail__info--author") as HTMLElement
    )?.innerText
      .trim()
      .replace(/^作者：/, "");

    const introDom = document.querySelector(".x-detail__intro") as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(
      introDom,
      (introDom) => introDom,
    );

    const additionalMetadate: BookAdditionalMetadate = {
      language: "zh",
    };

    const coverUrl =
      document.querySelector(".x-book__cover")?.getAttribute("src") || null;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    const chapters: Chapter[] = [];
    const aList = document.querySelectorAll("#wrapper > .x-catalog__list > a");
    let chapterNumber = 0;

    for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
      const chapterName = aElem.innerText.trim();
      const chapterUrl = aElem.href;

      // Extract chapter ID from URL - URL format like /1/123/read/12345.html
      const chapterIdMatch = chapterUrl.match(/\/read\/(\d+)\.html$/);
      const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

      if (!chapterId) {
        log.warn(`Could not extract chapter ID from URL: ${chapterUrl}`);
        continue;
      }

      chapterNumber++;

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
        chapterParse: this.chapterParse,
        charset: this.charset,
        options: { chapterId },
      });

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
    options: { chapterId: string },
  ): Promise<ChapterParseObject> {
    const { chapterId } = options;

    if (!chapterId) {
      log.error(`No chapter ID found for ${chapterUrl}`);
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    const apiUrl = `https://mangguoshufang.com/wmcms/ajax/index.php?action=novel.getchapter&cid=${chapterId}&format=1`;

    try {
      log.debug(`[Chapter] Requesting API: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Referer: chapterUrl,
          "User-Agent": navigator.userAgent,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(`API Error: ${data.msg}`);
      }

      if (!data.data.chapter) {
        throw new Error(`API Error: No chapter data found`);
      }

      // Create content element from API response
      const contentRaw = document.createElement("div");

      // The content is an array of strings, join them as paragraphs
      if (Array.isArray(data.data.chapter.content)) {
        data.data.chapter.content.forEach((paragraph, index) => {
          if (paragraph.trim()) {
            const p = document.createElement("p");
            p.textContent = paragraph.trim();
            contentRaw.appendChild(p);
            // add empty line between paragraphs
            const br = document.createElement("br");
            contentRaw.appendChild(br);
          }
        });
      }

      // Use the chapter name from API response
      const finalChapterName = data.data.chapter.chapter_name || chapterName;

      const { dom, text, images } = await cleanDOM(
        contentRaw,
        this.attachmentMode,
      );

      return {
        chapterName: finalChapterName,
        contentRaw,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
      };
    } catch (error) {
      log.error(`[Chapter] Failed to fetch content for ${chapterUrl}:`, error);
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
