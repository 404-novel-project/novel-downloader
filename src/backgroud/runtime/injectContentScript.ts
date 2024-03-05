// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import storage from "vendor/storage";

import { checkHostname } from "./rule";

export async function getTabIdUrlMap() {
  return await storage.session.global.tabIdUrlMap;
}

async function addTabToMap(tab: browser.Tabs.Tab) {
  if (tab.id && tab.url) {
    const tabIdUrlMap = await storage.session.global.tabIdUrlMap;
    tabIdUrlMap[tab.id.toString()] = tab.url;
    storage.session.global.tabIdUrlMap = tabIdUrlMap;
  }
}

async function removeTabFromMap(tabId: number) {
  const tabIdUrlMap = await storage.session.global.tabIdUrlMap;
  delete tabIdUrlMap[tabId.toString()];
  storage.session.global.tabIdUrlMap = tabIdUrlMap;
}

async function injectContentScript(tab: browser.Tabs.Tab) {
  if (tab.url?.startsWith("http://") || tab.url?.startsWith("https://")) {
    const { hostname } = new URL(tab.url);

    const enabled = await storage.local.global.enable;
    const needInject = enabled && (await checkHostname(hostname));
    if (needInject && tab.id) {
      try {
        const results = await browser.scripting.executeScript({
          files: ["content_scripts/bundle.js"],
          injectImmediately: true,
          target: {
            allFrames: false,
            tabId: tab.id,
          },
          world: "ISOLATED",
        });
        addTabToMap(tab);
        log.debug("injectContentScript:", tab, results);
      } catch (error) {
        log.error(error, tab);
      }
    }
  }
}

function onUpdated(
  tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  tab: browser.Tabs.Tab,
) {
  if (changeInfo.status === "loading") {
    injectContentScript(tab);
  }
}

async function onRemoved(tabId: number) {
  removeTabFromMap(tabId);
}

export function init() {
  browser.tabs.onUpdated.addListener(onUpdated);
  browser.tabs.onRemoved.addListener(onRemoved);
}
