import { BookAdditionalMetadate, Chapter } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
export declare class qimao implements ruleClass {
    imageMode: "naive" | "TM";
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
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
