import { AttachmentClass } from "../main";
interface BuilderOption {
    keepImageName?: boolean;
}
export declare function cleanDOM(DOM: Element, imgMode: "naive" | "TM", option?: BuilderOption | null): Promise<{
    dom: HTMLElement;
    text: string;
    images: AttachmentClass[];
}>;
export declare function htmlTrim(dom: HTMLElement): void;
export {};
