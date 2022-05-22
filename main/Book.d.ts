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
    private _bookUrl;
    get bookUrl(): string;
    set bookUrl(v: string);
    private _ToCUrl?;
    get ToCUrl(): string | undefined;
    set ToCUrl(v: string | undefined);
    private toJSON;
}
