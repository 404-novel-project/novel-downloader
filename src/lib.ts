import { Builder, BuilderOption, walk } from "./cleanDOM";
import { attachmentClass, ExpectError } from "./main";
import { log } from "./log";
import { Zip, ZipPassThrough, ZipDeflate, AsyncZipDeflate } from "fflate";

export let _GM_info: GM_info | GM["info"];
if (typeof GM_info === "undefined") {
  if (typeof GM === "undefined") {
    throw new Error("未发现 GM_info");
  } else {
    if (typeof GM.info === "undefined") {
      throw new Error("未发现 GM_info");
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
    throw new Error("未发现 GM_xmlhttpRequest");
  } else {
    if (typeof GM.xmlHttpRequest === "undefined") {
      throw new Error("未发现 GM_xmlhttpRequest");
    } else {
      _GM_xmlhttpRequest = GM.xmlHttpRequest;
    }
  }
} else {
  _GM_xmlhttpRequest = GM_xmlhttpRequest;
}

export let _GM_setValue: GM_setValue | GM["setValue"] | null = null;
if (typeof GM_setValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_setValue");
  } else {
    if (typeof GM.setValue === "undefined") {
      log.warn("未发现 GM_setValue");
    } else {
      _GM_setValue = GM.setValue;
    }
  }
} else {
  _GM_setValue = GM_setValue;
}

export let _GM_getValue: GM_getValue | GM["getValue"] | null = null;
if (typeof GM_getValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_getValue");
  } else {
    if (typeof GM.getValue === "undefined") {
      log.warn("未发现 GM_getValue");
    } else {
      _GM_getValue = GM.getValue;
    }
  }
} else {
  _GM_getValue = GM_getValue;
}

export let _GM_deleteValue: GM_deleteValue | GM["deleteValue"] | null = null;
if (typeof GM_deleteValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_deleteValue");
  } else {
    if (typeof GM.deleteValue === "undefined") {
      log.warn("未发现 GM_deleteValue");
    } else {
      _GM_deleteValue = GM.deleteValue;
    }
  }
} else {
  _GM_deleteValue = GM_deleteValue;
}

