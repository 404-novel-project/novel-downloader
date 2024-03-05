// SPDX-License-Identifier: AGPL-3.0-or-later

import Queue from "queue";
import { v4 as uuidv4 } from "uuid";

import { errorToObject, errorToObjectReturn } from "vendor/utils";

import type { AttachmentInitArgsOnResumeStatus, Attachment } from "./attachment";
import type { ChapterInitArgsOnResumeStatus, Chapter } from "./chapter";
import type { VolumeInitArgsOnResumeStatus, Volume } from "./volume";
import type { RuleClassInstanceType, RuleClassType } from "../../runtime/rule";
import type {
  DataBase,
  Book as BookData,
  Chapter as ChapterData,
  Volume as VolumeData,
  Attachment as AttachmentData,
} from "../data";
import type { InitArgsType } from "../rule";
import type { QueueWorker } from "queue";
import type { RateLimit } from "vendor/utils";

/**
 * 任务状态
 * @public
 */
export enum taskStatus {
  /** 等待执行 */
  pending,
  /** 正在执行 */
  working,
  /** 已完成 */
  finished,
  /** 执行时出错 */
  error,
  /** 超时 */
  timeout,
  /** 放弃执行 */
  aborted,
}

/**
 * Parser Args
 * @public
 */
export interface ParserArgsType
  extends Omit<ConstructorArgs, "initHooks" | "Parser" | "TaskCallback"> {
  options: {
    meta: MetaBase;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K: string]: any;
  };
}

/**
 * Parser Return
 * @public
 */
export type ParserResultType = {
  data: DataBase;
  childrenMeta: MetaBase[];
};

/** 自定义初始化函数 */
export type initHook = (args: ConstructorArgs) => void;

/**
 * 下载元数据 constructor 参数
 * @public
 */
export interface ConstructorArgs {
  /** 下载规则 */
  Rule: RuleClassType;
  /** 下载规则实例 */
  rule: RuleClassInstanceType;

  /** 元数据父节点 */
  parentMeta: null | MetaBase;

  /**
   * 解析初始化参数
   *
   * 传递入 Parser 函数
   */
  initArgs: InitArgsType;

  /**
   * 自定义初始化函数列表
   */
  initHooks: initHook[];

  /**
   * 下载解析器
   *
   * 根据 initArgs 解析下载出实际数据
   *
   * @param initArgsType - 初始化参数
   * @returns
   */
  Parser: (input: ParserArgsType) => Promise<ParserResultType>;
  /**
   * 下载解析任务回调函数
   */
  TaskCallback: (result: Omit<taskResult, "callback">) => void;
}

export type getConstructorArgs<T> = Omit<ConstructorArgs, "initArgs"> & {
  initArgs: T;
};

/**
 * 传入 queue 用于执行的 Task 函数的返回结果
 * @public
 */
export interface taskResult {
  status: taskStatus;
  meta: MetaBase;
  result: Awaited<ReturnType<ConstructorArgs["Parser"]>> | null;
  error: errorToObjectReturn | null;
  callback: ({ status, meta, result, error }: Omit<taskResult, "callback">) => void;
}

/**
 * 传入 queue 用于执行的 Task 函数
 * @public
 */
export interface TaskWorker extends QueueWorker {
  (): Promise<taskResult>;
  taskID: string;
  metaID: string;
  meta: MetaBase;
}

/**
 * AbortError
 *
 * 自定义 Error
 */
class AbortError extends Error {}

export interface ResumeStatus<T extends InitArgsType> {
  name: string;
  type: "meta";

  ID: string;
  status: taskStatus;
  retryTime: number;
  created: string;

  ruleID: string;
  ruleVersion: number;

  taskID: string;
  parentMetaID: string | null;
  childrenMetaIDs: string[];

  initArgs: T;
  dataObjectID: string | null;
}

/**
 * 下载元数据基类
 * @public
 */
export class MetaBase {
  /** 下载规则 */
  public readonly Rule: RuleClassType;
  /** 下载规则实例 */
  public readonly rule: RuleClassInstanceType;

