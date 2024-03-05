// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

import type { settingValue } from "../storage";

export async function initSettingValus() {
  const setting = await import("../storage");

  const testSettingValues: settingValue[] = [
    {
      area: "session",
      key: "test-string",
      description: "test-string",
      type: "string",
      value: "tesst-string",
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-number",
      description: "test-number",
      type: "number",
      value: 12345,
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-bigint",
      description: "test-bigint",
      type: "bigint",
      value: BigInt(4325324654243325),
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-boolean",
      description: "test-boolean",
      type: "boolean",
      value: true,
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-object",
      description: "test-object",
      type: "object",
      value: { test: 12345 },
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-object",
      description: "test-object",
      type: "object",
      value: { test: 123345 },
      hidden: true,
      rule: "test",
      namespace: "test",
    },
    {
      area: "session",
      key: "test-type",
      description: "test-type",
      type: "object",
      value: "test",
      hidden: true,
      rule: "test",
      namespace: "test",
    },
  ];
  setting.initSettingValus(testSettingValues);
}

export async function storage() {
  const { sleep } = await import("../utils");
  const st = (await import("../storage")).default;

  console.log(await st.session.test["test-string-114514"]);
  st.session.test["test-string-114514"] = "asdfgfdsdsgf";
  await sleep(1000);
  console.log(await st.session.test["test-string-114514"]);

  st.session.test["test-string-114514-2"] = "test-string-114514-2";
  await sleep(1000);
  console.log(await st.session.test["test-string-114514-2"]);

  delete st.session.test["test-string-114514-2"];
  await sleep(1000);
  console.log(await st.session.test["test-string-114514-2"]);

  console.log(await browser.storage.session.get());
}
