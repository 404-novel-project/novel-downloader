import { localStorageExpired } from "./lib/misc";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { saveOptions } from "./save/save";
import { parse, fetchAndParse, gfetchAndParse } from "./rules/lib/readability";
export interface newWindow extends Window {
    downloading: boolean;
    customStorage: localStorageExpired;
    stopFlag: boolean;
}
export interface newUnsafeWindow extends unsafeWindow {
    rule: BaseRuleClass;
    book: Book;
    save(book: Book, saveOptions: saveOptions): void;
    saveAs(obj: any): void;
    chapterFilter(chapter: Chapter): boolean;
    customFinishCallback(): void;
    saveOptions: saveOptions;
    readability: {
        parse: typeof parse;
        fetchAndParse: typeof fetchAndParse;
        gfetchAndParse: typeof gfetchAndParse;
    };
}
export declare function init(): void;
