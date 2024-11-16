import { Book } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
export declare class XRUnionread extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string | null;
        contentRaw: HTMLPreElement;
        contentText: string;
        contentHTML: HTMLDivElement;
        contentImages: null;
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
