import { Book } from "../../../main";
import { BaseRuleClass } from "../../../rules";
import { SaveOptions } from "../../../save/save";
export declare class Fushuwang extends BaseRuleClass {
    saveOptions: SaveOptions;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: import("../../../main").AttachmentClass[];
        additionalMetadate: null;
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
