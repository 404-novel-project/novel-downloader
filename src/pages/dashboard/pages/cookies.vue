<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template lang="html">
  <template v-if="!uploaded">
    <el-row>
      <el-col :span="8"></el-col>
      <el-col id="upload-cookies" :span="8">
        <div class="h"></div>
        <el-upload
          class="upload"
          drag
          action="#"
          accept=".json,application/json"
          :limit="1"
          :show-file-list="false"
          :before-upload="onUpload"
        >
          <el-icon><upload-filled /></el-icon>
          <h3>{{ browser.i18n.getMessage("pages_dashboard_page_upload_select") }}</h3>
        </el-upload>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </template>
  <template v-else>
    <el-container id="cookies-main">
      <el-main id="list-and-details">
        <el-row :gutter="20" class="row">
          <el-col id="domain-col" :span="7" class="col">
            <h3>{{ browser.i18n.getMessage("pages_dashboard_page_cookies_main_domain_col") }}</h3>
            <ul id="domain-list" class="list-group">
              <li
                v-for="kv in domainCountList"
                :key="kv[0]"
                :class="{
                  'list-group-item': true,
                  selected: computed(() => kv[0] === domainSelected).value,
                }"
                @click="domainSelected = kv[0]"
              >
                <el-text size="large">{{ kv[0] }}</el-text>
                <el-text size="large" class="badge">{{ kv[1] }}</el-text>
              </li>
            </ul>
          </el-col>
          <el-col id="cookies-col" :span="8" class="col">
            <h3>{{ browser.i18n.getMessage("pages_dashboard_page_cookies_main_cookies_col") }}</h3>
            <ul id="cookies-list" class="list-group">
              <li
                v-for="[name, value] in cookiesOnDomain"
                :key="name"
                :class="{
                  'list-group-item': true,
                  selected: computed(() => name === cookiesOnDomainSelected).value,
                }"
                @click="cookiesOnDomainSelected = name"
              >
                <el-text size="large" type="primary">{{ name }}: </el-text>
                <el-text>{{ value }}</el-text>
              </li>
              <li v-if="editable" class="add-cookie list-group-item" title="添加新 Cookie">
                <el-button :icon="Plus" @click="clickAddCookie" link size="large" />
              </li>
            </ul>
          </el-col>
          <el-col id="detail-col" :span="9" class="col">
            <h3>{{ browser.i18n.getMessage("pages_dashboard_page_cookies_main_detail_col") }}</h3>
            <el-form
              id="cookie-form"
              :model="cookieSelected"
              v-if="cookieSelected !== null"
              label-width="80px"
              label-suffix=":"
              label-position="right"
              :disabled="!editable"
            >
              <el-form-item label="domain">
                <el-input v-model="cookieSelected.domain" @input="formDomainInput" />
              </el-form-item>
              <el-form-item label="path">
                <el-input v-model="cookieSelected.path" />
              </el-form-item>
              <el-form-item label="name">
                <el-input v-model="cookieSelected.name" @input="formNameInput" />
              </el-form-item>
              <el-form-item label="value">
                <el-input v-model="cookieSelected.value" type="textarea" autosize />
              </el-form-item>
              <el-form-item label="isSession">
                <el-checkbox
                  v-model="cookieSelected.isSession"
                  @change="if (cookieSelected.isSession) cookieSelected.expires = null;"
                />
              </el-form-item>
              <el-form-item label="expires">
                <el-date-picker
                  v-model="cookieSelected.expires"
                  type="datetime"
                  :disabled="
                    computed(() => {
                      if (!editable) {
                        return true;
                      } else {
                        return cookieSelected && cookieSelected.isSession;
                      }
                    }).value
                  "
                />
              </el-form-item>
              <el-form-item label="httpOnly">
                <el-checkbox v-model="cookieSelected.httpOnly"></el-checkbox>
              </el-form-item>
              <el-form-item label="sameSite">
                <el-select v-model="cookieSelected.sameSite">
                  <el-option
                    v-for="v in ['None', 'Lax', 'Strict']"
                    :key="v"
                    :label="v"
                    :value="v"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="secure">
                <el-checkbox />
              </el-form-item>
              <el-form-item v-if="editable">
                <el-button
                  :title="
                    browser.i18n.getMessage(
                      'pages_dashboard_page_cookies_main_detail_col_delete_button',
                    )
                  "
                  :icon="Delete"
                  :value="cookieSelected.uuid"
                  @click="clickFormCookieDelete"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer id="footer">
        <el-row>
          <el-col :span="16"></el-col>
          <el-col :span="8">
            <el-button
              id="revert-button"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_page_cookies_main_detail_col_footer_revert_button',
                )
              "
              type="default"
              :icon="Close"
              v-if="editable"
              @click="clickRevert"
            />
            <el-button
              id="save-button"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_page_cookies_main_detail_col_footer_save_button',
                )
              "
              type="default"
              :icon="Check"
              v-if="editable"
              @click="clickSave"
            />
            <el-button
              id="enable-edit-button"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_page_cookies_main_detail_col_footer_enable_edit_button',
                )
              "
              type="default"
              :icon="Edit"
              v-if="!editable"
              @click="clickEnableEdit"
            />
            <el-button
              id="clean-file-button"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_page_cookies_main_detail_col_footer_clean_file_button',
                )
              "
              type="default"
              @click="clickClean"
              :icon="CircleClose"
              :disabled="editable"
            />
            <el-button
              id="import-button"
              :title="
                browser.i18n.getMessage(
                  'pages_dashboard_page_cookies_main_detail_col_footer_import_button',
                )
              "
              type="default"
              :icon="Upload"
              @click="clickImport"
              :disabled="editable"
            />
          </el-col>
        </el-row>
      </el-footer>
    </el-container>

    <Teleport to="body">
      <el-dialog
        v-model="cookieStoresSelectDialogVisible"
        id="cookieStores-dialog"
        :title="
          browser.i18n.getMessage(
            'pages_dashboard_page_cookies_main_teleport_cookieStores_dialog_title',
          )
        "
        width="25%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-radio-group v-model="cookieStoresSelected">
          <ul>
            <template v-for="item in cookieStores" :key="item.id">
              <li>
                <el-radio :label="item.id" size="large">
                  <el-text class="name" v-if="item.name !== undefined">{{ item.name }}</el-text>
                  <el-text class="id">{{ item.id }}</el-text></el-radio
                >
              </li>
            </template>
          </ul>
        </el-radio-group>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cookieStoresDialogCancel">{{
              browser.i18n.getMessage(
                "pages_dashboard_page_cookies_main_teleport_footer_cancel_button",
              )
            }}</el-button>
            <el-button type="primary" @click="cookieStoresDialogConfirm">
              {{
                browser.i18n.getMessage(
                  "pages_dashboard_page_cookies_main_teleport_footer_confirm_button",
                )
              }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </Teleport>
  </template>
</template>
<script setup lang="ts">
  import {
    UploadFilled,
    Plus,
    Close,
    Check,
    Edit,
    CircleClose,
    Upload,
    Delete,
  } from "@element-plus/icons-vue";
  import log from "loglevel";
  import { v4 as uuidv4 } from "uuid";
  import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
  import * as browser from "webextension-polyfill";

  import { importCookies } from "vendor/cookies";
  import { deepcopy } from "vendor/utils";

  import type { Cookie } from "vendor/cookies";

  const uploaded = ref(false);

  function onUpload(rawFile: File) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target) {
        const text = ev.target.result as string;
        try {
          const inputCookie: Cookie[] = JSON.parse(text);
          init(inputCookie);
          uploaded.value = true;
        } catch (error) {
          console.error(error, text);
        }
      }
    };
    reader.readAsText(rawFile);
    return false;
  }

  /* Cookies 导入部分逻辑 */
  interface cookieWork extends Omit<Cookie, "expires"> {
    expires: Date | null;
    isSession: boolean;
    uuid: string;
  }
  function cookieRawToWorkConvert(co: Cookie): cookieWork {
    if (co.expires !== "Session") {
      (co as unknown as cookieWork).expires = new Date(co.expires);
      (co as unknown as cookieWork).isSession = false;
    } else {
      (co as unknown as cookieWork).isSession = true;
      (co as unknown as cookieWork).expires = null;
    }
    (co as unknown as cookieWork).uuid = uuidv4();
    return co as unknown as cookieWork;
  }
  function cookieWorkToRawConvert(co: cookieWork): Cookie {
    if (co.isSession || co.expires === null) {
      (co as unknown as Cookie).expires = "Session";
    }
    if (co.expires instanceof Date) {
      (co as unknown as Cookie).expires = co.expires.toUTCString();
    }
    delete (co as Partial<cookieWork>).uuid;
    delete (co as Partial<cookieWork>).isSession;
    return co as unknown as Cookie;
  }

  const cookiesWork: cookieWork[] = reactive([]);
  const cookiesWorkMap: Map<string, cookieWork> = new Map();

  function updateCookiesWorkMap() {
    cookiesWorkMap.clear();
    cookiesWork.forEach((co) => cookiesWorkMap.set(co.uuid, co));
  }

  let cookiesWorkCopy = deepcopy(cookiesWork);
  const editable = ref(false);

  const domainCountList = computed(() => {
    const domainKeys = cookiesWork.map((co) => co.domain);
    const domainCountDict: Map<string, number> = new Map();
    for (const k of domainKeys) {
      const v = domainCountDict.get(k);
      if (typeof v !== "undefined") {
        domainCountDict.set(k, v + 1);
      } else {
        domainCountDict.set(k, 1);
      }
    }
    return [...domainCountDict.entries()];
  });
  const domainSelected = ref(domainCountList.value?.[0]?.[0] ?? "");

  const cookiesOnDomain = computed(() =>
    cookiesWork
      .filter((co) => co.domain === domainSelected.value)
      .map((co): [string, string] => [co.name, co.value]),
  );
  const cookiesOnDomainSelected = ref("");

  function getCookieSelectedUUID() {
    const cs = cookiesWork.filter(
      (co) => co.domain === domainSelected.value && co.name === cookiesOnDomainSelected.value,
    );
    if (cs.length === 1) {
      const id = cs[0].uuid;
      return id;
    } else {
      return null;
    }
  }
  const cookieSelected = computed({
    get: () => {
      const id = getCookieSelectedUUID();
      if (id) {
        return cookiesWorkMap.get(id) ?? null;
      } else {
        return null;
      }
    },
    set: (val) => {
      if (!editable.value) {
        return;
      }
      if (!val) {
        return;
      }
      const id = getCookieSelectedUUID();
      if (!id) {
        return;
      }
      const co = cookiesWorkMap.get(id);
      if (!co) {
        return;
      }
      Object.assign(co, val);
      domainSelected.value = co.domain;
      cookiesOnDomainSelected.value = co.name;
    },
  });

  function init(cos: Cookie[]) {
    const inputCookieCopy: cookieWork[] = deepcopy(cos).map(cookieRawToWorkConvert);
    cookiesWork.splice(0, Infinity);
    inputCookieCopy.forEach((co) => cookiesWork.push(co));
    updateCookiesWorkMap();
    domainSelected.value = domainCountList.value?.[0]?.[0] ?? "";
  }

  function clickAddCookie() {
    const id = uuidv4();
    const newCookie: cookieWork = {
      domain: domainSelected.value,
      path: "/",
      name: id,
      value: "",
      expires: null,
      isSession: true,
      httpOnly: false,
      sameSite: "None",
      secure: false,
      uuid: id,
    };
    cookiesWork.push(newCookie);
    cookiesOnDomainSelected.value = id;
  }

  function formDomainInput(value: string) {
    domainSelected.value = value;
  }

  function formNameInput(value: string) {
    cookiesOnDomainSelected.value = value;
  }

  function clickFormCookieDelete(ev: PointerEvent) {
    const target = ev.target as Element;
    const button = target.closest("button");
    const id = button?.value;
    if (id) {
      log.debug("delete cookie:", button, id, cookieSelected);
      const index = cookiesWork.findIndex((co) => co.uuid === id);
      if (index != -1) {
        cookiesWork.splice(index, 1);

        cookiesOnDomainSelected.value = "";
      }
    }
  }

  function clickRevert() {
    editable.value = false;

    cookiesWork.splice(0, Infinity);
    cookiesWorkCopy.forEach((co) => cookiesWork.push(co));
  }

  function clickSave() {
    editable.value = false;
  }

  function clickEnableEdit() {
    cookiesWorkCopy = deepcopy(cookiesWork);
    editable.value = true;
  }

  async function loadElMessage() {
    await import("element-plus/es/components/message/style/css");
    const { ElMessage } = await import("element-plus/es/components/message/index.mjs");
    return ElMessage;
  }

  async function clickClean(message = true) {
    const ElMessage = await loadElMessage();

    cookiesWork.splice(0, Infinity);
    uploaded.value = false;

    if (message) {
      ElMessage({
        message: browser.i18n.getMessage("pages_dashboard_page_cookies_main_ElMessage_clickClean"),
        type: "warning",
        center: true,
        showClose: true,
      });
    }
  }

  interface cookieStore {
    id: string;
    name?: string;
  }
  const cookieStoresSelectDialogVisible = ref(false);
  const cookieStores: cookieStore[] = reactive([]);
  const cookieStoresSelected = ref("");
  async function clickImport() {
    const cookiesNeedImport = deepcopy(cookiesWork).map(cookieWorkToRawConvert);

    cookieStores.splice(0, Infinity);

    try {
      const contexts = await browser.contextualIdentities.query({});
      contexts
        .map((ct) => ({ id: ct.cookieStoreId, name: ct.name }))
        .forEach((st) => cookieStores.push(st));

      const _cookieStoresId = (await browser.cookies.getAllCookieStores()).map((st) => st.id);
      _cookieStoresId
        .filter((sid) => {
          for (const st of cookieStores) {
            if (st.id === sid) {
              return false;
            }
          }
          return true;
        })
        .map((sid) => ({ id: sid }))
        .forEach((st) => cookieStores.push(st));
    } catch (error) {
      (await browser.cookies.getAllCookieStores())
        .map((st) => ({ id: st.id }))
        .forEach((st) => cookieStores.push(st));
    }

    if (cookieStores.length === 1) {
      const ElMessage = await loadElMessage();

      const cookieStoreID = cookieStores[0].id;
      const s = await importCookies(cookiesNeedImport, cookieStoreID);
      if (s) {
        clickClean(false);
        ElMessage({
          message: browser.i18n.getMessage(
            "pages_dashboard_page_cookies_main_ElMessage_importCookies_success",
          ),
          type: "success",
          center: true,
          showClose: true,
        });
      } else {
        ElMessage({
          message: browser.i18n.getMessage(
            "pages_dashboard_page_cookies_main_ElMessage_importCookies_error",
          ),
          type: "error",
          center: true,
          showClose: true,
        });
      }
    } else {
      cookieStoresSelectDialogVisible.value = true;
    }
  }

  async function cookieStoresDialogCancel() {
    const ElMessage = await loadElMessage();

    cookieStoresSelectDialogVisible.value = false;
    cookieStores.splice(0, Infinity);
    cookieStoresSelected.value = "";
    ElMessage({
      message: browser.i18n.getMessage("pages_dashboard_page_cookies_main_ElMessage_clickClean"),
      type: "warning",
      center: true,
      showClose: true,
    });
  }

  async function cookieStoresDialogConfirm() {
    const ElMessage = await loadElMessage();

    cookieStoresSelectDialogVisible.value = false;

    const cookiesNeedImport = deepcopy(cookiesWork).map(cookieWorkToRawConvert);
    const s = await importCookies(cookiesNeedImport, cookieStoresSelected.value);
    if (s) {
      clickClean(false);
      ElMessage({
        message: browser.i18n.getMessage(
          "pages_dashboard_page_cookies_main_ElMessage_importCookies_success",
        ),
        type: "success",
        center: true,
        showClose: true,
      });
    } else {
      ElMessage({
        message: browser.i18n.getMessage(
          "pages_dashboard_page_cookies_main_ElMessage_importCookies_error",
        ),
        type: "error",
        center: true,
        showClose: true,
      });
    }
    cookieStoresSelectDialogVisible.value = false;
    cookieStores.splice(0, Infinity);
    cookieStoresSelected.value = "";
  }

  watch(cookiesWork, () => {
    updateCookiesWorkMap();
  });

  function keydownListener(ev: KeyboardEvent) {
    if (["ArrowUp", "ArrowDown"].includes(ev.key) && uploaded.value) {
      log.debug("keydown:", ev.key);

      const cookiesOnDomainSelectedIdx = cookiesOnDomain.value.findIndex(
        ([name]) => name === cookiesOnDomainSelected.value,
      );
      let newCookiesOnDomainSelectedIdx = cookiesOnDomainSelectedIdx;

      if (ev.key === "ArrowUp") {
        newCookiesOnDomainSelectedIdx = cookiesOnDomainSelectedIdx - 1;
      } else if (ev.key === "ArrowDown") {
        newCookiesOnDomainSelectedIdx = cookiesOnDomainSelectedIdx + 1;
      }

      if (newCookiesOnDomainSelectedIdx < 0) {
        newCookiesOnDomainSelectedIdx = 0;
      } else if (newCookiesOnDomainSelectedIdx > cookiesOnDomain.value.length - 1) {
        newCookiesOnDomainSelectedIdx = cookiesOnDomain.value.length - 1;
      }
      cookiesOnDomainSelected.value = cookiesOnDomain.value[newCookiesOnDomainSelectedIdx][0];
    }
  }
  onMounted(() => {
    window.addEventListener("keydown", keydownListener);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", keydownListener);
  });
</script>
<style lang="scss">
  #cookies-main {
    --el-footer-height: 60px;
  }

  #upload-cookies {
    .h {
      height: 30vh;
    }

    .upload i {
      font-size: xx-large;
    }
  }

  #list-and-details {
    height: calc(100vh - var(--el-footer-height));

    > .row {
      height: 100%;
    }

    .col {
      height: 100%;
      overflow-y: auto;
    }
  }

  #cookies-list {
    .add-cookie {
      text-align: center;
    }
  }

  #cookieStores-dialog {
    .name {
      color: var(--el-color-primary-light-3);
      margin-right: 1em;
    }
  }

  .list-group {
    padding-left: 0em;
    margin-top: 1.3em;

    overflow: hidden;
    text-overflow: ellipsis;

    .list-group-item {
      display: block;
      padding: 0.3em 0.8em;

      border: 1px solid #ddd;

      cursor: pointer;

      .badge {
        float: right;
      }
    }

    .list-group-item.selected {
      background-color: var(--el-color-primary-light-5);
    }

    .list-group-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .list-group-item:last-child {
      margin-bottom: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }
</style>
