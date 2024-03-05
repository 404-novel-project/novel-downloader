// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import log from "loglevel";
import { v4 as uuidv4 } from "uuid";
import * as browser from "webextension-polyfill";

import call from "./call";

import type * as TaskPortType from "./type";
import type {
  CallObject as CallObjectBackgroud,
  callFunctionList as callFunctionListBackgroud,
} from "backgroud/rpc/call";
import type {
  CallObject as CallObjectContentScript,
  callFunctionList as callFunctionListContentScript,
} from "content_scripts/rpc/call";
import type { globalCommon } from "global";

export type { TaskPortType };

type getReceivedMsg<isBackgroud extends boolean> = isBackgroud extends true
  ? TaskPortType.C2B_Msgs
  : TaskPortType.B2C_Msgs;

type getSendMsg<isBackgroud extends boolean> = isBackgroud extends true
  ? TaskPortType.B2C_Msgs
  : TaskPortType.C2B_Msgs;

type getReceivedMsgType<isBackgroud extends boolean> = isBackgroud extends true
  ? TaskPortType.C2B_Msgs["type"]
  : TaskPortType.B2C_Msgs["type"];

type getSendedMsgType<isBackgroud extends boolean> = isBackgroud extends true
  ? TaskPortType.B2C_Msgs["type"]
  : TaskPortType.C2B_Msgs["type"];

type getSendMsgByType<
  isBackgroud extends boolean,
  SendedMsgKey extends getSendedMsgType<isBackgroud>,
> = Extract<
  getSendMsg<isBackgroud>,
  {
    type: SendedMsgKey;
  }
>;

type getCallObject<isBackgroud extends boolean> = isBackgroud extends true
  ? CallObjectBackgroud
  : CallObjectContentScript;

type getCallFunctionList<isBackgroud extends boolean> = isBackgroud extends true
  ? typeof callFunctionListBackgroud
  : typeof callFunctionListContentScript;

/**
 * task 管道对象基类
 * @public
 */
export class TaskPortBase<isBackgroud extends boolean> {
  /** 是否存活 */
  public lived = true;
  /** 是否初始化 */
  protected inited = false;

  /** Task ID */
  public taskID = "";
  /** 管道ID */
  public portID?: string;
  /** 进程ID */
  public readonly pid = (globalThis as globalCommon).pid;

  /** 管道对象 */
  public port?: browser.Runtime.Port;

  /** 消息类型-处理函数映射表 */
  private taskHandlersByMsgTypeMap: Map<string, TaskPortType.TaskOnMessage<this>[]> = new Map();
  /** 消息ID-处理函数映射表 */
  private taskHandlersByMsgIdMap: Map<string, TaskPortType.TaskOnMessage<this>> = new Map();

  /**
   * 初始化函数
   *
   * 第一次收到消息时进行的初始化操作
   */
  protected init() {
    this.inited = true;
    this.registerHandlerByMsgType("call", call);
  }

  /** 消息处理函数 */
  public onMessage<ReceivedMsg extends getReceivedMsg<isBackgroud>>(
    message: ReceivedMsg,
    port: browser.Runtime.Port,
  ) {
    const name = port.name;
    const portID = name.substring(5);

    if (portID !== this.portID) {
      return;
    }

    if (!this.port) {
      this.port = port;
    }
    if (!this.inited) {
      this.init();
    }

    if ((globalThis as globalCommon).RuntimeEnv === "backgroud") {
      log.debug("TaskPort onMessage:", message);
    }

    const { type: msgType, msgID } = message;
    const handlersByType = this.taskHandlersByMsgTypeMap.get(msgType);
    if (handlersByType) {
      for (const h of handlersByType) {
        h(message, port, this);
      }
    }
    const handlersById = this.taskHandlersByMsgIdMap.get(msgID);
    if (handlersById) {
      handlersById(message, port, this);
    }
  }

  /**
   * 通过管道发送消息
   */
  public postMessage<SendedMsg extends getSendMsg<isBackgroud>>(msg: SendedMsg) {
    if (this.port) {
      this.port!.postMessage(msg);
    } else {
      throw new Error("Not Found Port!", { cause: this });
    }
  }

  /**
   * 注册基于消息类型的消息回调函数
   * @param msgType - 消息类型
   * @param handler - Handler
   */
  public registerHandlerByMsgType<ReceivedMsgType extends getReceivedMsgType<isBackgroud>>(
    msgType: ReceivedMsgType,
    handler: TaskPortType.TaskOnMessage<this>,
  ) {
    const hs = this.taskHandlersByMsgTypeMap.get(msgType);
    if (hs) {
      if (!hs.includes(handler)) {
        hs.push(handler);
      }
    } else {
      this.taskHandlersByMsgTypeMap.set(msgType, [handler]);
    }
  }
  /**
   * 移除基于消息类型的消息回调函数
   * @param msgType - 消息类型
   * @param handler - Handler
   */
  public unRegisterHandlerByMsgType<ReceivedMsgType extends getReceivedMsgType<isBackgroud>>(
    msgType: ReceivedMsgType,
    handler: TaskPortType.TaskOnMessage<this>,
  ) {
    const hs = this.taskHandlersByMsgTypeMap.get(msgType);
    if (hs) {
      const i = hs.indexOf(handler);
      if (i !== -1) {
        hs.splice(i, 1);
      }
    }
  }

