import { log } from "../log";
import { _GM_xmlhttpRequest } from "./GM";

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

export interface GfetchRequestOptions {
  method?: string;
  headers?: object;
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
  username?: string;
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
    username,
    password,
  }: GfetchRequestOptions = {}
): Promise<GM_xmlhttpResponse> {
  return new Promise((resolve, reject) => {
    if (_GM_xmlhttpRequest) {
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
        username,
        password,
        onload: (obj: GM_xmlhttpResponse) => {
          resolve(obj);
        },
        onerror: (err: object) => {
          reject(err);
        },
      });
    } else {
      throw new Error("未发现 _GM_xmlhttpRequest API");
    }
  });
}

export async function getText(
  url: string,
  charset?: string,
  init?: RequestInit
) {
  // upgrade http to https
  const _url = new URL(url);
  if (document.location.protocol === "https:" && _url.protocol === "http:") {
    _url.protocol = "https:";
    url = _url.toString();
  }

  if (charset === undefined) {
    return fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`Bad response! ${url}`);
        }
      })
      .catch((error) => log.error(error));
  } else {
    return fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          throw new Error(`Bad response! ${url}`);
        }
      })
      .then((buffer) => {
        const decoder = new TextDecoder(charset);
        const text = decoder.decode(buffer);
        return text;
      })
      .catch((error) => log.error(error));
  }
}

export async function getHtmlDOM(
  url: string,
  charset?: string,
  init?: RequestInit
) {
  const htmlText = await getText(url, charset, init);
  if (!htmlText) {
    throw new Error("Fetch Content failed!");
  }
  return new DOMParser().parseFromString(htmlText, "text/html");
}

export async function ggetText(
  url: string,
  charset?: string,
  init?: GfetchRequestOptions
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
        const text = decoder.decode(buffer);
        return text;
      })
      .catch((error) => log.error(error));
  }
}

export async function ggetHtmlDOM(
  url: string,
  charset?: string,
  init?: GfetchRequestOptions
) {
  const htmlText = await ggetText(url, charset, init);
  if (!htmlText) {
    throw new Error("Fetch Content failed!");
  }
  return new DOMParser().parseFromString(htmlText, "text/html");
}
