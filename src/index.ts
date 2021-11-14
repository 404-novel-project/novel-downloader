import { enaleDebug } from "./setting";
import { init as globalInit } from "./global";
import { init as uiInit } from "./ui/ui";
import { environments } from "./detect";
import { debug } from "./debug";
import { log } from "./log";

function printEnvironments() {
  log.info("[Init]开始载入小说下载器……");
  Object.entries(environments).forEach((kv) =>
    log.info("[Init]" + kv.join("："))
  );
}

function main() {
  printEnvironments();
  globalInit();
  uiInit();

  if (enaleDebug) {
    setTimeout(debug, 3000);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", (event) => {
    main();
  });
} else {
  main();
}
