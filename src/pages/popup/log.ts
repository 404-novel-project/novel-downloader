// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import { callBackgroud } from "vendor/rpc";

async function getCurrentTab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  const tabID = currentTab.id;
  const tabUrl = currentTab.url;
  return { tabID, tabUrl };
}

export async function isCanExportLog() {
  const { tabID: currentTabId, tabUrl: currentUrl } = await getCurrentTab();
  if (currentTabId && currentUrl) {
    const injectedTabIds = await callBackgroud("getInjectedTabIds", null);
    const { support: currentUrlSupported } = await callBackgroud("checkSupport", {
      url: currentUrl,
    });

    if (injectedTabIds.includes(currentTabId.toString()) && currentUrlSupported) {
      return true;
    }
  }

  return false;
}

export async function exportLog() {
  const { tabID: currentTabId } = await getCurrentTab();
  if (currentTabId) {
    try {
      const r = await browser.tabs.sendMessage(currentTabId, { saveLog: null });
      if (r) {
        log.debug("exportLog succeed!");
      } else {
        log.error("exportLog failed!", currentTabId);
      }
    } catch (error) {
      log.error("exportLog failed!", currentTabId, error);
    }
  }

  await callBackgroud("saveLog", null);
}
