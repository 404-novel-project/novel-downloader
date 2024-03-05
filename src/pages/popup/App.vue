<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <el-row class="header some-block">
    <el-image src="/assets/icon.svg" class="icon" />
    <h3 class="title">{{ extensionName }}</h3>
  </el-row>

  <el-divider border-style="dashed" class="split" />

  <div class="main">
    <el-row class="some-block" v-for="(item, index) in switchItemList" :key="index">
      <el-col :span="18">
        <h3>{{ item.text }}</h3>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="item.value.value" @change="item.onChange" />
      </el-col>
    </el-row>

    <template v-for="(item, index) in buttonItemList">
      <el-row class="some-block" v-if="item.if.value" :key="index">
        <el-col :span="18">
          <h3>{{ item.text }}</h3>
        </el-col>
        <el-col :span="6">
          <el-button :icon="item.icon" @click="item.click" link />
        </el-col>
      </el-row>
    </template>

    <el-divider border-style="double" class="split" />

    <el-row class="some-block">
      <el-col :span="18">
        <h3>{{ browser.i18n.getMessage("pages_popup_ui_link_options") }}</h3>
      </el-col>
      <el-col :span="6">
        <el-button :icon="Setting" tag="a" :href="dashboardUrl" target="_blank" link></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { Setting, Refresh, Download, Upload, Document } from "@element-plus/icons-vue";
  import { useDark } from "@vueuse/core";
  import log from "loglevel";
  import { ref, onMounted, computed } from "vue";
  import * as browser from "webextension-polyfill";

  import storage from "vendor/storage";

  import { isCanExportLog, exportLog } from "./log";

  import type { Ref, Component } from "vue";

  import "element-plus/theme-chalk/dark/css-vars.css";
  useDark({ storageKey: null });

  const extensionName = browser.i18n.getMessage("extensionName");

  const enable = ref(false);
  const enableDebug = ref(false);
  const enableNotify = ref(false);

  const canExportLog = ref(false);

  interface switchItem {
    text: string;
    value: Ref<boolean>;
    onChange: (input: boolean) => void;
  }
  const switchItemList: switchItem[] = [
    {
      text: browser.i18n.getMessage("pages_popup_ui_switch_enable"),
      value: enable,
      onChange: onChangeEnable,
    },
    {
      text: browser.i18n.getMessage("pages_popup_ui_switch_enableNotify"),
      value: enableNotify,
      onChange: onChangeEnableNotify,
    },
    {
      text: browser.i18n.getMessage("pages_popup_ui_switch_enableDebug"),
      value: enableDebug,
      onChange: onChangeEnableDebug,
    },
  ];

  interface buttonItem {
    if: Ref<boolean>;
    text: string;
    icon: Component;
    click: () => void;
  }
  const buttonItemList: buttonItem[] = [
    {
      if: computed(() => enableDebug.value && canExportLog.value),
      text: browser.i18n.getMessage("pages_popup_ui_button_exportLog"),
      icon: Document,
      click: exportLog,
    },
    {
      if: enableDebug,
      text: browser.i18n.getMessage("pages_popup_ui_button_reload"),
      icon: Refresh,
      click: reload,
    },
    {
      if: enableDebug,
      text: browser.i18n.getMessage("pages_popup_ui_button_exportCookies"),
      icon: Download,
      click: exportCookies,
    },
    {
      if: enableDebug,
      text: browser.i18n.getMessage("pages_popup_ui_button_importCookies"),
      icon: Upload,
      click: importCookies,
    },
  ];

  const hostPermissions: browser.Permissions.Permissions = { origins: ["<all_urls>"] };
  let hasHostPermissions = false;
  const notifyPermissions: browser.Permissions.Permissions = { permissions: ["notifications"] };

  async function requestPermissions(permissions: browser.Permissions.Permissions) {
    try {
      const requesting = await browser.permissions.request(permissions);
      log.info("Requested permissions succeed!", permissions, requesting);
    } catch (error) {
      log.error("Requested permissions failed!", permissions, error);
    }
  }

  async function removePermissions(permissions: browser.Permissions.Permissions) {
    try {
      const requesting = await browser.permissions.remove(permissions);
      log.info("Remove permissions succeed!", permissions, requesting);
    } catch (error) {
      log.error("Remove permissions failed!", permissions, error);
    }
  }

  async function onChangeEnable(input: boolean) {
    log.info(`onChangeEnable: ${input}`);

    if (input) {
      if (!hasHostPermissions) {
        await requestPermissions(hostPermissions);
      }
      hasHostPermissions = await browser.permissions.contains(hostPermissions);
      if (!hasHostPermissions) {
        enable.value = false;
      }
    }

    storage.local.global.enable = enable.value;
  }

  async function onChangeEnableNotify(input: boolean) {
    log.info(`onChangeEnableNotify: ${input}`);

    if (input) {
      await requestPermissions(notifyPermissions);
    } else {
      await removePermissions(notifyPermissions);
    }

    enableNotify.value = await browser.permissions.contains(notifyPermissions);
  }

  async function onChangeEnableDebug(input: boolean) {
    log.info(`onChangeEnableDebug: ${input}`);

    storage.local.global.enableDebug = enableDebug.value;
  }

  async function exportCookies() {
    if (!hasHostPermissions) {
      await requestPermissions(hostPermissions);
    }

    hasHostPermissions = await browser.permissions.contains(hostPermissions);
    if (hasHostPermissions) {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const tab = tabs[0];
      if (tab.url?.startsWith("http://") || tab.url?.startsWith("https://")) {
        const cookies = await import("vendor/cookies");
        await cookies.exportCookies(tab.url, tab.cookieStoreId);
      }
    }
  }

  async function importCookies() {
    await browser.tabs.create({
      url: browser.runtime.getURL("/pages/dashboard.html#/cookies"),
      active: true,
    });
  }

  function reload() {
    log.info("Reload Plugin...");
    browser.runtime.reload();
  }

  const dashboardUrl = browser.runtime.getURL("/pages/dashboard.html");

  onMounted(async () => {
    hasHostPermissions = await browser.permissions.contains(hostPermissions);
    enable.value = hasHostPermissions && (await storage.local.global.enable);
    enableNotify.value = await browser.permissions.contains(notifyPermissions);

    enableDebug.value = await storage.local.global.enableDebug;

    canExportLog.value = await isCanExportLog();
  });
</script>

<style lang="scss">
  body {
    width: 250px;
    min-height: auto;
  }

  body {
    margin: auto;
    padding: 0;
    font-size: 16px;
  }

  .header {
    margin-top: 0.8em;

    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      height: 2em;
    }

    .title {
      margin-left: 0.3em;
    }
  }

  .split {
    margin: 0.8em 0;
  }

  .main {
    margin-bottom: 0.6em;

    .some-block {
      margin-left: 0.8em;
    }
  }

  .some-block {
    h2,
    h3 {
      margin: 0;
    }

    .el-button > i {
      font-size: x-large;
    }
  }

  .some-block + .some-block {
    margin-top: 0.1em;
  }
</style>
