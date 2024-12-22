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
  // const url = `https://jjwxc.bgme.bid/api/${fontName}/table`;
  const url = `https://cdn.jsdelivr.net/gh/404-novel-project/jinjiang_font_tables@master/${fontName}.woff2.json`;
  const fontlink = `https://static.jjwxc.net/tmp/fonts/${fontName}.woff2?h=my.jjwxc.net`
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
        log.error(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败,请前往https://github.com/404-novel-project/jinjiang_font_tables 提交字体链接, ${fontlink}`);
        return undefined;
      }
    }
    if (resp.ok) {
      log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
      log.debug(`[jjwxc-font]如果你认为字体对应有错误,请前往https://github.com/404-novel-project/jinjiang_font_tables 重新提交字体链接, ${fontlink}`);
      return (await resp.json()) as JjwxcFontTable;
    } else {
      retry--;
      if (retry > 0) {
        await sleep(5000);
      } else {
        log.error(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败,请前往https://github.com/404-novel-project/jinjiang_font_tables 提交字体链接, ${fontlink}`);
        return undefined;
      }
    }
  }
}

interface JjwxcFontTable {
  [index: string]: string;
}
