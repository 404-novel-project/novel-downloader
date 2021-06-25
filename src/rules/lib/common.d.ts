import { attachmentClass } from "../../main";
export declare function introDomHandle(introDom: (Element | HTMLElement) | null, domPatch?: ((introDom: HTMLElement) => HTMLElement) | undefined): Promise<[string | null, HTMLElement | null, attachmentClass[] | null]>;
