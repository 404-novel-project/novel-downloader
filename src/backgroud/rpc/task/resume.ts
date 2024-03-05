// SPDX-License-Identifier: AGPL-3.0-or-later

import type { taskOnMessage } from ".";
import type { C2B_ResumeMsg } from "vendor/rpc/task/type";

/**
 * 恢复任务
 * @public
 */
export default (async (message: C2B_ResumeMsg, port, t) => {
  const { Book } = await import("backgroud/models/meta/book");
  t.taskID = message.taskID;
  t.book = await Book.resume(message.taskID, t);
}) satisfies taskOnMessage;
