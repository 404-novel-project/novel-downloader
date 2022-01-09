import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { SaveOptions } from "./options";
export declare class SaveBook {
    private txt;
    private zip;
    private epub;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    addChapter(chapter: Chapter): Promise<void>;
    saveTxt(): void;
    saveZip(): Promise<void>;
    saveEpub(): Promise<void>;
}
