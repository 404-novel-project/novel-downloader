import { getAttachment } from "../../../lib/attachments";
import { cleanDOM, htmlTrim } from "../../../lib/cleanDOM";
import { getFrameContentConditionWithWindow, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rm2 } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { OCRDecoder } from "../../../lib/decoders/OCRDecoder";

interface PseudoContentRule {
  selector: string;
  pseudo: "::before" | "::after";
  content: string;
  important: boolean;
  specificity: [number, number, number];
  order: number;
}

/**
 * Decode VIP chapter content by building a font character mapping,
 * then extracting and decoding text from all paragraphs (including
 * p{N} content-text paragraphs with custom element encryption).
 */
async function ocrContent(
  contentMain: HTMLElement,
): Promise<{ contentText: string; contentHTML: HTMLDivElement } | null> {
  try {
    const ownerDoc = contentMain.ownerDocument;
    const ownerWin = ownerDoc?.defaultView;
    if (!ownerWin) {
      log.error("[QidianOCR] No window available for content document");
      return null;
    }

    if (ownerWin.document.fonts) {
      await ownerWin.document.fonts.ready;
      log.info("[QidianOCR] Fonts ready in content document");
    }

    // Get the encrypted font stack from the content element
    const contentStyle = ownerWin.getComputedStyle(contentMain);
    const fontFamily = contentStyle.fontFamily || "sans-serif";
    log.info(`[QidianOCR] Content font-family: ${fontFamily.substring(0, 80)}`);

    const paragraphs = contentMain.querySelectorAll("p");
    if (paragraphs.length === 0) {
      log.warn("[QidianOCR] No paragraphs found in contentMain");
      return null;
    }

    // Collect pseudo-element CSS rules (needed for p{N} custom element paragraphs)
    const pseudoRules = collectPseudoContentRules(ownerDoc);
    log.info(`[QidianOCR] Collected ${pseudoRules.length} pseudo content rules`);

    // Step 1: Extract encrypted text from all paragraphs
    const paraTexts: string[] = [];
    for (const p of Array.from(paragraphs)) {
      const text = extractRenderedText(p as HTMLElement, ownerWin, pseudoRules);
      paraTexts.push(text);
    }

    // Step 2: Collect unique CJK characters that need decoding
    const allText = paraTexts.join("");
    const uniqueChars = [...new Set(allText)].filter((ch) => {
      const code = ch.charCodeAt(0);
      return (code >= 0x4E00 && code <= 0x9FA5) || (code >= 0x3400 && code <= 0x4DB5);
    });

    if (uniqueChars.length === 0) {
      log.warn("[QidianOCR] No CJK characters found in extracted text");
      return null;
    }

    log.info(`[QidianOCR] ${paraTexts.filter((t) => t.trim()).length} paragraphs, ${uniqueChars.length} unique CJK chars`);

    // Step 3: Build font decode map via batch canvas OCR
    const decodeMap = await buildFontDecodeMap(ownerDoc, ownerWin, fontFamily, uniqueChars);

    if (decodeMap.size === 0) {
      log.error("[QidianOCR] Failed to build font decode map");
      return null;
    }

    log.info(`[QidianOCR] Decode map: ${decodeMap.size}/${uniqueChars.length} chars mapped`);

    // Step 4: Decode each paragraph using the mapping
    const allDecoded: string[] = [];
    for (const text of paraTexts) {
      if (!text.trim()) continue;
      const decoded = [...text].map((ch) => decodeMap.get(ch) || ch).join("");
      const trimmed = decoded.trim();
      if (trimmed) {
        allDecoded.push(trimmed);
      }
    }

    if (allDecoded.length === 0) {
      log.error("[QidianOCR] No decoded paragraphs produced");
      return null;
    }

    const fullText = allDecoded.join("\n");
    log.info(`[QidianOCR] Decoded: ${fullText.length} chars from ${allDecoded.length} paragraphs`);

    const contentHTML = document.createElement("div");
    for (const line of allDecoded) {
      const pEl = document.createElement("p");
      pEl.textContent = line;
      contentHTML.appendChild(pEl);
    }

    return { contentText: fullText, contentHTML };
  } catch (e) {
    log.error(`[QidianOCR] Error: ${e instanceof Error ? `${e.message}\n${e.stack}` : String(e)}`);
    return null;
  }
}

