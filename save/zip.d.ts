import { Chapter } from "../main/Chapter";
import { Book } from "../main/Book";
import { Options, SaveOptions } from "./options";
import { Template } from "nunjucks";
export declare const section: Template;
export declare const chapterTemplt: Template;
export declare class ZIP extends Options {
    private book;
    private chapters;
    private savedZip;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    saveLog(): Promise<void>;
    saveZip(): Promise<void>;
    addChapter(chapter: Chapter, suffix?: string): Promise<void>;
    private genChapterHtmlFile;
    private addWebCSS;
    private addAttachmentToZip;
}
