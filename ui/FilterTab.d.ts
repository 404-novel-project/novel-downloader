import * as Vue from "vue";
import "./injectVue";
import { Chapter } from "../main";
export declare function getFunctionBody(fn: Function): string;
interface filterOption {
    raw: (arg: string) => ((chapter: Chapter) => boolean) | undefined;
    description: string;
    abbreviation: string;
}
interface filterOptionDict {
    [index: string]: filterOption;
}
export declare const filterOptionDict: filterOptionDict;
export declare function getFilterFunction(arg: string, functionBody: string): ((chapter: Chapter) => boolean) | undefined;
export interface filterSetting {
    arg: string;
    hiddenBad: boolean;
    filterType: string;
    functionBody: string;
}
declare const _default: Vue.DefineComponent<{}, {
    arg: Vue.Ref<string>;
    hiddenBad: Vue.Ref<boolean>;
    filterType: Vue.Ref<string>;
    filterOptionList: [string, filterOption][];
    filterDescription: Vue.ComputedRef<string>;
}, {}, {}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, "filterupdate"[], "filterupdate", Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<{} & {} & {}> & {
    onFilterupdate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
