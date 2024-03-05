<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <ButtonItem @download-click="downloadClick" @setting-click="settingClick" />
  <ProgressBar />
  <OverLay></OverLay>
</template>
<script setup lang="ts">
  import log from "loglevel";

  import ButtonItem from "./ButtonItem.vue";
  import OverLay from "./OverLay.vue";
  import ProgressBar from "./ProgressBar.vue";
  import { useDownloadStore } from "./store";

  const store = useDownloadStore();

  async function downloadClick() {
    if (store.button.working) {
      log.info("重复点击开始按钮");
      return;
    }

    await store.createTask();
    store.registerUpdateHandler();
    store.start(document.location.href, {});
  }
  function settingClick() {
    store.overlay.displayed = true;
  }
</script>
<style lang="css" scoped></style>
