import * as Vue from "vue";
import { getLogText } from "../log";

export default Vue.defineComponent({
  name: "LogUI",
  setup(props, context) {
    const logText = Vue.ref("");

    function onMount(fn: () => void) {
      Vue.onUnmounted(() => fn());
    }
    let requestID: number;
    Vue.onMounted(() => {
      logText.value = getLogText();
      function step() {
        logText.value = getLogText();
        requestID = globalThis.requestAnimationFrame(step);
      }
      requestID = globalThis.requestAnimationFrame(step);
    });
    Vue.onUnmounted(() => {
      if (requestID) {
        globalThis.cancelAnimationFrame(requestID);
      }
    });
    return { logText };
  },
  template: `<div class="log"><pre v-html="logText" id="novel-downloader-log"></per></div>`,
});