/**
 * Build a font decode map by rendering encrypted characters on canvas
 * with the encrypted font and using OCR to determine the visual characters.
 * Characters are rendered one-per-line (vertically) in batches for reliable OCR.
 */
async function buildFontDecodeMap(
  ownerDoc: Document,
  ownerWin: Window,
  fontFamily: string,
  uniqueChars: string[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const ocrDecoder = new OCRDecoder();

  try {
    const BATCH_SIZE = 30;
    const CHAR_SIZE = 48;
    const ROW_HEIGHT = 64;
    const PADDING = 16;
    const CANVAS_WIDTH = CHAR_SIZE + PADDING * 2;
    const SCALE = 2;

    const canvas = ownerDoc.createElement("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    for (let i = 0; i < uniqueChars.length; i += BATCH_SIZE) {
      const batch = uniqueChars.slice(i, i + BATCH_SIZE);
      const canvasHeight = batch.length * ROW_HEIGHT + PADDING * 2;

      canvas.width = CANVAS_WIDTH * SCALE;
      canvas.height = canvasHeight * SCALE;
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);

      // White background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CANVAS_WIDTH, canvasHeight);

      // Render each character on its own line
      ctx.font = `${CHAR_SIZE}px ${fontFamily}`;
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (let j = 0; j < batch.length; j++) {
        const x = CANVAS_WIDTH / 2;
        const y = PADDING + j * ROW_HEIGHT + ROW_HEIGHT / 2;
        ctx.fillText(batch[j], x, y);
      }

      // OCR the batch
      const pngData = canvasToUint8Array(canvas);
      const ocrText = await ocrDecoder.decodeFullText(pngData);
      const ocrChars = [...ocrText.replace(/[\s\n\r]/g, "")];

      if (ocrChars.length === batch.length) {
        for (let j = 0; j < batch.length; j++) {
          map.set(batch[j], ocrChars[j]);
        }
      } else {
        log.warn(
          `[QidianFont] Batch ${i}: expected ${batch.length} chars, got ${ocrChars.length}. Falling back to per-char OCR.`,
        );
        for (const ch of batch) {
          if (map.has(ch)) continue;
          const single = await ocrSingleChar(canvas, ctx, ch, fontFamily, CHAR_SIZE, SCALE, ocrDecoder);
          if (single) {
            map.set(ch, single);
          }
        }
      }

      if ((i + BATCH_SIZE) % 150 === 0 || i + BATCH_SIZE >= uniqueChars.length) {
        log.info(`[QidianFont] Mapping: ${Math.min(i + BATCH_SIZE, uniqueChars.length)}/${uniqueChars.length}`);
      }
    }

    canvas.width = 0;
    canvas.height = 0;
    return map;
  } catch (e) {
    log.error(`[QidianFont] Error building decode map: ${e instanceof Error ? e.message : String(e)}`);
    return map;
  } finally {
    await ocrDecoder.close();
  }
}

/**
 * OCR a single character rendered on canvas. Used as fallback when batch OCR fails.
 */
async function ocrSingleChar(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  ch: string,
  fontFamily: string,
  charSize: number,
  scale: number,
  ocrDecoder: OCRDecoder,
): Promise<string | null> {
  const SIZE = charSize + 32;
  canvas.width = SIZE * scale;
  canvas.height = SIZE * scale;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.font = `${charSize}px ${fontFamily}`;
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(ch, SIZE / 2, SIZE / 2);

  try {
    const pngData = canvasToUint8Array(canvas);
    const result = await ocrDecoder.decode(pngData);
    return result?.text || null;
  } catch {
    return null;
  }
}

/**
 * Extract rendered text from an element, including ::before/::after
 * pseudo-element content from custom elements in p{N} paragraphs.
 */
