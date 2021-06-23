import { Builder, walk } from "./cleanDOM";
import { attachmentClassCache } from "./index";
import { attachmentClass } from "./main";

export let _GM_info: GM_info | GM["info"];
if (typeof GM_info === "undefined") {
  if (typeof GM === "undefined") {
    throw new Error("未发现 GM API");
  } else {
    if (typeof GM.info === "undefined") {
      throw new Error("未发现 GM API");
    } else {
      _GM_info = GM.info;
    }
  }
} else {
  _GM_info = GM_info;
}

let _GM_xmlhttpRequest: GM_xmlhttpRequest | GM["xmlHttpRequest"];
if (typeof GM_xmlhttpRequest === "undefined") {
  if (typeof GM === "undefined") {
    throw new Error("未发现 GM API");
  } else {
    if (typeof GM.xmlHttpRequest === "undefined") {
      throw new Error("未发现 GM API");
    } else {
      _GM_xmlhttpRequest = GM.xmlHttpRequest;
    }
  }
} else {
  _GM_xmlhttpRequest = GM_xmlhttpRequest;
}

export function cleanDOM(DOM: Element, imgMode: "naive" | "TM") {
  const builder: Builder = {
    dom: document.createElement("div"),
    text: "",
    images: [],
    imgMode: imgMode,
  };
  walk(DOM as HTMLElement, builder);
  return {
    dom: builder.dom,
    text: builder.text.trim(),
    images: builder.images,
  };
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

export async function getText(
  url: string,
  charset: string | undefined,
  init: RequestInit | undefined = undefined
) {
  if (charset === undefined) {
    return fetch(url, init).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Bad response! ${url}`);
      }
    });
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
      });
  }
}

export async function getHtmlDOM(
  url: string,
  charset: string | undefined,
  init: RequestInit | undefined = undefined
) {
  const htmlText = await getText(url, charset, init);
  return new DOMParser().parseFromString(htmlText, "text/html");
}

export async function ggetText(
  url: string,
  charset: string | undefined,
  init: gfetch_request_options | undefined = undefined
) {
  if (charset === undefined) {
    return gfetch(url, init).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.responseText;
      } else {
        throw new Error(`Bad response! ${url}`);
      }
    });
  } else {
    if (init) {
      init["responseType"] = "arraybuffer";
    }
    return gfetch(url, init)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return <ArrayBuffer>response.response;
        } else {
          throw new Error(`Bad response! ${url}`);
        }
      })
      .then((buffer: ArrayBuffer) => {
        const decoder = new TextDecoder(charset);
        const text = decoder.decode(buffer);
        return text;
      });
  }
}

export async function ggetHtmlDOM(
  url: string,
  charset: string | undefined,
  init: gfetch_request_options | undefined = undefined
) {
  const htmlText = await ggetText(url, charset, init);
  return new DOMParser().parseFromString(htmlText, "text/html");
}

export function rm(selector: string, all = false, dom: HTMLElement) {
  if (all) {
    let rs = dom.querySelectorAll(selector);
    rs.forEach((e) => e.remove());
  } else {
    let r = dom.querySelector(selector);
    if (r) {
      r.remove();
    }
  }
}

interface gfetch_request_options {
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
  }: gfetch_request_options = {}
): Promise<GM_xmlhttpResponse> {
  return new Promise((resolve, reject) => {
    if (_GM_xmlhttpRequest) {
      _GM_xmlhttpRequest({
        url: url,
        method: method,
        headers: headers,
        data: data,
        cookie: cookie,
        binary: binary,
        nocache: nocache,
        revalidate: revalidate,
        timeout: timeout,
        context: context,
        responseType: responseType,
        overrideMimeType: overrideMimeType,
        anonymous: anonymous,
        username: username,
        password: password,
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

// source: https://segmentfault.com/a/1190000013128649
export function concurrencyRun(
  list: object[],
  limit: number,
  asyncHandle: Function
) {
  function recursion(arr: object[]) {
    return asyncHandle(arr.shift()).then(() => {
      if (arr.length !== 0) {
        return recursion(arr);
      } else {
        return "finish!";
      }
    });
  }

  let listCopy = [...list];
  let asyncList: Function[] = [];
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAttachmentClassCache(url: string, name: string) {
  const found = attachmentClassCache.find(
    (attachmentClass) =>
      attachmentClass.url === url && attachmentClass.name === name
  );
  return found;
}

export function putAttachmentClassCache(attachmentClass: attachmentClass) {
  attachmentClassCache.push(attachmentClass);
  return true;
}

// https://stackoverflow.com/questions/11869582/make-sandbox-around-function-in-javascript
export function sandboxed(code: string) {
  const frame = document.createElement("iframe");
  document.body.appendChild(frame);

  if (frame.contentWindow) {
    //@ts-expect-error Property 'Function' does not exist on type 'Window'.ts(2339)
    const F = frame.contentWindow.Function;
    const args = Object.keys(frame.contentWindow).join();

    document.body.removeChild(frame);

    return F(args, code)();
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export function storageAvailable(type: string) {
  let storage;
  try {
    //@ts-expect-error
    storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
