// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { v4 as uuidv4 } from "uuid";

import { TaskPortBase } from "vendor/rpc/task";

import { createPort, destroyPory } from "../port";

import end from "./end";
import taskid from "./taskid";

import type { TaskPortType } from "vendor/rpc/task";

/** @internal */
export type taskOnMessage = TaskPortType.TaskOnMessage<TaskPort>;

/**
 * task 管道对象
 * @public
 */
export class TaskPort extends TaskPortBase<false> {
  public override taskID: string = uuidv4();
  public override portID: string = uuidv4();
  public get portName() {
    return `task-${this.portID}`;
  }

  /** 保护任务定时器ID */
  private intervalID?: number;

  public constructor() {
    super();

    this.createPort();
  }

  /** 创建 Port */
  public createPort() {
    this.port = createPort(this.portName, (msg, port) => this.onMessage(msg, port));
  }

  protected override init(): void {
    super.init();
    this.registerHandlerByMsgType("end", end);
    this.registerHandlerByMsgType("taskid", taskid);

    this.keepAlive();
  }

  /**
   * 保活
   *
   * 当后台进程意外结束时进行恢复操作
   */
  private keepAlive() {
    this.intervalID = setInterval(() => {
      this.call("ping", null);
    }, 1_000);

    this.port!.onDisconnect.addListener(() => {
      log.info(`The port of ${this.portName} disconnected!`);
      clearInterval(this.intervalID);
      destroyPory(this.portName);

      if (this.lived) {
        log.info(`Try Resume task ${this.taskID}...`);

        this.portID = uuidv4();
        this.createPort();
        this.keepAlive();

        this.resume();
      }
    });
  }
  /**
   * 结束任务
   *
   * 调用 _end 之后，该 task 对象应该立刻销毁，不应再次调用。
   */
  public _end() {
    clearInterval(this.intervalID);
    this.lived = false;
    this.port!.disconnect();
    destroyPory(this.portName);
    log.info("End task!");
  }
  /** 强制结束任务 */
  public end(reason: string) {
    const msg = this.newMsg("end", { reason });
    this.postMessage(msg);
  }

  /**
   * init Book Meta
   */
  public initBook(url: string) {
    const msg = this.newMsg("initBook", { url });
    this.postMessage(msg);
  }
  /**
   * 开始任务
   * @param url - url
   */
  public start(options: TaskPortType.C2B_StartMsg_options) {
    const msg = this.newMsg("start", { options });
    this.postMessage(msg);
  }

  /** 恢复任务 */
  public resume() {
    const msg = this.newMsg("resume", {});
    this.postMessage(msg);
  }
}
