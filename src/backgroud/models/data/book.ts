// SPDX-License-Identifier: AGPL-3.0-or-later

import { DataBase, resumeFactory } from "./base";

import type { ResumeStatus, Creator } from "./base";
import type { ID } from "./id";
import type { Book as BookMeta } from "../meta";
import type { ISO_639_1 } from "vendor/types/ISO_639";

export type bookInitHook = (args: BookConstructorArgs, book: Book) => void;

/**
 * Book constructor 参数
 * @public
 */
export interface BookConstructorArgs {
  /** book ID */
  bookID: number | string | null;
  /** 书籍网址 */
  bookUrl: string;
  /** 书名 */
  bookName: string;
  /** 作者 */
  author: string[] | Creator[];
  /** 翻译者 */
  translator: string[] | Creator[];
  /** 贡献者 */
  contributor: string[] | Creator[];
  /** 简介 */
  introduction: string | null;
  /** 分类 */
  category: string | null;
  /** 标签 */
  tags: string[];
  /** 是否NSFW */
  nsfw: boolean;
  /** 丛书 */
  series: string | null;
  /** 身份标识，例如 ISBN */
  ids: ID[] | null;
  /** 语言 */
  languages: ISO_639_1[] | null;
  /** 书籍创建时间 */
  createdTime: number | string | Date | null;
  /** 最后更新时间 */
  lastUpdateTime: number | string | Date | null;
}

export interface BookResumeStatus extends BookConstructorArgs, ResumeStatus {
  createdTime: string | null;
  lastUpdateTime: string | null;
}

/**
 * 书籍
 * @public
 */
export class Book extends DataBase implements BookConstructorArgs {
  /** bookID */
  bookID!: number | string | null;
  /** 书籍网址 */
  bookUrl!: string;
  /** 书名 */
  bookName!: string;
  /** 作者 */
  author!: string[] | Creator[];
  /** 翻译者 */
  translator!: string[] | Creator[];
  /** 贡献者 */
  contributor!: string[] | Creator[];
  /** 简介 */
  introduction!: string | null;
  /** 分类 */
  category!: string | null;
  /** 标签 */
  tags!: string[];
  /** 是否NSFW */
  nsfw!: boolean;
  /** 丛书 */
  series!: string | null;
  /** 身份标识，例如 ISBN */
  ids!: ID[] | null;
  /** 语言 */
  languages!: ISO_639_1[] | null;
  /** 书籍创建时间 */
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
   * Book constructor
   */
  public constructor(meta: BookMeta, args: BookConstructorArgs, initHooks: bookInitHook[] = []) {
    super(meta);
    Object.assign(this, args);
    this.init(args, initHooks);
  }

  /**
   * Book 自定义初始化函数
   * @override
   */
  public override init(args: BookConstructorArgs, initHooks: bookInitHook[]) {
    super.init();
    const task = initHooks.map((initHook) => initHook(args, this));
    Promise.allSettled(task);
  }

  /** 状态保存 */
  public override toJSON<BookResumeStatus>(): BookResumeStatus {
    return {
      bookID: this.bookID,
      bookUrl: this.bookUrl,
      bookName: this.bookName,
      author: this.author,
      translator: this.translator,
      contributor: this.contributor,
      introduction: this.introduction,
      category: this.category,
      tags: this.tags,
      nsfw: this.nsfw,
      series: this.series,
      ids: this.ids,
      languages: this.languages,
      createdTime: this.createdTime?.toISOString() ?? null,
      lastUpdateTime: this.lastUpdateTime?.toISOString() ?? null,
      ...super.toJSON(),
    } as BookResumeStatus;
  }

  static resume(
    meta: BookMeta,
    resumeStatus: BookResumeStatus,
    initHooks: bookInitHook[] = [],
  ): Book {
    return resumeFactory(meta, resumeStatus, initHooks, this);
  }
}
