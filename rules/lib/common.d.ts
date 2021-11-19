import { AttachmentClass } from "../../main";
export declare function introDomHandle(introDom: (Element | HTMLElement) | null, domPatch?: (introDom: HTMLElement) => HTMLElement): Promise<[string | null, HTMLElement | null, AttachmentClass[] | null]>;
export declare function nextPageParse(chapterName: string | null, chapterUrl: string, charset: string, selector: string, contentPatch: (_content: HTMLElement, doc: Document) => HTMLElement, getNextPage: (doc: Document) => string, continueCondition: (_content: HTMLElement, nextLink: string) => boolean): Promise<{
    chapterName: string | null;
    contentRaw: HTMLDivElement;
    contentText: string;
    contentHTML: HTMLElement;
    contentImages: AttachmentClass[];
    additionalMetadate: null;
}>;
