import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Xrzww extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<ChapterParseObject>;
}
interface chapterOptions {
    nid: number;
    vid: number;
    chapter_id: number;
    chapter_order: number;
    apiBase: string;
    headers: Record<string, string>;
}
export {};
