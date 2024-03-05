// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

async function printBrowser() {
  const n = globalThis.navigator;
  log.info("navigator:", "platform:", n.platform);
  log.info("navigator:", "userAgent:", n.userAgent);
  log.info("navigator:", "language:", n.language);
  log.info("navigator:", "languages:", n.languages.join(" "));

  const p = await browser.runtime.getPlatformInfo();
  log.info("PlatformInfo:", "os:", p.os);
  log.info("PlatformInfo:", "arch:", p.arch);

  try {
    const b = await browser.runtime.getBrowserInfo();
    log.info("BrowserInfo:", "name:", b.name);
    log.info("BrowserInfo:", "version:", b.version);
    log.info("BrowserInfo:", "vendor:", b.vendor);
    log.info("BrowserInfo:", "buildID:", b.buildID);
  } catch (error) {
    log.debug(error);
  }
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
  const permissions = await browser.permissions.getAll();
  log.info("permissions:", JSON.stringify(permissions));
}

export default async () => {
  await printBrowser();
  printExtension();
  await printPermissions();
};
