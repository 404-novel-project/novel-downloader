// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import Queue from "queue";
import { v4 as uuidv4 } from "uuid";

import { TaskPort } from "backgroud/rpc/task";
import { registerServiceWorker } from "backgroud/runtime";
import { deleteResumeStorage } from "vendor/storage/settings/resume";
import { ISO_639_1 } from "vendor/types/ISO_639";
import { RateLimit } from "vendor/utils";

import { Book as BookData } from "./data";
import { Book as BookMeta } from "./meta";
import { taskStatus } from "./meta/base";

import type {
  ConstructorArgs,
  TaskWorker,
  taskResult,
  ParserResultType,
  initHook,
} from "./meta/base";
import type { RuleClassInstanceType, RuleClassType } from "../runtime/rule";
import type { QueueEvent, QueueWorker } from "queue";
import type { TaskPortType } from "vendor/rpc/task";
import type { mayPromise } from "vendor/types";
import type { RateLimitConstructor } from "vendor/utils";

/**
 * 抓取规则分类
 *
 * @public
 */
export enum RuleType {
  /** 完全原创内容 */
  "A1",
  /** 原创内容及自主翻译内容 */
  "A2",
  /** 原创转载内容混杂 */
  "B",
  /** 转载纸质书籍内容 */
  "C",
  /** 转载电子书籍内容 */
  "D",
  /** 其它 */
  "E",
}

/** @public */
export type ruleStaticToJsonType = Omit<
  RuleStaic,
  "bookParser" | "volumeParser" | "chapterParser" | "attachmentParser"
>;

/**
 * 解析初始化参数
 *
 * @public
 */
export type InitArgsType = {
  baseOrigin: string;
  basePathname: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K: string]: any;
};

/**
 * 规则维护者格式
 * @example
 * ```
 *  [
 *    {
 *      name: "bgme",
 *      github: "yingziwu",
 *      email: "i@bgme.me",
 *    },
 *  ]
 * ```
 * @public
 */
export interface Maintainer {
  name: string;
  github?: string;
  email?: string;
}

/**
 * 抓取规则静态属性与方法
 *
 * @public
 */
export interface RuleStaic {
  /**
   * 规则ID
   *
   * 本抓取规则全局唯一标识，不可重复。
   *
   * @example "com.sfacg.book"
   */
  ID: string;
  /**
   * 规则名称
   *
   * 本抓取规则人类友好的名称，可以是网站名称或其他。
   *
   * @example "SF轻小说"
   */
  Name: string;
  /**
   * 域名列表
   *
   * 本抓取规则应匹配哪些域名。
   *
   * 具体可参见：{@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#host | Match patterns}
   *
   * @example ["book.sfacg.com", "*.sfacg.com"]
   *
   */
  Include: string[];
  /**
   * pathname 匹配正则
   *
   * 当同一站点存在多条规则时（Include 出现重叠），将对 pathname 进行基于 Match 的正则匹配。
   *
   * @example
   * [
   *   new RegExp("^/Novel/(?<bookid>\\d+)/$"),
   *   new RegExp("^/Novel/(?<bookid>\\d+)/MainIndex/$"),
   * ]
   */
  Match: RegExp[];
  /**
   * 抓取规则分类
   *
   * @example Rule.RuleType.A1
   */
  Type: RuleType;
  /**
   * 并发任务数
   *
   * @example 5
   * @defaultValue 5
   */
  Concurrency: number;
  /**
   * 任务超时限制
   *
   * 单位：毫秒
   *
   * @example 60 * 1000
   * @defaultValue 30 * 1000
   */
  Timeout: number;
  /**
   * 最大重试次数
   *
   * @example 5
   * @defaultValue 5
   */
  Retry: number;
  /**
   * 网站文本编码
   *
   * auto 为自动识别文本编码。
   *
   * @example "gbk"
   * @defaultValue "auto"
   */
  CharacterSet: string;
  /**
   * 是否进度未知
   *
   * @example false
   * @defaultValue false
   */
  ProgressUnknown: boolean;
  /**
   * 抓取规则版本
   *
   * @example 1.0
   */
  Version: number;
  /**
   * 规则维护者
   */
  Maintainers: Maintainer[];

