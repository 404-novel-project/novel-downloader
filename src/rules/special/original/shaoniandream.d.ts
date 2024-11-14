import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Shaoniandream extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<{
        chapterName: string;
        contentRaw: HTMLPreElement;
        contentText: string;
        contentHTML: HTMLDivElement;
        contentImages: null;
        additionalMetadate: null;
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: string;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
interface chapterOptions {
    limitFree: boolean;
    bookID: string;
    chapterID: string;
}
export {};
