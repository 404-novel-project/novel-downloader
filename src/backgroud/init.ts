// SPDX-License-Identifier: AGPL-3.0-or-later

import { v4 as uuidv4 } from "uuid";
import * as browser from "webextension-polyfill";

import { logInit } from "vendor/init";
import storage, { initSettingValus, initSettingHooks } from "vendor/storage";

import check from "./check";
import * as rpc from "./rpc";
import * as runtime from "./runtime";

import type { globalCommon } from "global";

const LOG_PREFIX = "[novel-downloader][backgroud]";

function setDid() {
  (globalThis as globalCommon).pid = uuidv4();
}

async function setEnableSettingValue() {
  const hostPermissions = { origins: ["<all_urls>"] };
  const hasHostPermissions = await browser.permissions.contains(hostPermissions);
  if (!hasHostPermissions) {
    storage.local.global.enable = false;
  }
}

export const serviceWorkerRegistration = { value: false };

function setEnv() {
  (globalThis as globalCommon).RuntimeEnv = "backgroud";
}

export function init() {
  setDid();
  setEnv();

  logInit(LOG_PREFIX);

  initSettingValus();
  initSettingHooks();
  setEnableSettingValue();

  rpc.callListen();
  rpc.portListen();
  rpc.taskListen();
  rpc.streamSaveListen();

  runtime.init();

  check();
}
