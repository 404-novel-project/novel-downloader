import type * as _vue from "vue";
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
declare const _default: _vue.DefineComponent<{}, {}, {
    arg: string;
    hiddenBad: boolean;
    filterOptionDict: filterOptionDict;
    filterOptionList: [string, filterOption][];
    filterType: string;
}, {
    functionBody(): string;
    filterObj(): string[];
    filterDescription(): string;
    filterSetting(): filterSetting;
}, {
    getFilterOption(): string[];
    getHiddenBad(): boolean;
}, _vue.ComponentOptionsMixin, _vue.ComponentOptionsMixin, "filterupdate"[], "filterupdate", _vue.VNodeProps & _vue.AllowedComponentProps & _vue.ComponentCustomProps, Readonly<{} & {} & {}> & {
    onFilterupdate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
