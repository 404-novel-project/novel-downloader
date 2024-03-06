import { Chapter } from "../main/Chapter";
import { SectionObj } from "../save/misc";
export declare const style: HTMLElement;
declare const _default: import("vue").DefineComponent<{}, {
    sectionsObj: never[];
    loading: import("vue").Ref<boolean>;
    failed: import("vue").Ref<boolean>;
    filter: (chapter: Chapter) => boolean;
    warningFilter: (chapter: Chapter) => boolean;
    isChapterDisabled: (chapter: Chapter) => boolean;
    isChapterSeen: (chapter: Chapter) => boolean;
    isSectionSeen: (sectionObj: SectionObj) => boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
