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
export async function buildFontTableViaOCR(
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
      await document.fonts.load(`48px "${fontName}"`);
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

  // Step 5: Build decode map — glyph comparison first, OCR fallback for unmapped chars
  const candidateChars = [...new Set([...inputText].filter((ch) => {
    const code = ch.codePointAt(0)!;
    return (code >= 0x3400 && code <= 0x9FFF) || (code >= 0xF900 && code <= 0xFAFF);
  }))];
  const glyphMap = await buildFontDecodeMapViaGlyphComparison(fontName, uniqueEncryptedChars, candidateChars);
  log.info(`[jjwxc-font-ocr]字形比对: ${glyphMap.size}/${uniqueEncryptedChars.length} 个字符已映射`);
  const stillUnmapped = uniqueEncryptedChars.filter((ch) => !glyphMap.has(ch));
  const decodeMap = new Map(glyphMap);
  if (stillUnmapped.length > 0) {
    log.info(`[jjwxc-font-ocr]${stillUnmapped.length} 个字符回退到OCR解码`);
    const ocrMap = await buildFontDecodeMap(fontName, stillUnmapped);
    for (const [k, v] of ocrMap) decodeMap.set(k, v);
  }

  // Clean up
  fontStyle.remove();
  URL.revokeObjectURL(blobUrl);

  if (decodeMap.size === 0) {
    log.error("[jjwxc-font-ocr]解码映射表构建失败");
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

async function buildFontDecodeMapViaGlyphComparison(
  fontFamily: string,
  uniquePUAChars: string[],
  candidateChars: string[],
): Promise<Map<string, string>> {
  if (uniquePUAChars.length === 0) return new Map();
  const SIZE = 32;
  const GRID = 8;
  const CELL = SIZE / GRID;
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  function getFingerprint(ch: string, font: string): Float32Array | null {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#000";
    ctx.font = `${SIZE * 0.7}px ${font}`;
    ctx.fillText(ch, SIZE / 2, SIZE / 2);
    const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
    const fp = new Float32Array(GRID * GRID);
    let total = 0;
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID; gx++) {
        let sum = 0;
        for (let py = gy * CELL; py < (gy + 1) * CELL; py++) {
          for (let px = gx * CELL; px < (gx + 1) * CELL; px++) {
            sum += (255 - data[(py * SIZE + px) * 4]);
          }
        }
        fp[gy * GRID + gx] = sum / (CELL * CELL * 255);
        total += fp[gy * GRID + gx];
      }
    }
    return total > 0.05 ? fp : null;
  }

  function cosineSim(a: Float32Array, b: Float32Array): number {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    const d = Math.sqrt(na) * Math.sqrt(nb);
    return d < 1e-10 ? 0 : dot / d;
  }

  const allCandidates = new Set(candidateChars);
  for (let cp = 0x4E00; cp <= 0x9FFF; cp++) allCandidates.add(String.fromCodePoint(cp));

  const candidateFPs: Array<{ ch: string; fp: Float32Array }> = [];
  for (const ch of allCandidates) {
    for (const sysFont of ["serif", "sans-serif"]) {
      const fp = getFingerprint(ch, sysFont);
      if (fp) candidateFPs.push({ ch, fp });
    }
  }

  const THRESHOLD = 0.88;
  const customFontStr = `"${fontFamily}"`;
  const result = new Map<string, string>();
  for (const puaChar of uniquePUAChars) {
    const puaFP = getFingerprint(puaChar, customFontStr);
    if (!puaFP) continue;
    let bestSim = -1;
    let bestChar: string | null = null;
    for (const { ch, fp } of candidateFPs) {
      const sim = cosineSim(puaFP, fp);
      if (sim > bestSim) { bestSim = sim; bestChar = ch; }
    }
    if (bestSim >= THRESHOLD && bestChar !== null) {
      result.set(puaChar, bestChar);
      log.debug(`[jjwxc-glyph] U+${puaChar.codePointAt(0)?.toString(16).toUpperCase()} → ${bestChar} (sim=${bestSim.toFixed(3)})`);
    }
  }

  canvas.width = 0;
  canvas.height = 0;
  return result;
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
      let batchOcrOk = false;
      try {
        const pngData = canvasToUint8Array(canvas);
        const ocrText = await ocrDecoder.decodeFullText(pngData);
        const ocrChars = [...ocrText.replace(/[\s\n\r]/g, "")];
        if (ocrChars.length === batch.length) {
          for (let j = 0; j < batch.length; j++) {
            map.set(batch[j], ocrChars[j]);
          }
          batchOcrOk = true;
        }
      } catch (batchErr) {
        log.warn(
          `[jjwxc-font-ocr]批次 ${i}: 全文OCR失败，回退到逐字: ${batchErr instanceof Error ? batchErr.message : String(batchErr)}`,
        );
      }
      if (!batchOcrOk) {
        log.warn(
          `[jjwxc-font-ocr]批次 ${i}: 期望 ${batch.length} 个字符, 回退到逐字OCR.`,
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
