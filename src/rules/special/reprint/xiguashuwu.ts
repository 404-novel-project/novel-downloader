import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { rm } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { getAttachment } from "../../../lib/attachments";
import { FilenameDecoder } from "../../../lib/decoders/FilenameDecoder";
import { HashDecoder } from "../../../lib/decoders/HashDecoder";
import { OCRDecoder, OCRResult } from "../../../lib/decoders/OCRDecoder";
import { ImageCache } from "../../../lib/decoders/ImageCache";
import * as CryptoJS from "crypto-js";

// 西瓜书屋章节第一页无加密
// 西瓜书屋章节第二页使用 1.图片代替文字，2.使用自定义的Base64编码来加密内容(<meta> tag) 3.js打乱内容顺序 4.随机div id
// 西瓜书屋章节第三页使用 1.随机div id 2.<script>中有AES加密的内容

/**
 * Image text decoder for xiguashuwu.ts that implements the 3-step decoding logic
 */
class ImageTextDecoder {
  private filenameDecoder: FilenameDecoder;
  private hashDecoder: HashDecoder;
  private ocrDecoder: OCRDecoder;
  private mappingCache: { [imageUrl: string]: string } = {};
  private failedImages: string[] = []; // Track images that failed to decode
  private readonly PLACEHOLDER_CHAR = "▢"; // Special character for failed decoding

  constructor() {
    this.filenameDecoder = new FilenameDecoder("www.xiguashuwu.com");
    this.hashDecoder = new HashDecoder("www.xiguashuwu.com");
    this.ocrDecoder = new OCRDecoder();
  }

  async init(): Promise<void> {
    // Decoders initialize themselves lazily
    log.debug("[XiguashuwuImageDecoder] Decoder initialized");
  }

  async close(): Promise<void> {
    this.mappingCache = {};
    await this.ocrDecoder.close();
    // Clear image cache when decoder is closed
    const imageCache = ImageCache.getInstance();
    imageCache.clearCache();
    
    // Report failed images if any
    if (this.failedImages.length > 0) {
      log.warn(`[XiguashuwuImageDecoder] ${this.failedImages.length} images failed to decode:`);
      this.failedImages.forEach((url, index) => {
        log.warn(`  ${index + 1}. ${url}`);
      });
      log.warn(`These images were replaced with placeholder character: "${this.PLACEHOLDER_CHAR}"`);
    }
    
    log.debug("[XiguashuwuImageDecoder] Decoder closed and image cache cleared");
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
        log.debug(`[XiguashuwuImageDecoder] Filename match: ${filename} -> ${filenameChar}`);
        this.mappingCache[imageUrl] = filenameChar;
        return filenameChar;
      }

      // Download image data only if filename mapping fails
      const imageData = await this.downloadImageData(imageUrl);

      // Step 2: Try hash-based mapping (fast, requires download)
      const hashChar = await this.hashDecoder.decode(imageData);
      if (hashChar) {
        log.debug(`[XiguashuwuImageDecoder] Hash match: ${filename} -> "${hashChar}"`);
        this.mappingCache[imageUrl] = hashChar;
        return hashChar;
      }

      // Step 3: Try OCR as final method (slowest, most accurate)
      const ocrResult = await this.ocrDecoder.decode(imageData);
      if (ocrResult && ocrResult.confidence >= 0.90) {
        const ocrChar = ocrResult.text;
        log.debug(`[XiguashuwuImageDecoder] OCR success: ${filename} (${imageUrl}) -> "${ocrChar}" (confidence: ${Math.round(ocrResult.confidence * 100)}%)`);
        
        // Learn the successful OCR result for future use
        try {
          await this.hashDecoder.learnMapping(imageData, ocrChar);
          await this.filenameDecoder.learnMapping(filename, ocrChar);
          log.debug(`[XiguashuwuImageDecoder] Learned both hash and filename mappings for: ${filename} -> "${ocrChar}"`);
        } catch (learningError) {
          log.warn(`[XiguashuwuImageDecoder] Failed to learn mappings for ${filename}:`, learningError);
        }
        
        this.mappingCache[imageUrl] = ocrChar;
        return ocrChar;
      } else if (ocrResult) {
        // OCR returned result but confidence too low
        log.error(`[XiguashuwuImageDecoder] OCR confidence too low: ${Math.round(ocrResult.confidence * 100)}% < 90% for ${filename}`);
      }

