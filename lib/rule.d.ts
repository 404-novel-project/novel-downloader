import { AttachmentClass } from "../main/Attachment";
import { Chapter } from "../main/Chapter";
import { ChapterParseObject } from "../rules";
export declare function introDomHandle(introDom: (Element | HTMLElement) | null, domPatch?: (introDom: HTMLElement) => HTMLElement): Promise<[string | null, HTMLElement | null, AttachmentClass[] | null]>;
interface NextPageParseOptions {
    chapterName: string | null;
    chapterUrl: string;
    charset: string;
    selector: string;
    contentPatch: (_content: HTMLElement, doc: Document) => HTMLElement;
    getNextPage: (doc: Document) => string;
    continueCondition: (_content: HTMLElement, nextLink: string) => boolean;
    enableCleanDOM?: boolean;
}
export declare function nextPageParse({ chapterName, chapterUrl, charset, selector, contentPatch, getNextPage, continueCondition, enableCleanDOM, }: NextPageParseOptions): Promise<ChapterParseObject>;
export declare function getSectionName(chapterElement: Element, sections: NodeListOf<Element>, getName: (sElem: Element) => string): string | null;
export declare function centerDetct(element: Element): [boolean, Element, number];
export declare function reIndex(chapters: Chapter[]): Chapter[];
export declare function deDuplicate(chapters: Chapter[]): Chapter[];
export {};
