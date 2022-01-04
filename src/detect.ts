import { GmWindow } from "./global";
import { _GM_info } from "./lib/GM";
import { gfetch } from "./lib/http";
import { storageAvailable } from "./lib/localStorageExpired";
import { enableDebug } from "./setting";

function checkObjct(name: string) {
  const target = window[name as keyof Window];
  const targetLength = target.toString().length;
  const targetPrototype = target.prototype;
  const nativeFunctionRe =
    /function \w+\(\) {\n?(\s+)?\[native code\]\n?(\s+)?}/;
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
function jsdelivrAvailability() {
  return new Promise((resolve, reject) => {
    gfetch("https://cdn.jsdelivr.net/npm/idb-keyval/dist/umd.js")
      .then((resp) => resolve(true))
      .catch((error) => resolve(false));
  });
}
export function mitmPageAvailability(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((resp) => resolve(true))
      .catch((error) => resolve(false));
  });
}

export const environments = async () => ({
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
  // jsdelivr: await jsdelivrAvailability(),
  enableDebug: enableDebug.value,
  ScriptHandler: _GM_info.scriptHandler,
  "ScriptHandler version": _GM_info.version,
  "Novel-downloader version": _GM_info.script.version,
});
