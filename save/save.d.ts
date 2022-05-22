import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { SaveOptions } from "./options";
export declare class SaveBook {
    private saveType;
    private txt;
    private epub;
    private raw;
    constructor(book: Book, streamZip: boolean, options?: SaveOptions);
    private static saveLog;
    addChapter(chapter: Chapter): Promise<void>;
    save(): Promise<void>;
    private saveTxt;
    private saveEpub;
    private saveRaw;
}
