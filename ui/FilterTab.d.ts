import type * as _vue from "vue";
import "./injectVue";
import { Chapter } from "../main";
interface filterOption {
    raw: (arg: string) => (chapter: Chapter) => boolean;
    functionBody: string;
    validator: (arg: string) => boolean;
    description: string;
    abbreviation: string;
}
interface filterOptionDict {
    [index: string]: filterOption;
}
export declare const filterOptionDict: filterOptionDict;
export declare function getFilterFunction(arg: string, functionBody: string): ((chapter: Chapter) => boolean) | undefined;
interface filterSetting {
    arg?: string;
    hiddenBad?: boolean;
    filterType?: string;
}
export declare const filterSetting: filterSetting;
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
}, {
    getFilterOption(): string[];
    getHiddenBad(): boolean;
}, _vue.ComponentOptionsMixin, _vue.ComponentOptionsMixin, "filterupdate"[], "filterupdate", _vue.VNodeProps & _vue.AllowedComponentProps & _vue.ComponentCustomProps, Readonly<{} & {} & {}> & {
    onFilterupdate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