      // All methods failed - use placeholder and track failed image
      log.warn(`[XiguashuwuImageDecoder] All decoding methods failed for: ${imageUrl}`);
      this.failedImages.push(imageUrl);
      this.mappingCache[imageUrl] = this.PLACEHOLDER_CHAR;
      return this.PLACEHOLDER_CHAR;
    } catch (error) {
      log.error(`[XiguashuwuImageDecoder] Error during decoding process for ${imageUrl}:`, error);
      
      // On any error, use placeholder and track failed image
      this.failedImages.push(imageUrl);
      this.mappingCache[imageUrl] = this.PLACEHOLDER_CHAR;
      return this.PLACEHOLDER_CHAR;
    }
  }

  private getFilenameFromUrl(url: string): string {
    return url.split("/").pop() || "";
  }

  private async downloadImageData(imageUrl: string): Promise<Uint8Array> {
    // Use ImageCache to get image data without interfering with epub attachments
    const imageCache = ImageCache.getInstance();
    return await imageCache.getImageData(imageUrl);
  }

  /**
   * Get the list of images that failed to decode
   */
  getFailedImages(): string[] {
    return [...this.failedImages]; // Return a copy to prevent external modification
  }

  /**
   * Get the count of images that failed to decode
   */
  getFailedImagesCount(): number {
    return this.failedImages.length;
  }

  /**
   * Get the placeholder character used for failed decoding
   */
  getPlaceholderChar(): string {
    return this.PLACEHOLDER_CHAR;
  }
}

// Helper function to replicate the custom Base64 decoding from article.js
const decodeCustomBase64 = (encodedString: string): string => {
  const base64Map =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let binary = "";
  if (!encodedString) return "";

  for (let i = 0; i < encodedString.length; i++) {
    if (encodedString.substr(i, 1) === "=") {
      break;
    }
    const char = encodedString.charAt(i);
    const mapIndex = base64Map.indexOf(char);
    if (mapIndex === -1) continue;

    const c = mapIndex.toString(2);
    const padding =
      {
        1: "00000",
        2: "0000",
        3: "000",
        4: "00",
        5: "0",
        6: "",
      }[c.length] || "";
    binary += padding + c;
  }

  let decodedString = "";
  const binaryChunks = binary.match(/[0-1]{8}/g) || [];
  for (const chunk of binaryChunks) {
    decodedString += String.fromCharCode(parseInt(chunk, 2));
  }
  return decodedString;
};

