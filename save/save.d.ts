import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { SaveOptions } from "./options";
export declare class SaveBook {
    private txt;
    private epub;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    addChapter(chapter: Chapter): Promise<void>;
    private saveTxt;
    private saveEpub;
    private saveLog;
    save(): Promise<void>;
}
