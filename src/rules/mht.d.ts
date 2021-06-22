import { ruleClass } from "../rules";
export declare class mht implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(): Promise<import("../main").Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../main").attachmentClass[];
        additionalMetadate: null;
    }>;
}