  /**
   * 注册基于消息ID的消息回调函数
   * @param msgType - 消息类型
   * @param handler - Handler
   */
  public registerHandlerByMsgID(msgID: string, handler: TaskPortType.TaskOnMessage<this>) {
    this.taskHandlersByMsgIdMap.set(msgID, handler);
  }
  /**
   * 移除基于消息ID的消息回调函数
   * @param msgType - 消息类型
   * @param handler - Handler
   */
  public unRegisterHandlerByMsgID(msgID: string) {
    this.taskHandlersByMsgIdMap.delete(msgID);
  }

  /** 输入消息，返回对应响应 */
  public getResopnse<
    SendedMsg extends getSendMsg<isBackgroud>,
    ReceivedMsg extends getReceivedMsg<isBackgroud>,
  >(msg: SendedMsg): Promise<ReceivedMsg> {
    const { msgID } = msg;
    if (!this.port) {
      throw new Error("Not Found Port", { cause: this });
    }
    return new Promise((resolve, reject) => {
      const callback = (message: ReceivedMsg) => {
        this.unRegisterHandlerByMsgID(msgID);
        resolve(message);
      };

      this.registerHandlerByMsgID(msgID, callback);
      try {
        this.port!.postMessage(msg);
      } catch (error) {
        this.unRegisterHandlerByMsgID(msgID);
        reject(error);
      }
    });
  }

  /** 创建新消息 */
  public newMsg<
    SendedMsgType extends getSendedMsgType<isBackgroud>,
    ARGS extends Omit<getSendMsgByType<isBackgroud, SendedMsgType>, keyof TaskPortType.TaskMsg>,
  >(type: SendedMsgType, args: ARGS): getSendMsgByType<isBackgroud, SendedMsgType> {
    const msg: TaskPortType.TaskMsg = {
      pid: this.pid,
      taskID: this.taskID,
      msgID: uuidv4(),
      type,
    };
    Object.assign(msg, args);
    return msg as getSendMsgByType<isBackgroud, SendedMsgType>;
  }

  /** 基于请求消息，创建响应消息 */
  public newReplyMsg<
    ReceivedMsg extends getReceivedMsg<isBackgroud>,
    SendedMsgType extends getSendedMsgType<isBackgroud>,
    ARGS extends Omit<getSendMsgByType<isBackgroud, SendedMsgType>, keyof TaskPortType.TaskMsg>,
  >(
    msg: ReceivedMsg,
    type: SendedMsgType,
    args: ARGS,
  ): getSendMsgByType<isBackgroud, SendedMsgType> {
    const replayMsg: TaskPortType.TaskMsg = {
      pid: this.pid,
      taskID: this.taskID,
      msgID: msg.msgID,
      type,
    };
    Object.assign(msg, args);
    return replayMsg as getSendMsgByType<isBackgroud, SendedMsgType>;
  }

  /**
   * 调用对端函数
   * @param name - 函数名
   * @param value - 参数
   * @returns
   */
  public async call<
    CallObject extends getCallObject<isBackgroud>,
    CallFunctionList extends getCallFunctionList<isBackgroud>,
    K extends keyof CallObject & keyof CallFunctionList,
    V extends CallObject[K],
    // @ts-ignore
  >(name: K, value: V): Promise<ReturnType<CallFunctionList[K]>> {
    // @ts-ignore
    const obj: CallObject = {};
    obj[name] = value;

    // @ts-ignore
    const requestMsg = this.newMsg("call", {
      args: obj,
    });

    type getTaskPortType = isBackgroud extends true ? CallObjectContentScript : CallObjectBackgroud;

    const responseMsg = await this.getResopnse<
      TaskPortType.CallMsg<getTaskPortType>,
      TaskPortType.CallResponseMsg
      // @ts-ignore
    >(requestMsg);
    const response = responseMsg.response[name as string];
    if (response.type === "ok") {
      return response.value;
    } else {
      throw new Error(JSON.stringify(response.error, undefined, 2));
    }
  }

  /** 前后端 Console 同时输出日志 */
  public log(level: log.LogLevelNames, ...msg: any[]) {
    log[level](...msg);
    this.call("log", { method: level, args: msg });
  }
}
