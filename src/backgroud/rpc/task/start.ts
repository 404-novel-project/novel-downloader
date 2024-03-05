// SPDX-License-Identifier: AGPL-3.0-or-later

import type { taskOnMessage } from ".";
import type { C2B_StartMsg } from "vendor/rpc/task/type";

/**
 * 启动任务
 * @public
 */
export default (async (message: C2B_StartMsg, port, t) => {
  if (message.options.parseOnly) {
    t.book?.parse();
  } else {
    t.book?.start();
  }
}) satisfies taskOnMessage;
