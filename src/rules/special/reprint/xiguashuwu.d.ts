import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class Xiguashuwu extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../../main/Attachment").AttachmentClass[];
        additionalMetadate: null;
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
    private getContentFromMultiplePages;
    private processPageContent;
    private decryptSecondPageContent;
    private decryptAESPageContent;
    private processImages;
    private getNextPageUrl;
    private mergeParagraphsAcrossPages;
    private processFirstPageContent;
}
