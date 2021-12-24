import { BaseRuleClass } from "./rules";
import { SaveOptions } from "./save/save";
export declare enum Status {
    pending = 0,
    downloading = 1,
    failed = 2,
    finished = 3,
    aborted = 4,
    saved = 5
}
export interface BookAdditionalMetadate {
    cover?: AttachmentClass;
    attachments?: AttachmentClass[];
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
    saveOptions: SaveOptions;
    constructor(bookUrl: string, bookname: string, author: string, introduction: string | null, introductionHTML: HTMLElement | null, additionalMetadate: BookAdditionalMetadate, chapters: Chapter[]);
    private toJSON;
}
export interface ChapterAdditionalMetadate {
    lastModified?: number;
    tags?: string[];
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
    chapterParse: BaseRuleClass["chapterParse"];
    charset: string;
    options: object;
    status: Status;
    retryTime: number;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: AttachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
    chapterHtmlFileName: string | number;
    constructor(bookUrl: string, bookname: string, chapterUrl: string, chapterNumber: number, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, sectionName: string | null, sectionNumber: number | null, sectionChapterNumber: number | null, chapterParse: BaseRuleClass["chapterParse"], charset: string, options: object);
    init(): Promise<this>;
    private parse;
    private toJSON;
}
export declare class AttachmentClass {
    url: string;
    name: string;
    mode: "naive" | "TM";
    headers?: {
        [index: string]: string;
    };
    private defaultHeader;
    status: Status;
    retryTime: number;
    imageBlob: Blob | null | void;
    comments: string;
    constructor(imageUrl: string, name: string, mode: "naive" | "TM");
    init(): Promise<Blob | null>;
    private downloadImage;
    private tmDownloadImage;
    private toJSON;
}
export declare class ExpectError extends Error {
}
