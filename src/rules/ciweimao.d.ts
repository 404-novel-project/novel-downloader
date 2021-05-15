import { BookAdditionalMetadate, Chapter } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
export declare class ciweimao implements ruleClass {
    imageMode: "naive" | "TM";
    concurrencyLimit: number;
    maxRunLimit: number;
    constructor();
    bookParse(chapterParse: ruleClass["chapterParse"]): Promise<{
        bookUrl: string;
        bookname: string;
        author: string;
        introduction: string | null;
        introductionHTML: HTMLElement | null;
        additionalMetadate: BookAdditionalMetadate;
        chapters: Chapter[];
    }>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string): Promise<chapterParseObject>;
}
