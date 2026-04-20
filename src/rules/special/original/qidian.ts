import { getAttachment } from "../../../lib/attachments";
import { cleanDOM, htmlTrim } from "../../../lib/cleanDOM";
import { getFrameContentCondition, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rm2 } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { FilenameDecoder } from "../../../lib/decoders/FilenameDecoder";
import { HashDecoder } from "../../../lib/decoders/HashDecoder";
import { OCRDecoder, OCRResult } from "../../../lib/decoders/OCRDecoder";
import { ImageCache } from "../../../lib/decoders/ImageCache";

/**
 * Image text decoder for Qidian that implements 3-step decoding logic:
 * 1. Filename-based mapping (fastest, no download needed)
 * 2. Hash-based mapping (fast, requires download)
 * 3. OCR (slowest, most accurate)
 */
class QidianImageDecoder {
  private filenameDecoder: FilenameDecoder;
  private hashDecoder: HashDecoder;
  private ocrDecoder: OCRDecoder;
  private mappingCache: { [imageUrl: string]: string } = {};
  private failedImages: string[] = [];
  private readonly PLACEHOLDER_CHAR = "▢";

  constructor() {
    this.filenameDecoder = new FilenameDecoder("www.qidian.com");
    this.hashDecoder = new HashDecoder("www.qidian.com");
    this.ocrDecoder = new OCRDecoder();
  }

  async init(): Promise<void> {
    log.debug("[QidianImageDecoder] Decoder initialized");
  }

  async close(): Promise<void> {
    this.mappingCache = {};
    await this.ocrDecoder.close();
    const imageCache = ImageCache.getInstance();
    imageCache.clearCache();

    if (this.failedImages.length > 0) {
      log.warn(`[QidianImageDecoder] ${this.failedImages.length} images failed to decode:`);
      this.failedImages.forEach((url, index) => {
        log.warn(`  ${index + 1}. ${url}`);
      });
      log.warn(`These images were replaced with placeholder character: "${this.PLACEHOLDER_CHAR}"`);
    }

    log.debug("[QidianImageDecoder] Decoder closed and image cache cleared");
  }

  async decodeImage(imageUrl: string): Promise<string> {
    if (this.mappingCache[imageUrl]) {
      return this.mappingCache[imageUrl];
    }

    try {
      // Step 1: Try filename-based mapping first (fastest)
      const filename = this.getFilenameFromUrl(imageUrl);

      const filenameChar = await this.filenameDecoder.decodeFromFilename(filename);
      if (filenameChar) {
        log.debug(`[QidianImageDecoder] Filename match: ${filename} -> ${filenameChar}`);
        this.mappingCache[imageUrl] = filenameChar;
        return filenameChar;
      }

      // Download image data only if filename mapping fails
      const imageData = await this.downloadImageData(imageUrl);

      // Step 2: Try hash-based mapping (fast, requires download)
      const hashChar = await this.hashDecoder.decode(imageData);
      if (hashChar) {
        log.debug(`[QidianImageDecoder] Hash match: ${filename} -> "${hashChar}"`);
        this.mappingCache[imageUrl] = hashChar;
        return hashChar;
      }

      // Step 3: Try OCR as final method (slowest, most accurate)
      const ocrResult = await this.ocrDecoder.decode(imageData);
      if (ocrResult && ocrResult.confidence >= 0.90) {
        const ocrChar = ocrResult.text;
        log.debug(`[QidianImageDecoder] OCR success: ${filename} (${imageUrl}) -> "${ocrChar}" (confidence: ${Math.round(ocrResult.confidence * 100)}%)`);

        // Learn the successful OCR result for future use
        try {
          await this.hashDecoder.learnMapping(imageData, ocrChar);
          await this.filenameDecoder.learnMapping(filename, ocrChar);
          log.debug(`[QidianImageDecoder] Learned both hash and filename mappings for: ${filename} -> "${ocrChar}"`);
        } catch (learningError) {
          log.warn(`[QidianImageDecoder] Failed to learn mappings for ${filename}:`, learningError);
        }

        this.mappingCache[imageUrl] = ocrChar;
        return ocrChar;
      } else if (ocrResult) {
        log.error(`[QidianImageDecoder] OCR confidence too low: ${Math.round(ocrResult.confidence * 100)}% < 90% for ${filename}`);
      }

      // All methods failed - use placeholder and track failed image
      log.warn(`[QidianImageDecoder] All decoding methods failed for: ${imageUrl}`);
      this.failedImages.push(imageUrl);
      this.mappingCache[imageUrl] = this.PLACEHOLDER_CHAR;
      return this.PLACEHOLDER_CHAR;
    } catch (error) {
      log.error(`[QidianImageDecoder] Error during decoding process for ${imageUrl}:`, error);

      this.failedImages.push(imageUrl);
      this.mappingCache[imageUrl] = this.PLACEHOLDER_CHAR;
      return this.PLACEHOLDER_CHAR;
    }
  }

