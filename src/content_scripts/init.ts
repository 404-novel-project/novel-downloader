// SPDX-License-Identifier: AGPL-3.0-or-later

import { v4 as uuidv4 } from "uuid";

import { logInit } from "vendor/init";
import { initSettingHooks } from "vendor/storage";

import check from "./check";
import * as rpc from "./rpc";

import type { globalCommon } from "global";

const LOG_PREFIX = "[novel-downloader]";

function setDid() {
  (globalThis as globalCommon).pid = uuidv4();
}

function setEnv() {
  (globalThis as globalCommon).RuntimeEnv = "content_scripts";
}

export async function init() {
  setDid();
  setEnv();

  await logInit(LOG_PREFIX);

  rpc.callListen();

  initSettingHooks();

  await check();
}
