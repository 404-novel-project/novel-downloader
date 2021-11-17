import * as Vue from "vue";
import "./injectVue";
import { Chapter } from "../main";
import { sectionObj } from "../save/save";
declare const _default: Vue.DefineComponent<{}, {
    sectionsObj: {};
    loading: Vue.Ref<boolean>;
    filter: (chapter: Chapter) => boolean;
    isChapterDisabled: (chapter: Chapter) => boolean;
    isChapterSeen: (chapter: Chapter) => boolean;
    isSectionSeen: (sectionObj: sectionObj) => boolean;
}, {}, {}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, Vue.EmitsOptions, string, Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
