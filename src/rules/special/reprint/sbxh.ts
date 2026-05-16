import { mkRuleClass } from "../../onePage/template";
import { rm } from "../../../lib/dom";
import { log } from "../../../log";

export const sbxh = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: getBookname(),
    author: getAuthor(),
    introDom: getIntroDom(),
    introDomPatch: (dom: HTMLElement) => dom,
    coverUrl: getCoverUrl(),
    aList: getChapterList(),
    getAName: (aElem) => {
      const neTitle = aElem.querySelector(".ne-title");
      return neTitle?.textContent?.trim() || aElem.textContent?.trim() || "";
    },
    getContentFromUrl: async (
      chapterUrl: string,
      _chapterName: string | null,
      _charset: string,
    ) => {
      try {
        return await fetchChapterContent(chapterUrl);
      } catch (err) {
        log.warn(`[sbxh] chapter download failed: ${chapterUrl}`, err);
        return null;
      }
    },
    contentPatch: (content: HTMLElement) => {
      rm("script, style, iframe, ins", false, content);
      return content;
    },
    concurrencyLimit: 1,
    sleepTime: 1000,
    needLogin: false,
    nsfw: false,
    language: "ko",
  });

interface ChapterIds {
  novelId: string;
  episodeId: string;
}

async function fetchChapterContent(
  chapterUrl: string,
): Promise<HTMLElement | null> {
  const ids = extractIdsFromUrl(chapterUrl);
  if (!ids) {
    log.warn(`[sbxh] cannot parse novelId/episodeId from ${chapterUrl}`);
    return null;
  }

  log.debug(`[sbxh] fetching chapter HTML: ${chapterUrl}`);
  const html = await fetch(chapterUrl, { credentials: "include" }).then((r) =>
    r.text(),
  );
  if (isCaptchaHtml(html)) {
    log.warn(`[sbxh] chapter requires captcha: ${chapterUrl}`);
    return createCaptchaMessage();
  }

  const token = extractEscapedJsonString(html, "token");
  const cookieName = extractEscapedJsonString(html, "cookieName") ?? "nv";
  if (!token) {
    log.warn(`[sbxh] could not extract token from ${chapterUrl}`);
    return null;
  }

  let cookie = readCookie(cookieName);
  if (!cookie) {
    await fetch("/api/nv-issue", {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
    }).catch(() => null);
    cookie = readCookie(cookieName);
  }
  if (!cookie) {
    log.warn(`[sbxh] ${cookieName} cookie not set after nv-issue`);
    return null;
  }

  const nonceBytes = crypto.getRandomValues(new Uint8Array(24));
  const nonce = base64UrlEncode(nonceBytes);
  const proof = await hmacSha256Base64Url(
    cookie,
    `${token}.${nonce}.${navigator.userAgent}`,
  );

  const resp = await fetch("/api/novel-content", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "x-novel-client": "shadow-v2",
    },
    body: JSON.stringify({
      novelId: ids.novelId,
      episodeId: ids.episodeId,
      token,
      nonce,
      proof,
    }),
  });
  if (!resp.ok) {
    log.warn(`[sbxh] /api/novel-content HTTP ${resp.status}`);
    return null;
  }

  const data = (await resp.json().catch(() => null)) as {
    ok?: boolean;
    empty?: boolean;
    payload?: string;
  } | null;
  if (!data || !data.ok || data.empty || !data.payload) {
    log.warn(`[sbxh] novel-content invalid reply`, data);
    return null;
  }

  const xorKey = cookie.split(".")[0] ?? "";
  if (!xorKey) {
    log.warn(`[sbxh] cookie has no key segment`);
    return null;
  }
  const decrypted = xorDecryptBase64Url(data.payload, xorKey);
  return renderChapterPayload(decrypted);
}

function extractIdsFromUrl(url: string): ChapterIds | null {
  const m = url.match(/\/novel\/(\d+)\/(\d+)/);
  if (!m) return null;
  return { novelId: m[1], episodeId: m[2] };
}

