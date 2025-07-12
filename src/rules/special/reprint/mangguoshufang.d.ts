import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { WeimengChapterOptions } from "../lib/weimengcms";
export declare class Mangguoshufang extends BaseRuleClass {
    private weimengClient;
    constructor();
    private ensureWeimengClient;
    private getChapterListPageUrl;
    private extractBookMetadata;
    private fetchChapterList;
    private createChapterObjects;
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: WeimengChapterOptions): Promise<ChapterParseObject>;
}
