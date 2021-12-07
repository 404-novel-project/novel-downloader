import { Chapter } from "../main";
import { SectionObj } from "../save/save";
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
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
