// SPDX-License-Identifier: AGPL-3.0-or-later

import escapeStringRegexp from "escape-string-regexp";

import * as Rules from "..";
import { Rule, Meta } from "../../models";
import { getRule } from "../../runtime/rule";
import { bgme } from "../maintainers";

import type { RuleClassType } from "../../runtime/rule";
import type { mayPromise } from "vendor/types";

export type getBookInitArgsType = (args: {
  _Rule: RuleClassType;
  url: string;
  baseOrigin: string;
  hostname: string;
  basePathname: string;
  pathname: string;
}) => mayPromise<Rule.InitArgsType | null>;
class Archive extends Rule.Rule {
  static override Enable = false;

  static ID = "org.archive.web";
  static Name = "Wayback Machine";
  static IndexUrl = "https://web.archive.org/";
  static Description = "Wayback Machine";
  static Include = ["web.archive.org"];
  static Match: RegExp[] = [];
  static {
    const domains = [...Rules.com_sfacg.Include];
    const getReExp = (domain: string) => {
      const dRe = escapeStringRegexp(domain);
      const reS = `^(?<basePathname>/web/(?<date>\\d+)/(?<origin>https?://(?<hostname>${dRe})(:(?<port>\\d+))?))(?<pathname>/([^\\?]+/?)?)(?<search>\\?([^\\?]+)?)?$`;
      return new RegExp(reS);
    };
    this.Match.push(...domains.map(getReExp));
  }
  static Type = Rule.RuleType.E;
  static Version = 0.1;
  static Maintainers: Rule.Maintainer[] = [bgme];

  static override HasDarkMode = false;
  static override HasNSFW = true;
  static override HasPaidContent = false;
  static override Languages: "multi-language" = "multi-language" satisfies "multi-language";

  static override NeedLogin = false;

  static override BlockedByGFW = true;
  static override GeoLimit = false;

  static override Concurrency = 2;
  static override Timeout = 60 * 1000;
  static override Retry = 5;

  static runReMatch(url: string) {
    const { pathname, search } = new URL(url);

    for (const m of this.Match) {
      const mm = pathname.match(m);
      if (mm !== null) {
        type outType = {
          basePathname: string;
          date: string;
          origin: string;
          hostname: string;
          port?: string;
          pathname: string;
          search: string;
        };
        const out = mm.groups as outType;
        out["search"] = search;
        return out;
      }
    }

    return null;
  }
  static async getRule(url: string) {
    const mm = this.runReMatch(url);
    if (mm) {
      const { hostname, pathname } = mm;
      const _Rule = await getRule(hostname, pathname);
      return _Rule;
    }
    return null;
  }

  static override async checkURL(url: string) {
    const _Rule = await this.getRule(url);
    if (_Rule) {
      return true;
    } else {
      return false;
    }
  }

  public baseOrigin = "https://web.archive.org";
  public constructor() {
    super();
  }

  public async getBookInitArgs(url: string): Promise<Rule.InitArgsType | null> {
    const mm = (this.constructor as typeof Archive).runReMatch(url);
    const _Rule = await (this.constructor as typeof Archive).getRule(url);
    const { origin: baseOrigin } = new URL(url);
    if (mm && _Rule) {
      const { hostname, basePathname, pathname } = mm;

      if (Rules.com_sfacg.Include.includes(hostname)) {
        const { getBookInitArgs } = await import("./com.sfacg.book");
        return getBookInitArgs({ _Rule, url, baseOrigin, hostname, basePathname, pathname });
      }
    }
    return null;
  }

  public override async getBookMeta(url: string): Promise<Meta.Book | null> {
    const _Rule = await (this.constructor as typeof Archive).getRule(url);
    const initArgs = await this.getBookInitArgs(url);

    if (_Rule && initArgs) {
      const rule = new _Rule();
      rule.baseOrigin = initArgs.baseOrigin;
      rule.basePathname = initArgs.basePathname;
      this.bookMeta = new Meta.Book({
        Rule: _Rule,
        rule,
        parentMeta: null,
        initArgs,
        initHooks: rule.initHooks,
        Parser: _Rule.bookParser,
        TaskCallback: _Rule.bookTaskCallback,
      });
      return this.bookMeta;
    }
    return null;
  }

  /* 
  对于互联网档案馆 Archive 规则，下方的四个 Parser 只做占位用，实际运行时不应被调用。 
  */
  static async bookParser(args: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    const { hostname, pathname } = new URL(args.initArgs.url);
    const _Rule = await getRule(hostname, pathname);
    if (_Rule) {
      return _Rule.bookParser(args);
    } else {
      throw Error("Wayback Machine Parser: Not Found Rule.");
    }
  }
  static async volumeParser(args: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    const { hostname, pathname } = new URL(args.initArgs.url);
    const _Rule = await getRule(hostname, pathname);
    if (_Rule) {
      return _Rule.volumeParser(args);
    } else {
      throw Error("Wayback Machine Parser: Not Found Rule.");
    }
  }
  static async chapterParser(args: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    const { hostname, pathname } = new URL(args.initArgs.url);
    const _Rule = await getRule(hostname, pathname);
    if (_Rule) {
      return _Rule.chapterParser(args);
    } else {
      throw Error("Wayback Machine Parser: Not Found Rule.");
    }
  }
  static async attachmentParser(args: Meta.ParserArgsType): Promise<Meta.ParserResultType> {
    const { hostname, pathname } = new URL(args.initArgs.url);
    const _Rule = await getRule(hostname, pathname);
    if (_Rule) {
      return _Rule.attachmentParser(args);
    } else {
      throw Error("Wayback Machine Parser: Not Found Rule.");
    }
  }
}

export default Archive satisfies Rule.RuleStaic;
