import { BookAdditionalMetadate, Chapter } from "../main";
import { ruleClass, ruleClassNamespace, chapterParseObject } from "../rules";
export declare class gongzicp implements ruleClass {
    imageMode: "naive" | "TM";
    concurrencyLimit: number;
    constructor();
    bookParse(chapterParse: ruleClassNamespace.chapterParse): Promise<{
        bookUrl: string;
        bookname: string;
        author: string;
        introduction: string;
        introductionHTML: HTMLElement;
        additionalMetadate: BookAdditionalMetadate;
        chapters: Chapter[];
    }>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string): Promise<chapterParseObject>;
}
