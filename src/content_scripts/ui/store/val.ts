// SPDX-License-Identifier: AGPL-3.0-or-later

import { usePreferredDark } from "@vueuse/core";
import { reactive, ref, shallowRef, computed } from "vue";

import { TaskPort } from "content_scripts/rpc/task";

import type { Rule } from "../../models";
import type { ruleStaticToJsonType } from "backgroud/models/rule";
import type { ShallowRef } from "vue";

/**
 * 当前 URL
 * @public
 */
export const url = ref(globalThis.location.href);
/**
 * 当前页面匹配到的后台规则
 * @public
 */
export const backgroudRule: ShallowRef<null | ruleStaticToJsonType> = shallowRef(null);
/**
 * 当前页面匹配到的前台规则
 * @public
 */
export const contentScriptRule: ShallowRef<null | Rule> = shallowRef(null);
/**
 * 监听事件结束控制器
 * @public
 */
export const controller = shallowRef(new AbortController());
/**
 * 监听事件结束信号
 * @public
 */
export const signal = shallowRef(controller.value.signal);

/**
 * 当前 TaskPort 对象
 * @public
 */
export const taskport: ShallowRef<null | TaskPort> = shallowRef(null);

/**
 * 是否开启黑暗模式
 * @public
 */
export const darkMode = computed(
  () => (backgroudRule.value?.HasDarkMode ?? false) && usePreferredDark().value,
);
/**
 * button 组件属性
 * @public
 */
export const button = reactive({
  displayed: false,
  working: false,
});
/**
 * progress 组件属性
 * @public
 */
export const progress = reactive({
  displayed: false,
  unknown: false,
  percent: 0,
});
/**
 * overlay 组件属性
 * @public
 */
export const overlay = reactive({
  displayed: false,
});
