import { attachmentClass } from "../main";
interface BuilderOption {
    keepImageName?: boolean;
}
export declare function cleanDOM(DOM: Element, imgMode: "naive" | "TM", option?: BuilderOption | null): Promise<{
    dom: HTMLElement;
    text: string;
    images: attachmentClass[];
}>;
export declare function htmlTrim(dom: HTMLElement): void;
export {};
