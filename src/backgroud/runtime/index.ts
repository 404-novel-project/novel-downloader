// SPDX-License-Identifier: AGPL-3.0-or-later

export * as check from "./rule";
export * as notifications from "./notifications";

import { init as declarativeNetRequestInit } from "./declarativeNetRequest";
import { init as injectContentScriptInit } from "./injectContentScript";

export function init() {
  declarativeNetRequestInit();
  injectContentScriptInit();
}

export { registerServiceWorker } from "./serviceWorker";
