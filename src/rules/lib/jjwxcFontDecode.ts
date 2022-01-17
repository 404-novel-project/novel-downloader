import { sleep } from "../../lib/misc";
import { log } from "../../log";
import { enableJjwxcRemoteFont, retryLimit } from "../../setting";

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
  const jjwxcFontTableLocal = false;
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
  log.info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
  let retry = retryLimit;
  while (retry > 0) {
    let resp;
    try {
      resp = await fetch(url);
    } catch (error) {
      log.error(error);
      retry--;
      if (retry > 0) {
        await sleep(5000);
        continue;
      } else {
        log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
        return undefined;
      }
    }
    if (resp.ok) {
      log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
      return (await resp.json()) as JjwxcFontTable;
    } else {
      retry--;
      if (retry > 0) {
        await sleep(5000);
      } else {
        log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
        return undefined;
      }
    }
  }
}

interface JjwxcFontTable {
  [index: string]: string;
}
