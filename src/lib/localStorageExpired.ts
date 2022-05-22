import { log } from "../log";

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export function storageAvailable(type: string) {
  let storage;
  try {
    storage = window[type as keyof Window];
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

  set(key: string, value: any, expired: number): void {
    const storage = this.storage;
    try {
      storage[key] = JSON.stringify(value);
      if (expired) {
        storage[`${key}__expires__`] = Date.now() + 1000 * expired;
      }
    } catch (error) {
      log.error(error);
    }
  }

  get(key: string): any {
    const storage = this.storage;
    const expired = storage[`${key}__expires__`] ?? false;
    const now = Date.now();

    if (expired && now >= expired) {
      this.remove(key);
      return;
    }

    if (expired) {
      try {
        return JSON.parse(storage[key]);
      } catch (error) {
        return storage[key];
      }
    } else {
      return storage[key];
    }
  }

  remove(key: string): void {
    const storage = this.storage;
    if (storage[key]) {
      delete storage[key];
      if (storage[`${key}__expires__`]) {
        delete storage[`${key}__expires__`];
      }
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
}
