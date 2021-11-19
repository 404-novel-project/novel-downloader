import * as Vue from "vue";
import { NewWindow } from "../global";
import { createEl, createStyle } from "../lib/createEl";
import { _GM_info } from "../lib/GM";
import { log } from "../log";
import { getRule } from "../router/download";
import { getUI } from "../router/ui";
import { iconJump, iconSetting, iconStart0, iconStart1 } from "../setting";
import buttonHtml from "./button.html";
import buttonCss from "./button.less";
import { vm as settingVM } from "./setting";

export const style = createStyle(buttonCss, "button-div-style");
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
      document.location.href = this.uiObj.jumpUrl;
    },
  },
  template: buttonHtml,
}).mount(el);
