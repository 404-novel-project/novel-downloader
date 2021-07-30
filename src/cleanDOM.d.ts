import { attachmentClass } from "./main";
export interface BuilderOption {
    keepImageName?: boolean;
}
export interface Builder {
    dom: HTMLElement;
    text: string;
    images: attachmentClass[];
    imgMode: "naive" | "TM";
    option: BuilderOption | null;
}
export declare function walk(dom: HTMLElement, builder: Builder): Promise<Builder>;
