import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { WeimengCMS, createWeimengForSite, WeimengChapterOptions } from "../lib/weimengcms";

export class Mangguoshufang extends BaseRuleClass {
  private weimengClient: WeimengCMS | null = null;

  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
    this.sleepTime = 500;
    this.maxSleepTime = 2000;
    
    // Initialize WeimengCMS client for this site
    try {
      log.debug("[Mangguoshufang] Initializing WeimengCMS client...");
      this.weimengClient = createWeimengForSite(window.location.origin);
      log.debug("[Mangguoshufang] WeimengCMS client initialized successfully");
    } catch (error) {
      log.error("[Mangguoshufang] Failed to initialize WeimengCMS client:", error);
      this.weimengClient = null;
    }
  }

  /**
   * Ensures WeimengCMS client is available, throws error if not
   */
  private ensureWeimengClient(): WeimengCMS {
    if (!this.weimengClient) {
      throw new Error("[Mangguoshufang] WeimengCMS client is not initialized. Cannot proceed with WeimengCMS operations.");
    }
    return this.weimengClient;
  }

  /**
   * Extracts chapter list page URL from the current page
   * @returns Promise resolving to chapter list URL or null if not found
   */
  private async getChapterListPageUrl(): Promise<string | null> {
    try {
      const config = this.ensureWeimengClient().getConfig();
      const chapterListPageLink = document.querySelector(config.selectors.CHAPTER_LIST_LINK) as HTMLAnchorElement;
      
      if (!chapterListPageLink) {
        log.warn(`[Mangguoshufang] ${config.errors.NO_CHAPTER_LIST_LINK} with selector '${config.selectors.CHAPTER_LIST_LINK}'`);
        return null;
      }

      const chapterListPageUrl = chapterListPageLink.href;
      log.debug(`[Mangguoshufang] Found chapter list page URL: ${chapterListPageUrl}`);
      
      return chapterListPageUrl;
    } catch (error) {
      log.error(`[Mangguoshufang] Error getting chapter list page URL:`, error);
      return null;
    }
  }

  /**
   * Extracts book metadata from the current page DOM
   * @returns Object containing book metadata
   */
  private async extractBookMetadata() {
    const config = this.ensureWeimengClient().getConfig();
    const bookUrl = document.location.href;
    
    const bookname = (
      document.querySelector(config.selectors.BOOK_TITLE) as HTMLElement
    )?.innerText.trim();
    
    const author = (
      document.querySelector(config.selectors.BOOK_AUTHOR) as HTMLElement
    )?.innerText
      .trim()
      .replace(/^作者：/, "");

    const introDom = document.querySelector(config.selectors.BOOK_INTRO) as HTMLElement;
    const [introduction, introductionHTML] = await introDomHandle(
      introDom,
      (introDom) => introDom,
    );

    const tags = [''];
    (document.querySelectorAll(config.selectors.BOOK_TAGS) as NodeListOf<HTMLAnchorElement>)
      .forEach((aElem) => tags.push(aElem.innerText.trim()));

    const additionalMetadate: BookAdditionalMetadate = {
      language: "zh",
      tags: tags,
    };

    const coverUrl = document.querySelector(config.selectors.BOOK_COVER)?.getAttribute("src") || null;
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    return {
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate
    };
  }

  /**
   * Fetches chapter list from the chapter list page
   * @returns Promise resolving to NodeListOf chapter links
   */
  private async fetchChapterList(): Promise<NodeListOf<Element>> {
    const config = this.ensureWeimengClient().getConfig();
    const emptyList = document.querySelectorAll("nonexistent"); // Create empty NodeList
    
    const chapterListPageUrl = await this.getChapterListPageUrl();
    
    if (!chapterListPageUrl) {
      log.warn(`[Mangguoshufang] Chapter list page URL not found. Returning empty chapter list.`);
      return emptyList;
    }

    try {
      log.debug(`[Mangguoshufang] Fetching chapter list from separate page: ${chapterListPageUrl}`);
      const chapterListDoc = await getHtmlDOM(chapterListPageUrl, this.charset);
      const aList = chapterListDoc.querySelectorAll(config.selectors.CHAPTER_LINKS);
      
      if (aList.length === 0) {
        log.warn(`[Mangguoshufang] ${config.errors.NO_CHAPTERS_FOUND}: ${chapterListPageUrl}`);
      }
      
      return aList;
    } catch (error) {
      log.warn(`[Mangguoshufang] ${config.errors.CHAPTER_LIST_FETCH_FAILED}: ${error}. Returning empty chapter list.`);
      return emptyList;
    }
  }

  /**
   * Creates Chapter objects from chapter link elements
   * @param aList - NodeList of chapter link elements
   * @param bookMetadata - Book metadata object
   * @returns Array of Chapter objects
   */
  private createChapterObjects(aList: NodeListOf<Element>, bookMetadata: any): Chapter[] {
    const chapters: Chapter[] = [];
    let chapterNumber = 0;

    for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
      const chapterName = aElem.innerText.trim();
      const chapterUrl = aElem.href;

      // Extract chapter ID from URL using the WeimengCMS library
      const chapterId = this.ensureWeimengClient().extractChapterIdFromUrl(chapterUrl);

      if (!chapterId) {
        log.warn(`Could not extract chapter ID from URL: ${chapterUrl}`);
        continue;
      }

      chapterNumber++;

      const chapter = new Chapter({
        bookUrl: bookMetadata.bookUrl,
        bookname: bookMetadata.bookname,
        chapterUrl,
        chapterNumber,
        chapterName,
        isVIP: false,
        isPaid: false,
        sectionName: null,
        sectionNumber: null,
        sectionChapterNumber: null,
        chapterParse: this.chapterParse.bind(this),
        charset: this.charset,
        options: { chapterId },
      });

      chapters.push(chapter);
    }

    return chapters;
  }

  /**
   * Main method to parse book information and chapters
   * @returns Promise resolving to Book object
   */
  public async bookParse() {
    // Extract book metadata from current page
    const bookMetadata = await this.extractBookMetadata();
    
    // Fetch chapter list from separate page
    const aList = await this.fetchChapterList();
    
    // Create chapter objects
    const chapters = this.createChapterObjects(aList, bookMetadata);

    return new Book({
      bookUrl: bookMetadata.bookUrl,
      bookname: bookMetadata.bookname,
      author: bookMetadata.author,
      introduction: bookMetadata.introduction,
      introductionHTML: bookMetadata.introductionHTML,
      additionalMetadate: bookMetadata.additionalMetadate,
      chapters,
    });
  }

  /**
   * Main method to parse chapter content from WeimengCMS API
   * @param chapterUrl - Chapter URL
   * @param chapterName - Chapter name (fallback)
   * @param isVIP - Whether chapter is VIP (unused for WeimengCMS)
   * @param isPaid - Whether chapter is paid (unused for WeimengCMS) 
   * @param charset - Character encoding
   * @param options - Chapter options containing chapterId
   * @returns Promise resolving to ChapterParseObject
   */
  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: WeimengChapterOptions,
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

    try {
      log.debug(`[Chapter] Requesting WeimengCMS API for chapter ID: ${chapterId}`);

      // Use WeimengCMS library to fetch and process chapter content
      const weimengClient = this.ensureWeimengClient();
      const chapterData = await weimengClient.fetchChapterContent(chapterId, chapterUrl);
      const contentRaw = weimengClient.processChapterContent(chapterData);

      // Use the chapter name from API response as fallback
      const finalChapterName = chapterData.chapter_name || chapterName;

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
