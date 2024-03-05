// SPDX-License-Identifier: AGPL-3.0-or-later

import type { CallObject as CallObjectBackgroud } from "backgroud/rpc";
import type { CallObject as CallObjectContentScript } from "content_scripts/rpc";
import type { responseMessageError, responseMessageOk } from "vendor/rpc";
import type * as browser from "webextension-polyfill";

/**
 * 消息处理函数类型
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TaskOnMessage<T> = (message: any, port: browser.Runtime.Port, t: T) => void;

/**
 * task 管道通讯消息基类
 * @public
 */
export interface TaskMsg {
  pid: string;
  taskID: string;
  msgID: string;
  type: string;
}

/**
 * 共用的消息类型
 */

/**
 * 函数调用请求
 * @public
 */
export interface CallMsg<T extends CallObjectBackgroud | CallObjectContentScript> extends TaskMsg {
  type: "call";
  args: T;
}
/**
 * 函数调用响应
 * @public
 */
export interface CallResponseMsg extends TaskMsg {
  type: "callResponse";
  response: Record<string, responseMessageOk | responseMessageError>;
}
/**
 * 获取 TaskID
 * @public
 */
export interface TaskIDMsg extends TaskMsg {
  type: "taskid";
}

type Common_Msgs<T extends CallObjectBackgroud | CallObjectContentScript> =
  | CallMsg<T>
  | CallResponseMsg
  | TaskIDMsg;

/**
 * Content script to Backgroud
 */

export interface C2B_InitBookMsg extends TaskMsg {
  type: "initBook";
  url: string;
}

/**
 * C2B 开始任务请求消息 options 参数
 * @public
 */
export interface C2B_StartMsg_options {
  parseOnly?: boolean;
}
/**
 * C2B 开始任务请求消息
 * @public
 */
export interface C2B_StartMsg extends TaskMsg {
  type: "start";
  options: C2B_StartMsg_options;
}
/**
 * C2B 结束任务请求消息
 * @public
 */
export interface C2B_EndMsg extends TaskMsg {
  type: "end";
  reason: string;
}

export interface C2B_ResumeMsg extends TaskMsg {
  type: "resume";
}

/**
 * C2B 消息类型合集
 * @public
 */
export type C2B_Msgs =
  | Common_Msgs<CallObjectBackgroud>
  | C2B_InitBookMsg
  | C2B_StartMsg
  | C2B_EndMsg
  | C2B_ResumeMsg;
/** @public */
export type C2B_MsgsKey = C2B_Msgs["type"];

/**
 * Backgroud to Content script
 */

/**
 * 任务进度更新对象
 * @public
 */
export interface UpdateInfo {
  button: {
    working: boolean;
  };
  progress: {
    displayed: boolean;
    unknown: boolean;
    percent: number;
  };
}
/**
 * B2C 任务进度更新消息
 * @public
 */
export interface B2C_UpdateInfoMsg extends TaskMsg {
  type: "update";
  value: UpdateInfo;
}
/**
 * B2C 任务结束通知消息
 * @public
 */
export interface B2C_EndNoticeMsg extends TaskMsg {
  type: "end";
}

/**
 * B2C 消息类型合集
 * @public
 */
export type B2C_Msgs = Common_Msgs<CallObjectContentScript> | B2C_UpdateInfoMsg | B2C_EndNoticeMsg;
/** @public */
export type B2C_MsgsKey = B2C_Msgs["type"];
