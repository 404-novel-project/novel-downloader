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
) {
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

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function deepcopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function regexpEscape(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function saveToArchiveOrg(url: string) {
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
  const data = await req.json();
  return data;
}

export function mean(list: number[]) {
  if (list.length === 0) {
    return 0;
  }

  const sum = list.reduce((p, c) => p + c);
  return sum / list.length;
}

export function sd(list: number[]) {
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
function createUUID() {
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
  // @ts-expect-error: Property 'randomUUID' does not exist on type 'Crypto'
  if (typeof crypto.randomUUID === "function") {
    // @ts-expect-error: Property 'randomUUID' does not exist on type 'Crypto'
    return crypto.randomUUID();
  } else {
    return createUUID();
  }
}

export function extensionToMimetype(ext: string) {
  for (const [mimetype, entry] of Object.entries(db)) {
    if (entry.extensions?.includes(ext)) {
      return mimetype;
    }
  }
  return "application/octet-stream";
}
