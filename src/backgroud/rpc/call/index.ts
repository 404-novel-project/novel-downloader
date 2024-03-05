// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

import { serviceWorkerRegistration } from "backgroud/init";
import { check } from "backgroud/runtime";
import { getTabIdUrlMap } from "backgroud/runtime/injectContentScript";
import { globalCommon } from "global";
import { baseCallFunctionList, listen } from "vendor/rpc";
import { saveBlob } from "vendor/utils";

import { bfetchHandle } from "./bfetchHandle";

import type { gfetchRequest } from "../gfetchType";
import type { BaseCallObject } from "vendor/rpc";

/**
 * @public
 */
export interface CallObject extends BaseCallObject {
  bfetch?: { id: string; request: gfetchRequest };
  permissions?: {
    method: Exclude<keyof browser.Permissions.Static, "onAdded" | "onRemoved">;
    args?: browser.Permissions.Permissions | browser.Permissions.AnyPermissions;
  };
  runtime?: {
    method: "getPlatformInfo" | "getBrowserInfo" | "reload";
  };
  checkSupport?: {
    url: string;
  };
  getInjectedTabIds?: null;
  serviceWorkerRegistration?: boolean;
  saveLog?: null;
}
type _CallObject = Required<CallObject>;
/**
 * @public
 */
export const callFunctionList = {
  bfetch: bfetchHandle,
  permissions: ({ method, args }: _CallObject["permissions"]) => {
    if (method === "getAll") {
      return browser.permissions[method]();
    } else if (method === "contains") {
      return browser.permissions[method](<browser.Permissions.AnyPermissions>args);
    } else {
      return browser.permissions[method](<browser.Permissions.Permissions>args);
    }
  },
  runtime: ({ method }: _CallObject["runtime"]) => {
    return browser.runtime[method]();
  },
  checkSupport: ({ url }: _CallObject["checkSupport"]) => {
    return check.checkUrlSupport(url);
  },
  getInjectedTabIds: async () => {
    return Object.keys(await getTabIdUrlMap());
  },
  serviceWorkerRegistration: (ok: _CallObject["serviceWorkerRegistration"]) => {
    if (ok) {
      serviceWorkerRegistration.value = true;
    } else {
      serviceWorkerRegistration.value = false;
    }
    browser.tabs.query({ url: browser.runtime.getURL("/pages/worker.html") }).then((tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.remove(tab.id);
        }
      }
    });
  },
  saveLog: async () => {
    const logBlob = new Blob([(globalThis as globalCommon).logText], { type: "text/plain" });
    const filename = `novel-downloader-backgroud-${new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replace(/\.\d+Z$/, "")}.log`;
    const filenameSafe = filename.replaceAll(/[/\\]/g, "_");
    await saveBlob({ blob: logBlob, filename: filenameSafe });
  },
  ...baseCallFunctionList,
};

/** @internal */
export const callListen = () => {
  listen(callFunctionList);
};
