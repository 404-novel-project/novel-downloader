// SPDX-License-Identifier: AGPL-3.0-or-later

import { TaskPort } from "backgroud/rpc/task";

import { MetaBase, taskStatus, resumeChildren } from "./base";

import type { ConstructorArgs, ParserResultType } from "./base";
import type { BookResumeStatus } from "../data/book";
import type { RuleClassInstanceType } from "backgroud/runtime/rule";
import type Queue from "queue";

/**
 * 书籍元数据
 * @public
 */
export class Book extends MetaBase {
  /** 临时解析结果 */
  private parseResult?: ParserResultType;

  /** task 管道 */
  public taskport?: TaskPort;
  /** tab ID */
  public get tabID() {
    return this.taskport?.port?.sender?.tab?.id;
  }
  /** Rule.getBookMeta url 参数 */
  public url!: string;

  public constructor(args: ConstructorArgs) {
    super(args);
  }

  /** 清理下载队列 */
  public clean(queue: Queue) {
    queue.end();
    return queue.results?.splice(0, Infinity);
  }

  /** 预解析书籍 */
  public async parse() {
    this.parseResult = await this.Parser({
      initArgs: this.initArgs,
      Rule: this.Rule,
      rule: this.rule,
      parentMeta: this,
      options: { meta: this },
    });
    return this.parseResult;
  }

  /** 开始下载任务 */
  public start(options: ParserResultType | null = null) {
    if (options === null) {
      this.clean(this.globalQueue);
      const task = this.taskFactory();
      this.globalQueue.push(task);
    } else {
      const { data, childrenMeta } = options;

      this.data = data;

      for (const cm of childrenMeta) {
        const task = cm.taskFactory();
        this.globalQueue.push(task);
      }
    }

    this.globalQueue.start();
    this.status = taskStatus.working;
  }

  /**
   * 放弃下载任务
   * @override
   */
  public override abort(reason?: string): void {
    this.status = taskStatus.aborted;
    this.rule.controller.abort(reason);
    this.clean(this.globalQueue);
  }

  static async resume(taskID: string, taskport: TaskPort) {
    const { getRuleByID } = await import("backgroud/runtime/rule");
    const { getResumeByTaskID, getDataByID } = await import("vendor/storage/settings/resume");
    const { Book: BookData } = await import("../data/book");

    const { url, rule: _rule, book: _book } = await getResumeByTaskID(taskID);
    const _data = (await getDataByID(taskID, _book.dataObjectID as string)) as BookResumeStatus;

    const Rule = await getRuleByID(_book.ruleID);
    if (!Rule) {
      throw TypeError("Not Found match Rule!");
    }
    // @ts-expect-error TS2345: Property 'declarativeNetRequestRuleIDs' is missing in type 'ResumeStatus' but required in type 'SfacgResumeStatus'.
    const rule = Rule.resume(_rule) as RuleClassInstanceType;

    const book = await rule.getBookMeta(url);
    if (!book) {
      throw TypeError("getBookMeta Failed!");
    }
    book.ID = _book.ID;
    book.status = _book.status;
    book.retryTime = _book.retryTime;
    book.created = _book.created;
    book.data = BookData.resume(book, _data);

    book.taskport = taskport;

    await resumeChildren(book, taskID, _book.childrenMetaIDs);

    return book;
  }
}
