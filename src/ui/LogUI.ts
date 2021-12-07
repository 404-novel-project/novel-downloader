import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { getLogText } from "../log";

export default defineComponent({
  name: "LogUI",
  setup(props, context) {
    const logText = ref("");

    let requestID: number;
    onMounted(() => {
      logText.value = getLogText();
      function step() {
        logText.value = getLogText();
        requestID = globalThis.requestAnimationFrame(step);
      }
      requestID = globalThis.requestAnimationFrame(step);
    });
    onUnmounted(() => {
      if (requestID) {
        globalThis.cancelAnimationFrame(requestID);
      }
    });
    return { logText };
  },
  template: `<div class="log"><pre v-html="logText" id="novel-downloader-log"></per></div>`,
});
