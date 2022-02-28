import { log } from "../log";
import { retryLimit } from "../setting";
import { _GM_xmlhttpRequest } from "./GM";
import { sleep } from "./misc";

globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    log.debug("[debug]fetch:");
    log.debug(argArray);
    return Reflect.apply(target, thisArg, argArray);
  },
});

export async function fetchWithRetry(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  let retry = retryLimit;
  while (retry > 0) {
    const resp = await fetch(input, init);
    if (resp.ok) {
      return resp;
    } else {
      await sleep(1000 * (retryLimit - retry));
      retry--;
    }
  }
  throw new Error(`Fetch with retry failed! Url: ${input}`);
}

// Forbidden header name
// https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
// Accept-Charset
// Accept-Encoding
// Access-Control-Request-Headers
// Access-Control-Request-Method
// Connection
// Content-Length
// Cookie
// Cookie2
// Date
// DNT
// Expect
// Feature-Policy
// Host
// Keep-Alive
// Origin
// Proxy-
// Sec-
// Referer
// TE
// Trailer
// Transfer-Encoding
// Upgrade
// Via

export interface GfetchRequestInit {
  method?: "GET" | "HEAD" | "POST" | undefined;
  headers?: Record<string, string>;
  data?: string;
  cookie?: string;
  binary?: boolean;
  nocache?: boolean;
  revalidate?: boolean;
  timeout?: number;
  context?: object;
  responseType?: "arraybuffer" | "blob" | "json";
  overrideMimeType?: string;
  anonymous?: boolean;
  user?: string;
  password?: string;
}
export function gfetch(
  url: string,
  {
    method = "GET",
    headers,
    data,
    cookie,
    binary,
    nocache,
    revalidate,
    timeout,
    context,
    responseType,
    overrideMimeType,
    anonymous,
    user,
    password,
  }: GfetchRequestInit = {}
): Promise<Tampermonkey.Response<object>> {
  return new Promise((resolve, reject) => {
    log.debug("[debug]gfetch:");
    // eslint-disable-next-line prefer-rest-params
    log.debug(Array.from(arguments));
    _GM_xmlhttpRequest({
      url,
      method,
      headers,
      data,
      cookie,
      binary,
      nocache,
      revalidate,
      timeout,
      context,
      responseType,
      overrideMimeType,
      anonymous,
      user,
      password,
      onload: (obj: Tampermonkey.Response<object>) => {
        resolve(obj);
      },
      onerror: (err: Tampermonkey.ErrorResponse) => {
        reject(err);
      },
    });
  });
}

export async function getText(
  input: RequestInfo,
  charset?: string,
  init?: RequestInit
) {
  // upgrade http to https
  if (typeof input === "string") {
    const _url = new URL(input);
    if (document.location.protocol === "https:" && _url.protocol === "http:") {
      _url.protocol = "https:";
      input = _url.toString();
    }
  }

  if (charset === undefined) {
    return fetch(input, init)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`Bad response! ${input}`);
        }
      })
      .catch((error) => log.error(error));
  } else {
    return fetch(input, init)
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          throw new Error(`Bad response! ${input}`);
        }
      })
      .then((buffer) => {
        const decoder = new TextDecoder(charset);
        // noinspection UnnecessaryLocalVariableJS
        const text = decoder.decode(buffer);
        return text;
      })
      .catch((error) => log.error(error));
  }
}

export async function getHtmlDOM(
  input: RequestInfo,
  charset?: string,
  init?: RequestInit
) {
  const htmlText = await getText(input, charset, init);
  if (!htmlText) {
    throw new Error("Fetch Content failed!");
  }
  const doc = new DOMParser().parseFromString(htmlText, "text/html");
  if (!doc.querySelector("base")) {
    const base = doc.createElement("base");
    if (typeof input === "string") {
      base.href = input;
    } else {
      base.href = input.url;
    }
    doc.head.appendChild(base);
  }
  return doc;
}

export async function getHtmlDomWithRetry(
  input: RequestInfo,
  charset?: string,
  init?: RequestInit
): Promise<Document | null> {
  let retry = retryLimit;
  let doc = null;
  while (retry > 0) {
    try {
      doc = await getHtmlDOM(input, charset, init);
      retry = 0;
    } catch (error) {
      log.error(`抓取${input}失败，重试第${retryLimit - retry}次。`);
      log.error(error);
      retry--;
      await sleep(1000 * (retryLimit - retry));
    }
  }
  return doc;
}

export async function ggetText(
  url: string,
  charset?: string,
  init?: GfetchRequestInit
) {
  if (charset === undefined) {
    return gfetch(url, init)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.responseText;
        } else {
          throw new Error(`Bad response! ${url}`);
        }
      })
      .catch((error) => log.error(error));
  } else {
    if (init) {
      init.responseType = "arraybuffer";
    } else {
      init = { responseType: "arraybuffer" };
    }
    return gfetch(url, init)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.response as ArrayBuffer;
        } else {
          throw new Error(`Bad response! ${url}`);
        }
      })
      .then((buffer: ArrayBuffer) => {
        const decoder = new TextDecoder(charset);
        // noinspection UnnecessaryLocalVariableJS
        const text = decoder.decode(buffer);
        return text;
      })
      .catch((error) => log.error(error));
  }
}

export async function ggetHtmlDOM(
  url: string,
  charset?: string,
  init?: GfetchRequestInit
) {
  const htmlText = await ggetText(url, charset, init);
  if (!htmlText) {
    throw new Error("Fetch Content failed!");
  }
  const doc = new DOMParser().parseFromString(htmlText, "text/html");
  if (!doc.querySelector("base")) {
    const base = doc.createElement("base");
    base.href = url;
    doc.head.appendChild(base);
  }
  return doc;
}

export async function ggetHtmlDomWithRetry(
  url: string,
  charset?: string,
  init?: GfetchRequestInit
): Promise<Document | null> {
  let retry = retryLimit;
  let doc = null;
  while (retry > 0) {
    try {
      doc = await ggetHtmlDOM(url, charset, init);
      retry = 0;
    } catch (error) {
      log.error(`抓取${url}失败，重试第${retryLimit - retry}次。`);
      retry--;
      await sleep(1000 * (retryLimit - retry));
    }
  }
  return doc;
}

export async function getFrameContent(
  url: string,
  timeout = 0
): Promise<Document | null> {
  const frame = document.createElement("iframe");
  frame.src = url;
  frame.width = "1";
  frame.height = "1";
  const promise = new Promise((resolve, reject) => {
    frame.addEventListener("load", function () {
      setTimeout(() => {
        const doc = this.contentWindow?.document ?? null;
        this.remove();
        resolve(doc);
      }, timeout);
    });
  }) as Promise<Document | null>;
  log.debug("[debug]getFrameContent:" + url);
  document.body.appendChild(frame);
  return promise;
}