  private getFilenameFromUrl(url: string): string {
    return url.split("/").pop() || "";
  }

  private async downloadImageData(imageUrl: string): Promise<Uint8Array> {
    const imageCache = ImageCache.getInstance();
    return await imageCache.getImageData(imageUrl);
  }

  getFailedImagesCount(): number {
    return this.failedImages.length;
  }

  getPlaceholderChar(): string {
    return this.PLACEHOLDER_CHAR;
  }
}

export class Qidian extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    if (bookUrl.match("www.qidian.com/book/")) {
      return this.bookParse_www();
    }
    else return this.bookParse_book();
  }
  public async bookParse_www() { 
    const _csrfTokenMatch = document.cookie.match(/(?:^|; )_csrfToken=([^;]*)/);
    const _csrfToken = _csrfTokenMatch ? decodeURIComponent(_csrfTokenMatch[1]) : null;
    if (!_csrfToken) {
      throw new Error("未发现 _csrfToken");
    }
    const bookUrl = document.location.href;
    const bookIdMatch = bookUrl.match(/www\.qidian\.com\/book\/(\d+)/);
    const bookId = bookIdMatch ? bookIdMatch[1] : null;
    // const newurl = "https://book.qidian.com/info/" + bookId?.toString();
    const author = (document.querySelector(".author") as HTMLElement)?.innerText;
    const authorId = document
      .getElementById("authorId")
      ?.getAttribute("data-authorid");
    const bookname = (document.querySelector("#bookName") as HTMLElement)?.innerText;
    const introDom = document.querySelector("#book-intro-detail");
    const [introduction, introductionHTML] = await introDomHandle(introDom);
    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#bookImg > img") as HTMLImageElement
    ).src.slice(0, -5);
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll("#all-label > a")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());
    const limitFree = Boolean(
      document.querySelector("#bookImg > div.limit-flag")
    );
    log.info(`[Book]限免书籍 ${limitFree}`);

    const sections = document.querySelectorAll(
      ".catalog-volume"
    );
    let chapterNumber = 0;
    const chapters: Chapter[] = [];

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (s.querySelector(".volume-name") as HTMLElement).innerText
        .trim()
        .split("\n")
        .slice(-1)[0]
        .split("·")[0]
        .trim();
      const isVIP = (s.querySelector(".volume-header") as HTMLElement)?.innerText?.includes("VIP") ?? false;
      let sectionChapterNumber = 0;
      const cs = s.querySelectorAll("ul.volume-chapters > li");
      for (const c of Array.from(cs)) {
        const a = c.querySelector("a");
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

        const isPaid =()=> {
          if (isVIP) {
            return c.querySelector(".chapter-locked") == null;
          }
          return false;
        };
        let chapterId;
        if (isVIP) {
          chapterId = /(\d+)\/?$/.exec(chapterUrl)?.slice(-1)[0] ?? null;
        } else {
          chapterId = null;
        }
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: isVIP,
          isPaid: isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {
            _csrfToken,
            bookId,
            authorId,
            chapterId,
            limitFree,
          },
        });

        const isLogin = () => {
          const signInDom = document.querySelector(".sign-in");
          const signOutDom = document.querySelector(".sign-out");
          if (signInDom && signOutDom) {
            if (Array.from(signOutDom.classList).includes("hidden")) {
              return true;
            }
          }
          return false;
        };
        if (isVIP) {
          chapter.status = Status.aborted;
          if (limitFree) {
            chapter.status = Status.pending;
          }
          if (chapter.isPaid) {
            chapter.status = Status.pending;
          }
        }
        //
        chapters.push(chapter);
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

  public async bookParse_book() {
    let bookId: HTMLElement | string | null =
      document.getElementById("bookImg");
    if (bookId) {
      bookId = bookId.getAttribute("data-bid");
    } else {
      throw new Error("未发现 bookId");
    }
    const authorId = document
      .getElementById("authorId")
      ?.getAttribute("data-authorid");
    const _csrfTokenMatch = document.cookie.match(/(?:^|; )_csrfToken=([^;]*)/);
    const _csrfToken = _csrfTokenMatch ? decodeURIComponent(_csrfTokenMatch[1]) : null;
    if (!_csrfToken) {
      throw new Error("未发现 _csrfToken");
    }
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector(".book-info > h1 > em") as HTMLElement
    ).innerText.trim();

    const author = (
      document.querySelector(
        ".book-info .writer, .book-info > h1:nth-child(1) > span:nth-child(2)"
      ) as HTMLElement
    ).innerText
      .replace(/作\s+者:/, "")
      .replace(/\s+著$/, "")
      .trim();
    const introDom = document.querySelector(".book-info-detail .book-intro");
    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = (
      document.querySelector("#bookImg > img") as HTMLImageElement
    ).src.slice(0, -5);
    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }
    additionalMetadate.tags = Array.from(
      document.querySelectorAll(".book-info > .tag > a, .tag-wrap > .tags")
    ).map((a) => (a as HTMLAnchorElement).innerText.trim());

    // 限免探测
    /*
            const limitFreeUrl = "https://www.qidian.com/free/";
            const limitFreeDom = await ggetHtmlDOM(limitFreeUrl, this.charset);
            const limitFreeBookIds = Array.from(
              limitFreeDom.querySelectorAll(
                "#limit-list div.book-img-box > a[data-bid]"
              )
            ).map((a) => a.getAttribute("data-bid"));
            const limitFree = limitFreeBookIds.includes(bookId);
            */
    const limitFree = Boolean(
      document.querySelector(".book-information .flag")
    );
    log.info(`[Book]限免书籍 ${limitFree}`);

    const chapters: Chapter[] = [];

    const liLength = document.querySelectorAll("#j-catalogWrap li").length;
    const getChapterTotalNumber = () => {
      const span = (
        document.querySelector("#J-catalogCount") as HTMLSpanElement
      ).innerText.match(/\d+/);
      if (span) {
        return parseInt(span[0]);
      }
    };
    if (!(liLength && getChapterTotalNumber() === liLength)) {
      await sleep(3000);
    }
    const sections = document.querySelectorAll(
      "#j-catalogWrap > .volume-wrap > .volume"
    );
    let chapterNumber = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sectionNumber = i + 1;
      const sectionName = (s.querySelector("h3") as HTMLElement).innerText
        .trim()
        .split("\n")
        .slice(-1)[0]
        .split("·")[0]
        .trim();
      let sectionChapterNumber = 0;
      const isVIP = (s.querySelector("h3") as HTMLElement)?.innerText?.includes("VIP") ?? false;
      const cs = s.querySelectorAll("ul.cf > li");
      for (const c of Array.from(cs)) {
        const a = c.querySelector("a");
        chapterNumber++;
        sectionChapterNumber++;
        const chapterName = (a as HTMLAnchorElement).innerText.trim();
        const chapterUrl = (a as HTMLAnchorElement).href;

        const isPaid = () => {
          if (isVIP) {
            return c.querySelector("em.iconfont") == null;
          }
          return false;
        };
        let chapterId;
        if (isVIP) {
          chapterId = /(\d+)\/?$/.exec(chapterUrl)?.slice(-1)[0] ?? null;
        } else {
          chapterId = null;
        }
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: isVIP,
          isPaid: isPaid(),
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {
            _csrfToken,
            bookId,
            authorId,
            chapterId,
            limitFree,
          },
        });
        const isLogin = () => {
          const signInDom = document.querySelector(".sign-in");
          const signOutDom = document.querySelector(".sign-out");
          if (signInDom && signOutDom) {
            if (Array.from(signOutDom.classList).includes("hidden")) {
              return true;
            }
          }
          return false;
        };
        if (isVIP) {
          chapter.status = Status.aborted;
          if (limitFree) {
            chapter.status = Status.pending;
          }
          if (chapter.isPaid) {
            chapter.status = Status.pending;
          }
        }
        //
        chapters.push(chapter);
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
    isPaid: boolean,
    charset: string,
    options: chapterOptions
  ) {
    const nullObj = {
      chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
      additionalMetadate: null,
    };

    // Initialize image decoder for OCR-based character decoding
    const decoder = new QidianImageDecoder();
    await decoder.init();

    try {
      return await getChapter();
    } finally {
      await decoder.close();
    }

    async function getChapter(): Promise<ChapterParseObject> {
      let doc;
      if (isVIP) {
        doc = await ggetHtmlDOM(chapterUrl, charset);
        if (
          !doc.querySelector(".content-text") ||
          (doc.querySelector(".content-text")?.childElementCount ?? 0) < 10
        ) {
          doc = await getFrameContentCondition(chapterUrl, (frame) => {
            const doc = frame.contentWindow?.document ?? null;
            if (doc) {
              return doc.querySelectorAll(".content-text").length !== 0;
            } else {
              return false;
            }
          });
          if (doc) {
            doc = new DOMParser().parseFromString(
              doc.documentElement.outerHTML,
              "text/html"
            );
          }
        }
      } else {
        doc = await ggetHtmlDOM(chapterUrl, charset);
      }

      if (doc) {
        chapterName = (
          doc.querySelector("h1.title") as HTMLElement
        ).innerText.trim();

        // VIP章节
        if (doc.querySelector(".vip-limit-wrap")) {
          return nullObj;
        }

        const content = document.createElement("div");
        let contentText = "";

        const contentMain = doc.querySelector("main") as HTMLElement;
        rm("span.review-count", true, contentMain);
        const authorSayWrap = doc.querySelector(
          "#r-authorSay"
        ) as HTMLElement;
        if (contentMain) {
          // Decode character-replacement images before cleanDOM processing
          await processCharacterImages(contentMain, decoder);

          const { dom, text, images } = await cleanDOM(contentMain, "TM");
          htmlTrim(dom);
          content.appendChild(dom);
          rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);

          contentText = contentText + text;

          if (authorSayWrap) {
            const authorSay = authorSayWrap.querySelector("div");
            if (authorSay) {
              rm("a.avatar", false, authorSay as HTMLElement);
              rm("h4", false, authorSay as HTMLElement);
              const {
                dom: authorDom,
                text: authorText,
                images: authorImages,
              } = await cleanDOM(authorSayWrap, "TM");
              htmlTrim(authorDom);
              authorDom.className = "authorSay";

              const hr = document.createElement("hr");
              content.appendChild(hr);
              content.appendChild(authorSay as HTMLElement);

              contentText =
                contentText + "\n\n" + "-".repeat(10) + "\n\n" + authorText;

              images.push(...authorImages);
            }
          }

          // Report failed images for this chapter
          const failedCount = decoder.getFailedImagesCount();
          if (failedCount > 0) {
            log.warn(`[Qidian] Chapter "${chapterName}" has ${failedCount} failed image(s) replaced with "${decoder.getPlaceholderChar()}"`);
          }

          return {
            chapterName,
            contentRaw: content,
            contentText,
            contentHTML: content,
            contentImages: images,
            additionalMetadate: null,
          };
        }
      }

      return nullObj;
    }
  }
}

