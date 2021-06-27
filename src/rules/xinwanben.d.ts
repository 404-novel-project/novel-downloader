import { Book } from "../main";
import { ruleClass } from "../rules";
export declare class xinwanben implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../main").attachmentClass[];
        additionalMetadate: null;
    }>;
}
