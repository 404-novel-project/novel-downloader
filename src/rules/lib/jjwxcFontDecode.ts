import { sleep } from "../../lib/misc";
import { log } from "../../log";
import { gfetch } from "../../lib/http";
import { retryLimit } from "../../setting";
import { OCRDecoder } from "../../lib/decoders/OCRDecoder";

/**
 * Decode jjwxc encrypted characters by rendering them on canvas
 * with the custom font and using OCR to determine the visual characters.
 *
 * Approach (mirrors qidian OCR):
 * 1. Download the .woff2 font file
 * 2. Create a @font-face with a blob URL so the font loads in the browser
 * 3. Wait for the font to become available
 * 4. Render each encrypted character on a canvas using the custom font
 * 5. OCR the rendered character to determine its real (visual) character
 * 6. Build a mapping table and replace all encrypted characters
 */
export async function replaceJjwxcCharacter(
  fontName: string,
  inputText: string,
): Promise<string> {
  let outputText = inputText;
  const jjwxcFontTable = await buildFontTableViaOCR(fontName, inputText);
  if (jjwxcFontTable) {
    for (const jjwxcCharacter in jjwxcFontTable) {
      if (
        Object.prototype.hasOwnProperty.call(jjwxcFontTable, jjwxcCharacter)
      ) {
        const normalCharacter = jjwxcFontTable[jjwxcCharacter];
        outputText = outputText.replaceAll(jjwxcCharacter, normalCharacter);
      }
    }
    outputText = outputText.replace(/‌/g, "");
  }
  return outputText;
}

interface JjwxcFontTable {
  [index: string]: string;
}

/**
 * Build font character mapping table via OCR.
 * Downloads the woff2 font, loads it in the browser, then renders
 * each encrypted character on canvas and OCRs it to determine
 * the real (visual) character.
 */
