// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import type { proxyStartMsg, proxyPong } from "backgroud/rpc/streamSave";

document.addEventListener("DOMContentLoaded", () => {
  const { pathname } = new URL(document.location.href);

  const prefix = "/sw/streamSave/";

  const id = pathname.substring(prefix.length);
  const name = "streamSave-" + id;
  const port = browser.runtime.connect(undefined, { name });
  const bc = new BroadcastChannel(name);

  port.onMessage.addListener((msg) => {
    log.debug("port to bc:", msg);
    if (msg.type === "error") {
      console.log("error:", msg);
    }
    bc.postMessage(msg);
  });

  bc.addEventListener("message", (ev) => {
    log.debug("bc to port:", ev.data);
    if (ev.data.type === "swEnd") {
      console.log("swEnd:", ev.data);
    } else if (ev.data.type === "proxyPing") {
      const pong: proxyPong = {
        id: ev.data.id,
        type: "proxyPong",
      };
      bc.postMessage(pong);
    }
    port.postMessage(ev.data);
  });

  const proxyStartMsg: proxyStartMsg = {
    id,
    type: "proxyStart",
  };
  port.postMessage(proxyStartMsg);
});
