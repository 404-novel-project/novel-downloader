// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { parseHTML } from "./dom";
import { sha256 } from "./hash";

/**
 * 获取 HTTP 响应的 Text
 * @param resp
 * @param characterSet - 字符编码。若为 `auto` 则会尝试自动识别文本编码。
 * @returns
 * @public
 */
export async function getTextFromResponse(resp: Response, characterSet: string) {
  if (characterSet === "auto") {
    const _text = await resp.clone().text();
    const document = parseHTML(_text);
    const charset: string | undefined =
      document.querySelector("[charset]")?.getAttribute("charset") ?? undefined;
    if (charset) {
      if (charset.toLowerCase() === "utf-8") {
        return _text;
      } else {
        const arrayBuffer = await resp.arrayBuffer();
        const text = new TextDecoder(charset).decode(arrayBuffer);
        return text;
      }
    } else {
      log.warn("getCorrectTextFromResponse: Not Found meta charset on text.");
      return _text;
    }
  } else {
    const arrayBuffer = await resp.arrayBuffer();
    const text = new TextDecoder(characterSet).decode(arrayBuffer);
    return text;
  }
}

/**
 * 尝试获取 HTTP 响应的 Document 对象
 * @param resp
 * @param characterSet - 字符编码。若为 `auto` 则会尝试自动识别文本编码。
 * @returns
 * @public
 */
export async function getDocumentFromResponse(resp: Response, characterSet: string) {
  const text = await getTextFromResponse(resp, characterSet);
  const doc = parseHTML(text);
  return {
    doc,
    $: doc.querySelector,
    $$: doc.querySelectorAll,
  };
}

/**
 * 请求并解析为文本
 * @param input
 * @param init
 * @param characterSet - 字符编码，默认为 `auto`。
 * @returns
 * @public
 */
export async function fetchText(
  input: RequestInfo | URL,
  init?: RequestInit,
  characterSet = "auto",
) {
  const resp = await fetch(input, init);
  const text = await getTextFromResponse(resp, characterSet);
  return text;
}

/**
 * 请求并解析为JSON
 * @param input -
 * @param init -
 * @returns
 * @public
 */
export async function fetchJson(input: RequestInfo | URL, init?: RequestInit) {
  const resp = await fetch(input, init);
  const data = await resp.json();
  return data;
}

/**
 * 请求并解析为 Document 对象
 * @param input
 * @param init
 * @param characterSet - 字符编码，默认为 `auto`。
 * @returns
 * @public
 */
export async function fetchDocument(
  input: RequestInfo | URL,
  init?: RequestInit,
  characterSet = "auto",
) {
  const resp = await fetch(input, init);
  const d = getDocumentFromResponse(resp, characterSet);
  return d;
}

/**
 * 下载附件
 * @param input
 * @param init
 * @returns
 */
export async function fetchAttachment(input: RequestInfo | URL, init?: RequestInit) {
  const resp = await fetch(input, init);
  if (resp.ok) {
    const data = await resp.blob();
    return {
      data,
      hash: await sha256(data),
      "content-length": resp.headers.get("content-length"),
      "content-type": resp.headers.get("content-type"),
      "last-modified": resp.headers.get("last-modified"),
      etag: resp.headers.get("etag"),
    };
  } else if (resp.status === 304) {
    return "304 Not Modified";
  } else {
    throw Error(`Fetch ${resp.url} failed! Status codes: ${resp.status} ${resp.statusText}.`, {
      cause: resp,
    });
  }
}

/**
 * downloadAttachment 函数参数
 * @public
 */
export interface downloadAttachmentArgs {
  url: string;
  lastModified?: number | string | Date;
  etag?: string;
}

/**
 * 下载附件
 * @param param0
 * @param init
 * @returns
 */
export function downloadAttachment(
  { url, lastModified, etag }: downloadAttachmentArgs,
  init?: RequestInit,
) {
  const request = new Request(url, init);
  if (lastModified) {
    request.headers.set("If-Modified-Since", new Date(lastModified).toUTCString());
  }
  if (etag) {
    request.headers.set("If-None-Match", etag);
  }
  return fetchAttachment(request);
}
