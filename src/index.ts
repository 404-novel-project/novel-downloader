import { getRule } from "./routers";
import { icon0, icon1, enaleDebug } from "./setting";
import {
  _GM_deleteValue,
  _GM_getValue,
  _GM_info,
  _GM_setValue,
} from "./lib/GM";
import { log } from "./log";
import { init, newUnsafeWindow, newWindow } from "./global";
import { environments } from "./detect";

function printEnvironments() {
  log.info("[Init]开始载入小说下载器……");
  Object.entries(environments).forEach((kv) =>
    log.info("[Init]" + kv.join("："))
  );
}

async function run() {
  const ruleClass = await getRule();
  await ruleClass.run();
}

function addButton() {
  const buttonStyleText = `position: fixed;
top: 15%;
right: 5%;
z-index: 2147483647;
border-style: none;
text-align:center;
vertical-align:baseline;
background-color: rgba(128, 128, 128, 0.2);
padding: 5px;
border-radius: 12px;
min-width: auto;
min-height: auto;`;

  const button = document.createElement("button");
  button.id = "novel-downloader";
  button.style.cssText = buttonStyleText;

  const img = document.createElement("img");
  img.src = icon0;
  img.style.cssText = "height: 2em;";

  button.onclick = function () {
    if ((window as newWindow & typeof globalThis).downloading) {
      alert("正在下载中，请耐心等待……");
    } else {
      img.src = icon1;
      run()
        .then(() => {
          img.src = icon0;
        })
        .catch((error) => log.error(error));
    }
  };
  button.appendChild(img);
  document.body.appendChild(button);
}

async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (<newUnsafeWindow>unsafeWindow).rule = rule;
  (<newUnsafeWindow>unsafeWindow).book = book;
  (<newUnsafeWindow>unsafeWindow).saveAs = saveAs;

  const { parse, fetchAndParse, gfetchAndParse } = await import(
    "./rules/lib/readability"
  );
  const readability = {
    parse: parse,
    fetchAndParse: fetchAndParse,
    gfetchAndParse: gfetchAndParse,
  };
  (<newUnsafeWindow>unsafeWindow).readability = readability;
  return;
}

function main() {
  printEnvironments();
  init();
  addButton();

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
