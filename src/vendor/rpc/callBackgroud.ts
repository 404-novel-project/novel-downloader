// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */
import log from "loglevel";
import * as browser from "webextension-polyfill";

import {
  CallObject as CallObjectBackgroud,
  callFunctionList as callFunctionListBackgroud,
} from "backgroud/rpc";

import { responseMessageOk, responseMessageError } from "./baseCall";

async function _callBackgroud<T>(callObject: T) {
  log.debug("call request:", callObject);
  const resps = (await browser.runtime.sendMessage(callObject)) as Record<
    keyof T,
    responseMessageOk | responseMessageError
  >;
  Object.entries(resps)
    .filter(([, r]) => (r as any).type === "error")
    .forEach(([, e]) => log.error("call:", e));
  const results = Object.entries(resps)
    .filter(([, r]) => (r as any).type === "ok")
    .map(([k, r]) => [k, (r as unknown as responseMessageOk).value]);
  const output = Object.fromEntries(results);
  log.debug("call response:", output);
  return output;
}

/**
 * 调用后台 API
 * @param name - 函数名
 * @param value - 参数
 * @returns
 * @public
 */
export async function callBackgroud<
  K extends keyof CallObjectBackgroud & keyof typeof callFunctionListBackgroud,
  V extends CallObjectBackgroud[K],
>(name: K, value: V) {
  const obj: CallObjectBackgroud = {};
  obj[name] = value;
  const resp = await _callBackgroud(obj);
  return resp[name] as ReturnType<(typeof callFunctionListBackgroud)[K]>;
}
