import { jjwxcFontTables, jjwxcFontTable } from "./jjwxcFontTables";
import { enableJjwxcRemoteFont } from "../../rules";
import { log } from "../../log";

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
  log.info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
  const resp = await fetch(url);
  if (resp.status === 200) {
    log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
    return (await resp.json()) as jjwxcFontTable;
  } else {
    log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
    return undefined;
  }
}
