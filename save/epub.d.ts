import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { Options, SaveOptions } from "./options";
export declare class EPUB extends Options {
    private contentOpf;
    private metadata;
    private manifest;
    private spine;
    private guide;
    private ncx;
    private navMap;
    private toc;
    private tocBody;
    private book;
    private chapters;
    private epubZip;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    private addAttachment;
    addChapter(chapter: Chapter, suffix?: string): Promise<void>;
    private genChapterHtmlFile;
    saveEpub(): Promise<void>;
}
