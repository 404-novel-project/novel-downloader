// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import type { settingValue } from ".";

const enableDebugHook = ({ newValue }: browser.Storage.StorageChange) => {
  if (newValue) {
    log.enableAll();
  } else {
    log.resetLevel();
  }
};

export default [
  {
    area: "local",
    key: "enable",
    description: "是否启用插件，默认为 true；当缺少 host permissions 时将被设置为 false。",
    type: "boolean",
    value: true,
    hidden: true,
    namespace: "global",
    rule: "plugin",
  },
  {
    area: "local",
    key: "enableDebug",
    description: "是否启用调试",
    type: "boolean",
    value: false,
    hidden: true,
    namespace: "global",
    rule: "plugin",
    hooks: [
      ["backgroud", enableDebugHook],
      ["content_scripts", enableDebugHook],
    ],
  },
  {
    area: "local",
    key: "runCounter",
    description: "总运行次数",
    type: "number",
    value: 0,
    hidden: true,
    namespace: "global",
    rule: "plugin",
  },

  {
    area: "session",
    key: "tabIdUrlMap",
    description: "tabIdUrlMap",
    type: "object",
    value: {},
    hidden: true,
    namespace: "global",
    rule: "plugin",
  },
  {
    area: "session",
    key: "declarativeNetRequestRuleIds",
    description: "declarativeNetRequest Rule Id Set",
    type: "object",
    value: [],
    hidden: true,
    namespace: "global",
    rule: "plugin",
  },
] satisfies settingValue[];
