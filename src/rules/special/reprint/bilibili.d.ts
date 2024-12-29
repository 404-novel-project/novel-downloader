import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Bilibili extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOption): Promise<{
        chapterName: string | null;
        contentRaw: HTMLElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../../main/Attachment").AttachmentClass[];
        additionalMetadate: null;
    }>;
}
interface chapterOption {
    chapterimg: string[];
}
export {};