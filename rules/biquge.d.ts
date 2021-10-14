import { Book } from "../main";
import { BaseRuleClass, chapterParseObject } from "../rules";
import { PublicConstructor } from "../lib/misc";
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
export declare const common: () => PublicConstructor<BaseRuleClass>;
export declare const c81book: () => PublicConstructor<BaseRuleClass>;
export declare const gebiqu: () => PublicConstructor<BaseRuleClass>;
export declare const luoqiuzw: () => PublicConstructor<BaseRuleClass>;
export declare const lwxs9: () => PublicConstructor<BaseRuleClass>;
export declare const biquwx: () => PublicConstructor<BaseRuleClass>;
export declare class c25zw extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare const dijiubook: () => PublicConstructor<BaseRuleClass>;
export declare const shuquge: () => PublicConstructor<BaseRuleClass>;
export declare const xyqxs: () => PublicConstructor<BaseRuleClass>;
export declare class xbiquge extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
