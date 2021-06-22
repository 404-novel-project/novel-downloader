import { Book } from "../main";
import { ruleClass, chapterParseObject } from "../rules";
export declare class ciweimao implements ruleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
    maxRunLimit: number;
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<chapterParseObject>;
}
