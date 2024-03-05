// SPDX-License-Identifier: AGPL-3.0-or-later

import type { taskOnMessage } from ".";
import type { TaskIDMsg } from "vendor/rpc/task/type";

/**
 * 设置 taskID
 * @public
 */
export default ((message: TaskIDMsg, port, t) => {
  const taskID = message.taskID;
  t.taskID = taskID;
}) satisfies taskOnMessage;
