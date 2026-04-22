import { ComponentPublicInstance } from "vue";
export declare const style: HTMLElement;
export declare const el: HTMLElement;
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
export declare const app: import("vue").App<Element>;
export declare const vm: ProgressVM;
