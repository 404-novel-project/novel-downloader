import { Book, Chapter } from "../main";
export declare class SaveBook {
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
    private modifyTocStyleText;
    private saveMetaJson;
    private saveStubChapters;
    private saveChapters;
    private saveSections;
    private getChapterNumberToSave;
    addChapter(chapter: Chapter, suffix?: string): Promise<void>;
    getchapterName(chapter: Chapter): string;
    private genMetaDateTxt;
    private addImageToZip;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(chapterObj: Chapter): Blob;
    genChapterHtmlFile(chapterObj: Chapter): Blob;
    chapterSort(a: Chapter, b: Chapter): 0 | 1 | -1;
}
export interface SectionObj {
    sectionName: string | null;
    sectionNumber: number | null;
    chpaters: Chapter[];
}
export interface SectionsObj {
    [sectionNumber: number]: SectionObj;
}
export declare function getSectionsObj(chapters: Chapter[]): SectionObj[];
export interface SaveOptions {
    mainStyleText?: SaveBook["mainStyleText"];
    tocStyleText?: SaveBook["tocStyleText"];
    getchapterName?: SaveBook["getchapterName"];
    genSectionText?: SaveBook["genSectionText"];
    genChapterText?: SaveBook["genChapterText"];
    genSectionHtmlFile?: SaveBook["genSectionHtmlFile"];
    genChapterHtmlFile?: SaveBook["genChapterHtmlFile"];
    chapterSort?: SaveBook["chapterSort"];
}
export declare function saveOptionsValidate(data: any): boolean;
export declare function getSaveBookObj(book: Book, options: SaveOptions): SaveBook;
