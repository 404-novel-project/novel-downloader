import { GfetchRequestInit } from "../../../lib/http";
import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Myrics extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../../main/Attachment").AttachmentClass[];
        additionalMetadate: null;
    }>;
}
interface chapterOptions {
    bookId: string;
    chapterId: number;
    init: GfetchRequestInit;
}
export {};
