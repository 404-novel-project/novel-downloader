import { Chapter } from "../main/Chapter";
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
declare const _default: import("vue").DefineComponent<{}, {
    arg: import("vue").Ref<string>;
    hiddenBad: import("vue").Ref<boolean>;
    filterType: import("vue").Ref<string>;
    filterOptionList: [string, FilterOption][];
    filterDescription: import("vue").ComputedRef<string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "filterupdate"[], "filterupdate", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onFilterupdate?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
export declare const style: HTMLElement;
