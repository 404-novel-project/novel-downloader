import { Book } from "../main";
import { ruleClass } from "../rules";
import { saveOptions } from "../index_helper";
export declare class fushuwang implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    maxRunLimit: number;
    saveOptions: saveOptions;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../main").attachmentClass[];
        additionalMetadate: null;
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
