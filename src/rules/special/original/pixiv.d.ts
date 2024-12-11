/// <reference path="../../../../../src/rules/special/original/pixiv.d.ts" />
import { Book } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
export declare class Pixiv extends BaseRuleClass {
    constructor();
    bookParse(): Promise<Book>;
    chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: {
        id: string;
        lang: string;
        version: string;
        isWriteDescInContent?: boolean;
    }): Promise<ChapterParseObject>;
}
