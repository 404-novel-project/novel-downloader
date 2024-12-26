import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Book } from "../../../main/Book";
export declare class ihuaben extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object): Promise<ChapterParseObject>;
}
