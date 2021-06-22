import { Book } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
export declare class qimao implements ruleClass {
    imageMode: "naive" | "TM";
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