  /**
   * 站点首页URL
   *
   * 本抓取规则对应网站的站点首页
   *
   * @example "https://book.sfacg.com/""
   */
  IndexUrl?: string;
  /**
   * 站点图标
   *
   * 本抓取规则对应网站的站点图标
   *
   * @example "https://book.sfacg.com/favicon.ico"
   */
  IconUrl?: string;
  /**
   * 规则描述
   *
   * 用一句话简单介绍本抓取规则，可以是网站简介或其他内容。
   *
   * @example "SF轻小说-国内最大原创轻小说网站"
   */
  Description?: string;
  /**
   * 规则备注
   *
   * 标注说明与本规则相关的其它信息。
   *
   * @example "抓取速度慢，请耐心等待。"
   */
  Comment?: string;

  /**
   * 网站是否支持夜间模式
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme | prefers-color-scheme: dark} 时，网站是否自动进入夜间模式。
   *
   * @example false
   * @defaultValue false
   */
  HasDarkMode: boolean;
  /**
   * 网站是否含有NSFW内容
   *
   * @example false
   * @defaultValue false
   */
  HasNSFW: boolean;
  /**
   * 网站是否含有付费内容
   *
   * @example false
   * @defaultValue false
   */
  HasPaidContent: boolean;
  /**
   * 网站主要语言
   *
   * {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes | ISO 639-1} 代码
   *
   * 若为 "multi-language" 则代表网站包含多语种，例如 Pixiv。
   *
   * @example ["zh"]
   */
  Languages: ISO_639_1[] | "multi-language";

  /**
   * 网站下载时是否必须登录
   *
   * @example false
   * @defaultValue false
   */
  NeedLogin: boolean;

  /**
   * 该网站被GFW屏蔽
   *
   * @example false
   * @defaultValue false
   */
  BlockedByGFW: boolean;
  /**
   * 该网站存在基于地理位置的访问限制
   *
   * 如仅允许中国大陆用户访问
   *
   * @example false
   * @defaultValue false
   */
  GeoLimit: boolean;

  /**
   * 本规则是否由工厂函数生成
   *
   * @example false
   * @defaultValue false
   */
  FromFactory: boolean;

  /** book 解析下载函数 */
  bookParser: ConstructorArgs["Parser"];
  /** volume 解析下载函数 */
  volumeParser: ConstructorArgs["Parser"];
  /** chapter 解析下载函数 */
  chapterParser: ConstructorArgs["Parser"];
  /** attachment 解析下载函数 */
  attachmentParser: ConstructorArgs["Parser"];
}

/**
 * queue task worker 回调函数
 *
 * @param args -
 *
 * @public
 */
export const queueTaskCallback: ConstructorArgs["TaskCallback"] = ({
  status,
  meta,
  result,
  error,
}) => {
  // 达到频率限制时暂停队列
  if (meta.globalRateLimit.rateLimit() === false) {
    meta.globalQueue.stop();

    const wait = () => {
      setTimeout(() => {
        if (meta.globalRateLimit.rateLimit()) {
          meta.globalQueue.start();
        } else {
          wait();
        }
      }, 1_000);
    };
    wait();
  }

  if (status === taskStatus.finished) {
    // 任务完成
    const { data, childrenMeta } = result as ParserResultType;

    if (!(data instanceof BookData)) {
      meta.status = taskStatus.finished;
    }

    meta.data = data;

    meta.save();
    data.save();

    for (const cm of childrenMeta) {
      cm.save();
      const task = cm.taskFactory();
      meta.globalQueue.push(task);
    }
  } else if (status === taskStatus.aborted) {
    // 任务放弃
    log.info("TaskWorker Abort:", meta);
    meta.save();
  } else {
    // 任务出错
    log.info("TaskWorker Error:", meta, error);
    meta.retryTime = meta.retryTime + 1;
    meta.save();
    if (meta.retryTime < meta.Rule.Retry) {
      const task = meta.taskFactory();
      meta.globalQueue.push(task);
    } else {
      meta.status = taskStatus.error;
    }
  }

  // 更新任务进度并通知前端
  const updateUpdateInfo = () => {
    const book = meta.getBook() as BookMeta | null;
    const t = book?.taskport;
    const getUpdateInfo = (): TaskPortType.UpdateInfo | null => {
      if (book) {
        const q = book.globalQueue;
        const R = book.Rule;

        const qr = q.results;

        return {
          button: {
            working: true,
          },
          progress: {
            displayed: true,
            unknown: qr ? R.ProgressUnknown : true,
            percent: qr ? qr.length / (qr.length + q.length) : 0,
          },
        };
      } else {
        return null;
      }
    };
    const updateInfo = getUpdateInfo();
    if (updateInfo && t) {
      t.update(updateInfo);
    }
  };
  updateUpdateInfo();
};

