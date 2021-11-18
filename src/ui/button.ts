import * as Vue from "vue";
import { createEl, createStyle } from "../lib/createEl";
import { iconSetting, iconStart0, iconStart1, iconJump } from "../setting";
import { getRule } from "../router/download";
import { getUI } from "../router/ui";
import { NewWindow } from "../global";
import { log } from "../log";
import buttonHtml from "./button.html";
import buttonCss from "./button.css";
import { vm as settingVM } from "./setting";
import { _GM_info } from "../lib/GM";

createStyle(buttonCss, "button-div-style");
export const el = createEl("<div></div>");
export const vm = Vue.createApp({
  data() {
    return {
      imgStart: iconStart0,
      imgSetting: iconSetting,
      isSettingSeen: _GM_info.scriptHandler !== "Greasemonkey",
      imgJump: iconJump,
      uiObj: getUI(),
    };
  },
  methods: {
    startButtonClick() {
      if ((window as NewWindow & typeof globalThis).downloading) {
        alert("正在下载中，请耐心等待……");
        return;
      }

      const self = this;
      self.imgStart = iconStart1;

      async function run() {
        const ruleClass = await getRule();
        await ruleClass.run();
      }

      run()
        .then(() => {
          self.imgStart = iconStart0;
        })
        .catch((error) => log.error(error));
    },
    settingButtonClick() {
      // @ts-expect-error
      settingVM.openSetting();
    },
    jumpButtonClick() {
      document.location = this.uiObj.jumpUrl;
    },
  },
  template: buttonHtml,
}).mount(el);
