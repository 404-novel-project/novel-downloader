import { localStorageExpired } from "./lib/misc";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { saveOptions } from "./save";
declare class Progress {
    private _totalChapterNumber;
    private _finishedChapterNumber;
    private _zipPercent;
    private progressStyleText;
    constructor();
    set totalChapterNumber(newTotalChapterNumber: number);
    get totalChapterNumber(): number;
    set finishedChapterNumber(newFinishedChapterNumber: number);
    get finishedChapterNumber(): number;
    set zipPercent(newZipPercent: number);
    get zipPercent(): number;
    reset(): void;
}
export interface newWindow extends Window {
    progress: Progress | undefined;
    downloading: boolean;
    customStorage: localStorageExpired;
}
export interface newUnsafeWindow extends unsafeWindow {
    rule: BaseRuleClass;
    book: Book;
    save(book: Book, saveOptions: saveOptions): void;
    saveAs(obj: any): void;
    chapterFilter(chapter: Chapter): boolean;
    customFinishCallback(): void;
    saveOptions: saveOptions;
}
export declare function init(): void;
export {};
