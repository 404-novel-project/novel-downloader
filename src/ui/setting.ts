import { createEl } from "../lib/createEl";

import { saveOptions } from "../save/save";
import { newUnsafeWindow } from "../global";

import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";
import { log } from "../log";

export const el = createEl(`<div>
<nd-dialog dialog-title="设置" v-bind:status="openStatus" v-if="openStatus === 'true'">
<div class="nd-setting">
    <div class="nd-setting-body">
        <div>
            <input type="checkbox" id="debug" v-model="setting.enableDebug" />
            <label for="debug">启用调式模式。（输出更详细日志）</label>    
        </div>
        <hr>
        <div>
            <h3>自定义保存参数</h3>
            <ul>
            <li v-for="item of saveOptions">
                <input type="radio" v-bind:id="item.key" v-bind:value="item.key" v-model="setting.chooseSaveOption">
                <label v-bind:for="item.key">{{ item.value }}</label>
            </li>
        </div>
    </div>
    <div class="nd-setting-footer" style="text-align: center">
        <button v-on:click="closeAndSaveSetting">Save</button>
        <button v-on:click="closeSetting">Cancel</button>
    </div>
</div>
</nd-dialog>
</div>`);

export const vm = Vue.createApp({
  data() {
    return {
      openStatus: "false",
      saveOptions: [
        { key: "null", value: "不使用自定义保存参数" },
        { key: "chapter_name", value: "将章节名称格式修改为 第xx章 xxxx" },
        { key: "txt_space", value: "txt文档每个自然段前加两个空格" },
        { key: "reverse_chapters", value: "保存章节时倒序排列" },
      ],
      setting: Vue.reactive({}),
      settingBackup: {},
    };
  },
  methods: {
    openSetting() {
      this.settingBackup = JSON.parse(JSON.stringify(this.setting));
      if (this.openStatus === "true") {
        this.openStatus = "false";
        setTimeout(() => {
          this.openStatus = "true";
        }, 0);
      } else {
        this.openStatus = "true";
      }
    },
    closeSetting(keep: PointerEvent | boolean) {
      if (this.openStatus === "true") {
        this.openStatus = "false";
      }
      if (typeof keep === "object" || keep === false) {
        this.setting = JSON.parse(JSON.stringify(this.settingBackup));
      }
    },
    closeAndSaveSetting() {
      this.closeSetting(true);
      setConfig(this.setting)
        .then(() =>
          log.info("[Init]自定义设置：" + JSON.stringify(this.setting))
        )
        .catch((error) => log.error(error));
    },
  },
}).mount(el);

interface saveOptionMap {
  [index: string]: saveOptions | undefined;
}
const saveOptionMap: saveOptionMap = {
  null: undefined,
  chapter_name: {
    getchapterName: (chapter) => {
      if (chapter.chapterName) {
        return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
      } else {
        return `第${chapter.chapterNumber.toString()}章`;
      }
    },
  },
  txt_space: {
    genChapterText: (chapterName, contentText) => {
      contentText = contentText
        .split("\n")
        .map((line) => {
          if (line.trim() === "") {
            return line;
          } else {
            return line.replace(/^/, "    ");
          }
        })
        .join("\n");
      return `## ${chapterName}\n\n${contentText}\n\n`;
    },
  },
  reverse_chapters: {
    chapterSort: (a, b) => {
      if (a.chapterNumber > b.chapterNumber) {
        return -1;
      }
      if (a.chapterNumber === b.chapterNumber) {
        return 0;
      }
      if (a.chapterNumber < b.chapterNumber) {
        return 1;
      }
      return 0;
    },
  },
};
interface setting {
  enableDebug?: boolean;
  chooseSaveOption?: keyof saveOptionMap;
}
async function setConfig(setting: setting) {
  if (setting.enableDebug) {
    const { changeEnableDebug, enableDebug } = await import("../setting");
    if (enableDebug === false) {
      changeEnableDebug();
    }
  }
  if (setting.chooseSaveOption && setting.chooseSaveOption !== "null") {
    (<newUnsafeWindow>unsafeWindow).saveOptions = saveOptionMap[
      setting.chooseSaveOption
    ] as saveOptions;
  }
}
