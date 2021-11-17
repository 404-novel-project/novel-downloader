import { log } from "./log";
import { _GM_deleteValue, _GM_getValue, _GM_setValue } from "./lib/GM";

const statKeyName = "novel-downloader-22932304826849026";
const domain = document.location.hostname;

interface statData {
  success: {
    [domain: string]: number;
  };
  failed: {
    [domain: string]: number;
  };
}

async function getStatData() {
  const _data = await _GM_getValue(statKeyName);
  let statData: statData;
  if (_data) {
    statData = JSON.parse(_data);
  } else {
    statData = { success: {}, failed: {} };
  }
  return statData;
}

const saveData = async (statData: statData) => {
  const dataJSON = JSON.stringify(statData);
  await _GM_setValue(statKeyName, dataJSON);
  return statData;
};

const dataPlus = async (key: keyof statData) => {
  const statData = await getStatData();
  const tmpData = statData[key];
  if (tmpData[domain]) {
    tmpData[domain] = tmpData[domain] + 1;
  } else {
    tmpData[domain] = 1;
  }
  return saveData(statData);
};

export const successPlus = () => {
  return dataPlus("success");
};

export const failedPlus = () => {
  return dataPlus("failed");
};

export const printStat = async () => {
  const statData = await getStatData();
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
  const statData = { success: {}, failed: {} };
  return saveData(statData);
};
