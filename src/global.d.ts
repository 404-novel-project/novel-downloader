import { saveAs } from "file-saver";
import { LocalStorageExpired } from "./lib/localStorageExpired";
import { fetchAndParse, gfetchAndParse, parse } from "./lib/readability";
import { Chapter } from "./main/Chapter";
import { Book } from "./main/Book";
import { BaseRuleClass } from "./rules";
import { SectionObj } from "./save/misc";
import { SaveOptions } from "./save/options";
export interface WindowObject extends Window {
    workerId: string;
    downloading: boolean;
    localStorageExpired: LocalStorageExpired;
    stopController: AbortController;
    stopFlag: AbortSignal;
    failedCount: number;
    _sections?: SectionObj[];
    _book?: Book;
    _url?: string;
}
export type GmWindow = WindowObject & Window & typeof globalThis;
interface UnsafeWindowObject {
    stopController: AbortController;
    rule?: BaseRuleClass;
    book?: Book;
    save?: (book: Book, saveOptions: SaveOptions) => void;
    saveAs?: typeof saveAs;
    chapterFilter?: (chapter: Chapter) => boolean;
    customFinishCallback?: () => void;
    saveOptions?: SaveOptions;
    readability?: {
        parse: typeof parse;
        fetchAndParse: typeof fetchAndParse;
        gfetchAndParse: typeof gfetchAndParse;
    };
    tokenOptions?: {
        Jjwxc: string | {
            token: string;
            user_key: string;
        };
        Xrzww: {
            deviceIdentify: string;
            Authorization: string;
        };
    };
}
export type UnsafeWindow = UnsafeWindowObject & Window & typeof globalThis;
export declare function init(): void;
export {};
