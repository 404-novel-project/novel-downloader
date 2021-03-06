import { defineCustomElement } from "vue";
import dialogCss from "./dialog.css";
import dialogHtml from "./dialog.html";

export default defineCustomElement({
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
