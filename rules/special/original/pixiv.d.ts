import { ChapterAdditionalMetadate } from "../../../main/Chapter";
import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Pixiv extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: chapterOptions): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../../main/Attachment").AttachmentClass[];
        additionalMetadate: ChapterAdditionalMetadate;
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
interface chapterOptions {
    id: string;
    lang: string | null;
    userId: string | undefined;
}
export {};
