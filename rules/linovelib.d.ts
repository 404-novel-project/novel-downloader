import { Book } from "../main";
import { BaseRuleClass } from "../rules";
export declare class Linovelib extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<import("../rules").ChapterParseObject>;
}
