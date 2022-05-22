import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Book } from "../../../main/Book";
export declare class Iqingguo extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: chapterOptions): Promise<ChapterParseObject>;
}
interface chapterOptions {
    bookId: string;
    chapterId: string;
}
export {};
