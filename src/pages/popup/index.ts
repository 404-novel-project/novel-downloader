// SPDX-License-Identifier: AGPL-3.0-or-later

import { createApp } from "vue";

import App from "./App.vue";

const div = document.createElement("div");
const app = createApp(App);

app.mount(div);
document.body.appendChild(div);
