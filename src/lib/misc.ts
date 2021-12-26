import { ExpectError } from "../main/main";

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
    method: "POST",
  });
  const data = await req.json();
  return data;
}
