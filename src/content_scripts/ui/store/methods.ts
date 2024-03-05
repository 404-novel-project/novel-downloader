// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { taskport, button, progress } from "./val";

import type { TaskPortType } from "vendor/rpc/task";

export async function createTask() {
  const { TaskPort } = await import("content_scripts/rpc/task");
  taskport.value = new TaskPort();
  log.info("DownloadStore: createTask succeed!");
}

export function updateHandler(msg: TaskPortType.B2C_UpdateInfoMsg) {
  const { value } = msg;
  button.working = value.button.working;
  Object.assign(progress, value.progress);
}
export function registerUpdateHandler() {
  if (taskport.value !== null) {
    taskport.value.registerHandlerByMsgType("update", updateHandler);
    log.info("DownloadStore: registerUpdateHandler succeed!");
  } else {
    throw Error("DownloadStore: registerUpdateHandler failed! task is null.");
  }
}
export function unRegisterUpdateHandler() {
  if (taskport.value !== null) {
    taskport.value.unRegisterHandlerByMsgType("update", updateHandler);
    log.info("DownloadStore: unRegisterUpdateHandler succeed!");
  } else {
    throw Error("DownloadStore: unRegisterUpdateHandler failed! task is null.");
  }
}
