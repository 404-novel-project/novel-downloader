// SPDX-License-Identifier: AGPL-3.0-or-later

import { init } from "./init";

document.addEventListener("DOMContentLoaded", async () => {
  await init();
  (await import("./ui")).init();
});
