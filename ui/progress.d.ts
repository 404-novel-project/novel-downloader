import type * as _vue from "vue";
import "./injectVue";
export declare const el: HTMLElement;
export interface progressVM extends _vue.ComponentPublicInstance {
    totalChapterNumber: number;
    finishedChapterNumber: number;
    zipPercent: number;
    reset: () => void;
}
export declare const vm: _vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, _vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
