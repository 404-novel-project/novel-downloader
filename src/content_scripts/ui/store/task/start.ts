// SPDX-License-Identifier: AGPL-3.0-or-later

import { taskport } from "../val";

import type { TaskPortType } from "vendor/rpc/task";

export function start(url: string, options: TaskPortType.C2B_StartMsg_options) {
  if (taskport.value !== null) {
    taskport.value.initBook(url);
    taskport.value.start(options);
  } else {
    throw Error("DownloadStore: start failed! task is null.");
  }
}
