import { PublicConstructor } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
interface ChapterParseOption {
    bookname: string;
}
export declare function mkBiqugeClass(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, options: ChapterParseOption) => HTMLElement, concurrencyLimit?: number, enableIgnore?: boolean, customVolumeFilter?: RegExp, overrideConstructor?: (classThis: any) => any): PublicConstructor<BaseRuleClass>;
export declare function mkBiqugeClass2(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, options: ChapterParseOption) => HTMLElement, concurrencyLimit?: number, enableIgnore?: boolean, customVolumeFilter?: RegExp, overrideConstructor?: (classThis: any) => any): PublicConstructor<BaseRuleClass>;
export declare function mkBiqugeClass3(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, doc: Document) => HTMLElement, getNextPage: (doc: Document) => string, continueCondition: (content: HTMLElement, nextLink: string) => boolean, concurrencyLimit?: number, enableIgnore?: boolean, customVolumeFilter?: RegExp, overrideConstructor?: (classThis: any) => any): PublicConstructor<BaseRuleClass>;
export {};
