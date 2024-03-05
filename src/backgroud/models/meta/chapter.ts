// SPDX-License-Identifier: AGPL-3.0-or-later

import { MetaBase, resumeFactory } from "./base";

import type { getConstructorArgs, ResumeStatus } from "./base";
import type { ChapterConstructorArgs } from "../data/chapter";
import type { ID } from "../data/id";
import type { InitArgsType } from "../rule";

/**
 * 章节付费状态
 * @public
 */
enum paidStatus {
  true,
  false,
  unknown,
}

interface ChapterArgs
  extends Pick<
    ChapterConstructorArgs,
    | "chapterID"
    | "chapterName"
    | "introduction"
    | "nsfw"
    | "needPay"
    | "locked"
    | "ids"
    | "order"
    | "createdTime"
    | "lastUpdateTime"
  > {
  paid: paidStatus;
}

interface ChapterInitArgs extends InitArgsType {
  chapterArgs: ChapterArgs;
}

interface ChapterArgsOnResumeStatus extends ChapterArgs {
  createdTime: number | null;
  lastUpdateTime: number | null;
}

export interface ChapterInitArgsOnResumeStatus extends InitArgsType {
  chapterArgs: ChapterArgsOnResumeStatus;
}

/**
 * 章节元数据
 * @public
 */
export class Chapter extends MetaBase implements ChapterArgs {
  /** chapterID */
  chapterID!: number | string | null;
  /** 章节名称 */
  chapterName!: string | null;
  /** 简介 */
  introduction!: string | null;
  /** 是否为NSFW费节 */
  nsfw!: boolean;
  /** 是否为付费章节 */
  needPay!: boolean;
  /** 是否已经付费 */
  paid!: paidStatus;
  /** 是否锁章 */
  locked!: boolean;
  /** 身份标识 */
  ids!: ID[] | null;
  /** 排序 */
  order!: number;
  /** 章节创建时间 */
  public set createdTime(input: number | string | Date | null) {
    if (input === null) {
      this._createdTime = input;
    } else {
      this._createdTime = new Date(input);
    }
  }
  public get createdTime(): Date | null {
    return this._createdTime;
  }
  private _createdTime!: Date | null;
  /** 最后更新时间 */
  public set lastUpdateTime(input: number | string | Date) {
    if (input === null) {
      this._createdTime = input;
    } else {
      this._createdTime = new Date(input);
    }
  }
  public get lastUpdateTime(): Date | null {
    return this._lastUpdateTime;
  }
  private _lastUpdateTime!: Date | null;

  public constructor(args: getConstructorArgs<ChapterInitArgs>) {
    super(args);
    Object.assign(this, args.initArgs.chapterArgs);
  }

  public override toJSON(): ResumeStatus<ChapterInitArgsOnResumeStatus> {
    const out = super.toJSON() as ResumeStatus<ChapterInitArgs>;
    Object.assign(out.initArgs.chapterArgs, {
      createdTime: this.createdTime?.toISOString() ?? null,
      lastUpdateTime: this.created?.toISOString() ?? null,
    });
    return out as ResumeStatus<ChapterInitArgsOnResumeStatus>;
  }

  static async resume(
    parentMeta: MetaBase,
    resumeStatus: ResumeStatus<ChapterInitArgsOnResumeStatus>,
  ) {
    const { Chapter: ChapterData } = await import("../data/chapter");
    return await resumeFactory(
      parentMeta,
      resumeStatus,
      ChapterData,
      this,
      parentMeta.Rule.chapterParser,
      parentMeta.Rule.chapterTaskCallback,
    );
  }
}
