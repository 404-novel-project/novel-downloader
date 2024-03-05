// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

const namePortMap: Map<string, browser.Runtime.Port> = new Map();

function _createPort(name: string): browser.Runtime.Port {
  const _port = namePortMap.get(name);

  if (typeof _port !== "undefined") {
    return _port;
  }
  try {
    const port = browser.runtime.connect(undefined, { name });
    log.debug("Port connected:", port.name, port);

    port.onDisconnect.addListener(async (p) => {
      log.debug("Port disconnected", port.name, p);
      destroyPory(name);
    });

    namePortMap.set(name, port);
    return port;
  } catch (error) {
    if ((error as Error).message.includes("Extension context invalidated.")) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS2304: Cannot find name 'alert'.
      alert(
        "插件已更新，请重新加载本页面！\nThe plugin has been updated, please reload this page!",
      );
    }
    log.error(error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type onMessage = (message: any, port: browser.Runtime.Port) => void;
export function createPort(name: string, onMessage: onMessage): browser.Runtime.Port {
  const p = _createPort(name);
  p.onMessage.addListener((message, port) => {
    log.debug(`Port ${port.name} received message:`, message);
    onMessage(message, port);
  });
  return p;
}
export function destroyPory(name: string) {
  const port = namePortMap.get(name);
  if (port) {
    port.disconnect();
    namePortMap.delete(name);
  }
}
