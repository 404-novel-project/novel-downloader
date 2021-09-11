import { log } from "./log";
import { _GM_deleteValue, _GM_getValue, _GM_setValue } from "./lib/GM";

const statKeyName = "novel-downloader-22932304826849026";
const domain = document.location.hostname;
const _data = _GM_getValue(statKeyName);
interface statData {
  success: {
    [domain: string]: number;
  };
  failed: {
    [domain: string]: number;
  };
}
let statData: statData;
if (_data) {
  statData = JSON.parse(_data);
} else {
  statData = { success: {}, failed: {} };
}

const saveData = () => {
  const dataJSON = JSON.stringify(statData);
  if (
    _GM_setValue === null ||
    _GM_getValue === null ||
    _GM_deleteValue === null
  ) {
    throw new Error("未发现 GM value 相关 API");
  }
  _GM_setValue(statKeyName, dataJSON);
  return statData;
};

const dataPlus = (key: keyof statData) => {
  const tmpData = statData[key];
  if (tmpData[domain]) {
    tmpData[domain] = tmpData[domain] + 1;
  } else {
    tmpData[domain] = 1;
  }
  return saveData();
};

export const successPlus = () => {
  return dataPlus("success");
};

export const failedPlus = () => {
  return dataPlus("failed");
};

export const printStat = () => {
  log.info("[stat]小说下载器脚本运行情况统计：");
  log.info(statData);
  for (const k in statData) {
    log.info(`[stat]${k}:`);
    const subData = statData[k as keyof statData];
    for (const j in subData) {
      log.info(`  [stat]${j}: ${subData[j]}`);
    }
  }
};

export const resetStat = () => {
  statData = { success: {}, failed: {} };
  return saveData();
};
