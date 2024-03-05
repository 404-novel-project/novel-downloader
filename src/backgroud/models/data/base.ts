// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { v4 as uuidv4 } from "uuid";

import type { Attachment } from "./attachment";
import type { Book } from "./book";
import type { Chapter } from "./chapter";
import type { Volume } from "./volume";
import type { MetaBase } from "../meta";
import type { RuleClassType } from "backgroud/runtime/rule";
import type { ISO_639_1, mayPromise } from "vendor/types";

/**
 * creator, translator and contributor
 * @public
 */
export interface Creator {
  name: string;
  "alternate-script": {
    lang: ISO_639_1;
    name: string;
  }[];
  "file-as": string;
}

/**
 * 恢复状态基类
 * @public
 */
export interface ResumeStatus {
  name: string;
  type: "data";

  ID: string;
  created: string;

  metaObjectID: string | null;

  taskID: string | null;
  ruleID: string | null;
  ruleVersion: number | null;
}

/**
 * 下载数据基类
 *
 * @public
 */
export class DataBase {
  /** 下载元数据 */
  public meta: MetaBase | null;

  /** 下载数据父节点-私有属性 */
  public _parent?: DataBase;
  /** 下载数据父节点 */
  public get parent(): DataBase | Book | null {
    if (this.meta) {
      return this.meta.parent?.data ?? null;
    } else {
      return this._parent ?? null;
    }
  }
  /** 下载数据子节点-私有属性 */
  public readonly _children: DataBase[] = [];
  /** 下载数据子节点 */
  public get children() {
    if (this.meta) {
      return this.meta.children.map((m) => m.data);
    } else {
      return this._children;
    }
  }
  /** 任务ID */
  public get taskID(): string | null {
    return this.meta?.taskID ?? null;
  }
  public _Rule?: RuleClassType;
  /** 下载规则 */
  public get Rule(): RuleClassType | null {
    if (this.meta) {
      return this.meta.Rule;
    } else {
      return this._Rule ?? null;
    }
  }

  /** 下载数据对象ID */
  public ID = uuidv4();
  /** 下载数据对象创建时间 */
  public get created(): Date {
    return this._created;
  }
  public set created(input: number | string | Date) {
    this._created = new Date(input);
  }
  private _created = new Date();

  protected constructor(meta: MetaBase | null) {
    this.meta = meta;
    this.init(meta);
  }

  /** 自定义初始化函数 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  protected init(...args: any[]) {
    log.debug(`Date ${this.constructor.name} init……`);
  }

  /** 获取 Data Book 对象 */
  public getBook(): DataBase | null {
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

  /** 导出状态 */
  public toJSON<T extends ResumeStatus>(): mayPromise<T> {
    return {
      name: this.constructor.name,
      type: "data",

      ID: this.ID,
      created: this.created.toISOString(),

      metaObjectID: this.meta?.ID ?? null,

      taskID: this.taskID,
      ruleID: this.Rule?.ID ?? null,
      ruleVersion: this.Rule?.Version ?? null,
    } as T;
  }

  /** 将状态保存至 extension storage */
  public async save() {
    const { saveData } = await import("vendor/storage/settings/resume");
    saveData(this);
  }
}

/**
 * Date Resume Method Factory
 * @param meta
 * @param resumeStatus
 * @param initHooks
 * @param selfClass
 * @returns
 * @internal
 */
export function resumeFactory<
  M extends MetaBase,
  R extends ResumeStatus,
  I,
  S extends typeof Book | typeof Chapter | typeof Volume | typeof Attachment,
>(meta: M, resumeStatus: R, initHooks: I, selfClass: S): InstanceType<S> {
  const { name, type, ID, created, metaObjectID, taskID, ruleID, ruleVersion, ...args } =
    resumeStatus;
  // @ts-expect-error TS2345
  const d = new selfClass(meta, args, initHooks);
  d.ID = ID;
  d.created = created;
  return d as InstanceType<S>;
  ``;
}
