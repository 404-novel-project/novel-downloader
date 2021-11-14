import { createEl, createStyle } from "../lib/createEl";
import { iconSetting, iconStart0, iconStart1 } from "../setting";
import { getRule } from "../routers";
import { newWindow } from "../global";
import { log } from "../log";
import { vm as settingVM } from "./setting";

import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";

const buttonDivStyle = `.button-div {
    position: fixed;
    top: 15%;
    right: 5%;
    z-index: 5000;
}

.button-div button {
    border-style: none;
    text-align: center;
    vertical-align: baseline;
    background-color: rgba(128, 128, 128, 0.2);
    padding: 3px;
    border-radius: 12px;
    min-width: auto;
    min-height: auto;
}

.button-div img.start {
    height: 2em;
}
.button-div img.setting {
    height: 1em;
}`;
createStyle(buttonDivStyle, "button-div-style");

export const el = createEl(`<div class="button-div" id="button-div">
<button class="start">
    <img class="start" v-bind:src="imgStart" v-on:click="startButtonClick">
</button>
<button class="setting">
    <img class="setting" v-bind:src="imgSetting" v-on:click="settingButtonClick">
</button>
</div>`);

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
}).mount(el);
