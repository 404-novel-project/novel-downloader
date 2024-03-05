// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

const removeRequestHeaders = [
  "Sec-CH-Prefers-Reduced-Motion",
  "Sec-CH-UA",
  "Sec-CH-UA-Arch",
  "Sec-CH-UA-Bitness",
  "Sec-CH-UA-Full-Version",
  "Sec-CH-UA-Full-Version-List",
  "Sec-CH-UA-Mobile",
  "Sec-CH-UA-Model",
  "Sec-CH-UA-Platform",
  "Sec-CH-UA-Platform-Version",
  "Sec-Fetch-Dest",
  "Sec-Fetch-Mode",
  "Sec-Fetch-Site",
  "Sec-Fetch-User",
  "Sec-GPC",
  "Sec-Purpose",
  "Referer",
  "Origin",
];
export const secRequestHeadersRules: browser.DeclarativeNetRequest.RuleActionRequestHeadersItemType[] =
  removeRequestHeaders.map((header) => ({ header, operation: "remove" }));

export const corsResponseHeadersRules: browser.DeclarativeNetRequest.RuleActionResponseHeadersItemType[] =
  [
    {
      header: "Access-Control-Allow-Origin",
      operation: "set",
      value: "*",
    },
    {
      header: "Access-Control-Allow-Methods",
      operation: "set",
      value: "*",
    },
    {
      header: "Access-Control-Allow-Headers",
      operation: "set",
      value: "*",
    },
    {
      header: "Access-Control-Max-Age",
      operation: "set",
      value: "86400",
    },
  ];
