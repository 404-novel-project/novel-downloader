// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import storage from "./storage";
import { errorToObject } from "./utils";

import type { globalCommon } from "global";

function logPlugin(LOG_PREFIX: string) {
  const rawMethodFactory = log.methodFactory;
  (globalThis as globalCommon).logText = "";

  log.methodFactory = function (methodName, level, loggerName) {
    const rawMethod = rawMethodFactory(methodName, level, loggerName);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (..._meesage: any[]) => {
      const message = [
        LOG_PREFIX,
        `[${new Date().toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}]`,
        `${methodName.toUpperCase()}:`,
        ..._meesage,
      ];
      (globalThis as globalCommon).logText =
        (globalThis as globalCommon).logText +
        message
          .map((m) => {
            if (typeof m === "object") {
              if (m instanceof Error) {
                try {
                  return JSON.stringify(errorToObject(m));
                } catch (error) {
                  return m;
                }
              } else {
                try {
                  return JSON.stringify(m);
                } catch (error) {
                  return m;
                }
              }
            } else {
              return m;
            }
          })
          .join(" ") +
        "\n";
      try {
        rawMethod(...message);
      } catch (error) {
        log.error("log:", errorToObject(error as Error));
        console.error(message, error);
      }
    };
  };
  log.setLevel(log.getLevel());
}

function logDefaultLevel() {
  log.setDefaultLevel("info");
  log.setLevel("info");
}

async function logDebug() {
  const enableDebug = await storage.local.global.enableDebug;
  if (enableDebug) {
    log.enableAll();
  }
}

/**
 * 初始化日志插件
 * @param LOG_PREFIX - 日志前缀
 * @public
 */
export async function logInit(LOG_PREFIX: string) {
  logPlugin(LOG_PREFIX);
  logDefaultLevel();
  await logDebug();
}
