<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <el-container>
    <el-aside id="aside" width="250px">
      <h3 class="title"><el-image src="/assets/icon.svg" class="icon" />{{ extensionName }}</h3>
      <div class="version">
        <el-text type="info" size="default">version: </el-text>
        <el-link type="info" :href="projectLink" target="_blank">
          {{ version }}
        </el-link>
      </div>

      <el-divider />

      <el-menu class="menu" :router="true">
        <template v-for="item in menuItems">
          <el-menu-item
            v-if="item.if.value"
            :index="item.index"
            :key="item.index"
            :disabled="item.disabled"
          >
            <el-icon>
              <component :is="item.icon" :key="item.index" />
            </el-icon>
            {{ item.text }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-main id="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
  import { Upload, Download, Timer, Setting, House, Files } from "@element-plus/icons-vue";
  import { useDark } from "@vueuse/core";
  import { onMounted, onUnmounted, ref } from "vue";
  import * as browser from "webextension-polyfill";

  import storage, { onChanged } from "vendor/storage";

  import type { HookFunction } from "vendor/storage";
  import type { Component, Ref } from "vue";

  import "element-plus/theme-chalk/dark/css-vars.css";
  useDark({ storageKey: null });

  const extensionName = browser.i18n.getMessage("extensionName");
  const projectLink = "https://github.com/404-novel-project/novel-downloader";
  const version = browser.runtime.getManifest().version;
  const enableDebug = ref(false);

  interface menuItem {
    index: string;
    text: string;
    disabled: boolean;
    if: Ref<boolean>;
    icon: Component;
  }
  const menuItems: menuItem[] = [
    {
      index: "overview",
      text: browser.i18n.getMessage("pages_dashboard_menu_overview"),
      disabled: false,
      if: ref(true),
      icon: House,
    },
    {
      index: "rules",
      text: browser.i18n.getMessage("pages_dashboard_menu_rules"),
      disabled: false,
      if: ref(true),
      icon: Files,
    },
    {
      index: "download",
      text: browser.i18n.getMessage("pages_dashboard_menu_download"),
      disabled: true,
      if: ref(true),
      icon: Download,
    },
    {
      index: "setting",
      text: browser.i18n.getMessage("pages_dashboard_menu_setting"),
      disabled: false,
      if: ref(true),
      icon: Setting,
    },
    {
      index: "resume",
      text: browser.i18n.getMessage("pages_dashboard_menu_resume"),
      disabled: true,
      if: ref(true),
      icon: Timer,
    },
    {
      index: "cookies",
      text: browser.i18n.getMessage("pages_dashboard_menu_cookies"),
      disabled: false,
      if: enableDebug,
      icon: Upload,
    },
  ];

  const enableDebugOnChangeHandle: HookFunction = ({ newValue }) => {
    enableDebug.value = newValue;
  };
  onMounted(async () => {
    enableDebug.value = await storage.local.global.enableDebug;
    onChanged("local", "global", "enableDebug").addListener(enableDebugOnChangeHandle);
  });
  onUnmounted(() => {
    onChanged("local", "global", "enableDebug").removeListener(enableDebugOnChangeHandle);
  });
</script>
<style lang="scss">
  html {
    overflow: hidden;
  }

  body {
    margin: 0;
  }

  #aside {
    height: 100vh;
    background-color: var(--el-color-primary-light-9);

    .icon {
      margin-right: 0.4em;
      height: 2.2em;
    }

    .title {
      margin-bottom: 0.2em;
      margin-left: 0.4em;
      margin-right: 0.4em;
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .version {
      text-align: center;
    }

    .menu {
      background-color: var(--el-color-primary-light-9);

      .el-menu-item {
        font-size: large;
        font-weight: bold;
      }
    }
  }

  #main {
    padding: 0;
  }
</style>
