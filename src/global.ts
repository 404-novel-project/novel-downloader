// SPDX-License-Identifier: AGPL-3.0-or-later

type G = typeof globalThis;

/**
 * backgroud script、content scripts 修改后的 globalThis
 * @public
 */
export interface globalCommon extends G {
  /** 进程ID */
  pid: string;
  /** 日志文本 */
  logText: string;
  /** 运行环境 */
  RuntimeEnv: "backgroud" | "content_scripts";
}
