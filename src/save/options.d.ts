import { Chapter } from "../main/Chapter";
import { Book } from "../main/Book";
declare class Common {
    genMetaDateTxt(book: Book): string;
    getChapterNumberToSave(chapter: Chapter, chapters: Chapter[]): string;
}
export interface SaveOptions {
    mainStyleText?: string;
    tocStyleText?: string;
    getchapterName?: Options["getchapterName"];
    genSectionText?: Options["genSectionText"];
    genChapterText?: Options["genChapterText"];
    genChapterEpub?: Options["genChapterEpub"];
    chapterSort?: Options["chapterSort"];
}
export declare function saveOptionsValidate(data: any): boolean;
export declare class Options extends Common {
    mainStyleText: string;
    tocStyleText: string;
    getchapterName(chapter: Chapter): string;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genChapterEpub(contentXHTML: string): string;
    chapterSort(a: Chapter, b: Chapter): number;
}
export {};
