import { environments } from "./detect";
import { init as globalInit } from "./global";
import { log } from "./log";
import "./ui/fixVue";
import { init as uiInit } from "./ui/ui";

async function printEnvironments() {
  log.info("[Init]开始载入小说下载器……");
  Object.entries(await environments()).forEach((kv) =>
    log.info("[Init]" + kv.join("："))
  );
}

async function main() {
  globalInit();
  await printEnvironments();
  uiInit();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", (event) => {
    main();
  });
} else {
  main();
}
