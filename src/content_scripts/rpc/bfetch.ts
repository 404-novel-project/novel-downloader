// SPDX-License-Identifier: AGPL-3.0-or-later

import { v4 as uuidv4 } from "uuid";

import { callBackgroud } from "vendor/rpc";

import type {
  gfetchOkOutput,
  gfetchErrorOutput,
  gfetchOk,
  gfetchError,
} from "backgroud/rpc/gfetchType";

/** @public */
export async function bfetch(input: RequestInfo | URL, init?: RequestInit) {
  const id = uuidv4();
  const request = { input, init };

  const m = await callBackgroud("bfetch", { id, request });
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