export interface ResumeStatus {
  taskID: string;
  taskport?: TaskPort;
}

/**
 * 抓取规则模板
 *
 * @public
 */
export abstract class Rule {
  /**
   * 是否启用本规则。
   *
   * @example true
   * @defaultValue ture
   */
  static Enable = true;

  static Concurrency = 5;
  static Timeout = 30 * 1000;
  static Retry = 5;
  static CharacterSet = "auto";
  static ProgressUnknown = false;

  static HasDarkMode = false;
  static HasNSFW = false;
  static HasPaidContent = false;
  static Languages: ISO_639_1[] | "multi-language" = [ISO_639_1.Chinese];

  static NeedLogin = false;

  static BlockedByGFW = false;
  static GeoLimit = false;

  static FromFactory = false;

  /** 频率限制设置 */
  static RateLimit: RateLimitConstructor = {
    limit: 300,
    interval: 60_000,
  };

  /** book task worker 回调函数 */
  static bookTaskCallback: ConstructorArgs["TaskCallback"] = queueTaskCallback;
  /** volume task worker 回调函数 */
  static volumeTaskCallback: ConstructorArgs["TaskCallback"] = queueTaskCallback;
  /** chapter task worker 回调函数 */
  static chapterTaskCallback: ConstructorArgs["TaskCallback"] = queueTaskCallback;
  /** attachment task worker 回调函数 */
  static attachmentTaskCallback: ConstructorArgs["TaskCallback"] = queueTaskCallback;

  /** 状态恢复 */
  static resume({ taskID, taskport }: ResumeStatus) {
    // @ts-expect-error TS2511: Cannot create an instance of an abstract class.
    const rule = new this();
    rule.taskID = taskID;
    rule.taskport = taskport;
    return rule;
  }

  /** 状态导出 */
  public toJSON(): ResumeStatus {
    return {
      taskID: this.taskID,
    };
  }

  /**
   * preSave 钩子
   *
   * 可用于执行一些预处理工作，例如：移除文本中无用空行。
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preSave(bookMeta: BookMeta, book: BookData): mayPromise<void> {
    log.info("preSave hook");
  }
  /** 将下载数据保存为电子书 */
  protected async save(bookMeta: BookMeta, book: BookData) {
    // TODO
  }
  /** postSave 钩子 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected postSave(bookMeta: BookMeta, book: BookData): mayPromise<void> {
    log.info("postSave hook");
  }

  /**
   * 检查本抓取规则是否适用于输入URL
   *
   * 默认基于 Match 正则检测 url pathname
   *
   * @param url - 网页 URL
   * @returns
   */
  static checkURL(url: string): mayPromise<boolean> {
    const { pathname } = new URL(url);
    for (const match of (this as unknown as RuleStaic).Match) {
      if (match.test(pathname)) return true;
    }
    return false;
  }

  /**
   * JSON 序列化
   *
   * 将抓取规则静态属性导出为JSON
   */
  static toJSON() {
    const rule = this as unknown as RuleStaic;

    const out: ruleStaticToJsonType = {
      ID: rule.ID,
      Name: rule.Name,
      Include: rule.Include,
      Match: rule.Match,
      Type: rule.Type,
      Concurrency: rule.Concurrency,
      Timeout: rule.Timeout,
      Retry: rule.Retry,
      CharacterSet: rule.CharacterSet,
      ProgressUnknown: rule.ProgressUnknown,
      Version: rule.Version,
      Maintainers: rule.Maintainers,

      IndexUrl: rule.IndexUrl,
      Description: rule.Description,

      HasDarkMode: rule.HasDarkMode,
      HasNSFW: rule.HasNSFW,
      HasPaidContent: rule.HasPaidContent,
      Languages: rule.Languages,

      NeedLogin: rule.NeedLogin,

      BlockedByGFW: rule.BlockedByGFW,
      GeoLimit: rule.GeoLimit,

      FromFactory: rule.FromFactory,
    };
    return out;
  }

