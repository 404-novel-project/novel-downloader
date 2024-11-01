import { Options } from "../../lib/cleanDOM";
import { PublicConstructor } from "../../lib/misc";
import { Chapter } from "../../main/Chapter";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom?: HTMLElement;
    introDomPatch?: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string | null;
    getIndexUrls?: () => string[] | Promise<string[]>;
    getIndexPages?: () => Promise<(Document | null)[]>;
    getAList: (doc: Document) => NodeListOf<Element>;
    getAName?: (aElem: Element) => string;
    getIsVIP?: (aElem: Element) => {
        isVIP: boolean;
        isPaid: boolean;
    };
    getSections?: (doc: Document) => NodeListOf<Element>;
    getSName?: (sElem: Element) => string;
    postHook?: (chapter: Chapter) => Chapter | void;
    getContentFromUrl?: (chapterUrl: string, chapterName: string | null, charset: string) => Promise<HTMLElement | null>;
    getContent?: (doc: Document) => HTMLElement | null;
    contentPatch: (content: HTMLElement) => HTMLElement;
    concurrencyLimit?: number;
    sleepTime?: number;
    maxSleepTime?: number;
    needLogin?: boolean;
    nsfw?: boolean;
    cleanDomOptions?: Options;
    overrideConstructor?: (classThis: BaseRuleClass) => any;
    language?: string;
}
export declare function mkRuleClass({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, getIndexUrls, getIndexPages, getAList, getAName, getIsVIP, getSections, getSName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, sleepTime, maxSleepTime, needLogin, nsfw, cleanDomOptions, overrideConstructor, language, }: MkRuleClassOptions): PublicConstructor<BaseRuleClass>;
export {};
