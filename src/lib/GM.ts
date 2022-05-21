function get_GM_info() {
  if (typeof GM_info !== "undefined") {
    return GM_info;
  }
  if (typeof GM !== "undefined" && typeof GM.info !== "undefined") {
    return GM.info;
  }
  throw new Error("Not found: GM_info and GM.info!");
}

export const _GM_info = get_GM_info();

export function _GM_xmlhttpRequest<TContext = any>(
  details: Tampermonkey.Request<TContext>
) {
  if (typeof GM_xmlhttpRequest === "function") {
    GM_xmlhttpRequest(details);
    return;
  }
  if (typeof GM !== "undefined" && typeof GM.xmlHttpRequest === "function") {
    GM.xmlHttpRequest(details);
    return;
  }
  throw new Error("Not found: GM_xmlhttpRequest or GM.xmlHttpRequest!");
}

export async function _GM_setValue(name: string, value: any) {
  if (typeof GM_setValue === "function") {
    return GM_setValue(name, value);
  }
  if (typeof GM !== "undefined" && typeof GM.setValue === "function") {
    return await GM.setValue(name, value);
  }
  throw new Error("Not found: GM_setValue or GM.setValue!");
}

export async function _GM_getValue<TValue>(
  name: string,
  defaultValue?: TValue
) {
  if (typeof GM_getValue === "function") {
    return GM_getValue(name, defaultValue);
  }
  if (typeof GM !== "undefined" && typeof GM.getValue === "function") {
    return await GM.getValue(name, defaultValue);
  }
  throw new Error("Not found: GM_getValue or GM.getValue!");
}

export async function _GM_deleteValue(name: string) {
  if (typeof GM_deleteValue === "function") {
    return GM_deleteValue(name);
  }
  if (typeof GM !== "undefined" && typeof GM.deleteValue === "function") {
    return await GM.deleteValue(name);
  }
  throw new Error("Not found: GM_deleteValue or GM.deleteValue!");
}