function extractRenderedText(
  element: HTMLElement,
  ownerWin: Window,
  pseudoRules: PseudoContentRule[],
): string {
  const parts: string[] = [];
  collectRenderedText(element, ownerWin, pseudoRules, parts);
  return parts.join("");
}

function collectRenderedText(
  node: Node,
  ownerWin: Window,
  pseudoRules: PseudoContentRule[],
  parts: string[],
) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (!parent) return;
    const style = ownerWin.getComputedStyle(parent);
    if (isHiddenStyle(style)) return;

    const text = normalizeRenderedText(node.textContent || "");
    if (text) parts.push(text);
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const element = node as HTMLElement;
  if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) return;

  const style = ownerWin.getComputedStyle(element);
  if (isHiddenStyle(style)) return;

  // ::before pseudo-element content
  pushPseudoText(element, ownerWin, pseudoRules, "::before", parts);

  // Flex containers use CSS `order` to control visual ordering of children.
  // Sort element children by their computed order to match visual rendering.
  const childNodes = Array.from(element.childNodes);
  if (style.display === "flex" || style.display === "inline-flex") {
    const ordered: Array<{ node: Node; order: number; domIndex: number }> = [];
    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i];
      let order = 0;
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childStyle = ownerWin.getComputedStyle(child as HTMLElement);
        order = parseInt(childStyle.order, 10) || 0;
      }
      ordered.push({ node: child, order, domIndex: i });
    }
    ordered.sort((a, b) => a.order - b.order || a.domIndex - b.domIndex);
    for (const entry of ordered) {
      collectRenderedText(entry.node, ownerWin, pseudoRules, parts);
    }
  } else {
    for (const child of childNodes) {
      collectRenderedText(child, ownerWin, pseudoRules, parts);
    }
  }

  // ::after pseudo-element content
  pushPseudoText(element, ownerWin, pseudoRules, "::after", parts);
}

function pushPseudoText(
  element: HTMLElement,
  ownerWin: Window,
  pseudoRules: PseudoContentRule[],
  pseudo: "::before" | "::after",
  parts: string[],
) {
  const style = ownerWin.getComputedStyle(element, pseudo);
  if (isHiddenStyle(style)) return;

  const text = resolvePseudoContentFromRules(element, pseudo, pseudoRules)
    || parsePseudoContent(style.content);
  if (text) parts.push(text);
}

function isHiddenStyle(style: CSSStyleDeclaration): boolean {
  return (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.visibility === "collapse" ||
    style.opacity === "0"
  );
}

function parsePseudoContent(content: string): string {
  const trimmed = content.trim();
  if (!trimmed || trimmed === "none" || trimmed === "normal") {
    return "";
  }

  const matches = [...trimmed.matchAll(/"((?:\\.|[^"])*)"|'((?:\\.|[^'])*)'/g)];
  if (matches.length > 0) {
    return matches
      .map((match) => decodeCssString(match[1] ?? match[2] ?? ""))
      .join("");
  }

  return decodeCssString(trimmed);
}

function collectPseudoContentRules(doc: Document): PseudoContentRule[] {
  const results: PseudoContentRule[] = [];
  let order = 0;

  for (const styleSheet of Array.from(doc.styleSheets)) {
    try {
      collectPseudoContentRulesFromRuleList(styleSheet.cssRules, results, () => order++);
    } catch {
      // Cross-origin stylesheets can be ignored. Matching falls back to computed style.
    }
  }

  return results;
}

function collectPseudoContentRulesFromRuleList(
  ruleList: CSSRuleList,
  results: PseudoContentRule[],
  nextOrder: () => number,
) {
  for (const rule of Array.from(ruleList)) {
    if (rule instanceof CSSStyleRule) {
      const content = rule.style.getPropertyValue("content").trim();
      if (!content) continue;

      for (const entry of splitPseudoSelectors(rule.selectorText)) {
        results.push({
          selector: entry.selector,
          pseudo: entry.pseudo,
          content,
          important: rule.style.getPropertyPriority("content") === "important",
          specificity: getSelectorSpecificity(entry.selector),
          order: nextOrder(),
        });
      }
      continue;
    }

    if (
      rule instanceof CSSMediaRule ||
      rule instanceof CSSSupportsRule
    ) {
      collectPseudoContentRulesFromRuleList(rule.cssRules, results, nextOrder);
      continue;
    }

    if (rule instanceof CSSImportRule && rule.styleSheet?.cssRules) {
      try {
        collectPseudoContentRulesFromRuleList(rule.styleSheet.cssRules, results, nextOrder);
      } catch {
        // Ignore inaccessible imported stylesheets.
      }
    }
  }
}

