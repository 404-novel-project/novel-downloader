import { BaseRuleClass } from "../../rules";
export declare class C25zw extends BaseRuleClass {
    constructor();
    bookParse(): Promise<import("../../main").Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<import("../../rules").ChapterParseObject>;
}
