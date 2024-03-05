<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <Teleport to="body">
    <div v-if="store.progress.displayed" class="progress">
      <template v-if="store.progress.unknown">
        <div aria-busy="true" aria-describedby="progress-bar"></div>
        <progress id="progress-bar"></progress>
      </template>
      <template v-else>
        <progress
          id="progress-bar"
          :value="store.progress.percent"
          :title="store.progress.percent.toString()"
          max="100"
        >
          {{ store.progress.percent }}%
        </progress>
      </template>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
  import { useDownloadStore } from "./store";

  const store = useDownloadStore();
</script>
<style lang="css" scoped>
  .progress {
    position: fixed;
    bottom: max(5%, 80px);
    right: 8%;
    z-index: 2147483647;
  }

  progress {
    width: 160px;
  }
</style>
