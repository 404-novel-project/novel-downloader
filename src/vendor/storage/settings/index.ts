// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

import sfacg from "./com.sfacg";
import plugin from "./global";

import type { ResumeStorage } from "./resume";
import type { Cookie } from "vendor/cookies";

/**
 * 监听回调函数
 * @public
 */
export type HookFunction = (changes: browser.Storage.StorageChange) => void | Promise<void>;

/**
 * 存储配置格式
 * @public
 */
export interface settingValue {
  area: "local" | "session" | "sync";
  namespace: string;
  key: string;
  description: string;
  type: "string" | "number" | "bigint" | "boolean" | "object";
  value: string | number | bigint | boolean | object;
  hidden: boolean;
  rule?: string | string[];
  hooks?: ["backgroud" | "content_scripts", HookFunction][];
}

/** @public */
export interface local {
  global: {
    enable: boolean;
    enableDebug: boolean;
    runCounter: number;
  };
  "com.sfacg": {
    device_token: string;
    cookies: Cookie[];
  };
  resume: ResumeStorage;
}

/** @public */
export interface session {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test: Record<string, any>;
  global: {
    tabIdUrlMap: Record<string, string>;
    declarativeNetRequestRuleIds: Array<number>;
  };
}

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface sync {}

/** @internal */
export const settings: settingValue[] = [...plugin, ...sfacg];
