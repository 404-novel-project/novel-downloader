// SPDX-License-Identifier: AGPL-3.0-or-later

import type { taskOnMessage } from ".";
import type { C2B_InitBookMsg } from "vendor/rpc/task/type";

/**
 * 初始化 Book Meta
 * @public
 */
export default (async (message: C2B_InitBookMsg, port, t) => {
  if (t.book) {
    return t.log("info", "The book meta has been inited!");
  }

  const { getRule } = await import("backgroud/runtime/rule");

  const { hostname, pathname } = new URL(message.url);
  const Rule = await getRule(hostname, pathname);
  if (!Rule) {
    return t.log("error", "Not Found Rule for " + message.url);
  }
  t.rule = new Rule();
  t.rule.taskport = t;
  const bookMeta = await t.rule.getBookMeta(message.url);
  if (!bookMeta) {
    return t.log("error", "Get Book Meta Failed!", `Rule ID: ${Rule.ID}`);
  }
  t.book = bookMeta;
}) satisfies taskOnMessage;
