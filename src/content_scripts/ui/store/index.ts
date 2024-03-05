// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineStore } from "pinia";

import * as m from "./methods";
import * as task from "./task";
import * as update from "./update";
import { darkMode, button, progress, overlay } from "./val";

export const useDownloadStore = defineStore("download", () => {
  update.initWatch();

  return {
    darkMode,

    button,
    progress,
    overlay,

    createTask: m.createTask,
    registerUpdateHandler: m.registerUpdateHandler,
    unRegisterUpdateHandler: m.unRegisterUpdateHandler,

    start: task.start,
  };
});
