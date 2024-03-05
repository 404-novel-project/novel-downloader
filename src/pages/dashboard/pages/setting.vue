<!-- eslint-disable vue/multi-word-component-names -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template lang="html">
  <SettingValueTable :data="data" :allowEdit="true" />
</template>
<script setup lang="ts">
  import { settings } from "vendor/storage/settings";

  import SettingValueTable from "../components/SettingValueTable.vue";

  const data = settings.filter((s) => s.rule === "plugin");
</script>
<style lang="scss"></style>
