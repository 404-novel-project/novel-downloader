import { createApp, provide, reactive, ref } from "vue";
import { debug } from "../debug";
import { UnsafeWindow } from "../global";
import { deepcopy, sleep } from "../lib/misc";
import { log } from "../log";
import { Status } from "../main/main";
import { Chapter } from "../main/Chapter";
import { SaveOptions as globalSaveOptions } from "../save/options";
import {
  enableDebug,
  TxtDownload,
  EpubDownload,
  customDownload,
  concurrencyLimit,
  sleepTime,
  maxSleepTime
} from "../setting";
import FilterTab, {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";
import LogUI from "./LogUI";
import settingHtml from "./setting.html";
import settingCss from "./setting.less";
import TestUI from "./TestUI";
import { createEl, createStyle } from "../lib/dom";

declare const GM_setValue: (key: string, value: any) => void;
declare const GM_getValue: (key: string, defaultValue?: any) => any;

export const style = createStyle(settingCss);
export const el = createEl(`<div id="setting"></div>`);
export const vm = createApp({
  name: "nd-setting",
  components: { "filter-tab": FilterTab, "log-ui": LogUI, "test-ui": TestUI },
  setup() {
    interface Setting {
      enableDebug?: boolean;
      TxtDownload?: boolean;
      EpubDownload?: boolean;
      customDownload?: boolean;
      concurrencyLimit?: number;
      sleepTime?: number;
      maxSleepTime?: number;
      enableTestPage?: boolean;
      chooseSaveOption?: string;
      filterSetting?: filterSettingGlobal;
      currentTab: string;
    }

    const setting = reactive({} as Setting);
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
        key: "epub_space",
        value: "epub文档删除章节空行",
        options: {
          genChapterEpub: (contentXHTML) => {
            return contentXHTML.replaceAll("<p><br /></p>", "")
              .replaceAll("<p><br/></p>", "");
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

    // Initialize all settings from stored values
    setting.enableDebug = GM_getValue('enableDebug', enableDebug.value);
    enableDebug.value = setting.enableDebug ?? enableDebug.value;
    enableDebug.value ? log.setLevel("trace") : log.setLevel("info");
    if (enableDebug.value) {
      debug();
    }
    setting.TxtDownload = GM_getValue('TxtDownload', TxtDownload.value);
    TxtDownload.value = setting.TxtDownload ?? TxtDownload.value;
    setting.EpubDownload = GM_getValue('EpubDownload', EpubDownload.value);
    EpubDownload.value = setting.EpubDownload ?? EpubDownload.value;
    setting.customDownload = GM_getValue('customDownload', false);
    customDownload.value = setting.customDownload ?? customDownload.value;
    setting.concurrencyLimit = GM_getValue('concurrencyLimit', concurrencyLimit.value);
    concurrencyLimit.value = setting.concurrencyLimit ?? concurrencyLimit.value;
    setting.sleepTime = GM_getValue('sleepTime', sleepTime.value);
    sleepTime.value = setting.sleepTime ?? sleepTime.value;
    setting.maxSleepTime = GM_getValue('maxSleepTime', maxSleepTime.value);
    maxSleepTime.value = setting.maxSleepTime ?? maxSleepTime.value;
    setting.enableTestPage = GM_getValue('enableTestPage', false);
    setting.chooseSaveOption = GM_getValue('chooseSaveOption', 'null');
    setting.filterSetting = GM_getValue('filterSetting', undefined);
    setting.currentTab = GM_getValue('currentTab', 'tab-1');
    let isOverWriteSaveOptions = false;
    const curSaveOption = () => {
      const _s = saveOptions.find((s) => s.key === setting.chooseSaveOption);
      if (_s) {
        isOverWriteSaveOptions = true;
        return _s.options;
      } else {
        return saveOptions[0].options;
      }
    };
    if (isOverWriteSaveOptions)
      (unsafeWindow as UnsafeWindow).saveOptions = curSaveOption();
    const saveFilter = (filterSetting: filterSettingGlobal) => {
      setting.filterSetting = deepcopy(filterSetting);
      GM_setValue('filterSetting', setting.filterSetting);
    };
    const getFilterSetting = () => {
      if (setting.filterSetting) {
        return setting.filterSetting;
      } else {
        return;
      }
    };
    provide("getFilterSetting", getFilterSetting);

    const setConfig = (config: Setting) => {
      setEnableDebug();
      setTxtDownload();
      setEpubDownload();
      setCustomDownloadOption();
      setCustomSaveOption();
      setCustomFilter();
      saveAllSettings();

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

      function setTxtDownload() {
        if (typeof config.TxtDownload === "boolean") {
          TxtDownload.value = config.TxtDownload;
          log.info(`[Init]TxtDownload: ${TxtDownload.value}`);
        }
      }

      function setEpubDownload() {
        if (typeof config.EpubDownload === "boolean") {
          EpubDownload.value = config.EpubDownload;
          log.info(`[Init]EpubDownload: ${EpubDownload.value}`);
        }
      }
      function setCustomDownloadOption() {
        if (typeof config.customDownload === "boolean") {
          customDownload.value = config.customDownload;
          log.info(`[Init]customDownload: ${customDownload.value}`);
        } 
        if (typeof config.concurrencyLimit === "number") {
          concurrencyLimit.value = config.concurrencyLimit;
          log.info(`[Init]concurrencyLimit: ${concurrencyLimit.value}`);
        }
        if (typeof config.sleepTime === "number") {
          sleepTime.value = config.sleepTime;
          log.info(`[Init]sleepTime: ${sleepTime.value}`);
        }
        if (typeof config.maxSleepTime === "number") {
          maxSleepTime.value = config.maxSleepTime;
          log.info(`[Init]maxSleepTime: ${maxSleepTime.value}`);
        }
      }
      function setCustomSaveOption() {
        (unsafeWindow as UnsafeWindow).saveOptions = curSaveOption();
      }

      function setCustomFilter() {
        if (config.filterSetting) {
          if (config.filterSetting.filterType === "null") {
            (unsafeWindow as UnsafeWindow).chapterFilter = undefined;
          } else {
            const filterFunction = getFilterFunction(
              config.filterSetting.arg,
              config.filterSetting.functionBody
            );
            if (filterFunction) {
              (unsafeWindow as UnsafeWindow).chapterFilter = (
                chapter: Chapter
              ) => {
                if (chapter.status === Status.aborted) {
                  return false;
                }
                return filterFunction(chapter);
              };
            }
          }
        }
      }

      function saveAllSettings() {
        GM_setValue('enableDebug', config.enableDebug);
        GM_setValue('TxtDownload', config.TxtDownload);
        GM_setValue('EpubDownload', config.EpubDownload);
        GM_setValue('customDownload', config.customDownload);
        GM_setValue('concurrencyLimit', config.concurrencyLimit);
        GM_setValue('sleepTime', config.sleepTime);
        GM_setValue('maxSleepTime', config.maxSleepTime);
        GM_setValue('enableTestPage', config.enableTestPage);
        GM_setValue('chooseSaveOption', config.chooseSaveOption);
        GM_setValue('filterSetting', config.filterSetting);
        GM_setValue('currentTab', config.currentTab);
      }
    };

    const openStatus = ref("false");
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
