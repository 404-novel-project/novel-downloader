import * as Vue from "vue";
import { getLogText } from "../log";

export default Vue.defineComponent({
  name: "LogUI",
  setup(props, context) {
    const logText = Vue.ref("");

    function onMount(fn: () => void) {
      Vue.onUnmounted(() => fn());
    }
    let intervalID: NodeJS.Timer;
    Vue.onMounted(() => {
      logText.value = getLogText();
      intervalID = globalThis.setInterval(() => {
        logText.value = getLogText();
      }, 100);
    });
    Vue.onUnmounted(() => {
      if (intervalID) {
        globalThis.clearInterval(intervalID);
      }
    });
    return { logText };
  },
  template: `<div class="log"><pre v-html="logText" id="novel-downloader-log"></per></div>`,
});
