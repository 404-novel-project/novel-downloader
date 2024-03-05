// SPDX-License-Identifier: AGPL-3.0-or-later

/// <reference types="unplugin-vue-router/client" />

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router/auto";

import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(),
});

const app = createApp(App);

app.use(router);

const div = document.createElement("div");
div.id = "app";
app.mount(div);
document.body.appendChild(div);