async function buildFontTableViaOCR(
  fontName: string,
  inputText: string,
): Promise<JjwxcFontTable | undefined> {
  const fontUrl = `https://static.jjwxc.net/tmp/fonts/${fontName}.woff2?h=my.jjwxc.net`;
  log.info(`[jjwxc-font-ocr]开始下载字体文件 ${fontName}`);

  // Step 1: Download the font file
  let retry = retryLimit;
  let fontBlob: Blob | null = null;
  while (retry > 0) {
    try {
      const resp = await gfetch(fontUrl, {
        headers: {
          accept: "*/*",
          Referer: "https://my.jjwxc.net/",
        },
        responseType: "blob",
      });
      if (resp.status >= 200 && resp.status <= 299) {
        fontBlob = resp.response as Blob;
        log.info(`[jjwxc-font-ocr]字体文件 ${fontName} 下载成功 (${fontBlob.size} bytes)`);
        break;
      } else {
        log.error(`[jjwxc-font-ocr]字体文件 ${fontName} 下载失败 HTTP ${resp.status}`);
        retry--;
        if (retry > 0) {
          await sleep(5000);
        } else {
          log.error(`[jjwxc-font-ocr]字体文件 ${fontName} 下载失败，已用尽重试次数`);
          return undefined;
        }
      }
    } catch (error) {
      log.error(error);
      retry--;
      if (retry > 0) {
        await sleep(5000);
      } else {
        log.error(`[jjwxc-font-ocr]字体文件 ${fontName} 下载失败，已用尽重试次数`);
        return undefined;
      }
    }
  }

  if (!fontBlob) {
    return undefined;
  }

  // Step 2: Create @font-face with blob URL so the font loads in the browser
  const blobUrl = URL.createObjectURL(fontBlob);
  const fontStyle = document.createElement("style");
  fontStyle.innerHTML = `@font-face { font-family: "${fontName}"; src: url("${blobUrl}") format("woff2"); }`;
  document.head.appendChild(fontStyle);

  // Step 3: Wait for the font to become available
  try {
    if (document.fonts) {
      await document.fonts.ready;
      const loaded = await document.fonts.check(`48px "${fontName}"`);
      if (!loaded) {
        // Force load by rendering a test character
        const testDiv = document.createElement("div");
        testDiv.style.fontFamily = `"${fontName}", sans-serif`;
        testDiv.style.fontSize = "48px";
        testDiv.style.position = "absolute";
        testDiv.style.left = "-9999px";
        testDiv.textContent = ""; // A typical encrypted char
        document.body.appendChild(testDiv);
        await document.fonts.ready;
        testDiv.remove();
      }
      log.info(`[jjwxc-font-ocr]字体 ${fontName} 已加载`);
    }
  } catch (e) {
    log.warn(`[jjwxc-font-ocr]字体加载检测失败: ${e}`);
  }

  // Step 4: Collect unique encrypted characters from the text
  // Jjwxc encrypted chars are in Unicode Private Use Area (U+E000-U+F8FF)
  const allChars = [...inputText.replace(/‌/g, "")];
  const uniqueEncryptedChars = [...new Set(allChars)].filter((ch) => {
    const code = ch.codePointAt(0)!;
    // Private Use Area: U+E000-U+F8FF
    // Supplementary PUA-A: U+F0000-U+FFFFD
    return (
      (code >= 0xE000 && code <= 0xF8FF) ||
      (code >= 0xF0000 && code <= 0xFFFFD)
    );
  });

  if (uniqueEncryptedChars.length === 0) {
    log.warn("[jjwxc-font-ocr]没有找到加密字符");
    fontStyle.remove();
    URL.revokeObjectURL(blobUrl);
    return undefined;
  }

  log.info(`[jjwxc-font-ocr]发现 ${uniqueEncryptedChars.length} 个唯一加密字符`);

  // Step 5: Build decode map via batch canvas OCR
  const decodeMap = await buildFontDecodeMap(fontName, uniqueEncryptedChars);

  // Clean up
  fontStyle.remove();
  URL.revokeObjectURL(blobUrl);

  if (decodeMap.size === 0) {
    log.error("[jjwxc-font-ocr]OCR解码映射表构建失败");
    return undefined;
  }

  log.info(
    `[jjwxc-font-ocr]解码映射表: ${decodeMap.size}/${uniqueEncryptedChars.length} 个字符已映射`,
  );

  // Convert Map to plain object (JjwxcFontTable)
  const table: JjwxcFontTable = {};
  for (const [encrypted, real] of decodeMap) {
    table[encrypted] = real;
  }
  return table;
}

/**
 * Build a font decode map by rendering encrypted characters on canvas
 * with the custom font and using OCR to determine the visual characters.
 * Characters are rendered one-per-line (vertically) in batches for reliable OCR.
 */
async function buildFontDecodeMap(
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

    const canvas = document.createElement("canvas") as HTMLCanvasElement;
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
      ctx.font = `${CHAR_SIZE}px "${fontFamily}"`;
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
          `[jjwxc-font-ocr]批次 ${i}: 期望 ${batch.length} 个字符, OCR识别 ${ocrChars.length} 个. 回退到逐字OCR.`,
        );
        for (const ch of batch) {
          if (map.has(ch)) continue;
          const single = await ocrSingleChar(
            canvas,
            ctx,
            ch,
            fontFamily,
            CHAR_SIZE,
            SCALE,
            ocrDecoder,
          );
          if (single) {
            map.set(ch, single);
          }
        }
      }

      if (
        (i + BATCH_SIZE) % 150 === 0 ||
        i + BATCH_SIZE >= uniqueChars.length
      ) {
        log.info(
          `[jjwxc-font-ocr]映射进度: ${Math.min(i + BATCH_SIZE, uniqueChars.length)}/${uniqueChars.length}`,
        );
      }
    }

    canvas.width = 0;
    canvas.height = 0;
    return map;
  } catch (e) {
    log.error(
      `[jjwxc-font-ocr]构建解码映射表出错: ${e instanceof Error ? e.message : String(e)}`,
    );
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
  ctx.font = `${charSize}px "${fontFamily}"`;
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
