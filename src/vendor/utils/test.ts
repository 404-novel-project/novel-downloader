// SPDX-License-Identifier: AGPL-3.0-or-later

import tap from "tap-esm";

import type { TestCase } from "tap-esm";

/**
 * 测试工厂
 * @param name - 测试名称
 * @param test - 测试用例
 * @returns
 * @public
 */
export function testFactory(name: string, test: TestCase) {
  return new Promise<true>((resolve, reject) => {
    tap.onFinish = (err) => {
      if (err === null) {
        resolve(true);
      } else {
        reject(err);
      }
    };

    tap(name, test);
  });
}
