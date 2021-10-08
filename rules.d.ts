import { saveBook, saveOptions } from "./save";
import { attachmentClass, ChapterAdditionalMetadate, Book, Chapter } from "./main";
export interface chapterParseObject {
    chapterName: string | null;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: attachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
}
export declare abstract class BaseRuleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
    maxRunLimit?: number;
    saveOptions?: saveOptions;
    book?: Book;
    private audio?;
    constructor();
    abstract bookParse(): Promise<Book>;
    abstract chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object): Promise<chapterParseObject>;
    run(): Promise<Book | undefined>;
    protected preTest(): boolean;
    protected preWarning(): boolean;
    protected preHook(): boolean;
    protected postCallback(): void;
    protected postHook(): boolean;
    protected catchError(error: Error): void;
    protected getSave(book: Book): saveBook;
    protected getChapters(book: Book): Chapter[];
    protected initChapters(book: Book, saveBookObj: saveBook): Promise<Chapter[]>;
    postChapterParseHook(obj: Chapter): Promise<Chapter>;
}
