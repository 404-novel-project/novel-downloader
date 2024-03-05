// SPDX-License-Identifier: AGPL-3.0-or-later

import * as Rules from "../rules";

export function getRule(id: string) {
  const rules = Object.values(Rules);
  for (const rule of rules) {
    if (rule.ID === id) {
      return rule;
    }
  }
  return null;
}
