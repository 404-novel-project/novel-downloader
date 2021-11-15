import { createEl, createStyle } from "../lib/createEl";
import { iconSetting, iconStart0, iconStart1 } from "../setting";
import { getRule } from "../routers";
import { newWindow } from "../global";
import { log } from "../log";
import buttonHtml from "./button.html";
import buttonCss from "./button.css";
import { vm as settingVM } from "./setting";

import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";

createStyle(buttonCss, "button-div-style");

export const el = createEl("<div></div>");

async function run() {
  const ruleClass = await getRule();
  await ruleClass.run();
}

export const vm = Vue.createApp({
  data() {
    return {
      imgStart: iconStart0,
      imgSetting: iconSetting,
    };
  },
  methods: {
    startButtonClick() {
      if ((window as newWindow & typeof globalThis).downloading) {
        alert("正在下载中，请耐心等待……");
        return;
      }

      const self = this;
      self["imgStart"] = iconStart1;
      run()
        .then(() => {
          self["imgStart"] = iconStart0;
        })
        .catch((error) => log.error(error));
    },
    settingButtonClick() {
      //@ts-expect-error
      settingVM.openSetting();
    },
  },
  template: buttonHtml,
}).mount(el);
