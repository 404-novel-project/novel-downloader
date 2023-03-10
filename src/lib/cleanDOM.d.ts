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
export declare function convertBr(dom: HTMLElement, force?: boolean): HTMLElement;
export declare function convertFixWidthText(node: Text, width?: number, out?: HTMLDivElement): HTMLElement;
export declare function convertFixWidth(node: HTMLElement, width?: number): void;
export declare function isFixWidth(node: Text | HTMLElement, width?: number): boolean;
export {};
