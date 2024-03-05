<!-- eslint-disable vue/multi-word-component-names -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template lang="html">
  <div></div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  onMounted(() => {
    router.replace("/overview");
  });
</script>
<style lang="scss"></style>
