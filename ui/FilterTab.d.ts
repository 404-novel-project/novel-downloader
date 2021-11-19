import * as Vue from "vue";
import { Chapter } from "../main";
interface FilterOption {
    raw: (arg: string) => ((chapter: Chapter) => boolean) | undefined;
    description: string;
    abbreviation: string;
}
interface FilterOptionDict {
    [index: string]: FilterOption;
}
export declare const filterOptionDict: FilterOptionDict;
export declare function getFunctionBody(fn: FilterOption["raw"]): string;
export declare function getFilterFunction(arg: string, functionBody: string): ((chapter: Chapter) => boolean) | undefined;
export interface FilterSetting {
    arg: string;
    hiddenBad: boolean;
    filterType: string;
    functionBody: string;
}
declare const _default: Vue.DefineComponent<{}, {
    arg: Vue.Ref<string>;
    hiddenBad: Vue.Ref<boolean>;
    filterType: Vue.Ref<string>;
    filterOptionList: [string, FilterOption][];
    filterDescription: Vue.ComputedRef<string>;
}, {}, {}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, "filterupdate"[], "filterupdate", Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<{} & {} & {}> & {
    onFilterupdate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
export declare const style: HTMLElement;
