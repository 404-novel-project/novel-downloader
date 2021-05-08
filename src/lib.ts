import { Builder, walk } from "./cleanDOM";
import { enaleDebug } from "./rules";
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

export async function getText(url: string, charset: string | undefined) {
  if (charset === undefined) {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Bad response! ${url}`);
      }
    });
  } else {
    return fetch(url)
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

export async function getHtmlDOM(url: string, charset: string | undefined) {
  const htmlText = await getText(url, charset);
  return new DOMParser().parseFromString(htmlText, "text/html");
}

export async function ggetText(url: string, charset: string | undefined) {
  if (charset === undefined) {
    return gfetch(url).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.responseText;
      } else {
        throw new Error(`Bad response! ${url}`);
      }
    });
  } else {
    return gfetch(url, { responseType: "arraybuffer" })
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

export async function ggetHtmlDOM(url: string, charset: string | undefined) {
  const htmlText = await ggetText(url, charset);
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

export function console_debug(...messages: any[]) {
  if (enaleDebug) {
    console.debug(...arguments);
  }
}

export function getAttachmentClassCache(url: string, name: string) {
  const f1 = attachmentClassCache.filter(
    (attachmentClass) => attachmentClass.url === url
  );
  const f2 = f1.filter((attachmentClass) => attachmentClass.name === name);
  if (f2.length) {
    return f2[0];
  } else {
    return null;
  }
}

export function putAttachmentClassCache(attachmentClass: attachmentClass) {
  attachmentClassCache.push(attachmentClass);
  return true;
}
