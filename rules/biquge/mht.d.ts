import { BaseRuleClass } from "../../rules";
export declare class Mht extends BaseRuleClass {
    constructor();
    bookParse(): Promise<import("../../main").Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../main").AttachmentClass[];
        additionalMetadate: null;
    }>;
}
