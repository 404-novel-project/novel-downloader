import * as CryptoJS from "crypto-js";
import { _GM_xmlhttpRequest } from "./GM";

export type PublicConstructor<T> = new () => T;

export function rm(selector: string, all = false, dom: HTMLElement) {
  if (all) {
    const rs = dom.querySelectorAll(selector);
    rs.forEach((e) => e.remove());
  } else {
    const r = dom.querySelector(selector);
    if (r) {
      r.remove();
    }
  }
}

export function rm2(content: HTMLElement, filters: (string | RegExp)[]) {
  function doRemove(nodes: HTMLElement | Text) {
    Array.from(nodes.childNodes).forEach((node) => {
      let text = "";
      if (node.nodeName === "#text") {
        text = (node as Text).textContent ?? "";
      } else {
        text = (node as HTMLElement).innerText;
      }
      if (text.length < 200 || node instanceof Text) {
        for (const filter of filters) {
          if (filter instanceof RegExp) {
            if (filter.test(text)) {
              node.remove();
            }
          }
          if (typeof filter === "string") {
            if (text.includes(filter)) {
              node.remove();
            }
          }
        }
      } else {
        doRemove(node as HTMLElement | Text);
      }
    });
  }
  doRemove(content);
}

// source: https://segmentfault.com/a/1190000013128649
export function concurrencyRun(
  list: object[],
  limit: number,
  asyncHandle: (arg: any) => any
) {
  async function recursion(arr: object[]): Promise<any> {
    const obj = await asyncHandle(arr.shift());
    if (arr.length !== 0) {
      return recursion(arr);
    } else {
      return "finish!";
    }
  }

  const listCopy = [...list];
  const asyncList = [];
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// https://stackoverflow.com/questions/11869582/make-sandbox-around-function-in-javascript
export function sandboxed(code: string) {
  const frame = document.createElement("iframe");
  document.body.appendChild(frame);

  if (frame.contentWindow) {
    // @ts-expect-error Property 'Function' does not exist on type 'Window'.ts(2339)
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
    // @ts-expect-error
    storage = window[type];
    const x = "__storage_test__";
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
export function calculateMd5(blob: Blob) {
  return new Promise((resolve, rejects) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      if (reader.result) {
        // @ts-ignore
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

export class LocalStorageExpired {
  private storage: Storage;

  constructor() {
    if (storageAvailable("localStorage")) {
      this.storage = window.localStorage;
      this.init();
    } else {
      throw new Error("当前浏览器不支持 localStorage");
    }
  }

  private init() {
    const reg = new RegExp("__expires__$");
    const storage = this.storage;
    const keys = Object.keys(storage);
    keys.forEach((key) => {
      if (!reg.test(key)) {
        this.get(key);
      }
    });
  }

  set(key: string, value: string | object, expired: number) {
    const storage = this.storage;
    storage[key] = JSON.stringify(value);
    if (expired) {
      storage[`${key}__expires__`] = Date.now() + 1000 * expired;
    }
  }

  get(key: string) {
    const storage = this.storage;
    const expired = storage[`${key}__expires__`] ?? false;
    const now = Date.now();

    if (expired && now >= expired) {
      this.remove(key);
      return;
    }

    if (expired) {
      try {
        const value = JSON.parse(storage[key]);
        return value;
      } catch (error) {
        return storage[key];
      }
    } else {
      return storage[key];
    }
  }

  remove(key: string) {
    const storage = this.storage;
    if (storage[key]) {
      delete storage[key];
      if (storage[`${key}__expires__`]) {
        delete storage[`${key}__expires__`];
      }
    }
  }
}

export function deepcopy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

export function regexpEscape(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
