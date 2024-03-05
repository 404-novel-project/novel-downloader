// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */
import log from "loglevel";
import * as browser from "webextension-polyfill";

export type onMessage = (message: any, port: browser.Runtime.Port) => void;
const handlerMap: Map<string, onMessage[]> = new Map();

export function portListen() {
  function onConnect(port: browser.Runtime.Port) {
    const name = port.name;
    const handlers = handlerMap.get(name);
    if (handlers) {
      log.debug("Port connected", port.name, port);

      port.onDisconnect.addListener(async (port) => {
        log.debug("Port disconnected", port.name, port);
      });

      for (const h of handlers) {
        port.onMessage.addListener(h);
      }
    }
  }

  browser.runtime.onConnect.addListener(onConnect);
}

export function addPortHandler(name: string, onMessage: onMessage) {
  const _onMessage: onMessage = (message, port) => {
    if (port.name === name) {
      log.debug(`Port ${port.name} received message:`, message);
      onMessage(message, port);
    }
  };
  log.debug(`Create Port Listen ${name}:`, onMessage);
  const handlers = handlerMap.get(name);
  if (handlers) {
    if (!handlers.includes(_onMessage)) {
      handlers.push(_onMessage);
    }
  } else {
    handlerMap.set(name, [_onMessage]);
  }
}
export function removePortHandler(name: string, onMessage?: onMessage) {
  const handlers = handlerMap.get(name);
  if (handlers) {
    if (onMessage) {
      const i = handlers.indexOf(onMessage);
      if (i !== -1) {
        handlers.splice(i, 1);
      }
    } else {
      handlerMap.delete(name);
    }
  }
}
