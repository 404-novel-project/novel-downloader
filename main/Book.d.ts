import { SaveOptions } from "../save/save";
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
    languages?: string;
}
export declare class Book {
    bookUrl: string;
    ToCUrl?: string;
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
