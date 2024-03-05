// SPDX-License-Identifier: AGPL-3.0-or-later

import type { taskOnMessage } from ".";
import type { C2B_EndMsg } from "vendor/rpc/task/type";

/**
 * 结束任务
 * @public
 */
export default ((msg: C2B_EndMsg, port, t) => {
  // TODO
  t.end();
  t._end();
}) satisfies taskOnMessage;
