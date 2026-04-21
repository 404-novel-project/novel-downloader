import { ComponentPublicInstance, createApp } from "vue";
import { createEl, createStyle } from "../lib/dom";
import progressCss from "./progress.css";
import progressHtml from "./progress.html";

export const style = createStyle(progressCss);
export const el = createEl(`<div id="progress-bar"></div>`);

export interface ProgressVM extends ComponentPublicInstance {
  totalChapterNumber: number;
  finishedChapterNumber: number;
  concurrencyLimit: number;
  sleepTime: number;
  maxSleepTime: number;
  totalRequestTime: number;
  processedChapterIndex: number;
  updateRequestTime: (ms: number) => void;
  reset: () => void;
}

function formatETA(ms: number): string {
  if (!isFinite(ms) || ms < 0) {
    return "";
  }
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 1) {
    return "<1s";
  }
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];
  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds}s`);
  }
  return parts.join("");
}

/**
 * Estimate total sleep time (ms) for remaining chapters in serial mode.
 *
 * Sleep per chapter i (0-indexed) follows the formula:
 *   nowSleepTime = min(maxSleepTime/2, i * sleepTime)
 *   actual_sleep ≈ nowSleepTime * 1.5  (base + avg random)
 *
 * We sum from nextChapterIndex to nextChapterIndex + remainingCount - 1.
 */
function estimateSerialSleepTime(
  nextIndex: number,
  remainingCount: number,
  sleepTime: number,
  maxSleepTime: number
): number {
  const halfMax = maxSleepTime / 2;
  let total = 0;
  for (let i = 0; i < remainingCount; i++) {
    const idx = nextIndex + i;
    const base = Math.min(halfMax, idx * sleepTime);
    total += base * 1.5;
  }
  return total;
}

export const vm = createApp({
  data() {
    return {
      totalChapterNumber: 0,
      finishedChapterNumber: 0,
      concurrencyLimit: 10,
      sleepTime: 50,
      maxSleepTime: 500,
      totalRequestTime: 0 as number,
      processedChapterIndex: 0 as number,
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
    etaText(): string {
      if (
        this.finishedChapterNumber < 1 ||
        this.totalRequestTime <= 0 ||
        this.totalChapterNumber <= this.finishedChapterNumber
      ) {
        return "";
      }
      const remaining = this.totalChapterNumber - this.finishedChapterNumber;
      const avgRequestTime = this.totalRequestTime / this.finishedChapterNumber;

      if (this.concurrencyLimit <= 1) {
        // Serial mode: request time + sleep time
        const requestEta = avgRequestTime * remaining;
        const sleepEta = estimateSerialSleepTime(
          this.processedChapterIndex,
          remaining,
          this.sleepTime,
          this.maxSleepTime
        );
        return "~" + formatETA(requestEta + sleepEta);
      } else {
        // Parallel mode: request time divided by concurrency
        const requestEta =
          (avgRequestTime * remaining) / this.concurrencyLimit;
        return "~" + formatETA(requestEta);
      }
    },
  },
  methods: {
    updateRequestTime(ms: number) {
      this.totalRequestTime += ms;
    },
    reset() {
      this.totalChapterNumber = 0;
      this.finishedChapterNumber = 0;
      this.concurrencyLimit = 10;
      this.sleepTime = 50;
      this.maxSleepTime = 500;
      this.totalRequestTime = 0;
      this.processedChapterIndex = 0;
    },
  },
  template: progressHtml,
}).mount(el);
