import { ComponentPublicInstance, createApp } from "vue";
import { createEl, createStyle } from "../lib/dom";
import progressCss from "./progress.css";
import progressHtml from "./progress.html";

export const style = createStyle(progressCss);
export const el = createEl(`<div id="progress-bar"></div>`);

export interface ProgressVM extends ComponentPublicInstance {
  totalChapterNumber: number;
  finishedChapterNumber: number;
  reset: () => void;
}

export const vm = createApp({
  data() {
    return {
      totalChapterNumber: 0,
      finishedChapterNumber: 0,
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
    ntProgressSeen() {
      return !!(this.chapterProgressSeen || this.zipProgressSeen);
    },
    chapterProgressTitle() {
      return `章节：${this.finishedChapterNumber}/${this.totalChapterNumber}`;
    },
  },
  methods: {
    reset() {
      this.totalChapterNumber = 0;
      this.finishedChapterNumber = 0;
    },
  },
  template: progressHtml,
}).mount(el);