  /** 元数据父节点 */
  public readonly parent: null | MetaBase;
  /** 元数据子节点 */
  public readonly children: MetaBase[] = [];

  /** 元数据所对应的下载数据 */
  public data: null | DataBase | BookData = null;
  /** 下载数据父节点 */
  public get parentData() {
    return this.parent?.data ?? null;
  }

  /** 任务ID */
  public get taskID(): string {
    return this.rule.taskID;
  }

  /** 元数据对象ID */
  public ID = uuidv4();
  /** 下载任务状态 */
  public status = taskStatus.pending;

  /** 解析初始化参数 */
  public readonly initArgs: InitArgsType;

  /**  全局执行队列  */
  public get globalQueue(): Queue {
    return this.rule.queue;
  }
  /** 全局 AbortSignal */
  public get globalSignal(): AbortSignal {
    return this.rule.signal;
  }

  /** 全局 rateLimit 实例 */
  public get globalRateLimit(): RateLimit {
    return this.rule.rateLimit;
  }

  /** 本地执行队列 */
  public queue: Queue;

  /** 本地 AbortController */
  public readonly controller = new AbortController();
  /** 本地 AbortSignal */
  public readonly signal = this.controller.signal;

  /** 重试次数 */
  public retryTime = 0;
  /** 下载解析器 */
  public readonly Parser: ConstructorArgs["Parser"];
  /** 下载解析任务回调函数 */
  public readonly TaskCallback: ConstructorArgs["TaskCallback"];

  /** 下载元数据对象创建时间 */
  public get created(): Date {
    return this._created;
  }
  public set created(input: number | string | Date) {
    this._created = new Date(input);
  }
  private _created = new Date();

  protected constructor(args: ConstructorArgs) {
    this.Rule = args.Rule;
    this.rule = args.rule;

    this.parent = args.parentMeta;
    this.parent?.addChild(this);

    this.initArgs = args.initArgs;

    this.globalSignal.addEventListener("abort", () => {
      this.abort("receivid global abort signal.");
    });

    this.Parser = args.Parser;
    this.TaskCallback = args.TaskCallback;

    this.queue = new Queue({
      concurrency: this.Rule.Concurrency,
      timeout: this.Rule.Timeout,
      autostart: false,
      results: [],
    });
    this.queue.addEventListener("success", this.rule.queueSuccessHandler);
    this.queue.addEventListener("timeout", (ev) => {
      this.rule.queueTimeoutHandler(ev, this.queue, this.Rule.Retry);
    });

    this.init(args);
  }

  /** 自定义初始化函数 */
  protected init(args: ConstructorArgs) {
    const { initHooks } = args;
    const task = initHooks.map((initHook) => initHook(args));
    Promise.allSettled(task);
  }

  /** 放弃当前任务 */
  public abort(reason?: string) {
    this.status = taskStatus.aborted;
    this.controller.abort(reason);
  }

  /** 添加元数据子节点 */
  public addChild<M extends MetaBase>(child: M) {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
    this.save();
    child.save();
  }

  /** 获取 Meta Book 对象 */
  public getBook(): MetaBase | null {
    if (this.parent === null) {
      if (this.constructor.name === "Book") {
        return this;
      } else {
        return null;
      }
    } else {
      return this.parent.getBook();
    }
  }

