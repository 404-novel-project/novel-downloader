import { enableDebug } from "./setting";
import log from "loglevel";
import { saveAs } from "file-saver";

if (enableDebug.value) {
  log.setLevel("trace");
} else {
  log.setLevel("info");
}

export let logText = "";
const originalFactory = log.methodFactory;
log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (message) => {
    try {
      if (typeof message === "object") {
        if (message instanceof Error) {
          logText += message.stack;
        } else {
          logText += JSON.stringify(message, undefined, 2) + "\n";
        }
      } else {
        logText += message + "\n";
      }
    } catch (error) {
      log.error(error);
    }
    rawMethod(message);
  };
};
log.setLevel(log.getLevel());

function saveLogTextToFile() {
  saveAs(
    new Blob([logText], { type: "text/plain; charset=UTF-8" }),
    `novel-downloader-${Date.now().toString()}.log`
  );
}

export { saveLogTextToFile, log };
