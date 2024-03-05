// SPDX-License-Identifier: AGPL-3.0-or-later

import * as browser from "webextension-polyfill";

import { storage, getRawProp } from "./storage";

import type { HookFunction, settingValue } from "./settings";

type OnChangeHooksRecord = {
  [Area in settingValue["area"]]: Record<string, Set<HookFunction>>;
};
const onChangeHooksRecordProxyFactory = (_target: Record<string, Set<HookFunction>>) => {
  return new Proxy(_target, {
    get: (target, prop: string) => {
      if (prop in target) {
        return target[prop];
      } else {
        target[prop] = new Set();
        return target[prop];
      }
    },
  });
};
const onChangeHooksRecord: OnChangeHooksRecord = {
  local: onChangeHooksRecordProxyFactory({}),
  session: onChangeHooksRecordProxyFactory({}),
  sync: onChangeHooksRecordProxyFactory({}),
};
let watchd = false;
function onChangedInitWatch() {
  if (watchd) {
    return;
  }
  for (const area of Object.keys(onChangeHooksRecord)) {
    (
      browser.storage[area as keyof OnChangeHooksRecord] as browser.Storage.StorageArea
    )?.onChanged.addListener((changes: browser.Storage.StorageAreaOnChangedChangesType) => {
      const changeItems = Object.entries(changes);
      for (const [key, change] of changeItems) {
        const hooksSet: Set<HookFunction> =
          onChangeHooksRecord[area as keyof OnChangeHooksRecord][key];
        for (const hook of hooksSet.values()) {
          hook(change);
        }
      }
    });
  }
  watchd = true;
}
/**
 * 创建存储监听器
 * @param area -
 * @param namespace -
 * @param key -
 * @returns
 * @public
 */
export function onChanged<
  A extends keyof typeof storage & keyof typeof onChangeHooksRecord,
  N extends keyof (typeof storage)[A] & string,
  K extends keyof (typeof storage)[A][N] & string,
>(area: A, namespace: N, key: K) {
  const rawKey = getRawProp(namespace, key);
  const hooksSet = onChangeHooksRecord[area][rawKey];

  const event: browser.Events.Event<HookFunction> = {
    addListener(cb) {
      hooksSet.add(cb);
    },
    removeListener(cb) {
      hooksSet.delete(cb);
    },
    hasListener(cb) {
      return hooksSet.has(cb);
    },
    hasListeners() {
      return hooksSet.size !== 0;
    },
  };

  onChangedInitWatch();
  return event;
}
