import * as Vue from "vue";
import { debug } from "../debug";
import { NewUnsafeWindow } from "../global";
import { createEl, createStyle } from "../lib/createEl";
import { deepcopy, sleep } from "../lib/misc";
import { log } from "../log";
import { Chapter, Status } from "../main";
import { SaveOptions as globalSaveOptions } from "../save/save";
import { enableDebug } from "../setting";
import FilterTab, {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";
import settingCss from "./setting.css";
import settingHtml from "./setting.html";

export const style = createStyle(settingCss);
export const el = createEl(`<div id="setting"></div>`);
export const vm = Vue.createApp({
  name: "nd-setting",
  components: { "filter-tab": FilterTab },
  setup(props, context) {
    interface Setting {
      enableDebug?: boolean;
      chooseSaveOption?: string;
      filterSetting?: filterSettingGlobal;
    }
    const setting = Vue.reactive({} as Setting);
    let settingBackup = {};
    interface SaveOption {
      key: string;
      value: string;
      options: globalSaveOptions;
    }
    const saveOptions: SaveOption[] = [
      { key: "null", value: "不使用自定义保存参数", options: {} },
      {
        key: "chapter_name",
        value: "将章节名称格式修改为 第xx章 xxxx",
        options: {
          getchapterName: (chapter) => {
            if (chapter.chapterName) {
              return `第${chapter.chapterNumber.toString()}章 ${
                chapter.chapterName
              }`;
            } else {
              return `第${chapter.chapterNumber.toString()}章`;
            }
          },
        },
      },
      {
        key: "txt_space",
        value: "txt文档每个自然段前加两个空格",
        options: {
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
      },
      {
        key: "reverse_chapters",
        value: "保存章节时倒序排列",
        options: {
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
      },
    ];
    setting.enableDebug = enableDebug.value;
    setting.chooseSaveOption = "null";
    const curSaveOption = () => {
      const _s = saveOptions.find((s) => s.key === setting.chooseSaveOption);
      if (_s) {
        return _s.options;
      } else {
        return saveOptions[0].options;
      }
    };
    const saveFilter = (filterSetting: filterSettingGlobal) => {
      setting.filterSetting = deepcopy(filterSetting);
    };
    const getFilterSetting = () => {
      if (setting.filterSetting) {
        return setting.filterSetting;
      } else {
        return;
      }
    };
    Vue.provide("getFilterSetting", getFilterSetting);

    const setConfig = (config: Setting) => {
      setEnableDebug();
      setCustomSaveOption();
      setCustomFilter();

      function setEnableDebug() {
        if (typeof config.enableDebug === "boolean") {
          config.enableDebug ? log.setLevel("trace") : log.setLevel("info");
          enableDebug.value = config.enableDebug;
          if (config.enableDebug) {
            debug();
          }
          log.info(`[Init]enableDebug: ${enableDebug.value}`);
        }
      }
      function setCustomSaveOption() {
        (unsafeWindow as NewUnsafeWindow).saveOptions = curSaveOption();
      }
      function setCustomFilter() {
        if (config.filterSetting) {
          if (config.filterSetting.filterType === "null") {
            (unsafeWindow as NewUnsafeWindow).chapterFilter = undefined;
          } else {
            const filterFunction = getFilterFunction(
              config.filterSetting.arg,
              config.filterSetting.functionBody
            );
            if (filterFunction) {
              const chapterFilter = (chapter: Chapter) => {
                if (chapter.status === Status.aborted) {
                  return false;
                }
                return filterFunction(chapter);
              };
              (unsafeWindow as NewUnsafeWindow).chapterFilter = chapterFilter;
            }
          }
        }
      }
    };

    const openStatus = Vue.ref("false");
    const currentTab = Vue.ref("tab-1");
    const openSetting = () => {
      settingBackup = deepcopy(setting) as Setting;
      openStatus.value = "true";
    };
    const closeSetting = (keep: PointerEvent | boolean) => {
      if (keep === true) {
        settingBackup = deepcopy(setting);
      } else {
        Object.assign(setting, settingBackup);
      }
      openStatus.value = "false";
    };
    const closeAndSaveSetting = async () => {
      closeSetting(true);
      await sleep(30);
      setConfig(deepcopy(setting));
      log.info("[Init]自定义设置：" + JSON.stringify(setting));
    };

    return {
      openStatus,
      currentTab,
      openSetting,
      closeSetting,
      closeAndSaveSetting,
      saveFilter,
      setting,
      saveOptions,
    };
  },
  template: settingHtml,
}).mount(el);
