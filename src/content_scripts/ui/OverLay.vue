<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <Teleport to="body">
    <template v-if="store.overlay.displayed">
      <div class="overlay"></div>
      <div class="outter">
        <div class="inner">
          <button class="close" @click="closeButtonClick">✖</button>
          <div>
            <slot>Fallback content</slot>
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>
<script setup lang="ts">
  import log from "loglevel";

  import { useDownloadStore } from "./store";

  const store = useDownloadStore();

  function closeButtonClick() {
    log.info("OverLay close button clicked!");
    store.overlay.displayed = false;
  }
</script>
<style lang="css" scoped>
  .overlay {
    opacity: 0.75;
    position: fixed;
    z-index: 100000;
    top: -50%;
    left: -50%;
    height: 200%;
    width: 200%;
    background-color: black;
  }

  .outter {
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner {
    opacity: 1;
    position: fixed;
    z-index: 200000;

    width: min(750px, 100%);
    min-height: max(65%, 640px);

    margin: auto;

    padding: 2em;
    background-color: #fdfdff;
    border-radius: 0.5em;
    box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);
  }

  @media (max-width: 700px) {
    .inner {
      margin: 0;
      width: 90%;
      padding: 10px;
    }
  }

  @media (max-height: 820px) {
    .inner {
      min-height: 80%;
    }
  }

  button.close {
    position: absolute;
    right: 0;
    top: 0;

    background-color: #fdfdff;
    color: black;

    user-select: none;
    cursor: pointer;

    border: none;
    border-radius: 0.5em;

    white-space: nowrap;
  }
</style>
