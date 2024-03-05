// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-named-as-default
import saveAs from "file-saver";
import filenamify from "filenamify/browser";
import log from "loglevel";
import * as browser from "webextension-polyfill";

import { blobToDataUrl } from "vendor/utils";

interface saveBlobData {
  filename: string;
  blob: Blob;
}

/**
 * 将 Blob 对象保存为文件
 * @public
 */
export async function saveBlob({ blob, filename: _filename }: saveBlobData) {
  const filename = filenamify(_filename, { replacement: "_" });

  let _blobUrl: string = "";
  try {
    // @ts-ignore TS2339: Property 'createObjectURL' does not exist on type URL;
    _blobUrl = URL.createObjectURL(blob);
    await browser.downloads.download({ url: _blobUrl, filename });
    // @ts-ignore TS2339: Property 'revokeObjectURL' does not exist on type URL;
    URL.revokeObjectURL(_blobUrl);
    _blobUrl = "";
    log.info("saveBlob from browser.downloads.download and URL.createObjectURL:", filename, blob);
  } catch (error) {
    if (_blobUrl !== "") {
      // @ts-ignore TS2339: Property 'revokeObjectURL' does not exist on type URL;
      URL.revokeObjectURL(_blobUrl);
      _blobUrl = "";
    }
    try {
      const dataUrl = await blobToDataUrl(blob);
      await browser.downloads.download({ url: dataUrl, filename });
      log.info("saveBlob from browser.downloads.download and dataUrl:", filename, blob);
    } catch (error) {
      try {
        saveAs(blob, filename);
        log.info("saveBlob from saveAs", filename, blob);
      } catch (error) {
        log.error("Save Blob failed!", blob, filename);
      }
    }
  }
}
