// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Python 式 range 函数
 * source: https://stackoverflow.com/a/26554873
 * @public
 */
export function* range(start: number, stop: number, step = 1) {
  if (stop == null) {
    // one param defined
    stop = start;
    start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}
