import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Gongzicp extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: ChapterOption): Promise<ChapterParseObject>;
}
interface ChapterOption {
    novel_id: number;
    chapter_id: number;
}
export {};
