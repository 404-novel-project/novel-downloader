import { Book } from "../main/Book";
import { Options, SaveOptions } from "./options";
export declare class TXT extends Options {
    private book;
    private savedTextArray;
    private saveFileNameBase;
    constructor(book: Book, options?: SaveOptions);
    saveTxt(): void;
}
