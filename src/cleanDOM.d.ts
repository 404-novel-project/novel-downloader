import { attachmentClass } from "./main";
export interface Builder {
    dom: HTMLElement;
    text: string;
    images: attachmentClass[];
    imgMode: "naive" | "TM";
}
export declare function walk(dom: HTMLElement, builder: Builder): Promise<Builder>;
