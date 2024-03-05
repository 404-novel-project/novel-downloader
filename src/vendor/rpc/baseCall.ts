// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */

import log from "loglevel";
import * as browser from "webextension-polyfill";

import { errorToObject, errorToObjectReturn } from "../utils";

type callObjectType = Record<string, any>;

/**
 * 基础请求参数
 * @public
 */
export interface BaseCallObject {
  ping?: null;
  log?: {
    method: log.LogLevelNames | "setLevel" | "getLevel" | "disableAll" | "enableAll" | "resetLevel";
    args: any;
  };
}
type _BaseCallObject = Required<BaseCallObject>;
type callFunctionListType = Record<string, (...args: any[]) => any>;
/**
 * 基础函数列表
 * @public
 */
export const baseCallFunctionList = {
  ping: () => {
    return "pong!";
  },
  log: ({ method, args }: _BaseCallObject["log"]) => {
    switch (method) {
      case "setLevel": {
        return log.setLevel(args);
      }
      case "getLevel": {
        return log.getLevel();
      }
      case "disableAll": {
        return log.disableAll();
      }
      case "enableAll": {
        return log.enableAll();
      }
      case "resetLevel": {
        return log.resetLevel();
      }
      default: {
        return log[method](...args);
      }
    }
  },
};

/**
 * 成功响应
 * @public
 */
export type responseMessageOk = {
  type: "ok";
  call: {
    name: string;
    args: any;
  };
  value: any;
};
/**
 * 失败响应
 * @public
 */
export type responseMessageError = {
  type: "error";
  call: {
    name: string;
    args: any;
  };
  error: errorToObjectReturn;
};
/**
 * 监听器
 * @param callFunctionList -
 * @internal
 */
export function listen<T extends callFunctionListType>(callFunctionList: T) {
  const listener = async (call: callObjectType, sender: browser.Runtime.MessageSender) => {
    log.debug("listener:", call, sender);
    const response: Record<string, responseMessageOk | responseMessageError> = {};
    for (const [name, args] of Object.entries(call)) {
      try {
        response[name] = {
          type: "ok",
          call: { name, args },
          value: await callFunctionList[name](args),
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
    return response;
  };
  log.debug("Create runtime onMessage listen:", callFunctionList);
  browser.runtime.onMessage.addListener(listener);
}