  /** 任务ID */
  public taskID = uuidv4();
  /** 全局任务队列 */
  public readonly queue = new Queue({
    concurrency: (this.constructor as typeof Rule).Concurrency,
    timeout: (this.constructor as typeof Rule).Timeout,
    autostart: false,
    results: [],
  });
  /** 全局任务队列 success 事件处理函数 */
  public queueSuccessHandler(
    ev: QueueEvent<
      "success",
      {
        result: taskResult[];
      }
    >,
  ) {
    const rs = ev.detail.result;
    for (const { callback, ...rest } of rs) {
      callback(rest);
    }
  }
  /** 全局任务队列 timeout 事件处理函数 */
  public queueTimeoutHandler(
    ev: QueueEvent<
      "timeout",
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (err?: Error | undefined, ...result: any[]) => void;
        job: QueueWorker;
      }
    >,
    queue: Queue,
    Retry: number,
  ) {
    const job = ev.detail.job as TaskWorker;
    const meta = job.meta;
    log.info("TaskWorker Timeout:", meta, job);
    meta.controller.abort();
    meta.retryTime = meta.retryTime + 1;
    if (meta.retryTime < Retry) {
      const task = meta.taskFactory();
      queue.push(task);
    } else {
      meta.status = taskStatus.timeout;
    }
  }
  /** 全局任务队列 end 事件处理函数 */
  protected queueEndHandler(
    ev: QueueEvent<
      "end",
      {
        error?: Error | undefined;
      }
    >,
  ) {
    (async () => {
      const { error } = ev.detail;
      if (error) {
        log.error(error, this.bookMeta, this);
        if (this.bookMeta !== null) {
          this.bookMeta.status = taskStatus.error;
          this.bookMeta.clean(this.queue);
        }
      } else {
        if (this.bookMeta?.status === taskStatus.finished) {
          const meta = this.bookMeta;
          const data = this.bookMeta.data as BookData;
          if (data) {
            await this.preSave(meta, data);
            await this.save(meta, data);
            await this.postSave(meta, data);

            meta.status = taskStatus.finished;

            deleteResumeStorage(this.taskID);
          } else {
            log.error("Error on save: no book data.", meta);
          }
        }
      }
      await this.onQueueEnd(error);
    })();
  }
  /**
   * 全局任务队列 end 事件自定义处理函数
   *
   * 该函数将在正常处理流程结束后执行
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onQueueEnd(error: Error | undefined): mayPromise<void> {}
  public constructor() {
    this.queue.addEventListener("success", this.queueSuccessHandler);
    this.queue.addEventListener("timeout", (ev) => {
      this.queueTimeoutHandler(ev, this.queue, (this.constructor as typeof Rule).Retry);
    });
    this.queue.addEventListener("end", this.queueEndHandler);
  }

  /** task 管道 */
  public taskport?: TaskPort;

  /** 全局 AbortController */
  public readonly controller = new AbortController();
  /** 全局 AbortSignal */
  public readonly signal = this.controller.signal;

  /**
   * origin base
   *
   * 用于构造请求
   *
   * @example "https://book.sfacg.com"
   */
  public abstract baseOrigin: string;
  /**
   * pathname base
   *
   * 用于构造请求
   *
   * @example "/web/20190117212748/http://book.sfacg.com"
   *
   * @defaultValue ""
   *
   */
  public basePathname = "";
  /**
   * 获取当前 pathname
   * @param url - url
   * @returns
   */
  static getPathname(url: string, basePathname: string) {
    const _url = new URL(url);
    return _url.pathname.replace(basePathname, "");
  }
  /**
   * 获取当前 pathname
   * @param url - url
   * @returns
   */
  public getPathname(url: string) {
    return (this.constructor as typeof Rule).getPathname(url, this.basePathname);
  }

  /** 频率限制实例 */
  public rateLimit = new RateLimit((this.constructor as typeof Rule).RateLimit);

  /** book 元数据 */
  public bookMeta: BookMeta | null = null;
  /**
   * 获取下载任务初始化参数
   *
   * @param url - 需分析的网址
   */
  public abstract getBookInitArgs(url: string): mayPromise<InitArgsType | null>;

  /** Book Meta initHooks */
  public initHooks: initHook[] = [];
  /** 获取 book Meta 实例 */
  public async getBookMeta(url: string) {
    registerServiceWorker();

    const initArgs = await this.getBookInitArgs(url);
    if (initArgs) {
      this.bookMeta = new BookMeta({
        Rule: this.constructor as RuleClassType,
        rule: this as RuleClassInstanceType,

        parentMeta: null,

        initArgs,

        initHooks: this.initHooks,

        Parser: (this.constructor as unknown as RuleStaic).bookParser,
        TaskCallback: (this.constructor as typeof Rule).bookTaskCallback,
      });
      this.bookMeta.taskport = this.taskport;
      this.bookMeta.url = url;
      return this.bookMeta;
    }
    return null;
  }
}