function extractEscapedJsonString(html: string, key: string): string | null {
  // Inside __next_f stream chunks, JSON appears escaped inside a JS string
  // literal:  \"key\":\"value\"   (literal backslash + quote characters).
  // Use indexOf rather than a regex to avoid escape-cliff issues.
  const marker = '\\"' + key + '\\":\\"';
  const start = html.indexOf(marker);
  if (start < 0) return null;
  const valueStart = start + marker.length;
  const valueEnd = html.indexOf('\\"', valueStart);
  if (valueEnd < 0) return null;
  return html.slice(valueStart, valueEnd);
}

function readCookie(name: string): string | null {
  for (const raw of document.cookie.split(";")) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq);
    if (k === name) {
      try {
        return decodeURIComponent(trimmed.slice(eq + 1));
      } catch {
        return trimmed.slice(eq + 1);
      }
    }
  }
  return null;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(s: string): Uint8Array {
  let b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256Base64Url(
  keyStr: string,
  message: string,
): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(keyStr),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, enc.encode(message)),
  );
  return base64UrlEncode(sig);
}

function xorDecryptBase64Url(payloadB64u: string, keyB64u: string): string {
  const payload = base64UrlDecode(payloadB64u);
  const key = base64UrlDecode(keyB64u);
  if (key.length === 0) return "";
  const out = new Uint8Array(payload.length);
  for (let i = 0; i < payload.length; i++) {
    out[i] = payload[i] ^ key[i % key.length];
  }
  return new TextDecoder("utf-8").decode(out);
}

function renderChapterPayload(decrypted: string): HTMLElement {
  const container = document.createElement("div");
  container.className = "novel-epub-rendered";

  let parsed:
    | { kind?: string; html?: string; text?: string; css?: string }
    | null = null;
  if (decrypted.startsWith("{")) {
    try {
      parsed = JSON.parse(decrypted);
    } catch {
      parsed = null;
    }
  }

  if (parsed && parsed.kind === "html" && typeof parsed.html === "string") {
    container.innerHTML = parsed.html;
  } else {
    const text =
      parsed && parsed.kind === "text" && typeof parsed.text === "string"
        ? parsed.text
        : decrypted;
    const paragraphs = text
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const para of paragraphs) {
      const p = document.createElement("p");
      p.textContent = para;
      container.appendChild(p);
    }
  }

  return container;
}

function isCaptchaHtml(html: string): boolean {
  return (
    html.includes("Just a moment") ||
    /id=["']?challenge-(running|form)|class=["']?cf-browser-verification/.test(
      html,
    )
  );
}

function getBookname(): string {
  const h1 = document.querySelector(".novel-detail h1");
  const text = h1?.textContent?.trim();
  if (text && text.length > 0 && text.length < 100) {
    return text;
  }
  const titlePart = document.title.split(">")[0]?.trim();
  return titlePart || document.title.trim();
}

function getAuthor(): string {
  const firstSpan = document.querySelector(".nd-meta span:first-child");
  const text = firstSpan?.textContent?.trim();
  if (text && text.length > 0 && text.length < 30) {
    return text;
  }
  return "";
}

function getIntroDom(): HTMLElement | undefined {
  const el = document.querySelector(".nd-desc");
  if (el?.textContent?.trim()) {
    return el as HTMLElement;
  }
  return undefined;
}

function getCoverUrl(): string | null {
  const img = document.querySelector(".nd-thumb img") as HTMLImageElement;
  return img?.src || null;
}

function getChapterList(): NodeListOf<Element> | Element[] {
  const list = document.querySelectorAll("ul.novel-eps li a");
  if (list.length > 0) {
    return list;
  }
  return [];
}

function createCaptchaMessage(): HTMLElement {
  const container = document.createElement("div");

  const title = document.createElement("p");
  title.style.fontWeight = "bold";
  title.style.fontSize = "1.2em";
  title.textContent = "⚠️ Cloudflare 인증이 필요합니다 (需要 Cloudflare 验证)";
  container.appendChild(title);

  const p1 = document.createElement("p");
  p1.textContent = "Cloudflare 인증을 통과해야 컨텐츠를 확인할 수 있습니다.";
  container.appendChild(p1);

  const divider = document.createElement("hr");
  container.appendChild(divider);

  const hint = document.createElement("p");
  hint.style.color = "#666";
  hint.textContent = "请在浏览器中通过 Cloudflare 验证后重新下载此章节。";
  container.appendChild(hint);

  return container;
}
