import type * as _vue from "vue";
import "./injectVue";
import { Chapter, Status } from "../main";
declare const _default: _vue.DefineComponent<{}, {}, {
    Status: typeof Status;
    sectionsObj: {};
    loading: boolean;
    filterObj: never[];
    hiddenBad: boolean;
}, {}, {
    filter(chapter: Chapter): boolean;
    isDisabled(chapter: Chapter): boolean;
    isSeen(chapter: Chapter): boolean;
    updateInject(): void;
    updateHiddenBad(): void;
    updateFilterObj(): void;
}, _vue.ComponentOptionsMixin, _vue.ComponentOptionsMixin, _vue.EmitsOptions, string, _vue.VNodeProps & _vue.AllowedComponentProps & _vue.ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
