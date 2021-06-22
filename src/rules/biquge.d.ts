import { Book } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
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
}): Promise<Book>;
export declare const common: {
    new (): {
        imageMode: "naive" | "TM";
        charset: string;
        bookParse(): Promise<Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
    };
};
export declare const dingdiann: {
    new (): {
        imageMode: "naive" | "TM";
        charset: string;
        bookParse(): Promise<Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
    };
};
export declare const gebiqu: {
    new (): {
        imageMode: "naive" | "TM";
        charset: string;
        bookParse(): Promise<Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
    };
};
export declare const luoqiuzw: {
    new (): {
        imageMode: "naive" | "TM";
        charset: string;
        bookParse(): Promise<Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
    };
};
export declare class shuquge implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
export declare class xbiquge implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