function splitPseudoSelectors(
  selectorText: string,
): Array<{ selector: string; pseudo: "::before" | "::after" }> {
  const selectors = splitSelectorList(selectorText);
  const results: Array<{ selector: string; pseudo: "::before" | "::after" }> = [];

  for (const selector of selectors) {
    const trimmed = selector.trim();
    const pseudoMatch = trimmed.match(/::?(before|after)(?![\w-])/i);
    if (!pseudoMatch) continue;

    const pseudo = pseudoMatch[1].toLowerCase() === "before" ? "::before" : "::after";
    const baseSelector = trimmed.replace(/::?(before|after)(?![\w-])/ig, "").trim();
    if (!baseSelector) continue;

    results.push({ selector: baseSelector, pseudo });
  }

  return results;
}

function splitSelectorList(selectorText: string): string[] {
  const selectors: string[] = [];
  let current = "";
  let roundDepth = 0;
  let squareDepth = 0;
  let quote: '"' | "'" | null = null;

  for (let i = 0; i < selectorText.length; i++) {
    const ch = selectorText[i];
    const prev = selectorText[i - 1];

    if (quote) {
      current += ch;
      if (ch === quote && prev !== "\\") {
        quote = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch as '"' | "'";
      current += ch;
      continue;
    }

    if (ch === "(") roundDepth++;
    if (ch === ")") roundDepth = Math.max(0, roundDepth - 1);
    if (ch === "[") squareDepth++;
    if (ch === "]") squareDepth = Math.max(0, squareDepth - 1);

    if (ch === "," && roundDepth === 0 && squareDepth === 0) {
      if (current.trim()) selectors.push(current.trim());
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim()) selectors.push(current.trim());
  return selectors;
}

function getSelectorSpecificity(selector: string): [number, number, number] {
  const idCount = (selector.match(/#[\w-]+/g) || []).length;
  const classCount = (selector.match(/\.[\w-]+/g) || []).length
    + (selector.match(/\[[^\]]+\]/g) || []).length
    + (selector.match(/:(?!:)[\w-]+(?:\([^)]*\))?/g) || []).length;
  const elementCount = (selector.match(/(^|[\s>+~])([a-zA-Z][\w-]*)/g) || []).length;
  return [idCount, classCount, elementCount];
}

function resolvePseudoContentFromRules(
  element: HTMLElement,
  pseudo: "::before" | "::after",
  rules: PseudoContentRule[],
): string {
  const matched = rules.filter((rule) => {
    if (rule.pseudo !== pseudo) return false;
    try {
      return element.matches(rule.selector);
    } catch {
      return false;
    }
  });

  if (matched.length === 0) {
    return "";
  }

  matched.sort((left, right) => {
    if (left.important !== right.important) {
      return left.important ? 1 : -1;
    }

    for (let i = 0; i < left.specificity.length; i++) {
      if (left.specificity[i] !== right.specificity[i]) {
        return left.specificity[i] - right.specificity[i];
      }
    }

    return left.order - right.order;
  });

  const rule = matched[matched.length - 1];
  return evaluatePseudoContent(rule.content, element);
}

function evaluatePseudoContent(content: string, element: HTMLElement): string {
  const trimmed = content.trim();
  if (!trimmed || trimmed === "none" || trimmed === "normal") {
    return "";
  }

  let result = "";
  let hasSupportedToken = false;
  for (const token of tokenizeContentValue(trimmed)) {
    if (token.type === "string") {
      result += decodeCssString(token.value);
      hasSupportedToken = true;
      continue;
    }

    if (token.type === "function" && token.name === "attr") {
      const attrName = token.value.trim().split(/\s+/)[0];
      if (attrName) {
        result += element.getAttribute(attrName) || "";
        hasSupportedToken = true;
      }
    }
  }

  return hasSupportedToken ? result : "";
}

function tokenizeContentValue(
  content: string,
): Array<{ type: "string"; value: string } | { type: "function"; name: string; value: string } | { type: "word"; value: string }> {
  const tokens: Array<{ type: "string"; value: string } | { type: "function"; name: string; value: string } | { type: "word"; value: string }> = [];
  let index = 0;

  while (index < content.length) {
    const ch = content[index];

    if (/\s/.test(ch)) {
      index++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let value = "";
      index++;
      while (index < content.length) {
        const current = content[index];
        if (current === quote && content[index - 1] !== "\\") {
          index++;
          break;
        }
        value += current;
        index++;
      }
      tokens.push({ type: "string", value });
      continue;
    }

    const identMatch = content.slice(index).match(/^[a-zA-Z-]+/);
    if (!identMatch) {
      index++;
      continue;
    }

    const name = identMatch[0];
    index += name.length;

    if (content[index] === "(") {
      let depth = 1;
      let value = "";
      index++;
      while (index < content.length && depth > 0) {
        const current = content[index];
        const prev = content[index - 1];
        if (current === "(" && prev !== "\\") {
          depth++;
        } else if (current === ")" && prev !== "\\") {
          depth--;
          if (depth === 0) {
            index++;
            break;
          }
        }
        if (depth > 0) {
          value += current;
        }
        index++;
      }
      tokens.push({ type: "function", name: name.toLowerCase(), value });
      continue;
    }

    tokens.push({ type: "word", value: name.toLowerCase() });
  }

  return tokens;
}

function decodeCssString(value: string): string {
  return value
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? "" : String.fromCodePoint(codePoint);
    })
    .replace(/\\([\\"'])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t");
}

function normalizeRenderedText(text: string): string {
  return text.replace(/\u200b/g, "");
}

function canvasToUint8Array(canvas: HTMLCanvasElement): Uint8Array {
  const dataUrl = canvas.toDataURL("image/png");
  const base64 = dataUrl.split(",")[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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

    async function getChapter(): Promise<ChapterParseObject> {
      let doc;
      let html = null;
      if (isVIP) {
        html = await getFrameContentConditionWithWindow(chapterUrl, (frame) => {
          const doc = frame.contentWindow?.document ?? null;
          if (doc) {
            return doc.querySelectorAll(".content-text").length !== 0;
          } else {
            return false;
          }
        });
        doc = html?.contentWindow?.document ?? null;
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
        rm("span.review", true, contentMain);
        const authorSayWrap = doc.querySelector(
          "#r-authorSay"
        ) as HTMLElement;
        if (contentMain) {
          if (isVIP) {
            // VIP章节：提取渲染文本并做字符映射解码
            log.info(`[Qidian] VIP chapter, using rendered-text OCR`);
            const ocrResult = await ocrContent(contentMain);
            if (ocrResult) {
              contentText = ocrResult.contentText;
              content.appendChild(ocrResult.contentHTML);

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
                  html?.remove();
                  return {
                    chapterName,
                    contentRaw: content,
                    contentText,
                    contentHTML: content,
                    contentImages: authorImages,
                    additionalMetadate: null,
                  };
                }
              }
              html?.remove();
              return {
                chapterName,
                contentRaw: content,
                contentText,
                contentHTML: content,
                contentImages: [],
                additionalMetadate: null,
              };
            }
            // OCR failed, fall through to normal processing
            log.warn("[Qidian] Rendered-text OCR failed, falling back to normal processing");
          }

          // Normal processing (non-VIP or OCR fallback)
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
          html?.remove();
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

    return getChapter();
  }
}

interface chapterOptions {
  _csrfToken: string;
  bookId: string;
  authorId: string;
  chapterId: string;
  limitFree: boolean;
}
