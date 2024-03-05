// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import { settings } from "./settings";
import { storage, getRawProp } from "./storage";

import type { HookFunction, settingValue } from "./settings";
import type { globalCommon } from "global";

/**
 * 初始化存储
 * @public
 */
export async function initSettingValus(test?: settingValue[]) {
  function _set(s: settingValue) {
    if (typeof s.value === s.type) {
      // @ts-expect-error Element implicitly has an 'any' type
      storage[s.area][s.namespace][s.key] = s.value;
    } else {
      log.error("Setting type does not match:", s);
    }
  }

  async function _setSettings(settings: settingValue[]) {
    for (const s of settings) {
      // @ts-expect-error Element implicitly has an 'any' type
      const v = await storage[s.area][s.namespace][s.key];
      if (typeof v === "undefined") {
        // 设置值不存在
        _set(s);
      } else {
        if (typeof v !== s.type) {
          // 已有设置值类型不相符
          _set(s);
        }
      }
    }
  }

  function _checkDuplicate(settings: settingValue[]) {
    const splitSymbol = "_|*|_";

    const keys = settings.map((s) => `${s.area}${splitSymbol}${s.key}`);
    const keysSet = [...new Set(keys).entries()].map((kv) => kv[1]);
    if (keys.length !== keysSet.length) {
      log.error("Found duplicate setting value!");

      const keysCount: Map<string, number> = new Map();
      for (const k of keys) {
        const c = keysCount.get(k);
        if (typeof c === "undefined") {
          keysCount.set(k, 1);
        } else {
          keysCount.set(k, c + 1);
        }
      }
      [...keysCount.entries()]
        .filter((kv) => kv[1] > 1)
        .forEach((kv) => log.error("Duplicate Key:", ...kv[0].split(splitSymbol)));
    }
  }

  let settingValues = [...settings];

  if (test) {
    settingValues = settingValues.concat(test);
  }

  _checkDuplicate(settingValues);
  await _setSettings(settingValues);
}

/**
 * 初始化存储监听器
 * @public
 */
export function initSettingHooks() {
  const hooksDict: {
    [K in settingValue["area"]]: {
      [rawKey in string]: HookFunction[];
    };
  } = {
    local: {},
    session: {},
    sync: {},
  };

  for (const s of settings) {
    const { area, namespace, key, hooks } = s;
    const rawKey = getRawProp(namespace, key);

    if (hooks && hooks.length !== 0) {
      const hookAdded: HookFunction[] = [];

      for (const [env, f] of hooks) {
        if (env === (globalThis as globalCommon).RuntimeEnv) {
          hookAdded.push(f);
          log.info("prepare setting hook", env, area, namespace, key, f);
        }
      }

      hooksDict[area][rawKey] = hookAdded;
    }
  }

  Object.entries(hooksDict).forEach(([area, keyHooksDict]) => {
    (
      browser.storage[area as keyof typeof hooksDict] as browser.Storage.StorageArea
    )?.onChanged.addListener((changes: browser.Storage.StorageAreaOnChangedChangesType) => {
      const changeItems = Object.entries(changes);
      for (const [key, change] of changeItems) {
        // setting hooks
        if (key in keyHooksDict) {
          const hooks = keyHooksDict[key];
          hooks.forEach((hook) => hook(change));
        }
      }
    });
  });
}
