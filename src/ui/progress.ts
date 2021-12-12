import { ComponentPublicInstance, createApp } from "vue";
import { createEl, createStyle } from "../lib/createEl";
import progressCss from "./progress.css";
import progressHtml from "./progress.html";

export const style = createStyle(progressCss);
export const el = createEl(`<div id="progress-bar"></div>`);
export interface ProgressVM extends ComponentPublicInstance {
  totalChapterNumber: number;
  finishedChapterNumber: number;
  zipPercent: number;
  reset: () => void;
}
export const vm = createApp({
  data() {
    return {
      totalChapterNumber: 0,
      finishedChapterNumber: 0,
      zipPercent: 0,
    };
  },
  computed: {
    chapterPercent() {
      if (this.totalChapterNumber !== 0 && this.finishedChapterNumber !== 0) {
        return (this.finishedChapterNumber / this.totalChapterNumber) * 100;
      } else {
        return 0;
      }
    },
    chapterProgressSeen() {
      return this.chapterPercent !== 0;
    },
    zipProgressSeen() {
      return this.zipPercent !== 0;
    },
    ntProgressSeen() {
      if (this.chapterProgressSeen || this.zipProgressSeen) {
        return true;
      } else {
        return false;
      }
    },
    chapterProgressTitle() {
      return `章节：${this.finishedChapterNumber}/${this.totalChapterNumber}`;
    },
  },
  methods: {
    reset() {
      this.totalChapterNumber = 0;
      this.finishedChapterNumber = 0;
      this.zipPercent = 0;
    },
  },
  template: progressHtml,
}).mount(el);
