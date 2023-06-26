import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Ttkan extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: Record<string, any>): Promise<ChapterParseObject>;
}
