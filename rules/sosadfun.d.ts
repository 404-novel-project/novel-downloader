import { Book } from "../main";
import { BaseRuleClass } from "../rules";
export declare class sosadfun extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../main").attachmentClass[];
        additionalMetadate: null;
    } | {
        chapterName: string;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
