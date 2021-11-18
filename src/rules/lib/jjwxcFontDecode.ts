import { get, set, update } from "idb-keyval";
import { enableJjwxcRemoteFont } from "../../setting";
import { log } from "../../log";

export async function replaceJjwxcCharacter(
  fontName: string,
  inputText: string
) {
  let outputText = inputText;
  const jjwxcFontTable = await getJjwxcFontTable(fontName);
  if (jjwxcFontTable) {
    for (const jjwxcCharacter in jjwxcFontTable) {
      if (
        Object.prototype.hasOwnProperty.call(jjwxcFontTable, jjwxcCharacter)
      ) {
        const normalCharacter = jjwxcFontTable[jjwxcCharacter];
        outputText = outputText.replaceAll(jjwxcCharacter, normalCharacter);
      }
    }
    outputText = outputText.replace(/\u200c/g, "");
  }
  return outputText;
}

async function getJjwxcFontTable(fontName: string) {
  const jjwxcFontTables = await getJjwxcFontTables();
  const jjwxcFontTableLocal = jjwxcFontTables[fontName];
  if (jjwxcFontTableLocal) {
    return jjwxcFontTableLocal;
  } else if (enableJjwxcRemoteFont) {
    return await fetchRemoteFont(fontName);
  } else {
    return undefined;
  }
}

async function fetchRemoteFont(fontName: string) {
  const url = `https://jjwxc.bgme.bid/${fontName}.json`;
  try {
    log.info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
    const resp = await fetch(url);
    if (resp.status === 200) {
      log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
      return (await resp.json()) as JjwxcFontTable;
    } else {
      log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
      return undefined;
    }
  } catch (error) {
    log.error(error);
    log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
    return undefined;
  }
}

interface JjwxcFontTable {
  [index: string]: string;
}
interface JjwxcFontTables {
  [index: string]: JjwxcFontTable;
}
async function getJjwxcFontTables(): Promise<JjwxcFontTables> {
  const JjwxcFontTablesKeyName = "novel-downloader-jjwxcFontTables";
  const JjwxcFontTablesExpiresKeyName =
    "novel-downloader-jjwxcFontTables__expires__";
  const JjwxcFontTablesUrl =
    "https://cdn.jsdelivr.net/gh/yingziwu/jjwxcFontTables@gh-pages/bundle.json";

  async function fetchAndSave() {
    try {
      log.info("[jjwxc-font]开始下载字体对照表打包文件。");
      const resp = await fetch(JjwxcFontTablesUrl);
      _jjwxcFontTables = await resp.json();
      if (_jjwxcFontTables) {
        if (await get(JjwxcFontTablesKeyName)) {
          await update(JjwxcFontTablesKeyName, (val) => _jjwxcFontTables);
        } else {
          await set(JjwxcFontTablesKeyName, _jjwxcFontTables);
        }
        if (await get(JjwxcFontTablesExpiresKeyName)) {
          await update(
            JjwxcFontTablesExpiresKeyName,
            (val) => Date.now() + 1000 * 86400
          );
        } else {
          await set(JjwxcFontTablesExpiresKeyName, Date.now() + 1000 * 86400);
        }
        return _jjwxcFontTables;
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  }

  let _jjwxcFontTables: undefined | JjwxcFontTables = await get(
    JjwxcFontTablesKeyName
  );
  if (_jjwxcFontTables) {
    if (
      (await get(JjwxcFontTablesExpiresKeyName)) &&
      (await get(JjwxcFontTablesExpiresKeyName)) > Date.now()
    ) {
      return _jjwxcFontTables;
    } else {
      return await fetchAndSave();
    }
  } else {
    return await fetchAndSave();
  }
}
