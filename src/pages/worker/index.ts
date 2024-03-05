// SPDX-License-Identifier: AGPL-3.0-or-later

import { callBackgroud } from "vendor/rpc";

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/sw",
        type: "module",
      });
      console.log("Service worker registration succeeded:", registration);
      await callBackgroud("serviceWorkerRegistration", true);
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
      await callBackgroud("serviceWorkerRegistration", false);
    }
  } else {
    console.error("Service workers are not supported.");
    await callBackgroud("serviceWorkerRegistration", false);
  }
}

async function main() {
  await registerServiceWorker();
  window.close();
}

main();
