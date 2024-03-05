// SPDX-License-Identifier: AGPL-3.0-or-later

import { TaskIDMsg } from "vendor/rpc/task/type";

import type { taskOnMessage } from ".";

/**
 * 回复 taskid
 * @public
 */
export default ((message: TaskIDMsg, port, t) => {
  const msg = t.newMsg("taskid", {});
  t.postMessage(msg);
}) satisfies taskOnMessage;
