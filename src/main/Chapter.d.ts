import { BaseRuleClass } from "../rules";
import { Status } from "./main";
import { AttachmentClass } from "./Attachment";
import { Book } from "./Book";
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
    chapterHtmlFileName: string;
    book: Book;
    constructor({ bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset, options, }: {
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
        options: Record<string, any>;
    });
    init(): Promise<this>;
    private parse;
    private toJSON;
}
