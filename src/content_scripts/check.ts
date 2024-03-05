// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { version } from "vue";
import * as browser from "webextension-polyfill";

import { callBackgroud } from "vendor/rpc";

async function printBrowser() {
  const n = globalThis.navigator;
  log.info("navigator:", "platform:", n.platform);
  log.info("navigator:", "userAgent:", n.userAgent);
  log.info("navigator:", "doNotTrack:", n.doNotTrack);
  log.info("navigator:", "language:", n.language);
  log.info("navigator:", "languages:", n.languages.join(" "));
  // @ts-expect-error TS2339: Property 'deviceMemory' does not exist on type 'Navigator'.
  log.info("navigator:", "deviceMemory:", n.deviceMemory);
}

function printExtension() {
  const id = browser.runtime.id;
  log.info("id:", "id:", id);

  const m = browser.runtime.getManifest();
  log.info("Manifest:", "name:", m.name);
  log.info("Manifest:", "version:", m.version);
  log.info("Manifest:", "permissions:", JSON.stringify(m.permissions));
  log.info("Manifest:", "host_permissions:", JSON.stringify(m.host_permissions));
  log.info("Manifest:", "optional_permissions:", JSON.stringify(m.optional_permissions));
}

async function printPermissions() {
  const permissions = await callBackgroud("permissions", { method: "getAll" });
  log.info("permissions:", JSON.stringify(permissions));
}

async function printVue() {
  log.info("Vue version:", version);
}

export default async () => {
  await printBrowser();
  printExtension();
  await printPermissions();
  await printVue();
};
