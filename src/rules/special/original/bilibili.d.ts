import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class MangaBilibili extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOption): Promise<ChapterParseObject>;
}
interface chapterOption {
    comic_id: number;
    ep_id: number;
    nov: string;
}
export {};
