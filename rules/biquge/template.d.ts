import { PublicConstructor } from "../../lib/misc";
import { Book } from "../../main";
import { BaseRuleClass, ChapterParseObject } from "../../rules";
export declare function bookParseTemp({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, chapterListSelector, charset, chapterParse, }: {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string;
    chapterListSelector: string;
    charset: string;
    chapterParse: BaseRuleClass["chapterParse"];
}): Promise<Book>;
export interface ChapterParseOption {
    bookname: string;
}
export declare function chapterParseTemp({ dom, chapterUrl, chapterName, contenSelector, contentPatch, charset, }: {
    dom: Document;
    chapterUrl: string;
    chapterName: string;
    contenSelector: string;
    contentPatch: (content: HTMLElement) => HTMLElement;
    charset: string;
}): Promise<ChapterParseObject>;
export declare function mkBiqugeClass(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement) => HTMLElement, concurrencyLimit?: number): PublicConstructor<BaseRuleClass>;
export declare function mkBiqugeClass2(introDomPatch: (introDom: HTMLElement) => HTMLElement, contentPatch: (content: HTMLElement) => HTMLElement, concurrencyLimit?: number): PublicConstructor<BaseRuleClass>;
