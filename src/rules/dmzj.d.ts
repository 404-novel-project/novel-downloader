import { BookAdditionalMetadate, attachmentClass, Chapter } from "../main";
import { ruleClass, ruleClassNamespace } from "../rules";
export declare class dmzj implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(chapterParse: ruleClassNamespace.chapterParse): Promise<{
        bookUrl: string;
        bookname: string;
        author: string;
        introduction: string | null;
        additionalMetadate: BookAdditionalMetadate;
        chapters: Chapter[];
    }>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string): Promise<{
        chapterName: string | null;
        contentRaw: HTMLDivElement;
        contentText: string;
        contentHTML: HTMLElement;
        contentImages: attachmentClass[];
    } | {
        chapterName: string | null;
        contentRaw: null;
        contentText: null;
        contentHTML: null;
        contentImages: null;
    }>;
}
