import { Options } from "../../lib/cleanDOM";
import { PublicConstructor } from "../../lib/misc";
import { Chapter } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions {
    bookUrl: string;
    anotherPageUrl: string;
    getBookname: (doc: Document) => string;
    getAuthor: (doc: Document) => string;
    getIntroDom: (doc: Document) => HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    getCoverUrl: (doc: Document) => string | null;
    getAList: (doc: Document) => NodeListOf<Element> | Element[];
    getAName?: (aElem: Element) => string;
    getSections?: (doc: Document) => NodeListOf<Element>;
    getSName?: (sElem: Element) => string;
    postHook?: (chapter: Chapter) => Chapter | void;
    getContentFromUrl?: (chapterUrl: string, chapterName: string | null, charset: string) => Promise<HTMLElement | null>;
    getContent?: (doc: Document) => HTMLElement | null;
    contentPatch: (content: HTMLElement) => HTMLElement;
    concurrencyLimit?: number;
    cleanDomOptions?: Options;
}
export declare function mkRuleClass({ bookUrl, anotherPageUrl, getBookname, getAuthor, getIntroDom, introDomPatch, getCoverUrl, getAList, getAName, getSections, getSName: _getSectionName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, cleanDomOptions, }: MkRuleClassOptions): PublicConstructor<BaseRuleClass>;
export {};
