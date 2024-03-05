<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

<template lang="html">
  <el-table :data="filterData" stripe class="setting-table">
    <el-table-column
      :label="
        browser.i18n.getMessage('pages_dashboard_components_SettingValueTable_columnHeader_area')
      "
      prop="area"
      width="80"
    />
    <el-table-column
      :label="
        browser.i18n.getMessage(
          'pages_dashboard_components_SettingValueTable_columnHeader_namespace',
        )
      "
      prop="namespace"
      width="180"
    />
    <el-table-column
      :label="
        browser.i18n.getMessage('pages_dashboard_components_SettingValueTable_columnHeader_key')
      "
      prop="key"
      width="180"
    />
    <el-table-column
      :label="
        browser.i18n.getMessage(
          'pages_dashboard_components_SettingValueTable_columnHeader_description',
        )
      "
      prop="description"
      width="350"
    />
    <el-table-column
      :label="
        browser.i18n.getMessage('pages_dashboard_components_SettingValueTable_columnHeader_value')
      "
    >
      <template #default="scope">
        <pre
          v-if="scope.row.type === 'object'"
          v-html="
            computed(() => JSON.stringify(scope.row.value, undefined, 2).replaceAll('\n', '<br>'))
              .value
          "
          class="object"
        ></pre>

        <template v-else>
          <template v-if="scope.row.isEditing">
            <el-input v-model="scope.row.value" v-if="scope.row.type === 'string'" />
            <el-input-number
              v-model="scope.row.value"
              v-else-if="['number', 'bigint'].includes(scope.row.type)"
            />
            <template v-else-if="scope.row.type === 'boolean'">
              {{ scope.row.value }}
            </template>
          </template>

          <template v-else>
            {{ scope.row.value }}
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column align="right" width="200">
      <template #header>
        <el-input
          v-model="search"
          :placeholder="
            browser.i18n.getMessage(
              'pages_dashboard_components_SettingValueTable_columnHeader_search_placeholder',
            )
          "
        />
      </template>
      <template #default="scope">
        <template v-if="scope.row.type === 'boolean'">
          <el-button
            :icon="Switch"
            :title="
              browser.i18n.getMessage(
                'pages_dashboard_components_SettingValueTable_scope_toggle_button',
              )
            "
            @click="clickToggle(scope.row)"
          />
        </template>
        <template v-else-if="scope.row.type === 'object'"> </template>
        <template v-else>
          <template v-if="allowEdit">
            <el-button
              :icon="Edit"
              v-if="!scope.row.isEditing"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_components_SettingValueTable_scope_edit_button',
                )
              "
              @click="clickEdit(scope.row)"
            />
            <template v-else>
              <el-button
                :icon="CloseBold"
                :title="
                  browser.i18n.getMessage(
                    'pages_dashboard_components_SettingValueTable_scope_dontSave_button',
                  )
                "
                @click="clickDontSave(scope.row)"
              />
              <el-button
                :icon="Select"
                :title="
                  browser.i18n.getMessage(
                    'pages_dashboard_components_SettingValueTable_scope_save_button',
                  )
                "
                @click="clickSave(scope.row)"
              />
            </template>
          </template>
        </template>

        <template v-if="!scope.row.isEditing && scope.row.canUndo">
          <el-button
            :title="
              browser.i18n.getMessage(
                'pages_dashboard_components_SettingValueTable_scope_reset_button',
              )
            "
            @click="clickReset(scope.row)"
          >
            <el-icon><img src="/assets/undo.svg" /></el-icon>
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
  import { Edit, Switch, CloseBold, Select } from "@element-plus/icons-vue";
  import { watchDebounced } from "@vueuse/core";
  import { ref, reactive, onMounted, computed } from "vue";
  import * as browser from "webextension-polyfill";

  import storage from "vendor/storage";
  import { deepcopy } from "vendor/utils";

  import type { settingValue } from "vendor/storage/settings";

  const props = defineProps({
    data: Array<settingValue>,
    allowEdit: Boolean,
  });
  const filterData: settingValueWork[] = reactive([]);
  const search = ref("");

  interface settingValueWork extends Omit<settingValue, "value"> {
    defaultValue: string | number | bigint | boolean | object;
    oldValue: string | number | bigint | boolean | object;
    value: string | number | bigint | boolean | object;
    isEditing: boolean;
    canUndo: boolean;
  }
  async function getSettingValueWorks() {
    const data = props.data;
    if (data) {
      return await Promise.all(
        data.map(async (d) => {
          const dc = deepcopy(d) as settingValueWork;
          dc.defaultValue = dc.value;
          // @ts-expect-error Element implicitly has an 'any' type
          dc.value = await storage[dc.area][dc.namespace][dc.key];
          dc.isEditing = false;
          if (dc.type !== "object") {
            dc.canUndo = dc.defaultValue !== dc.value;
          } else {
            dc.canUndo = JSON.stringify(dc.defaultValue) !== JSON.stringify(dc.value);
          }
          return dc;
        }),
      );
    }
  }

  async function clickToggle(row: settingValueWork) {
    row.value = !row.value;
    // @ts-expect-error Element implicitly has an 'any' type
    storage[row.area][row.namespace][row.key] = row.value;
    await updateFilterData();
  }

  function clickEdit(row: settingValueWork) {
    row.oldValue = row.value;
    row.isEditing = true;
  }
  function clickDontSave(row: settingValueWork) {
    row.isEditing = false;
    row.value = row.oldValue;
    row.oldValue = "";
  }
  async function clickSave(row: settingValueWork) {
    row.isEditing = false;
    row.oldValue = "";
    // @ts-expect-error Element implicitly has an 'any' type
    storage[row.area][row.namespace][row.key] = row.value;
    await updateFilterData();
  }

  async function clickReset(row: settingValueWork) {
    row.value = row.defaultValue;
    // @ts-expect-error Element implicitly has an 'any' type
    storage[row.area][row.namespace][row.key] = row.defaultValue;
    await updateFilterData();
  }

  async function updateFilterData() {
    filterData.splice(0, Infinity);

    (await getSettingValueWorks())?.forEach((d) => {
      if (d.hidden) {
        return;
      }
      if (search.value !== "") {
        if (
          d.key.includes(search.value) ||
          d.namespace.includes(search.value) ||
          d.description.includes(search.value)
        ) {
          filterData.push(d);
        }
      } else {
        filterData.push(d);
      }
    });
  }

  onMounted(async () => {
    updateFilterData();
  });
  watchDebounced(
    search,
    () => {
      updateFilterData();
    },
    {
      debounce: 500,
      maxWait: 1000,
    },
  );
</script>
<style lang="scss">
  .setting-table {
    width: 100%;
  }
  pre.object {
    overflow-x: scroll;
  }
</style>
