import { Book, Chapter } from "../main";
export declare class saveBook {
    protected book: Book;
    private chapters;
    mainStyleText: string;
    tocStyleText: string;
    private savedZip;
    private savedTextArray;
    private saveFileNameBase;
    private _sections;
    constructor(book: Book);
    saveTxt(): void;
    saveLog(): void;
    saveZip(runSaveChapters?: boolean): Promise<void>;
    private saveToC;
    private saveChapters;
    private saveSections;
    private getChapterNumberToSave;
    addChapter(chapter: Chapter): void;
    getchapterName(chapter: Chapter): string;
    private genMetaDateTxt;
    private addImageToZip;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(chapterObj: Chapter): Blob;
    genChapterHtmlFile(chapterObj: Chapter): Blob;
    chapterSort(a: Chapter, b: Chapter): 0 | 1 | -1;
}
export interface sectionObj {
    sectionName: string | null;
    sectionNumber: number | null;
    chpaters: Chapter[];
}
export interface sectionsObj {
    [sectionNumber: number]: sectionObj;
}
export declare function getSectionsObj(chapters: Chapter[]): sectionsObj;
export interface saveOptions {
    mainStyleText?: saveBook["mainStyleText"];
    tocStyleText?: saveBook["tocStyleText"];
    getchapterName?: saveBook["getchapterName"];
    genSectionText?: saveBook["genSectionText"];
    genChapterText?: saveBook["genChapterText"];
    genSectionHtmlFile?: saveBook["genSectionHtmlFile"];
    genChapterHtmlFile?: saveBook["genChapterHtmlFile"];
    chapterSort?: saveBook["chapterSort"];
}
export declare function saveOptionsValidate(data: any): boolean;
export declare function getSaveBookObj(book: Book, options: saveOptions): saveBook;