  /**
   * 解析任务工厂
   *
   * 用于生产实际运行于执行队列的 Task 函数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public taskFactory(options: Record<string, any> = {}): TaskWorker {
    const _options: ParserArgsType["options"] = { meta: this };
    Object.assign(_options, options);

    const task = async (): Promise<taskResult> => {
      try {
        if (this.status === taskStatus.aborted) {
          throw new AbortError(
            `task aborted! \n initArgs:\n ${JSON.stringify(this.initArgs, undefined, 2)}`,
          );
        }

        this.status = taskStatus.working;
        const result = await this.Parser({
          initArgs: this.initArgs,
          Rule: this.Rule,
          rule: this.rule,
          parentMeta: this,
          options: _options,
        });
        return {
          status: taskStatus.finished,
          meta: this,
          result,
          error: null,
          callback: this.TaskCallback,
        };
      } catch (error) {
        const out = {
          status: taskStatus.error,
          meta: this,
          result: null,
          error: errorToObject(error as Error),
          callback: this.TaskCallback,
        };

        if (error instanceof AbortError) {
          out.status = taskStatus.aborted;
          return out;
        } else {
          return out;
        }
      }
    };
    task.taskID = this.taskID;
    task.metaID = this.ID;
    task.meta = this;
    return task;
  }

  /** 状态导出 */
  public toJSON(): ResumeStatus<typeof this.initArgs> {
    return {
      name: this.constructor.name,
      type: "meta",

      ID: this.ID,
      status: this.status,
      retryTime: this.retryTime,
      created: this.created.toISOString(),

      ruleID: this.Rule.ID,
      ruleVersion: this.Rule.Version,

      taskID: this.taskID,
      parentMetaID: this.parent?.ID ?? null,
      childrenMetaIDs: this.children.map((cm) => cm.ID),

      initArgs: this.initArgs,

      dataObjectID: this.data?.ID ?? null,
    };
  }

  /** 将状态保存至 extension storage */
  public async save() {
    const { saveMeta } = await import("vendor/storage/settings/resume");
    saveMeta(this);
  }
}

/**
 * Meta Resume Method Factory
 * @param parentMeta
 * @param resumeStatus
 * @param dataClass
 * @param selfClass
 * @param Parser
 * @param TaskCallback
 * @returns
 */
export async function resumeFactory<
  P extends MetaBase,
  R extends
    | ResumeStatus<ChapterInitArgsOnResumeStatus>
    | ResumeStatus<VolumeInitArgsOnResumeStatus>
    | ResumeStatus<AttachmentInitArgsOnResumeStatus>,
  D extends typeof ChapterData | typeof VolumeData | typeof AttachmentData,
  S extends typeof Chapter | typeof Volume | typeof Attachment,
  SP extends ConstructorArgs["Parser"],
  ST extends ConstructorArgs["TaskCallback"],
>(parentMeta: P, resumeStatus: R, dataClass: D, selfClass: S, Parser: SP, TaskCallback: ST) {
  const { getDataByID } = await import("vendor/storage/settings/resume");

  const { ID, status, retryTime, created, childrenMetaIDs, initArgs, dataObjectID } = resumeStatus;

  const m = new selfClass({
    Rule: parentMeta.Rule,
    rule: parentMeta.rule,
    parentMeta,
    // @ts-expect-error TS2322
    initArgs,
    initHooks: [],
    Parser,
    TaskCallback,
  });

  Object.assign(m, {
    ID,
    status,
    retryTime,
    created,
  });

  if (dataObjectID) {
    const _data = await getDataByID(m.taskID, dataObjectID);
    // @ts-expect-error TS2345
    m.data = dataClass.resume(m, _data);
  }

  if (m.status === taskStatus.pending || m.status === taskStatus.working) {
    m.globalQueue.push(m.taskFactory());
  }

  await resumeChildren(m, m.taskID, childrenMetaIDs);

  return m;
}

/**
 * 从 extension storage 保存状态恢复子节点
 * @param meta - 父Meta节点
 * @param taskID - Task ID
 * @param childrenMetaIDs - 子Meta节点ID
 * @internal
 */
export async function resumeChildren(meta: MetaBase, taskID: string, childrenMetaIDs: string[]) {
  const { getMetaByID } = await import("vendor/storage/settings/resume");

  for (const cmid of childrenMetaIDs) {
    const m = await getMetaByID(taskID, cmid);
    switch (m.name) {
      case "Volume": {
        const { Volume } = await import("./volume");
        await Volume.resume(meta, m as ResumeStatus<VolumeInitArgsOnResumeStatus>);
        break;
      }
      case "Chapter": {
        const { Chapter } = await import("./chapter");
        await Chapter.resume(meta, m as ResumeStatus<ChapterInitArgsOnResumeStatus>);
        break;
      }
      case "Attachment": {
        const { Attachment } = await import("./attachment");
        await Attachment.resume(meta, m as ResumeStatus<AttachmentInitArgsOnResumeStatus>);
        break;
      }
    }
  }
}
