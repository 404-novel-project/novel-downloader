import dialogHtml from "./dialog.html";
import dialogCss from "./dialog.css";

import * as Vue from "vue";
import "./injectVue";

export default Vue.defineCustomElement({
  name: "Dialog",
  props: {
    dialogTitle: String,
    status: String,
  },
  emits: ["dialogclose"],
  data() {
    return {
      myPrivateStatus: this.status === "true",
    };
  },
  methods: {
    dialogClose() {
      this.myPrivateStatus = false;
      this.$emit("dialogclose");
    },
  },
  mounted() {
    this.myPrivateStatus = this.status === "true";
  },
  watch: {
    status() {
      this.myPrivateStatus = this.status === "true";
    },
  },
  template: dialogHtml,
  styles: [dialogCss],
});
