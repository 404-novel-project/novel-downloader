import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Mangguoshufang extends BaseRuleClass {
    constructor();
    private getChapterListPageUrl;
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: {
        chapterId: string;
    }): Promise<ChapterParseObject>;
}
