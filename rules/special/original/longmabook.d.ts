import { AttachmentClass } from "../../../main/Attachment";
import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Longmabook extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<{
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    } | {
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLDivElement;
        contentImages: AttachmentClass[];
        additionalMetadate: null;
    }>;
}
interface chapterOptions {
    bookId: string;
    bookwritercode: string;
}
export {};
