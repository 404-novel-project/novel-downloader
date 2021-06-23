import { log } from "./log";
import { _GM_deleteValue, _GM_getValue, _GM_setValue } from "./lib";

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

function saveData() {
  const dataJSON = JSON.stringify(statData);
  _GM_setValue(statKeyName, dataJSON);
  return statData;
}

function dataPlus(key: keyof statData) {
  const tmpData = statData[key];
  if (tmpData[domain]) {
    tmpData[domain] = tmpData[domain] + 1;
  } else {
    tmpData[domain] = 1;
  }
  return saveData();
}

export function successPlus() {
  return dataPlus("success");
}

export function failedPlus() {
  return dataPlus("failed");
}

export function printStat() {
  log.info("[stat]小说下载器脚本运行情况统计：");
  log.info(statData);
}

export function resetStat() {
  statData = { success: {}, failed: {} };
  return saveData();
}
