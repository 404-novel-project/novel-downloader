import { PublicConstructor } from "../../lib/misc";
import { BookAdditionalMetadate, Chapter } from "../../main";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom?: HTMLElement;
    introDomPatch?: (introDom: HTMLElement) => HTMLElement;
    coverUrl?: string | null;
    additionalMetadatePatch?: (additionalMetadate: BookAdditionalMetadate) => BookAdditionalMetadate;
    aList: NodeListOf<Element> | Element[];
    getAName?: (aElem: Element) => string;
    sections?: NodeListOf<Element>;
    getSName?: (sElem: Element) => string;
    postHook?: (chapter: Chapter) => Chapter | void;
    getContentFromUrl?: (chapterUrl: string, chapterName: string | null, charset: string) => Promise<HTMLElement | null>;
    getContent?: (doc: Document) => HTMLElement | null;
    contentPatch: (content: HTMLElement) => HTMLElement;
    concurrencyLimit?: number;
}
export declare function mkRuleClass({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, additionalMetadatePatch, aList, getAName, sections, getSName: _getSectionName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, }: MkRuleClassOptions): PublicConstructor<BaseRuleClass>;
export {};