const decryptContent = (content: string, key: string): string => {
  const key1 = CryptoJS.MD5(key).toString();
  const d = CryptoJS.enc.Utf8.parse(key1.substring(0, 16));
  const e = CryptoJS.enc.Utf8.parse(key1.substring(16));
  return CryptoJS.AES.decrypt(content, e, {
    iv: d,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};

export class Xiguashuwu extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "naive"; // no CORS need
    this.nsfw = true;
    this.charset = "utf-8";
    // this.concurrencyLimit = 3;
    // this.sleepTime = 1000;
    // this.maxSleepTime = 3000;
  }

  public async bookParse(): Promise<Book> {
    const bookUrl = document.location.href;
    const bookname = (
      document.querySelector("p.title") as HTMLParagraphElement
    )?.innerText.trim();
    const author =
      (document.querySelector("p.author > span > a") as HTMLAnchorElement)
        ?.innerText ?? "";
    const introDom = document.querySelector(
      "#intro > p.BGsectionTwo-bottom",
    ) as HTMLParagraphElement;

    const [introduction, introductionHTML] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl =
      (
        document.querySelector(
          ".BGsectionOne-top-left > img",
        ) as HTMLImageElement
      )?.src || null;

    if (coverUrl) {
      getAttachment(coverUrl, this.attachmentMode, "cover-")
        .then((coverClass) => {
          additionalMetadate.cover = coverClass;
        })
        .catch((error) => log.error(error));
    }

    // Get the chapter list page URL from the book page
    const chapterListLink = document.querySelector(
      "div.BGsectionOne-bottom > ul > li:nth-of-type(2) > a",
    ) as HTMLAnchorElement;

    if (!chapterListLink) {
      throw new Error("Chapter list link not found");
    }

    const chapterListUrl = chapterListLink.href;
    log.debug(`[chapter]请求 ${chapterListUrl}`);
    const chapterListDoc = await getHtmlDOM(chapterListUrl, this.charset);

    // Get all chapter items from the chapter list page
    const chapterLinks = chapterListDoc.querySelectorAll(
      "li.BCsectionTwo-top-chapter > a",
    );

    const chapters: Chapter[] = [];
    let chapterNumber = 0;

    for (const aElem of Array.from(chapterLinks) as HTMLAnchorElement[]) {
      chapterNumber++;
      const chapterName = aElem.innerText.trim();
      const chapterUrl = aElem.href;
      const isVIP = false;
      const isPaid = false;

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
        chapterParse: this.chapterParse.bind(this),
        charset: this.charset,
        options: {},
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
    options: object,
  ) {
    // Initialize image decoder
    const decoder = new ImageTextDecoder();
    await decoder.init();

    try {
      // Fetch and process multi-page chapters
      const contentRaw = await this.getContentFromMultiplePages(
        chapterUrl,
        charset,
        decoder,
      );

      if (contentRaw) {
        const { dom, text, images } = await cleanDOM(
          contentRaw,
          this.attachmentMode,
          { keepImageName: true },
        );

        // Report failed images for this chapter
        const failedCount = decoder.getFailedImagesCount();
        if (failedCount > 0) {
          log.warn(`[Xiguashuwu] Chapter "${chapterName}" has ${failedCount} failed image(s) replaced with "${decoder.getPlaceholderChar()}"`);
        }

        return {
          chapterName,
          contentRaw: contentRaw,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
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
    } finally {
      // Clean up decoder
      await decoder.close();
    }
  }

  private async getContentFromMultiplePages(
    startUrl: string,
    charset: string,
    decoder: ImageTextDecoder,
  ): Promise<HTMLElement | null> {
    const content = document.createElement("div");
    content.id = "C0NTENT";

    let currentUrl = startUrl;
    let pageNumber = 1;
    const lastParagraphIndexes: number[] = [];
    let totalParagraphs = 0;

    while (currentUrl) {
      log.debug(`Processing page ${pageNumber}: ${currentUrl}`);

      try {
        const doc = await getHtmlDOM(currentUrl, charset);
        const pageContent = await this.processPageContent(
          doc,
          decoder,
          pageNumber,
        );

        if (pageContent) {
          // Track paragraph indexes for merging
          const pageParaCount = pageContent.children.length;
          lastParagraphIndexes.push(totalParagraphs + pageParaCount - 1);
          totalParagraphs += pageParaCount;

          // Append content to main container
          for (const child of Array.from(pageContent.children)) {
            content.appendChild(child.cloneNode(true));
          }

          log.debug(
            `Page ${pageNumber} processed: ${pageParaCount} paragraphs, total: ${totalParagraphs}`,
          );
        }

        // Get next page URL
        currentUrl = this.getNextPageUrl(doc);
        pageNumber++;

        // Safety check to prevent infinite loops
        if (pageNumber > 50) {
          log.warn(
            "Too many pages detected, stopping to prevent infinite loop",
          );
          break;
        }
      } catch (error) {
        log.error(`Failed to process page ${pageNumber}: ${currentUrl}`, error);
        break;
      }
    }

    // Merge paragraphs across page boundaries
    this.mergeParagraphsAcrossPages(content, lastParagraphIndexes);

    return content.children.length > 0 ? content : null;
  }

  private async processPageContent(
    doc: Document,
    decoder: ImageTextDecoder,
    pageNumber: number,
  ): Promise<HTMLElement | null> {
    if (pageNumber === 1) {
      // First page - content with id "C0NTENT" is directly available
      // No character swapped to images on first page
      const contentDiv = doc.querySelector("#C0NTENT") as HTMLDivElement;
      log.debug(
        "Processing first page - using direct C0NTENT (no image processing)",
      );
      if (contentDiv) {
        return await this.processFirstPageContent(contentDiv);
      } else {
        throw new Error("First page missing C0NTENT element");
      }
    } else if (pageNumber === 2) {
      // Second page - use nrid and codeurl with custom Base64 decoding and order fixing
      // Characters are swapped to images on second page
      log.debug(
        "Processing second page - using nrid/codeurl method (with image processing)",
      );
      try {
        const decryptedDiv = await this.decryptSecondPageContent(doc);
        if (decryptedDiv) {
          return await this.processImages(decryptedDiv, decoder);
        } else {
          throw new Error("Second page decryption returned null");
        }
      } catch (error) {
        log.error("Failed to decrypt second page content:", error);
        throw error;
      }
    } else {
      // Third or more pages - use AES decryption
      // Characters are swapped to images on third+ pages
      log.debug(
        `Processing page ${pageNumber} - using AES decryption (with image processing)`,
      );
      try {
        const decryptedDiv = await this.decryptAESPageContent(doc);
        if (decryptedDiv) {
          return await this.processImages(decryptedDiv, decoder);
        } else {
          throw new Error(
            `AES decryption returned null for page ${pageNumber}`,
          );
        }
      } catch (error) {
        log.error(`Failed to decrypt page ${pageNumber} content:`, error);
        throw error;
      }
    }

    // No fallback - throw error for unsupported page types
    throw new Error(`Unsupported page processing logic for page ${pageNumber}`);
  }

  private async decryptSecondPageContent(
    doc: Document,
  ): Promise<HTMLDivElement | null> {
    const scripts = doc.getElementsByTagName("script");
    let nrid: string | null = null;
    let codeurl: string | null = null;

    // Regex patterns for extracting variables
    const nridRegex = /var\s+nrid\s*=\s*['"]([^'"]+)['"]/;
    const simpleCodeurlVarRegex = /var\s+codeurl\s*=\s*['"]?([0-9]+)['"]?/;

    // found in source code, but not seen in the page
    // const complexCodeurlVarRegex =
    //   /var\s+codeurl\s*=\s*['"](getkey\.html[^'"]+)['"]/;
    // const keyFromStringRegex = /getkey\.html\?.*?&code=([0-9]+)&/;

    // Extract variables from scripts
    for (const script of Array.from(scripts)) {
      const scriptContent = script.innerHTML;
      if (!scriptContent) continue;

      // Extract container ID
      if (!nrid) {
        const nridMatch = scriptContent.match(nridRegex);
        if (nridMatch) {
          nrid = nridMatch[1];
          log.debug(`Found nrid: ${nrid}`);
        }
      }

      // Extract codeurl
      if (!codeurl) {
        const simpleMatch = scriptContent.match(simpleCodeurlVarRegex);
        if (simpleMatch && simpleMatch[1]) {
          codeurl = simpleMatch[1];
          log.debug(`Found simple codeurl: ${codeurl}`);
        }
      }

      if (nrid && codeurl) {
        break; // Found both necessary values
      }
    }

    if (!nrid) {
      throw new Error("Could not find nrid for second page");
    }

    if (!codeurl) {
      throw new Error("Could not find codeurl for second page");
    }

    const contentBox = doc.getElementById(nrid);
    if (!contentBox) {
      throw new Error(`Could not find content container with ID: ${nrid}`);
    }

    const standardContentDiv = doc.createElement("div");
    standardContentDiv.id = "C0NTENT";

    // base64 encoded content is in the 8th meta tag
    const metaTag = doc.getElementsByTagName("meta")[7];
    const rawContentFromMeta: string | null = metaTag.getAttribute("content");
    if (!rawContentFromMeta) {
      throw new Error("Could not find encrypted content in meta tags");
    }

    // Decode and reorder content
    const unscrambledString = decodeCustomBase64(rawContentFromMeta);
    if (!unscrambledString) {
      throw new Error("Failed to decode custom Base64 content");
    }

    const orderFragments = unscrambledString.split(/[A-Z]+%/);
    const orderedNode = [];

    const UpWz = (m: string, i: number) => {
      let k = Math.ceil((i + 1) % parseInt(codeurl, 10));
      k = Math.ceil(parseInt(m, 10) - k);
      return k;
    };

    for (let i = 0; i < orderFragments.length; i++) {
      const k = UpWz(orderFragments[i], i);
      orderedNode[k] = contentBox.childNodes[i];
    }

    // Append ordered nodes
    orderedNode.forEach((node) => {
      if (node) {
        standardContentDiv.appendChild(node);
      }
    });

    log.debug(
      "Successfully decrypted second page content using nrid/codeurl method",
    );
    return standardContentDiv;
  }

  private async decryptAESPageContent(
    doc: Document,
  ): Promise<HTMLDivElement | null> {
    const scripts = doc.getElementsByTagName("script");
    let nrid: string | null = null;
    let newconEncryptedContent: string | null = null;
    let newconEncryptionKey: string | null = null;

    // Regex patterns for extracting variables
    const nridRegex = /var\s+nrid\s*=\s*['"]([^'"]+)['"]/;
    const newcomRegex =
      /newcon\s*=\s*decodeURIComponent\("(?<content>[^"]+)"\).*?newcon\s*=\s*d\(newcon,\s*"(?<key>[^"]+)"\)/s;

    // Extract variables from scripts
    for (const script of Array.from(scripts)) {
      const scriptContent = script.innerHTML;
      if (!scriptContent) continue;

      // Check for AES encrypted content
      if (!newconEncryptedContent) {
        const newcomMatch = scriptContent.match(newcomRegex);
        if (newcomMatch && newcomMatch.groups) {
          newconEncryptedContent = decodeURIComponent(
            newcomMatch.groups.content,
          );
          newconEncryptionKey = newcomMatch.groups.key;
          log.debug(
            `Found AES encrypted content with key: ${newconEncryptionKey}`,
          );
        }
      }

      // Extract container ID
      if (!nrid) {
        const nridMatch = scriptContent.match(nridRegex);
        if (nridMatch) {
          nrid = nridMatch[1];
          log.debug(`Found nrid: ${nrid}`);
        }
      }

      if (nrid && newconEncryptedContent && newconEncryptionKey) {
        break; // Found all necessary values
      }
    }

    if (!nrid) {
      throw new Error("Could not find nrid for AES page");
    }

    if (!newconEncryptedContent || !newconEncryptionKey) {
      throw new Error("Could not find AES encrypted content or key");
    }

    const standardContentDiv = doc.createElement("div");
    standardContentDiv.id = "C0NTENT";

    // Decrypt AES content
    const decryptedContent = decryptContent(
      newconEncryptedContent,
      newconEncryptionKey,
    );
    if (!decryptedContent) {
      throw new Error("AES decryption produced empty content");
    }

    standardContentDiv.innerHTML = decryptedContent;
    log.debug("Successfully decrypted AES page content");
    return standardContentDiv;
  }

  private async processImages(
    content: HTMLElement,
    decoder: ImageTextDecoder,
  ): Promise<HTMLElement> {
    // Remove ads and unwanted elements
    rm("div.s_m", true, content);

    // Process encoded images
    const images = content.querySelectorAll(
      "img.hz",
    ) as NodeListOf<HTMLImageElement>;
    for (const img of Array.from(images)) {
      try {
        let imageUrl = img.src;
        // Convert to HTTPS if needed
        if (imageUrl.startsWith("http://")) {
          imageUrl = imageUrl.replace("http://", "https://");
        }

        const decodedText = await decoder.decodeImage(imageUrl);
        const textNode = document.createTextNode(decodedText);
        img.parentNode?.replaceChild(textNode, img);
        
        // Log success or placeholder usage
        if (decodedText === decoder.getPlaceholderChar()) {
          log.debug(`Used placeholder for failed image: ${imageUrl.substring(0, 50)}...`);
        } else {
          log.debug(`Decoded image: ${imageUrl.substring(0, 50)}...`);
        }
      } catch (error) {
        // This should rarely happen now since decodeImage handles errors internally
        log.error("Unexpected error during image processing:", img.src, error);
        // As a fallback, replace with placeholder
        const textNode = document.createTextNode(decoder.getPlaceholderChar());
        img.parentNode?.replaceChild(textNode, img);
      }
    }

    return content;
  }

  private getNextPageUrl(doc: Document): string {
    // Look for next page link
    const nextPageLink = doc.querySelector(
      "section > ul > li[class*='-right'] > a",
    ) as HTMLAnchorElement;

    if (nextPageLink && nextPageLink.innerText.includes("下一页")) {
      const nextUrl = nextPageLink.href;
      // Validate that it's a content page (contains .html)
      if (nextUrl.includes(".html")) {
        log.debug(`Found next page: ${nextUrl}`);
        return nextUrl;
      }
    }

    // Fallback: look for other possible next page links
    const possibleNextLinks = doc.querySelectorAll("a");
    for (const link of Array.from(possibleNextLinks)) {
      const linkText = link.innerText.trim();
      if (
        (linkText.includes("下一页") ||
          linkText.includes("下页") ||
          linkText.includes("next") ||
          linkText.match(/^下.*页$/)) &&
        (link as HTMLAnchorElement).href.includes(".html")
      ) {
        const nextUrl = (link as HTMLAnchorElement).href;
        log.debug(`Found fallback next page: ${nextUrl}`);
        return nextUrl;
      }
    }

    log.debug("No next page found");
    return "";
  }

  private mergeParagraphsAcrossPages(
    content: HTMLElement,
    lastParagraphIndexes: number[],
  ): void {
    if (lastParagraphIndexes.length <= 1) return;

    log.debug(`Merging paragraphs across ${lastParagraphIndexes.length} pages`);

    // Process from last to first to avoid index shifting issues
    for (let i = lastParagraphIndexes.length - 2; i >= 0; i--) {
      const currentPageLastIndex = lastParagraphIndexes[i];

      // Find the actual last paragraph of current page
      let lastParagraph: HTMLElement | null = null;
      let nextParagraph: HTMLElement | null = null;

      // Search for valid paragraphs around the boundary
      for (
        let j = Math.min(currentPageLastIndex, content.children.length - 1);
        j >= 0;
        j--
      ) {
        const element = content.children[j] as HTMLElement;
        if (element && element.textContent?.trim()) {
          lastParagraph = element;
          break;
        }
      }

      // Find the next valid paragraph (first paragraph of next page)
      const nextPageStartIndex = currentPageLastIndex + 1;
      for (let j = nextPageStartIndex; j < content.children.length; j++) {
        const element = content.children[j] as HTMLElement;
        if (element && element.textContent?.trim()) {
          nextParagraph = element;
          break;
        }
      }

      if (lastParagraph && nextParagraph && lastParagraph !== nextParagraph) {
        const lastText = lastParagraph.textContent || "";
        const nextText = nextParagraph.textContent || "";

        // Merge the content with proper spacing
        lastParagraph.textContent = lastText + nextText;

        // Count line breaks to preserve formatting within the merged paragraph
        const lineBreakCount = (
          nextParagraph.innerHTML.match(/<br\s*\/?>/gi) || []
        ).length;
        if (lineBreakCount > 0) {
          lastParagraph.textContent += "\r\n".repeat(lineBreakCount);
        }

        // Add a newline separator to maintain paragraph boundary with the following content
        // This ensures the second paragraph of the next page has proper separation
        lastParagraph.textContent += "\r\n";

        // Remove the next paragraph
        nextParagraph.remove();

        log.debug(
          `Merged paragraphs: "${lastText.substring(0, 30)}..." + "${nextText.substring(0, 30)}..." (with newline separator)`,
        );
      }
    }
  }

  private async processFirstPageContent(
    content: HTMLElement,
  ): Promise<HTMLElement> {
    // Remove ads and unwanted elements (but don't process images for first page)
    rm("div.s_m", true, content);

    log.debug("First page processed without image decoding");
    return content;
  }
}
