<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <Teleport to="body">
    <div :class="{ button: true, dark: store.darkMode }" v-if="store.button.displayed || false">
      <button class="download" @click="downloadClick">
        <img :src="dIcon" alt="download" class="download" />
      </button>
      <button class="setting" @click="settingClick">
        <img :src="settingIcon" alt="setting" class="setting" />
      </button>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
  import log from "loglevel";
  import { computed } from "vue";

  import settingIcon from "assets/content_scripts/setting.png";
  import startIcon from "assets/content_scripts/start.png";
  import workingIcon from "assets/content_scripts/working.png";

  import { useDownloadStore } from "./store";

  const store = useDownloadStore();

  const dIcon = computed(() => {
    if (store.button.working) {
      return workingIcon;
    } else {
      return startIcon;
    }
  });

  const emit = defineEmits(["download-click", "setting-click"]);

  function downloadClick() {
    log.info("Download button clicked!");
    emit("download-click");
  }
  function settingClick() {
    log.info("Setting button clicked!");
    emit("setting-click");
  }
</script>
<style lang="css" scoped>
  div.button {
    position: fixed;
    top: 10%;
    right: 5%;
    z-index: 10000;
  }

  button {
    border-style: none;
    text-align: center;
    vertical-align: baseline;
    background-color: rgba(128, 128, 128, 0.2);
    padding: 3px;
    border-radius: 12px;
    min-width: auto;
    min-height: auto;
  }

  img.download {
    height: 2em;
  }

  img.setting {
    height: 1em;
  }

  @media (prefers-color-scheme: dark) {
    .button.dark {
      filter: invert(0.9);
    }
  }
</style>