/**
 * Process character-replacement images in content using the decoder.
 * Finds images that represent text characters and replaces them with decoded text.
 */
async function processCharacterImages(
  content: HTMLElement,
  decoder: QidianImageDecoder,
): Promise<void> {
  // Find all images in the content that are likely character replacements
  // Qidian character images are typically small inline images within paragraph text
  const images = content.querySelectorAll(
    "img",
  ) as NodeListOf<HTMLImageElement>;

  for (const img of Array.from(images)) {
    try {
      // Skip cover images, illustration images, and other non-character images
      // Character images in Qidian typically have:
      // - Small dimensions (single character size)
      // - Are inline with text (not block-level)
      // - May have specific class names or data attributes

      // Check if this is likely a character image
      const parentElement = img.parentElement;
      const isInlineImage = parentElement?.tagName === "P" ||
        parentElement?.closest("p") !== null;
      const hasImgClass = img.classList.contains("lazy") ||
        img.classList.contains("content-image");

      // Skip obvious non-character images (large images, avatar images, ad images)
      if (img.classList.contains("avatar") ||
          img.classList.contains("review-count") ||
          img.alt && img.alt.length > 2) {
        continue;
      }

      // Only process images that are inline with text content or have character-like class
      if (!isInlineImage && !hasImgClass) {
        // Check if the image is inside a paragraph-like container
        const isInTextContainer = img.closest("p, span, div.content-text");
        if (!isInTextContainer) {
          continue;
        }
      }

      let imageUrl = img.src;
      if (!imageUrl || imageUrl.startsWith("data:")) {
        continue;
      }

      // Convert to HTTPS if needed
      if (imageUrl.startsWith("http://")) {
        imageUrl = imageUrl.replace("http://", "https://");
      }

      const decodedText = await decoder.decodeImage(imageUrl);
      if (decodedText !== decoder.getPlaceholderChar()) {
        // Successfully decoded - replace image with text
        const textNode = document.createTextNode(decodedText);
        img.parentNode?.replaceChild(textNode, img);
        log.debug(`[Qidian] Decoded character image: ${imageUrl.substring(0, 60)}... -> "${decodedText}"`);
      } else {
        // Decoding failed - still replace image with placeholder
        const textNode = document.createTextNode(decodedText);
        img.parentNode?.replaceChild(textNode, img);
        log.debug(`[Qidian] Image decoding failed, using placeholder: ${imageUrl.substring(0, 60)}...`);
      }
    } catch (error) {
      log.error("[Qidian] Unexpected error during image processing:", img.src, error);
      // As a fallback, replace with placeholder
      const textNode = document.createTextNode(decoder.getPlaceholderChar());
      img.parentNode?.replaceChild(textNode, img);
    }
  }
}

interface chapterOptions {
  _csrfToken: string;
  bookId: string;
  authorId: string;
  chapterId: string;
  limitFree: boolean;
}
