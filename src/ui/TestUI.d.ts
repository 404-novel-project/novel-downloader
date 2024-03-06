import { Ref } from "vue";
import { Chapter } from "../main/Chapter";
declare const _default: import("vue").DefineComponent<{}, {
    metaData: {
        封面: string;
        题名: string;
        作者: string;
        网址: string;
        简介: HTMLElement;
    };
    getData: (key: string, value: string | HTMLElement | [
        string,
        string
    ]) => string | HTMLElement | [string, string];
    chapter: {};
    isSeenChapter: (_chapter: Chapter) => boolean;
    isChapterFailed: (_chapter: Chapter) => boolean;
    getChapterHtml: (_chapter: Chapter) => string;
    chapterNumber: Ref<string | number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
export declare const style: HTMLElement;
