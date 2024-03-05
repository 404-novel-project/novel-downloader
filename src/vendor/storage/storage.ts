// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as browser from "webextension-polyfill";

import type { local, session, sync } from "./settings";

class _storage {
  private backend: browser.Storage.StorageArea;

  constructor(backend: browser.Storage.StorageArea) {
    this.backend = backend;
  }
  public get(keys?: string | Record<string, any> | string[] | null) {
    return this.backend.get(keys);
  }
  public clear() {
    return this.backend.clear();
  }
  public remove(keys: string | string[]) {
    return this.backend.remove(keys);
  }
  public set(items: Record<string, any>) {
    return this.backend.set(items);
  }
}

const splitCharacter = "|||";
export const getRawProp = (namespace: string, prop: string) => namespace + splitCharacter + prop;
function _handleFactor(realTarge: _storage, namespace: string) {
  const handler: ProxyHandler<Record<string, never>> = {
    deleteProperty: (target, prop: string) => {
      const _prop = getRawProp(namespace, prop);
      Reflect.apply(realTarge.remove, realTarge, [_prop]);
      return true;
    },
    get: async (target, prop: string, receiver): Promise<any> => {
      const _prop = getRawProp(namespace, prop);
      return (await Reflect.apply(realTarge.get, realTarge, [_prop]))[_prop];
    },
    set: (target, prop: string, value: any, receiver) => {
      const _prop = getRawProp(namespace, prop);
      const obj: Record<string, any> = {};
      obj[_prop] = value;
      Reflect.apply(realTarge.set, realTarge, [obj]);
      return true;
    },
    apply: (target, thisArg, argumentsList) => {
      throw Error("disable function call!");
    },
  };
  return handler;
}

function handleFactor(realTarge: _storage) {
  const handler: ProxyHandler<Record<string, never>> = {
    deleteProperty: (target, namespace: string) => {
      return false;
    },
    get: (target, namespace: string, receiver) => {
      const _handle = _handleFactor(realTarge, namespace);
      const _target = new Proxy({}, _handle);
      return _target;
    },
    set: (target, namespace: string, value, receiver) => {
      return false;
    },
    apply: (target, thisArg, argumentsList) => {
      throw Error("disable function call!");
    },
  };
  return handler;
}

const _local = new _storage(browser.storage.local);
const _session = new _storage(browser.storage.session);
const _sync = new _storage(browser.storage.sync);

type makeValuePromise<T> = {
  [Namespace in keyof T]: {
    [KEY in keyof T[Namespace]]: T[Namespace][KEY] | Promise<T[Namespace][KEY]>;
  };
};

/**
 * 存储对象
 * @public
 */
export const storage = {
  local: new Proxy({}, handleFactor(_local)) as unknown as makeValuePromise<local>,
  session: new Proxy({}, handleFactor(_session)) as unknown as makeValuePromise<session>,
  sync: new Proxy({}, handleFactor(_sync)) as unknown as makeValuePromise<sync>,
};
