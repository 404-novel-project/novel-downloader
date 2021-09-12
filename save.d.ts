import { Book, Chapter } from "./main";
export declare class saveBook {
    protected book: Book;
    private chapters;
    mainStyleText: string;
    tocStyleText: string;
    private savedZip;
    private savedTextArray;
    private saveFileNameBase;
    private _sections;
    private _savedChapters;
    constructor(book: Book);
    saveTxt(): void;
    saveLog(): void;
    saveZip(runSaveChapters?: boolean): Promise<void>;
    private saveToC;
    private saveChapters;
    addChapter(chapter: Chapter): void;
    getchapterName(chapter: Chapter): string;
    private genMetaDateTxt;
    private addImageToZip;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(sectionName: string): Blob;
    genChapterHtmlFile(chapterName: string, DOM: HTMLElement, chapterUrl: string): Blob;
    private chapterSort;
}
export interface saveOptions {
    mainStyleText?: saveBook["mainStyleText"];
    tocStyleText?: saveBook["tocStyleText"];
    getchapterName?: saveBook["getchapterName"];
    genSectionText?: saveBook["genSectionText"];
    genChapterText?: saveBook["genChapterText"];
    genSectionHtmlFile?: saveBook["genSectionHtmlFile"];
    genChapterHtmlFile?: saveBook["genChapterHtmlFile"];
}
export declare function saveOptionsValidate(data: any): boolean;
export declare function getSaveBookObj(book: Book, options: saveOptions): saveBook;
