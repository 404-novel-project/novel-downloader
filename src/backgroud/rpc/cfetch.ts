// SPDX-License-Identifier: AGPL-3.0-or-later

import { v4 as uuidv4 } from "uuid";
import * as browser from "webextension-polyfill";

import {
  CallObject as CallObjectContentScript,
  callFunctionList as callFunctionListContentScript,
} from "content_scripts/rpc";

import type { gfetchOkOutput, gfetchErrorOutput, gfetchOk, gfetchError } from "./gfetchType";

export async function cfetch(tabId: number, input: RequestInfo | URL, init?: RequestInit) {
  const id = uuidv4();
  const request = { input, init };

  const callObj: CallObjectContentScript = {
    cfetch: { id, request },
  };

  const resp = await browser.tabs.sendMessage(tabId, callObj);
  const m = resp["cfetch"] as Awaited<ReturnType<(typeof callFunctionListContentScript)["cfetch"]>>;
  if (m.type === "ok") {
    const { request: _request, response: _response } = m as gfetchOk;
    const response = new Response(_response.body, _response.options);
    return { request: _request, response } as gfetchOkOutput;
  } else {
    const { request: _request, error } = m as gfetchError;
    const errMsg = { request: _request, error } as gfetchErrorOutput;
    throw Error(JSON.stringify(errMsg, undefined, 2));
  }
}
