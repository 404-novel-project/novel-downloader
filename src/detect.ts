import { _GM_info } from "./lib/GM";
import { storageAvailable } from "./lib/misc";
import { enableDebug } from "./setting";

function check(name: string) {
  //@ts-ignore
  const target = window[name];
  const targetLength = target.toString().length;
  const targetPrototype = target["prototype"];
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

export const environments = {
  当前时间: new Date().toISOString(),
  当前页URL: document.location.href,
  当前页Referrer: document.referrer,
  浏览器UA: navigator.userAgent,
  浏览器语言: navigator.languages,
  设备运行平台: navigator.platform,
  //@ts-expect-error
  设备内存: navigator.deviceMemory ?? "",
  CPU核心数: navigator.hardwareConcurrency,
  eval: check("eval"),
  fetch: check("fetch"),
  XMLHttpRequest: check("XMLHttpRequest"),
  window: Object.keys(window).length,
  localStorage: storageAvailable("localStorage"),
  sessionStorage: storageAvailable("sessionStorage"),
  Cookie: navigator.cookieEnabled,
  doNotTrack: navigator.doNotTrack ?? 0,
  ScriptHandler: _GM_info.scriptHandler,
  "ScriptHandler version": _GM_info.version,
  "Novel-downloader version": _GM_info.script.version,
  enableDebug: enableDebug.value,
};
