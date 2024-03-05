// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { Rule, Meta, Data } from "../models";
import { initHook } from "../models/meta/base";
import {
  addDeclarativeNetRequestRules,
  deleteDeclarativeNetRequestRules,
} from "../runtime/declarativeNetRequest";

import { bgme } from "./maintainers";
import * as API from "./utils/com.sfacg";
import { getSfacgRules } from "./utils/com.sfacg/app/DNRR";

export enum WebType {
  "PC",
  "Mobile",
}
export interface bookInitArgs extends Rule.InitArgsType {
  bookid: string;
  webType: WebType;
  useApi: boolean;
  isWebLogin: boolean;
  isApiLogin: boolean;
}

export interface SfacgResumeStatus extends Rule.ResumeStatus {
  declarativeNetRequestRuleIDs: number[];
}

class Sfacg extends Rule.Rule {
  static override Enable = false;

  static ID = "com.sfacg";
  static Name = "SF轻小说";
  static IndexUrl = "https://book.sfacg.com/";
  static Description = "SF轻小说-国内最大原创轻小说网站";
  static Include = ["book.sfacg.com", "m.sfacg.com"];
  static Match = [
    // book.sfacg.com
    new RegExp("^/Novel/(?<bookid>\\d+)/$"),
    new RegExp("^/Novel/(?<bookid>\\d+)/MainIndex/$"),

    // m.sfacg.com
    new RegExp("^/b/(?<bookid>\\d+)/$"),
    new RegExp("^/i/(?<bookid>\\d+)/$"),
  ];
  static Type = Rule.RuleType.A1;
  static Version = 0.1;
  static Maintainers: Rule.Maintainer[] = [bgme];

  static override HasDarkMode = false;
  static override HasNSFW = false;
  static override HasPaidContent = true;

  static override NeedLogin = false;

  static override Concurrency = 5;
  static override Timeout = 30 * 1000;
  static override Retry = 5;

  public constructor() {
    super();
  }

  public baseOrigin = "https://book.sfacg.com";
  public override basePathname = "";
  public useApi = true;
  public declarativeNetRequestRuleIDs: number[] = [];
  public override initHooks: initHook[] = [
    async () => {
      if (this.useApi) {
        const rules = await getSfacgRules();
        this.declarativeNetRequestRuleIDs = await addDeclarativeNetRequestRules(rules);
      }
    },
  ];
  public override onQueueEnd() {
    deleteDeclarativeNetRequestRules(this.declarativeNetRequestRuleIDs);
  }

  static override resume({
    taskID,
    taskport,
    declarativeNetRequestRuleIDs,
  }: SfacgResumeStatus): Sfacg {
    const rule = super.resume({ taskID, taskport });
    rule.declarativeNetRequestRuleIDs = declarativeNetRequestRuleIDs;
    return rule;
  }

  public override toJSON(): SfacgResumeStatus {
    return {
      declarativeNetRequestRuleIDs: this.declarativeNetRequestRuleIDs,
      ...super.toJSON(),
    };
  }

  public async getBookInitArgs(url: string): Promise<bookInitArgs | null> {
    const getWebType = (url: string) => {
      const { hostname } = new URL(url);
      if (hostname === "book.sfacg.com") {
        return WebType.PC;
      } else if (hostname === "m.sfacg.com") {
        this.baseOrigin = "https://m.sfacg.com";
        return WebType.Mobile;
      }
      return null;
    };
    const getBookid = (url: string) => {
      const pathname = this.getPathname(url);
      let bookid: string | null = null;
      for (const match of (this.constructor as typeof Sfacg).Match) {
        const mm = pathname.match(match);
        if (mm !== null) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          bookid = mm.groups!["bookid"] ?? null;
        }
      }
      return bookid;
    };

    const bookid = getBookid(url);
    const webType = getWebType(url);
    if (bookid === null || webType === null) {
      return null;
    }

    let isApiLogin = false;
    const app = new API.App(this.signal);
    try {
      const user = await app.user_info();
      log.info("SFACG APP Get User info:", user);
      isApiLogin = true;
    } catch (error) {
      log.warn("SFACG APP Get User info error:", error);
    }

    let web: API.Web.PC | API.Web.Mobile;
    if (webType === WebType.PC) {
      web = new API.Web.PC(this.baseOrigin, this.basePathname, this.signal);
    } else {
      web = new API.Web.Mobile(this.baseOrigin, this.basePathname, this.signal);
    }
    let isWebLogin = false;
    try {
      const user = await web.user_info();
      log.info("SFACG Web Get User info:", user);
      isWebLogin = true;
    } catch (error) {
      log.warn("SFACG Web Get User info error:", error);
    }

    return {
      bookid,
      webType,
      useApi: this.useApi,
      isApiLogin,
      isWebLogin,

      baseOrigin: this.baseOrigin,
      basePathname: this.basePathname,
      url,
    };
  }

  static async bookParser({
    initArgs,
    Rule,
    rule,
    parentMeta,
    options,
  }: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    return {
      // @ts-expect-error TODO
      data: new Data.Book(options.meta),
      childrenMeta: [],
    };
  }
  static async volumeParser({
    initArgs,
    Rule,
    rule,
    parentMeta,
    options,
  }: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    return {
      // @ts-expect-error TODO
      data: new Data.Volume(options.meta),
      childrenMeta: [],
    };
  }
  static async chapterParser({
    initArgs,
    Rule,
    rule,
    parentMeta,
    options,
  }: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    return {
      // @ts-expect-error TODO
      data: new Data.Chapter(options.meta),
      childrenMeta: [],
    };
  }
  static async attachmentParser({
    initArgs,
    Rule,
    rule,
    parentMeta,
    options,
  }: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    return {
      // @ts-expect-error TODO
      data: new Data.Attachment(options.meta),
      childrenMeta: [],
    };
  }
}

export default Sfacg satisfies Rule.RuleStaic;
