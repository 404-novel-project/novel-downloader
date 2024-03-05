// SPDX-License-Identifier: AGPL-3.0-or-later

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

export function init() {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);

  const div = document.createElement("div");
  app.mount(div);
  document.body.appendChild(div);
}
