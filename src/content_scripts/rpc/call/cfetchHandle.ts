// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { errorToObject } from "vendor/utils";

import type {
  gfetchRequest,
  gfetchOk,
  gfetchError,
  gfetchResponse,
} from "backgroud/rpc/gfetchType";

export async function cfetchHandle({
  id,
  request: { input, init },
}: {
  id: string;
  request: gfetchRequest;
}): Promise<gfetchOk | gfetchError> {
  log.debug("cfetch", id, input, init);
  try {
    const _response = await globalThis.fetch(input, init);
    const status = _response.status;
    const statusText = _response.statusText;
    const headers = [..._response.headers.entries()];
    const body = await _response.blob();
    const response: gfetchResponse = {
      body,
      options: {
        status,
        statusText,
        headers,
      },
    };
    return { id, request: { input, init }, response, type: "ok" };
  } catch (error) {
    const _r: gfetchError = {
      id,
      request: {
        input,
        init,
      },
      error: errorToObject(error as Error),
      type: "error",
    };
    log.error(_r);
    return _r;
  }
}
