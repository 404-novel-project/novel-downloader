// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

export function registerServiceWorker() {
  browser.tabs.create({
    url: browser.runtime.getURL("/pages/worker.html"),
    active: false,
    pinned: true,
  });

  setTimeout(() => {
    browser.tabs.query({ url: browser.runtime.getURL("/pages/worker.html") }).then((tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          browser.tabs.remove(tab.id);
        }
      }
    });
  }, 10_000);
}
