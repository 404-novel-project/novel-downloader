import { PublicConstructor } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string | null;
    getIndexUrls: () => string[];
    getAList: (doc: Document) => NodeListOf<Element>;
    getContentFromUrl?: (chapterUrl: string, chapterName: string | null, charset: string) => Promise<HTMLElement | null>;
    getContent?: (doc: Document) => HTMLElement | null;
    contentPatch: (content: HTMLElement) => HTMLElement;
}
export declare function mkRuleClass(optionis: MkRuleClassOptions): PublicConstructor<BaseRuleClass>;
export {};
