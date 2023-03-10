import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Book } from "../../../main/Book";
export declare class Myrics extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: chapterOption): Promise<ChapterParseObject>;
}
interface chapterOption {
    bookId: string;
    chapterId: string;
    created_at: string;
}
export {};
