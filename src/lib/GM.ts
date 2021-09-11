import { log } from "../log";

export let _GM_info: GM_info | GM["info"];
if (typeof GM_info === "undefined") {
  if (typeof GM === "undefined") {
    throw new Error("未发现 GM_info");
  } else {
    if (typeof GM.info === "undefined") {
      throw new Error("未发现 GM_info");
    } else {
      _GM_info = GM.info;
    }
  }
} else {
  _GM_info = GM_info;
}
export let _GM_xmlhttpRequest: GM_xmlhttpRequest | GM["xmlHttpRequest"];
if (typeof GM_xmlhttpRequest === "undefined") {
  if (typeof GM === "undefined") {
    throw new Error("未发现 GM_xmlhttpRequest");
  } else {
    if (typeof GM.xmlHttpRequest === "undefined") {
      throw new Error("未发现 GM_xmlhttpRequest");
    } else {
      _GM_xmlhttpRequest = GM.xmlHttpRequest;
    }
  }
} else {
  _GM_xmlhttpRequest = GM_xmlhttpRequest;
}

export let _GM_setValue: GM_setValue | GM["setValue"];
if (typeof GM_setValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_setValue");
  } else {
    if (typeof GM.setValue === "undefined") {
      log.warn("未发现 GM_setValue");
    } else {
      _GM_setValue = GM.setValue;
    }
  }
} else {
  _GM_setValue = GM_setValue;
}

export let _GM_getValue: GM_getValue | GM["getValue"];
if (typeof GM_getValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_getValue");
  } else {
    if (typeof GM.getValue === "undefined") {
      log.warn("未发现 GM_getValue");
    } else {
      _GM_getValue = GM.getValue;
    }
  }
} else {
  _GM_getValue = GM_getValue;
}

export let _GM_deleteValue: GM_deleteValue | GM["deleteValue"];
if (typeof GM_deleteValue === "undefined") {
  if (typeof GM === "undefined") {
    log.warn("未发现 GM_deleteValue");
  } else {
    if (typeof GM.deleteValue === "undefined") {
      log.warn("未发现 GM_deleteValue");
    } else {
      _GM_deleteValue = GM.deleteValue;
    }
  }
} else {
  _GM_deleteValue = GM_deleteValue;
}
