// SPDX-License-Identifier: AGPL-3.0-or-later

import { BaseCallObject, baseCallFunctionList, listen } from "vendor/rpc";
import { saveBlob } from "vendor/utils";

import { cfetchHandle } from "./cfetchHandle";

import type { gfetchRequest } from "backgroud/rpc/gfetchType";
import type { globalCommon } from "global";

/** @public */
export interface CallObject extends BaseCallObject {
  saveLog?: null;
  cfetch?: { id: string; request: gfetchRequest };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _CallObject = Required<CallObject>;
/** @public */
export const callFunctionList = {
  saveLog: async () => {
    const logBlob = new Blob([(globalThis as globalCommon).logText], { type: "text/plain" });
    const filename = `novel-downloader-${new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replace(/\.\d+Z$/, "")}-${globalThis.location.href}.log`;
    const filenameSafe = filename.replaceAll(/[/\\]/g, "_");
    await saveBlob({ blob: logBlob, filename: filenameSafe });
  },
  cfetch: cfetchHandle,
  ...baseCallFunctionList,
};
/** @internal */
export const callListen = () => {
  listen(callFunctionList);
};
