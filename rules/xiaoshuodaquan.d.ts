import { Book } from "../main";
import { ruleClass } from "../rules";
export declare class xiaoshuodaquan implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
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
