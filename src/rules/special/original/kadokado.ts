import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { getAttachment } from "../../../lib/attachments";
import { log } from "../../../log";
import { ggetText } from "../../../lib/http";

interface KadokadoCollection {
  collectionId: number;
  collectionDisplayName: string;
  chapters: KadokadoChapter[];
}

interface KadokadoChapter {
  chapterId: number;
  chapterDisplayName: string;
  isFree: boolean;
  points: number;
}

interface KadokadoTitleInfo {
  titleId: number;
  ownerId: number;
  displayName: string;
  logline: string;
  tags: string[];
  coverUrls: string[];
  ownerDisplayName: string;
  authors: { id: number; displayName: string }[];
  totalChapterCount: number;
  firstChapterId: number;
  collectionEpisodes: { collectionId: number; displayName: string }[];
}

interface KadokadoChapterContent {
  type: string;
  content: string;
  imageUrls: string[];
}

export class kadokado extends BaseRuleClass {
  public constructor() {
    super();
    this.maxRunLimit = 1;
    this.sleepTime = 700;
    this.maxSleepTime = 4000;
    this.concurrencyLimit = 1;
    this.attachmentMode = "TM";
  }

  public async bookParse(): Promise<Book> {
    const bookUrl = document.location.href;
    const bookIDMatch = bookUrl.match(/book\/(\d+)/);
    const bookID = bookIDMatch ? bookIDMatch[1] : "000";

    const titleInfoUrl = `https://api.kadokado.com.tw/v2/titles/${bookID}`;
    const titleInfoText = await ggetText(titleInfoUrl);
    if (!titleInfoText) {
      throw new Error("抓取作品資訊失敗！");
    }
    const titleInfo: KadokadoTitleInfo = JSON.parse(titleInfoText as string);

    const bookname = titleInfo.displayName;
    const author = titleInfo.ownerDisplayName;
    const introduction = titleInfo.logline;
    const introductionHTML = document.createElement("div");
    introductionHTML.innerText = introduction;
    const coverUrl = titleInfo.coverUrls?.[0];

    const additionalMetadate: BookAdditionalMetadate = {
      tags: titleInfo.tags,
      language: "zh",
    };
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((img) => {
          additionalMetadate.cover = img;
        })
        .catch((error) => log.error(error));
    }

    const collectionUrl = `https://api.kadokado.com.tw/v3/title/${bookID}/collection`;
    const collectionText = await ggetText(collectionUrl);
    if (!collectionText) {
      throw new Error("抓取章節目錄失敗！");
    }
    const collections: KadokadoCollection[] = JSON.parse(
      collectionText as string
    );

    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionChapterNumber = 0;
    const chapters: Chapter[] = [];
    for (const collection of collections) {
      sectionChapterNumber = 0;
      sectionNumber++;
      const sectionName = collection.collectionDisplayName;
      for (const ch of collection.chapters) {
        const chapterUrl = `https://www.kadokado.com.tw/chapter/${ch.chapterId}`;
        chapterNumber++;
        sectionChapterNumber++;
        chapters.push(
          new Chapter({
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName: ch.chapterDisplayName,
            isVIP: !ch.isFree,
            isPaid: false,
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            chapterParse: this.chapterParse,
            charset: this.charset,
            options: { chapterId: ch.chapterId },
          })
        );
      }
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
    isPaid: boolean | null,
    charset: string,
    options: { chapterId: number }
  ): Promise<ChapterParseObject> {
    const { chapterId } = options;
    const contentUrl = `https://api.kadokado.com.tw/v3/chapter/${chapterId}/content`;
    const contentText = await ggetText(contentUrl);
    if (!contentText) {
      throw new Error(`抓取章節內容失敗！chapterId=${chapterId}`);
    }
    const contentData: KadokadoChapterContent = JSON.parse(
      contentText as string
    );

    const contentRaw = document.createElement("div");
    contentRaw.innerHTML = contentData.content ?? "";

    const { dom, text, images } = await cleanDOM(contentRaw, "TM");
    return {
      chapterName,
      contentRaw,
      contentText: text,
      contentHTML: dom,
      contentImages: images,
      additionalMetadate: null,
    };
  }
}
