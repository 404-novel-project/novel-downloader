// SPDX-License-Identifier: AGPL-3.0-or-later

import { DataBase, resumeFactory } from "./base";

import type { ResumeStatus, Creator } from "./base";
import type { ContentBase } from "./content";
import type { ID } from "./id";
import type { Chapter as ChapterMeta } from "../meta";
import type { ISO_639_1 } from "vendor/types/ISO_639";

/**
 * Chapter constructor 参数
 * @public
 */
export interface ChapterConstructorArgs {
  /** chapter ID */
  chapterID: number | string | null;
  /** 章节名称 */
  chapterName: string | null;
  /** 简介 */
  introduction: string | null;
  /** 作者 */
  author: string[] | Creator[];
  /** 翻译者 */
  translator: string[] | Creator[];
  /** 贡献者 */
  contributor: string[] | Creator[];
  /** 原始内容 */
  rawContents: ContentBase[];
  /** 处理后的内容 */
  contents: ContentBase[];
  /** 用于保存的 HTML 字符串 */
  savedContent: string;
  /** 标签 */
  tags: string[];
  /** 是否为NSFW费节 */
  nsfw: boolean;
  /** 是否为付费章节 */
  needPay: boolean;
  /** 是否已经付费 */
  paid: boolean;
  /** 是否锁章 */
  locked: boolean;
  /** 身份标识 */
  ids: ID[] | null;
  /** 排序 */
  order: number;
  /** 语言 */
  languages: ISO_639_1[] | null;
  /** 章节创建时间 */
  createdTime: number | string | Date | null;
  /** 最后更新时间 */
  lastUpdateTime: number | string | Date | null;
}

export type ChapterInitHook = (args: ChapterConstructorArgs, chapter: Chapter) => void;

export interface ChapterResumeStatus extends ChapterConstructorArgs, ResumeStatus {
  createdTime: string | null;
  lastUpdateTime: string | null;
}

/**
 * 章节
 * @public
 */
export class Chapter extends DataBase implements ChapterConstructorArgs {
  /** chapterID */
  chapterID!: number | string | null;
  /** 章节名称 */
  chapterName!: string | null;
  /** 简介 */
  introduction!: string | null;
  /** 作者 */
  author!: string[] | Creator[];
  /** 翻译者 */
  translator!: string[] | Creator[];
  /** 贡献者 */
  contributor!: string[] | Creator[];
  /** 原始内容 */
  rawContents!: ContentBase[];
  /** 处理后的内容 */
  contents!: ContentBase[];
  /** 用于保存的 HTML 字符串 */
  savedContent!: string;
  /** 标签 */
  tags!: string[];
  /** 是否为NSFW费节 */
  nsfw!: boolean;
  /** 是否为付费章节 */
  needPay!: boolean;
  /** 是否已经付费 */
  paid!: boolean;
  /** 是否锁章 */
  locked!: boolean;
  /** 身份标识 */
  ids!: ID[] | null;
  /** 排序 */
  order!: number;
  /** 语言 */
  languages!: ISO_639_1[] | null;
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

  /**
   * Chapter constructor
   */
  public constructor(
    meta: ChapterMeta,
    args: ChapterConstructorArgs,
    initHooks: ChapterInitHook[] = [],
  ) {
    super(meta);
    Object.assign(this, args);
    this.init(args, initHooks);
  }

  /**
   * Chapter 自定义初始化函数
   * @override
   */
  protected override init(args: ChapterConstructorArgs, initHooks: ChapterInitHook[]): void {
    super.init();
    const task = initHooks.map((initHook) => initHook(args, this));
    Promise.allSettled(task);
  }

  /** 状态保存 */
  public override toJSON<ChapterResumeStatus>(): ChapterResumeStatus {
    return {
      chapterID: this.chapterID,
      chapterName: this.chapterName,
      introduction: this.introduction,
      author: this.author,
      translator: this.translator,
      contributor: this.contributor,
      rawContents: this.rawContents,
      contents: this.contents,
      savedContent: this.savedContent,
      tags: this.tags,
      nsfw: this.nsfw,
      needPay: this.needPay,
      paid: this.paid,
      locked: this.locked,
      ids: this.ids,
      order: this.order,
      languages: this.languages,
      createdTime: this.createdTime?.toISOString() ?? null,
      lastUpdateTime: this.lastUpdateTime?.toISOString() ?? null,
      ...super.toJSON(),
    } as ChapterResumeStatus;
  }

  static resume(
    meta: ChapterMeta,
    resumeStatus: ChapterResumeStatus,
    initHooks: ChapterInitHook[] = [],
  ) {
    return resumeFactory(meta, resumeStatus, initHooks, this);
  }
}
