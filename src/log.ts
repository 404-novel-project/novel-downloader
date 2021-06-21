import { enaleDebug } from "./rules";
import log from "loglevel";

if (enaleDebug) {
  log.setDefaultLevel("debug");
} else {
  log.setDefaultLevel("info");
}

let logText = "";
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return function (message) {
    logText += message + "\n";
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
