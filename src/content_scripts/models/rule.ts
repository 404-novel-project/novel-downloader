// SPDX-License-Identifier: AGPL-3.0-or-later

import type { button as Button } from "../ui/store/val";
import type { ruleStaticToJsonType } from "backgroud/models/rule";
import type { RuleClassType } from "backgroud/runtime/rule";
import type { mayPromise } from "vendor/types";
import type { ShallowRef } from "vue";

type DocumentEventObject<K extends keyof DocumentEventMap> = {
  [Key in K]?: {
    type: K;
    listener: (this: Document, ev: DocumentEventMap[K]) => mayPromise<void>;
    options?: AddEventListenerOptions;
  };
};

/**
 * 规则扩展功能模版
 * @public
 */
export interface Rule extends DocumentEventObject<keyof DocumentEventMap> {
  ID: RuleClassType["ID"];
  onMounted?: () => mayPromise<void>;
  onUnmounted?: () => mayPromise<void>;
  postCheckSupport?: (
    button: typeof Button,
    backgroudRule: ShallowRef<ruleStaticToJsonType | null>,
  ) => mayPromise<void>;
}
