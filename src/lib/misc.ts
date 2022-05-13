import { ExpectError } from "../main/main";
import { _GM_info } from "./GM";
import db from "mime-db";

export type PublicConstructor<T> = new () => T;

interface concurrencyOptions {
  signal?: AbortSignal;
  reason?: string;
}

// source: https://segmentfault.com/a/1190000013128649
export function concurrencyRun(
  list: any[],
  limit: number,
  asyncHandle: (arg: any) => any,
  options: concurrencyOptions = {}
): Promise<any> {
  const { signal, reason } = options;
  const listCopy = [...list];
  const asyncList = [];
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);

  async function recursion(arr: object[]): Promise<any> {
    if (signal?.aborted) {
      if (reason) {
        throw new ExpectError(reason);
      } else {
        throw new ExpectError("concurrencyRun was aborted!");
      }
    }
    await asyncHandle(arr.shift());
    if (arr.length !== 0) {
      return recursion(arr);
    } else {
      return "finish!";
    }
  }
}

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function deepcopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function regexpEscape(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function saveToArchiveOrg(url: string): Promise<any> {
  const req = await fetch("https://save.bgme.bid/save", {
    body: JSON.stringify({
      url,
    }),
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-requested-with": `novel-downloader ${_GM_info.script.version}; ${_GM_info.scriptHandler} ${_GM_info.version}`,
    },
    method: "POST",
  });
  return await req.json();
}

export function mean(list: number[]): number {
  if (list.length === 0) {
    return 0;
  }

  const sum = list.reduce((p, c) => p + c);
  return sum / list.length;
}

export function sd(list: number[]): number {
  if (list.length === 0) {
    return 0;
  }

  const m = mean(list);
  const variance =
    list.map((x) => Math.pow(x - m, 2)).reduce((p, c) => p + c) / list.length;
  const sd = Math.sqrt(variance);
  return sd;
}

// https://stackoverflow.com/a/873856
function createUUID(): string {
  // http://www.ietf.org/rfc/rfc4122.txt
  const s = new Array(36);
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = s.join("");
  return uuid;
}

export function randomUUID(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  } else {
    return createUUID();
  }
}

export function extensionToMimetype(ext: string): string {
  for (const [mimetype, entry] of Object.entries(db)) {
    if (entry.extensions?.includes(ext)) {
      return mimetype;
    }
  }
  return "application/octet-stream";
}

export function mimetyepToExtension(mimeType: string): string | null {
  for (const [mimetype, entry] of Object.entries(db)) {
    if (
      mimeType === mimetype &&
      Array.isArray(entry.extensions) &&
      entry.extensions.length !== 0
    ) {
      return entry.extensions[0];
    }
  }
  return null;
}
