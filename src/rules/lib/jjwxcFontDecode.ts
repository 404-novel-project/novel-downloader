import { enableJjwxcRemoteFont } from "../../setting";
import { log } from "../../log";
import { newWindow } from "../../global";

export async function replaceJjwxcCharacter(
  fontName: string,
  inputText: string
) {
  let outputText = inputText;
  const jjwxcFontTable = await getJjwxcFontTable(fontName);
  if (jjwxcFontTable) {
    for (const jjwxcCharacter in jjwxcFontTable) {
      const normalCharacter = jjwxcFontTable[jjwxcCharacter];
      outputText = outputText.replaceAll(jjwxcCharacter, normalCharacter);
    }
    outputText = outputText.replaceAll("‌", "");
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
  // const url = `https://jjwxc.lo.bgme.me/${fontName}.json`;
  try {
    log.info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
    const resp = await fetch(url);
    if (resp.status === 200) {
      log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
      return (await resp.json()) as jjwxcFontTable;
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

interface jjwxcFontTable {
  [index: string]: string;
}
interface jjwxcFontTables {
  [index: string]: jjwxcFontTable;
}
async function getJjwxcFontTables(): Promise<jjwxcFontTables> {
  const JjwxcFontTablesKeyName = "novel-downloader-jjwxcFontTables";
  const JjwxcFontTablesUrl =
    "https://cdn.jsdelivr.net/gh/yingziwu/jjwxcFontTables@gh-pages/bundle.json";

  const storage = (window as newWindow & typeof globalThis).customStorage;
  let _jjwxcFontTables: undefined | jjwxcFontTables = storage.get(
    JjwxcFontTablesKeyName
  );
  if (_jjwxcFontTables) {
    return _jjwxcFontTables;
  } else {
    try {
      log.info("[jjwxc-font]开始下载字体对照表打包文件。");
      const resp = await fetch(JjwxcFontTablesUrl);
      _jjwxcFontTables = await resp.json();
      if (_jjwxcFontTables) {
        storage.set(JjwxcFontTablesKeyName, _jjwxcFontTables, 86400);
        return _jjwxcFontTables;
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  }
}
