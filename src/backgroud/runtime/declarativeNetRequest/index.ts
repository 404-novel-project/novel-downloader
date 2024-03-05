// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import storage from "vendor/storage";

/**
 * 添加 DeclarativeNetRequest Rule
 * @param rules DeclarativeNetRequest Rule
 * @returns
 * @public
 */
export async function addDeclarativeNetRequestRules(rules: browser.DeclarativeNetRequest.Rule[]) {
  const declarativeNetRequestRuleIds = new Set(
    await storage.session.global.declarativeNetRequestRuleIds,
  );
  const addRuleIDs: number[] = [];
  const addRules: browser.DeclarativeNetRequest.Rule[] = [];
  for (const rule of rules) {
    const rid = rule.id;
    if (!declarativeNetRequestRuleIds.has(rid)) {
      declarativeNetRequestRuleIds.add(rid);
      addRuleIDs.push(rid);
      addRules.push(rule);
    }
  }
  browser.declarativeNetRequest.updateSessionRules({
    addRules,
  });
  storage.session.global.declarativeNetRequestRuleIds = Array.from(declarativeNetRequestRuleIds);
  log.info("addDeclarativeNetRequestRules", addRules, addRuleIDs);
  return addRuleIDs;
}

interface getDeclarativeNetRequestRulesFilterDetail
  extends Omit<browser.DeclarativeNetRequest.RuleConditionType, "tabIds" | "excludedTabIds"> {
  id?: number[];
}

/**
 * 输入查询条件，返回符合要求的 DeclarativeNetRequest Session Rule
 * @param detail 查询条件
 * @returns
 * @public
 */
export async function getDeclarativeNetRequestRules(
  detail?: getDeclarativeNetRequestRulesFilterDetail,
) {
  let sessionRules = await browser.declarativeNetRequest.getSessionRules();
  if (detail) {
    for (const [key, value] of Object.entries(detail)) {
      sessionRules = sessionRules.filter((rule) => {
        if (key === "id" && (value as number[]).includes(rule.id)) {
          return true;
        } else {
          const rckv = rule.condition[key as keyof browser.DeclarativeNetRequest.RuleConditionType];
          if (rckv) {
            if (Array.isArray(rckv)) {
              // 两 string[] 存在交集
              if ((value as string[]).some((v) => (rckv as string[]).includes(v))) {
                return true;
              }
            } else {
              // string 相同
              if (rckv === value) {
                return true;
              }
            }
          }
        }

        return false;
      });
    }
  }
  return sessionRules;
}

/**
 * 移除 DeclarativeNetRequest Session Rule
 * @param ruleIDs
 * @public
 */
export async function deleteDeclarativeNetRequestRules(ruleIDs: number[]) {
  const declarativeNetRequestRuleIds = new Set(
    await storage.session.global.declarativeNetRequestRuleIds,
  );
  browser.declarativeNetRequest.updateSessionRules({
    removeRuleIds: ruleIDs,
  });
  for (const rid of ruleIDs) {
    declarativeNetRequestRuleIds.delete(rid);
  }
  storage.session.global.declarativeNetRequestRuleIds = Array.from(declarativeNetRequestRuleIds);
  log.info("deleteDeclarativeNetRequestRules", ruleIDs);
}

export async function clearDeclarativeNetRequestRules() {
  browser.declarativeNetRequest.updateSessionRules({
    removeRuleIds: (await browser.declarativeNetRequest.getSessionRules()).map((rule) => rule.id),
  });
  storage.session.global.declarativeNetRequestRuleIds = [];
  log.info("clearDeclarativeNetRequestRules");
}

export function init() {}
