import { ComponentPublicInstance } from "vue";
export declare const style: HTMLElement;
export declare const el: HTMLElement;
export interface ProgressVM extends ComponentPublicInstance {
    totalChapterNumber: number;
    finishedChapterNumber: number;
    reset: () => void;
}
export declare const vm: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
