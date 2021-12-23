import { Book, Chapter } from "../main";
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
export declare class SaveBook {
    protected book: Book;
    protected streamZip: boolean;
    private chapters;
    mainStyleText: string;
    tocStyleText: string;
    private savedZip;
    private savedTextArray;
    private saveFileNameBase;
    private _sections;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    saveTxt(): void;
    saveLog(): void;
    saveZip(runSaveChapters?: boolean): Promise<void>;
    addChapter(chapter: Chapter, suffix?: string): Promise<void>;
    getchapterName(chapter: Chapter): string;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(chapterObj: Chapter): Blob;
    genChapterHtmlFile(chapterObj: Chapter): Blob;
    chapterSort(a: Chapter, b: Chapter): 0 | 1 | -1;
    private getChapterNumberToSave;
    private genMetaDateTxt;
    private addImageToZip;
}
