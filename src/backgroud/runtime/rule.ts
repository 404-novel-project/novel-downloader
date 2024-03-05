// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { Rule } from "../models";
import * as Rules from "../rules";

/**
 * 获取上级域名
 * @param domain 域名
 * @returns
 */
function getParentLevelDomain(domain: string) {
  return domain.substring(domain.indexOf(".") + 1);
}

export type RuleClassType = Awaited<(typeof Rules)[keyof typeof Rules]>;
export type RuleClassInstanceType = InstanceType<RuleClassType>;
/**
 * 输入网页域名与路径，获取相对应的规则
 * @param hostname 域名
 * @param pathname 路径
 * @returns
 * @public
 */
export async function getRule(hostname: string, pathname?: string) {
  const matchRules: RuleClassType[] = [];
  const matchRulesPush = (r: RuleClassType) => {
    if (!matchRules.includes(r) && r.Enable) {
      matchRules.push(r);
    }
  };

  const _rules = Object.values(Rules).map((r) => Promise.resolve<RuleClassType>(r));
  const rules = (await Promise.all(_rules)).filter((r) => r.Enable === true);
  rules.sort((a, b) => {
    /**
     * 基于 FromFactory 进行比较
     *
     * 将 FromFactory 为 true 的规则置于 false 的规则之后
     */
    function compareByFromFactory(a: RuleClassType, b: RuleClassType) {
      if (a.FromFactory === b.FromFactory) {
        return 0;
      } else {
        if (a.FromFactory === true) {
          return 1;
        } else {
          return -1;
        }
      }
    }

    const hasWildcard = (x: RuleClassType) => x.Include.some((xx) => xx.includes("*"));
    const aw = hasWildcard(a);
    const bw = hasWildcard(b);
    // 将 Include 包含 * 置于不包含 * 的规则之后
    if (aw === false && bw === false) {
      return compareByFromFactory(a, b);
    } else if (aw === true && bw === false) {
      return 1;
    } else if (aw === false && bw === true) {
      return -1;
    } else if (aw === true && bw === true) {
      const hasAsterisk = (x: RuleClassType) => x.Include.some((xx) => xx === "*");
      const aa = hasAsterisk(a);
      const ba = hasAsterisk(b);
      // 将 Include 为 * 的规则置于 *. 规则之后
      if (aa === ba) {
        return compareByFromFactory(a, b);
      } else {
        if (aa === true) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    return 0;
  });

  for (const rule of rules) {
    for (const include of rule.Include) {
      if (hostname === include) {
        matchRulesPush(rule);
      } else if (include.includes("*")) {
        if (include.startsWith("*.")) {
          if (getParentLevelDomain(hostname) === getParentLevelDomain(include)) {
            matchRulesPush(rule);
          }
        } else if (include === "*") {
          matchRulesPush(rule);
        }
      }
    }
  }

  if (matchRules.length === 0) {
    return null;
  } else if (matchRules.length === 1) {
    return matchRules[0];
  } else {
    if (pathname) {
      for (const mr of matchRules) {
        for (const m of mr.Match) {
          if (m.test(pathname)) {
            return mr;
          }
        }
      }
      return null;
    } else {
      return matchRules[0];
    }
  }
}

/**
 * 输入规则ID，获取相对应的规则
 * @param ID 规则ID
 * @returns
 * @public
 */
export async function getRuleByID(ID: string) {
  const _rules = Object.values(Rules).map(Promise.resolve<RuleClassType>);
  const rules = await Promise.all(_rules);
  for (const rule of rules) {
    if (rule.ID === ID) {
      return rule;
    }
  }
  return null;
}

/**
 * 输入域名，输出是否存在相对应的规则
 * @param hostname 域名
 * @returns
 * @public
 */
export async function checkHostname(hostname: string): Promise<boolean> {
  const rule = await getRule(hostname);
  return rule !== null;
}

/**
 * 输入网页网址，输出是否支持该网页。
 * 如果支持，输出同时附上相应规则。
 * @param url 网址
 * @returns
 * @public
 */
export async function checkUrlSupport(url: string): Promise<
  | {
      support: boolean;
      rule: Rule.ruleStaticToJsonType;
    }
  | { support: boolean; rule: null }
> {
  try {
    const { hostname, pathname } = new URL(url);
    const rule = await getRule(hostname, pathname);
    if (rule !== null) {
      return {
        support: await rule.checkURL(url),
        rule: rule.toJSON(),
      };
    }
  } catch (error) {
    log.debug("checkUrlSupport:", error);
  }
  return {
    support: false,
    rule: null,
  };
}
