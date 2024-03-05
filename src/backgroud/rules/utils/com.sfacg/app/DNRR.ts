// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

import { secRequestHeadersRules } from "backgroud/runtime/declarativeNetRequest/utils";

import { SFACG_USER_AGENT_PREFIX, SFACG_USER_AGENT_RSS, getUid } from "./utils";

export async function getSfacgRules() {
  const SFACG_UA = SFACG_USER_AGENT_PREFIX + (await getUid());
  const sfacgApiRule: browser.DeclarativeNetRequest.Rule = {
    id: Math.round(Math.random() * 10 ** 5),
    condition: {
      requestDomains: ["api.sfacg.com"],
      initiatorDomains: [globalThis.location.hostname],
    },
    action: {
      type: "modifyHeaders",
      requestHeaders: [
        {
          header: "User-Agent",
          operation: "set",
          value: SFACG_UA,
        },
        ...secRequestHeadersRules,
      ],
    },
  };

  const sfacgRssRule: browser.DeclarativeNetRequest.Rule = {
    id: Math.round(Math.random() * 10 ** 5),
    condition: {
      requestDomains: ["rss.sfacg.com", "rssyn.sfacg.com"],
      initiatorDomains: [globalThis.location.hostname],
    },
    action: {
      type: "modifyHeaders",
      requestHeaders: [
        {
          header: "User-Agent",
          operation: "set",
          value: SFACG_USER_AGENT_RSS,
        },
        ...secRequestHeadersRules,
      ],
    },
  };

  return [sfacgApiRule, sfacgRssRule];
}
