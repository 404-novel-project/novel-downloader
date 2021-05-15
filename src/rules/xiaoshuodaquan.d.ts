import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass } from "../rules";
export declare class xiaoshuodaquan implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
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
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
        chapterName: string;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: attachmentClass[];
        additionalMetadate: null;
    } | {
        chapterName: string;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
        additionalMetadate: null;
    }>;
}
