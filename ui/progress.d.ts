import * as Vue from "vue";
export declare const el: HTMLElement;
export interface ProgressVM extends Vue.ComponentPublicInstance {
    totalChapterNumber: number;
    finishedChapterNumber: number;
    zipPercent: number;
    reset: () => void;
}
export declare const vm: Vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, Vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
