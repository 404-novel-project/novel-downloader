// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import { TaskPortBase } from "vendor/rpc/task";

import end from "./end";
import initBook from "./initBook";
import resume from "./resume";
import start from "./start";
import taskid from "./taskid";

import type { Meta } from "backgroud/models";
import type { RuleClassInstanceType } from "backgroud/runtime/rule";
import type { TaskPortType } from "vendor/rpc/task";

/** @internal */
export type taskOnMessage = TaskPortType.TaskOnMessage<TaskPort>;

/**
 * task 管道对象
 * @public
 */
export class TaskPort extends TaskPortBase<true> {
  /** 前端Tab */
  public readonly tab: browser.Tabs.Tab;
  /** Book Meta */
  public book?: Meta.Book;
  /** rule Instance */
  public rule?: RuleClassInstanceType;

  /**
   * constructor
   * @param portID - 管道ID
   * @param tab - 前端Tab
   */
  public constructor(portID: string, tab: browser.Tabs.Tab) {
    super();
    this.portID = portID;
    this.tab = tab;
  }

  protected override init() {
    super.init();
    this.registerHandlerByMsgType("initBook", initBook);
    this.registerHandlerByMsgType("start", start);
    this.registerHandlerByMsgType("end", end);
    this.registerHandlerByMsgType("taskid", taskid);
    this.registerHandlerByMsgType("resume", resume);

    this.setTaskID();
  }

  /** 结束任务 */
  public _end() {
    this.lived = false;
    this.port?.disconnect();
    log.info("End task!");
  }

  /**
   * 通知前端任务结束
   * @public
   */
  public end() {
    const msg = this.newMsg("end", {});
    this.postMessage(msg);
    this._end();
  }

  /** 从前端获取并设置TaskID */
  public setTaskID() {
    const msg = this.newMsg("taskid", {});
    this.postMessage(msg);
  }

  /**
   * 通知前端更新任务进度
   * @param info - 任务进度更新对象
   */
  public update(info: TaskPortType.UpdateInfo) {
    const msg = this.newMsg("update", {
      value: info,
    });
    this.postMessage(msg);
  }
}

/** @internal */
export function taskListen() {
  function onConnect(port: browser.Runtime.Port) {
    const name = port.name;
    const tab = port.sender?.tab;
    if (name.startsWith("task-") && tab) {
      log.debug("Port connected", port.name, port);

      port.onDisconnect.addListener(async (p) => {
        log.debug("Port disconnected", port.name, p);
      });

      const id = name.substring(5);
      const t = new TaskPort(id, tab);
      port.onMessage.addListener((msg, port) => {
        t.onMessage(msg, port);
      });
    }
  }

  browser.runtime.onConnect.addListener(onConnect);
}
