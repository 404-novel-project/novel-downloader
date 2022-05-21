import { SaveOptions } from "../save/options";
import { AttachmentClass } from "./Attachment";
import { Chapter } from "./Chapter";
export interface BookAdditionalMetadate {
    cover?: AttachmentClass;
    attachments?: AttachmentClass[];
    tags?: string[];
    lastModified?: number;
    serires?: string;
    seriresNumber?: number;
    ids?: string[] | string;
    publisher?: string;
    language?: string;
}
export interface saveType {
    epub: boolean;
    txt: boolean;
    raw: false | {
        ext: string;
    };
}
export declare class Book {
    private _bookUrl;
    private _ToCUrl?;
    saveType: saveType;
    readonly bookname: string;
    readonly author: string;
    readonly introduction: string | null;
    readonly introductionHTML: HTMLElement | null;
    readonly additionalMetadate: BookAdditionalMetadate;
    chapters: Chapter[];
    saveOptions: SaveOptions;
    constructor({ bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters, }: {
        bookUrl: string;
        bookname: string;
        author: string;
        introduction: string | null;
        introductionHTML: HTMLElement | null;
        additionalMetadate: BookAdditionalMetadate;
        chapters: Chapter[];
    });
    set bookUrl(v: string);
    get bookUrl(): string;
    set ToCUrl(v: string | undefined);
    get ToCUrl(): string | undefined;
    private toJSON;
}
