import { SaveBook, SaveOptions } from "./save/save";
import { AttachmentClass, ChapterAdditionalMetadate, Book, Chapter } from "./main";
export interface ChapterParseObject {
    chapterName: string | null;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: AttachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
}
export declare abstract class BaseRuleClass {
    imageMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
    maxRunLimit?: number;
    saveOptions?: SaveOptions;
    book?: Book;
    private audio?;
    constructor();
    abstract bookParse(): Promise<Book>;
    abstract chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object): Promise<ChapterParseObject>;
    run(): Promise<Book | undefined>;
    protected preTest(): boolean;
    protected preWarning(): boolean;
    protected preHook(): boolean;
    protected postCallback(): void;
    protected postHook(): boolean;
    protected catchError(error: Error): void;
    protected getSave(book: Book): SaveBook;
    protected getChapters(book: Book): Chapter[];
    protected initChapters(book: Book, saveBookObj: SaveBook): Promise<Chapter[]>;
    postChapterParseHook(chapter: Chapter, saveBookObj: SaveBook): Promise<Chapter>;
}
