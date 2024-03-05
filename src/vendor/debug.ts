// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import storage from "./storage";

/**
 * 启用调试
 * @public
 */
export function enable() {
  storage.local.global.enableDebug = true;
}

/**
 * 禁用调试
 * @public
 */
export function disable() {
  storage.local.global.enableDebug = false;
}

/**
 * 重载插件
 * @public
 */
export async function reload() {
  try {
    browser.runtime.reload();
  } catch (error) {
    log.error(error);
    try {
      const api = await import("./rpc");
      api.callBackgroud("runtime", { method: "reload" });
    } catch (err) {
      log.error(err);
    }
  }
}
