import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";
import { createEl, createStyle } from "../lib/createEl";
import { deepcopy } from "../lib/misc";
import { log } from "../log";
import { saveOptions } from "../save/save";
import { newUnsafeWindow } from "../global";
import settingHtml from "./setting.html";
import settingCss from "./setting.css";
import FilterTab, { filterSetting, getFilterFunction } from "./FilterTab";
import { Chapter, Status } from "../main";

createStyle(settingCss);
export const el = createEl(`<div id="setting"></div>`);
export const vm = Vue.createApp({
  name: "nd-setting",
  components: { "filter-tab": FilterTab },
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
      currentTab: "tab-1",
    };
  },
  methods: {
    openSetting() {
      this.settingBackup = deepcopy(this.setting);
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
      if (keep === true) {
        this.settingBackup = deepcopy(this.setting);
      } else {
        this.setting = deepcopy(this.settingBackup);
      }
      if (this.openStatus === "true") {
        this.openStatus = "false";
      }
    },
    closeAndSaveSetting() {
      this.closeSetting(true);
      setTimeout(() => {
        setConfig(deepcopy(this.setting))
          .then(() =>
            log.info("[Init]自定义设置：" + JSON.stringify(this.setting))
          )
          .catch((error) => log.error(error));
      }, 20);
    },
    saveFilter(filterSetting: filterSetting) {
      this.setting["filterSetting"] = deepcopy(filterSetting);
    },
  },
  template: settingHtml,
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
  filterSetting?: filterSetting;
}
async function setConfig(setting: setting) {
  // 启用调试日志
  if (typeof setting.enableDebug === "boolean") {
    const { enableDebug } = await import("../setting");
    if (setting.enableDebug) {
      enableDebug.value = true;
      log.setLevel("trace");
    } else {
      enableDebug.value = false;
      log.setLevel("info");
    }
  }

  // 自定义保存参数
  if (setting.chooseSaveOption && setting.chooseSaveOption !== "null") {
    (<newUnsafeWindow>unsafeWindow).saveOptions = saveOptionMap[
      setting.chooseSaveOption
    ] as saveOptions;
  }

  // 自定义筛选函数
  if (setting.filterSetting && setting.filterSetting.filterType !== "null") {
    if (
      typeof setting.filterSetting.arg === "string" &&
      setting.filterSetting.functionBody
    ) {
      const filterFunction = getFilterFunction(
        setting.filterSetting.arg,
        setting.filterSetting.functionBody
      );
      if (filterFunction) {
        const chapterFilter = (chapter: Chapter) => {
          if (chapter.status == Status.aborted) {
            return false;
          }
          return filterFunction(chapter);
        };
        (unsafeWindow as newUnsafeWindow).chapterFilter = chapterFilter;
      }
    }
  } else if (
    setting.filterSetting &&
    setting.filterSetting.filterType === "null"
  ) {
    (unsafeWindow as newUnsafeWindow).chapterFilter = undefined;
  }
}
