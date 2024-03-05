// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { watch } from "vue";

import { callBackgroud } from "vendor/rpc";

import { check } from "../../runtime";

import { url, button, backgroudRule, contentScriptRule, controller, signal } from "./val";

async function checkSupport(url: string) {
  const { support, rule } = await callBackgroud("checkSupport", {
    url,
  });
  button.displayed = support;
  backgroudRule.value = rule;
}
function prevertClose(ev: BeforeUnloadEvent) {
  ev.preventDefault();
  return (ev.returnValue = "");
}

export function initWatch() {
  window.addEventListener("popstate", async () => {
    url.value = globalThis.location.href;
  });
  watch(url, (value) => {
    checkSupport(value);
  });
  watch(
    () => backgroudRule.value?.ID,
    (ID) => {
      if (ID) {
        contentScriptRule.value = check.getRule(ID);
        contentScriptRule.value?.postCheckSupport?.(button, backgroudRule);
      }
    },
  );
  watch(contentScriptRule, (value, oldValue) => {
    if (value?.ID !== oldValue?.ID) {
      controller.value.abort();
      if (oldValue?.onUnmounted) {
        setTimeout(() => {
          log.debug(
            `The Contentscript Rule ${oldValue.ID} Run onUnmounted()`,
            oldValue.onUnmounted,
          );
          oldValue.onUnmounted?.();
        });
      }

      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ID, onMounted, onUnmounted, postCheckSupport, ...events } = value;
        controller.value = new AbortController();
        signal.value = controller.value.signal;
        for (const { type, listener, options = {} } of Object.values(events)) {
          Object.assign(options, {
            signal: signal.value,
          });
          log.debug(
            `The Contentscript Rule ${ID} Add ${type} Event to Document.`,
            type,
            listener,
            options,
          );
          document.addEventListener(type, listener, options);
        }
        if (onMounted) {
          setTimeout(() => {
            log.debug(`The Contentscript Rule ${ID} Run onMounted()`, onMounted);
            onMounted();
          });
        }
      }
    }
  });

  // 当处在工作状态时阻止关闭页面
  watch(
    () => button.working,
    (newValue, oldValue) => {
      if (oldValue !== newValue) {
        if (newValue) {
          window.addEventListener("beforeunload", prevertClose, { capture: true });
        } else {
          window.removeEventListener("beforeunload", prevertClose, { capture: true });
        }
      }
    },
  );

  checkSupport(url.value);
}
