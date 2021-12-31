import { AttachmentClass } from "../main/Attachment";
import { ReferrerMode } from "../main/main";
export interface Options {
    keepImageName?: boolean;
    referrerMode?: ReferrerMode;
    customReferer?: string;
}
interface Output {
    dom: HTMLElement;
    text: string;
    images: AttachmentClass[];
}
export declare function cleanDOM(elem: Element, imgMode: "naive" | "TM", options?: Options): Promise<Output>;
export declare function htmlTrim(dom: HTMLElement): void;
export declare function convertFixWidthText(node: Text): HTMLElement;
export {};
