// noinspection NonAsciiCharacters,JSNonASCIINames

import { GmWindow } from "./global";
import { _GM_info } from "./lib/GM";
import { storageAvailable } from "./lib/localStorageExpired";
import { enableDebug } from "./setting";
import { fetchWithRetry, fetchWithTimeout } from "./lib/http";

function checkObjct(name: string) {
  const target = window[name as keyof Window];
  const targetLength = target.toString().length;
  const targetPrototype = target.prototype;
  const nativeFunctionRe =
    /function \w+\(\) {\n?(\s+)?\[native code]\n?(\s+)?}/;
  try {
    if (
      targetPrototype === undefined ||
      Boolean(target.toString().match(nativeFunctionRe))
    ) {
      return [true, targetLength].join(", ");
    }
  } catch {
    return [true, targetLength].join(", ");
  }
  return [false, targetLength].join(", ");
}

export function streamSupport() {
  return (
    typeof ReadableStream !== "undefined" &&
    typeof WritableStream !== "undefined" &&
    typeof TransformStream !== "undefined"
  );
}

export function mitmPageAvailability(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetchWithTimeout(url, {}, 2500)
      .then((resp) => resolve(true))
      .catch((error) => resolve(false));
  });
}

async function TM_4_14_bug_Detect() {
  if (
    _GM_info.scriptHandler === "Tampermonkey" &&
    _GM_info.version.startsWith("4.14")
  ) {
    const blob = new Blob(["test"]);
    const arrayBuffer = await blob.arrayBuffer();
    if (arrayBuffer === undefined) {
      alert(
        `检测到您当前使用的脚本管理器为 Tampermonkey 4.14。
Tampermonkey 4.14 因存在 Bug 将导致小说下载器脚本无法正常运行，详情可参见：https://github.com/Tampermonkey/tampermonkey/issues/1418 。
如您想继续使用小说下载器脚本，请您降级 Tampermonkey 版本，或使用 Violentmonkey 脚本管理器。
如果您不欲降级或更换脚本管理器，同时不想再看到本提示，您可以暂时禁用小说下载器脚本。`
      );
      throw new Error("Tampermonkey 4.14 Bug Detect");
    }
  }
}

export const environments = async () => {
  await TM_4_14_bug_Detect();
  return {
    当前时间: new Date().toISOString(),
    当前页URL: document.location.href,
    workerId: (window as GmWindow).workerId,
    当前页Referrer: document.referrer,
    浏览器UA: navigator.userAgent,
    浏览器语言: navigator.languages,
    设备运行平台: navigator.platform,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    设备内存: navigator.deviceMemory ?? "",
    CPU核心数: navigator.hardwareConcurrency,
    eval: checkObjct("eval"),
    fetch: checkObjct("fetch"),
    XMLHttpRequest: checkObjct("XMLHttpRequest"),
    streamSupport: streamSupport(),
    window: Object.keys(window).length,
    localStorage: storageAvailable("localStorage"),
    sessionStorage: storageAvailable("sessionStorage"),
    Cookie: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack ?? 0,
    enableDebug: enableDebug.value,
    ScriptHandler: _GM_info.scriptHandler,
    "ScriptHandler version": _GM_info.version,
    "Novel-downloader version": _GM_info.script.version,
  };
};
