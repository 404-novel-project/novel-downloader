import { ruleClass } from "./rules";
import { saveOptions } from "./index_helper";
export declare enum Status {
    pending = 0,
    downloading = 1,
    failed = 2,
    finished = 3,
    aborted = 4
}
export interface BookAdditionalMetadate {
    cover?: attachmentClass;
    attachments?: attachmentClass[];
    tags?: string[];
    lastModified?: number;
    serires?: string;
    seriresNumber?: number;
    ids?: string[] | string;
    publisher?: string;
    languages?: string;
}
export declare class Book {
    bookUrl: string;
    bookname: string;
    author: string;
    introduction: string | null;
    introductionHTML: HTMLElement | null;
    additionalMetadate: BookAdditionalMetadate;
    chapters: Chapter[];
    saveOptions: saveOptions;
    constructor(bookUrl: string, bookname: string, author: string, introduction: string | null, introductionHTML: HTMLElement | null, additionalMetadate: BookAdditionalMetadate, chapters: Chapter[]);
}
export interface ChapterAdditionalMetadate {
    lastModified?: number;
}
export declare class Chapter {
    bookUrl: string;
    bookname: string;
    chapterUrl: string;
    chapterNumber: number;
    chapterName: string | null;
    isVIP: boolean;
    isPaid: boolean | null;
    sectionName: string | null;
    sectionNumber: number | null;
    sectionChapterNumber: number | null;
    chapterParse: ruleClass["chapterParse"];
    charset: string;
    options: object;
    status: Status;
    retryTime: number;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: attachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
    constructor(bookUrl: string, bookname: string, chapterUrl: string, chapterNumber: number, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, sectionName: string | null, sectionNumber: number | null, sectionChapterNumber: number | null, chapterParse: ruleClass["chapterParse"], charset: string, options: object);
    init(): Promise<this>;
    private parse;
}
export declare class attachmentClass {
    url: string;
    name: string;
    mode: "naive" | "TM";
    headers?: {
        [index: string]: string;
    };
    private defaultHeader;
    status: Status;
    retryTime: number;
    imageBlob: Blob | null;
    constructor(imageUrl: string, name: string, mode: "naive" | "TM");
    init(): Promise<Blob | null>;
    private downloadImage;
    private tmDownloadImage;
}
export declare class ExpectError extends Error {
}
