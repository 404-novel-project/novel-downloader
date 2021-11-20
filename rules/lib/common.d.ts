import { AttachmentClass } from "../../main";
import { ChapterParseObject } from "../../rules";
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
export declare function nextPageParse(options: NextPageParseOptions): Promise<ChapterParseObject>;
export {};