export async function cleanDOM(
  DOM: Element,
  imgMode: "naive" | "TM",
  option: BuilderOption | null = null
) {
  const builder: Builder = {
    dom: document.createElement("div"),
    text: "",
    images: [],
    imgMode: imgMode,
    option: option,
  };
  await walk(DOM as HTMLElement, builder);
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
  // upgrade http to https
  const _url = new URL(url);
  if (document.location.protocol === "https:" && _url.protocol === "http:") {
    _url.protocol = "https:";
    url = _url.toString();
  }

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
    } else {
      init = { responseType: "arraybuffer" };
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

export function htmlTrim(dom: HTMLElement) {
  const childNodesR = Array.from(dom.childNodes).reverse();
  for (const node of childNodesR) {
    const ntype = node.nodeName.toLowerCase();

    const ntypes = ["#text", "br"];
    if (!ntypes.includes(ntype)) {
      return;
    }

    if (ntype === "#text") {
      if ((<Text>node).textContent?.trim() === "") {
        node.remove();
      } else {
        return;
      }
    }
    if (ntype === "br") {
      (<HTMLBRElement>node).remove();
    }
  }
}

let attachmentClassCache: attachmentClass[] = [];
export function getAttachmentClassCache(url: string) {
  const found = attachmentClassCache.find(
    (attachmentClass) => attachmentClass.url === url
  );
  return found;
}

export function putAttachmentClassCache(attachmentClass: attachmentClass) {
  attachmentClassCache.push(attachmentClass);
  return true;
}

export function clearAttachmentClassCache() {
  attachmentClassCache = [];
}

export async function getImageAttachment(
  url: string,
  imgMode: "naive" | "TM" = "TM",
  prefix: string = "",
  noMD5: boolean = false
) {
  const tmpImageName = Math.random().toString().replace("0.", "");

  let imgClass;
  const imgClassCache = getAttachmentClassCache(url);
  if (imgClassCache) {
    imgClass = imgClassCache;
  } else {
    imgClass = new attachmentClass(url, tmpImageName, imgMode);
    const blob = await imgClass.init();
    if (blob) {
      const hash = await calculateMd5(blob);
      const contentType = blob.type.split("/")[1];
      const contentTypeBlackList = ["octet-stream"];
      let ext = contentType;
      if (contentTypeBlackList.includes(contentType)) {
        const _ext = new URL(url).pathname
          .split(".")
          .slice(-1)[0]
          .match(/(^[\d|\w]+)/);
        if (_ext) {
          ext = _ext[0];
        } else {
          ext = new URL(url).pathname.split(".").slice(-1)[0];
        }
      }

      let imageName: string;
      if (noMD5) {
        let _imageName = new URL(url).pathname.split("/").slice(-1)[0];
        if (
          attachmentClassCache.find(
            (attachmentClass) =>
              attachmentClass.name === _imageName && attachmentClass.url !== url
          )
        ) {
          _imageName = new URL(url).pathname.split("/").slice(-2).join("_");
        }
        imageName = [prefix, _imageName].join("");
      } else {
        imageName = [prefix, hash, ".", ext].join("");
      }

      imgClass.name = imageName;
      putAttachmentClassCache(imgClass);
    } else {
      throw new ExpectError("[getImageAttachment] Init Image failed!");
    }
  }
  return imgClass;
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

// https://stackoverflow.com/questions/34492637/how-to-calculate-md5-checksum-of-blob-using-cryptojs
function calculateMd5(blob: Blob) {
  return new Promise((resolve, rejects) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = function () {
      if (reader.result) {
        //@ts-ignore
        const wordArray = CryptoJS.lib.WordArray.create(reader.result);
        const hash = CryptoJS.MD5(wordArray).toString();
        // or CryptoJS.SHA256(wordArray).toString(); for SHA-2
        resolve(hash);
      } else {
        rejects(Error("计算MD5值出错"));
        return;
      }
    };
  });
}

export class fflateZip {
  private zcount: number;
  private count: number;
  private tcount: number;
  private filenameList: string[];
  private savedZip: Zip;
  private zipOut: ArrayBuffer[];
  private onUpdateId?: number;
  public memlimit: boolean;
  public onFinal?: (zipBlob: Blob) => any;
  public onFinalError?: (error: Error) => any;

  public constructor(memlimit: boolean = false) {
    this.count = 0;
    this.zcount = 0;
    this.tcount = 0;
    this.memlimit = memlimit;
    this.filenameList = [];
    this.zipOut = [];

    const self = this;
    this.savedZip = new Zip((err, dat, final) => {
      if (err) {
        log.error(err);
        log.trace(err);
        throw err;
      }

      self.zipOut.push(dat);
      self.zcount++;

      if (final) {
        const zipBlob = new Blob(self.zipOut, { type: "application/zip" });
        log.debug("[fflateZip][debug][zcount]" + self.zcount);
        log.debug("[fflateZip][debug][count]" + self.count);
        log.info("[fflateZip] ZIP生成完毕，文件大小：" + zipBlob.size);
        self.zipOut = [];

        if (typeof self.onFinal === "function") {
          if (typeof self.onUpdateId !== "undefined") {
            clearInterval(self.onUpdateId);
          }

          try {
            self.onFinal(zipBlob);
          } catch (error) {
            if (typeof self.onFinalError === "function") {
              self.onFinalError(error);
            }
          }
        } else {
          throw "[fflateZip] 完成函数出错";
        }
      }
    });
  }

  public file(filename: string, file: Blob) {
    if (this.filenameList.includes(filename)) {
      log.error(`filename ${filename} has existed on zip.`);
      return;
    }
    this.count++;
    this.filenameList.push(filename);

    file
      .arrayBuffer()
      .then((buffer) => new Uint8Array(buffer))
      .then((chunk) => {
        if (this.memlimit || file.type.includes("image/")) {
          const nonStreamingFile = new ZipPassThrough(filename);
          this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
          this.tcount++;
        } else {
          const nonStreamingFile = new AsyncZipDeflate(filename, {
            level: 6,
          });
          this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
          this.tcount++;
        }
      });
  }

  private addToSavedZip(
    savedZip: Zip,
    nonStreamingFile: ZipDeflate | AsyncZipDeflate | ZipPassThrough,
    chunk: Uint8Array
  ) {
    savedZip.add(nonStreamingFile);
    nonStreamingFile.push(chunk, true);
  }

  public async generateAsync(
    onUpdate: ((percent: number) => any) | undefined = undefined
  ): Promise<void> {
    while (this.tcount !== this.count) {
      await sleep(500);
    }

    const self = this;
    this.onUpdateId = window.setInterval(() => {
      const percent = (self.zcount / 3 / self.count) * 100;
      if (typeof onUpdate === "function") {
        onUpdate(percent);
      }
    }, 100);

    this.savedZip.end();
  }
}
