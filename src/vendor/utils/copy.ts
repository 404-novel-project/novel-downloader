// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * 深拷贝对象
 * @public
 */
export function deepcopy<T>(val: T): T {
  try {
    return structuredClone(val);
  } catch (error) {
    return JSON.parse(JSON.stringify(val));
  }
}
