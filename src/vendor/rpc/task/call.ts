// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import type { CallMsg, CallResponseMsg } from "./type";
import type { responseMessageError, responseMessageOk } from "..";
import type { CallObject as CallObjectBackgroud } from "backgroud/rpc/call";
import type { CallObject as CallObjectContentScript } from "content_scripts/rpc/call";
import type { globalCommon } from "global";

/**
 * 通过 Port 调用函数
 * @public
 */
export default async <T extends CallObjectBackgroud | CallObjectContentScript>(
  message: CallMsg<T>,
  port: browser.Runtime.Port,
) => {
  const { callFunctionList: callFunctionListBackgroud } = await import("backgroud/rpc/call");
  const { callFunctionList: callFunctionListContentScript } = await import(
    "content_scripts/rpc/call"
  );
  const { errorToObject } = await import("vendor/utils");

  const callFunctionList =
    (globalThis as globalCommon).RuntimeEnv === "backgroud"
      ? callFunctionListBackgroud
      : callFunctionListContentScript;

  const response: Record<string, responseMessageOk | responseMessageError> = {};
  for (const [name, args] of Object.entries(message.args)) {
    try {
      response[name] = {
        type: "ok",
        call: { name, args },
        value: await callFunctionList[name as keyof typeof callFunctionList](args),
      };
    } catch (error) {
      const _r: responseMessageError = {
        type: "error",
        call: { name, args },
        error: errorToObject(error as Error),
      };
      log.error("listener:", _r);
      response[name] = _r;
    }
  }
  const msg: CallResponseMsg = {
    pid: (globalThis as globalCommon).pid,
    taskID: message.taskID,
    msgID: message.msgID,
    type: "callResponse",
    response,
  };
  port.postMessage(msg);
};
