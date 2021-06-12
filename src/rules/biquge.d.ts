import { ruleClass, bookParseObject, chapterParseObject } from "../rules";
export declare function bookParseTemp({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, chapterListSelector, charset, chapterParse, }: {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string;
    chapterListSelector: string;
    charset: string;
    chapterParse: ruleClass["chapterParse"];
}): Promise<bookParseObject>;
export declare class biquwo implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class shuquge implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class dingdiann implements ruleClass {
    imageMode: "naive" | "TM";
    concurrencyLimit: number;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class gebiqu implements ruleClass {
    imageMode: "naive" | "TM";
    concurrencyLimit: number;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class zwdu implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class xbiquge implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class hongyeshuzhai implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class luoqiuzw implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
