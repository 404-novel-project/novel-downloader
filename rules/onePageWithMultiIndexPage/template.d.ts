import { Options } from "../../lib/cleanDOM";
import { PublicConstructor } from "../../lib/misc";
import { Chapter } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string | null;
    getIndexUrls: () => string[] | Promise<string[]>;
    getAList: (doc: Document) => NodeListOf<Element>;
    getAName?: (aElem: Element) => string;
    postHook?: (chapter: Chapter) => Chapter | void;
    getContentFromUrl?: (chapterUrl: string, chapterName: string | null, charset: string) => Promise<HTMLElement | null>;
    getContent?: (doc: Document) => HTMLElement | null;
    contentPatch: (content: HTMLElement) => HTMLElement;
    concurrencyLimit?: number;
    cleanDomOptions?: Options;
}
export declare function mkRuleClass({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, getIndexUrls, getAList, getAName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, cleanDomOptions, }: MkRuleClassOptions): PublicConstructor<BaseRuleClass>;
export {};
