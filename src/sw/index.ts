// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="../shims-tape-esm.d.ts" />
/// <reference path="../shims-vue.d.ts" />
/// <reference path="../shims-pug.d.ts" />

import { proxyPage, downloadPage } from "./streamSave";

globalThis.addEventListener("fetch", (ev) => {
  if (ev.request.method !== "GET") {
    return;
  }
  const { pathname, searchParams } = new URL(ev.request.url);

  if (!pathname.startsWith("/sw/")) {
    return ev.respondWith(fetch(ev.request.url));
  }

  if (pathname === "/sw/streamSave/page.js") {
    return ev.respondWith(fetch("/pages/js/streamSavePage.js"));
  }

  const prefix = "/sw/streamSave/";
  if (pathname.startsWith(prefix)) {
    if (searchParams.get("target") === "proxy") {
      return ev.respondWith(proxyPage());
    }

    if (searchParams.get("target") === "download") {
      const params = [
        ["id", pathname.substring(prefix.length)],
        ["filename", searchParams.get("filename")],
        ["size", searchParams.get("size")],
        ["type", searchParams.get("type")],
      ].filter((kv) => kv[1] !== "");
      return ev.respondWith(downloadPage(Object.fromEntries(params)));
    }
  }
});
