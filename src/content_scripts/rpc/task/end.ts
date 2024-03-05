// SPDX-License-Identifier: AGPL-3.0-or-later

import { B2C_EndNoticeMsg } from "vendor/rpc/task/type";

import type { taskOnMessage } from ".";

/**
 * 任务已完成
 * @public
 */
export default ((msg: B2C_EndNoticeMsg, port, t) => {
  // TODO
  t._end();
}) satisfies taskOnMessage;
