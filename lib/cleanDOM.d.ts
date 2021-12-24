import { AttachmentClass } from "../main";
interface Options {
    keepImageName?: boolean;
}
interface Output {
    dom: HTMLElement;
    text: string;
    images: AttachmentClass[];
}
export declare function cleanDOM(elem: Element, imgMode: "naive" | "TM", options?: Options): Promise<Output>;
export declare function htmlTrim(dom: HTMLElement): void;
export {};
