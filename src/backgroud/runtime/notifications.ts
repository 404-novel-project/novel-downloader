// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { v4 as uuidv4 } from "uuid";
import * as browser from "webextension-polyfill";

export async function create(title: string, message: string) {
  const iconUrl = browser.runtime.getURL("/assets/icon-48.png");
  const id = "novel-downloader-" + uuidv4();
  try {
    await browser.notifications.create(id, {
      type: "basic",
      iconUrl,
      title,
      message,
    });
  } catch (error) {
    log.debug(error, id, title, message);
  }
  return id;
}
