// SPDX-License-Identifier: AGPL-3.0-or-later

import type { settingValue } from ".";

export default [
  {
    area: "local",
    key: "device_token",
    description: "sfacg api device_token",
    type: "string",
    value: "",
    hidden: false,
    namespace: "com.sfacg",
    rule: "com.sfacg",
  },
  {
    area: "local",
    key: "cookies",
    description: "sfacg api cookies",
    type: "object",
    value: [],
    hidden: false,
    namespace: "com.sfacg",
    rule: "com.sfacg",
  },
] satisfies settingValue[];
