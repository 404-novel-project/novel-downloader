import { saveOptions } from "./save";
import { attachmentClass, ChapterAdditionalMetadate, Book } from "./main";
export interface chapterParseObject {
    chapterName: string | null;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: attachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
}
export declare abstract class BaseRuleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
    maxRunLimit?: number;
    saveOptions?: saveOptions;
    private audio?;
    book?: Book;
    constructor();
    abstract bookParse(): Promise<Book>;
    abstract chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object): Promise<chapterParseObject>;
    run(): Promise<Book | undefined>;
}
