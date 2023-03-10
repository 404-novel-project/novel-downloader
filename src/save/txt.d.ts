import { Book } from "../main/Book";
import { Options, SaveOptions } from "./options";
export declare class TXT extends Options {
    private readonly book;
    private readonly savedTextArray;
    private readonly saveFileNameBase;
    constructor(book: Book, options?: SaveOptions);
    saveTxt(): void;
}
