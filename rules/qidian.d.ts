import { Book } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
export declare class qidian implements ruleClass {
    imageMode: "naive" | "TM";
    concurrencyLimit: number;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
