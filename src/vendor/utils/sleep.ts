// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * sleep
 * @param timeout - 睡眠时间（单位：毫秒）
 * @param signal - 放弃信号，可打断睡眠
 * @returns
 * @public
 */
export function sleep(timeout: number, signal?: AbortSignal): Promise<true> {
  return new Promise((resolve, reject) => {
    const abortReject = () => reject(false);
    signal?.addEventListener("abort", abortReject);
    setTimeout(() => {
      signal?.removeEventListener("abort", abortReject);
      resolve(true);
    }, timeout);
  });
}
