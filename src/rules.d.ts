import { AttachmentClass } from "./main/Attachment";
import { Chapter, ChapterAdditionalMetadate } from "./main/Chapter";
import { Book, saveType } from "./main/Book";
import { SaveBook } from "./save/save";
import { SaveOptions } from "./save/options";
export interface ChapterParseObject {
    chapterName: string | null;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: AttachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
}
export declare abstract class BaseRuleClass {
    attachmentMode: "naive" | "TM";
    charset: string;
    concurrencyLimit: number;
    sleepTime: number;
    maxSleepTime: number;
    streamZip: boolean;
    needLogin: boolean;
    nsfw: boolean;
    maxRunLimit?: number;
    saveOptions?: SaveOptions;
    book?: Book;
    protected saveType?: saveType;
    private bcWorker;
    private bcWorkerMessages;
    private audio?;
    protected constructor();
    abstract bookParse(): Promise<Book>;
    abstract chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: Record<string, any>): Promise<ChapterParseObject>;
    run(): Promise<Book | undefined>;
    protected preHook(): Promise<void>;
    protected initChapters(book: Book, saveBookObj: SaveBook): Promise<Chapter[]>;
    protected postHook(): void;
    protected catchError(error: Error): void;
}
