import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Qidian extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    bookParse_www(): Promise<Book>;
    bookParse_book(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<ChapterParseObject>;
}
interface chapterOptions {
    _csrfToken: string;
    bookId: string;
    authorId: string;
    chapterId: string;
    limitFree: boolean;
}
export {};
