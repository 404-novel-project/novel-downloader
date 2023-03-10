import { Book } from "../main/Book";
export declare class Raw {
    private readonly book;
    private readonly epubZip;
    constructor(book: Book);
    saveRaw(): Promise<void>;
}
