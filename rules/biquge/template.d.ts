import { PublicConstructor } from "../../lib/misc";
import { Book } from "../../main";
import { BaseRuleClass, ChapterParseObject } from "../../rules";
export declare function bookParseTemp({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, chapterListSelector, charset, chapterParse, enableIgnore, }: {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string;
    chapterListSelector: string;
    charset: string;
    chapterParse: BaseRuleClass["chapterParse"];
    enableIgnore?: boolean;
}): Promise<Book>;
export interface ChapterParseOption {
    bookname: string;
}
export declare function chapterParseTemp({ dom, chapterUrl, chapterName, contenSelector, contentPatch, charset, options, }: {
    dom: Document;
    chapterUrl: string;
    chapterName: string;
    contenSelector: string;
    contentPatch: (content: HTMLElement, options: ChapterParseOption) => HTMLElement;
    charset: string;
    options: ChapterParseOption;
}): Promise<ChapterParseObject>;
export declare function mkBiqugeClass(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, options: ChapterParseOption) => HTMLElement, concurrencyLimit?: number, enableIgnore?: boolean): PublicConstructor<BaseRuleClass>;
export declare function mkBiqugeClass2(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, options: ChapterParseOption) => HTMLElement, concurrencyLimit?: number): PublicConstructor<BaseRuleClass>;
export declare function mkBiqugeClass3(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement, doc: Document) => HTMLElement, getNextPage: (doc: Document) => string, continueCondition: (content: HTMLElement, nextLink: string) => boolean, concurrencyLimit?: number, enableIgnore?: boolean): PublicConstructor<BaseRuleClass>;
