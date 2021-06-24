import { attachmentClass } from "./main";
export declare let _GM_info: GM_info | GM["info"];
export declare let _GM_setValue: GM_setValue | GM["setValue"] | null;
export declare let _GM_getValue: GM_getValue | GM["getValue"] | null;
export declare let _GM_deleteValue: GM_deleteValue | GM["deleteValue"] | null;
export declare function cleanDOM(DOM: Element, imgMode: "naive" | "TM"): {
    dom: HTMLElement;
    text: string;
    images: attachmentClass[];
};
export declare function getText(url: string, charset: string | undefined, init?: RequestInit | undefined): Promise<string>;
export declare function getHtmlDOM(url: string, charset: string | undefined, init?: RequestInit | undefined): Promise<Document>;
export declare function ggetText(url: string, charset: string | undefined, init?: gfetch_request_options | undefined): Promise<string>;
export declare function ggetHtmlDOM(url: string, charset: string | undefined, init?: gfetch_request_options | undefined): Promise<Document>;
export declare function rm(selector: string, all: boolean | undefined, dom: HTMLElement): void;
interface gfetch_request_options {
    method?: string;
    headers?: object;
    data?: string;
    cookie?: string;
    binary?: boolean;
    nocache?: boolean;
    revalidate?: boolean;
    timeout?: number;
    context?: object;
    responseType?: "arraybuffer" | "blob" | "json";
    overrideMimeType?: string;
    anonymous?: boolean;
    username?: string;
    password?: string;
}
export declare function gfetch(url: string, { method, headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, username, password, }?: gfetch_request_options): Promise<GM_xmlhttpResponse>;
export declare function concurrencyRun(list: object[], limit: number, asyncHandle: Function): Promise<Function[]>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function getAttachmentClassCache(url: string, name: string): attachmentClass | undefined;
export declare function putAttachmentClassCache(attachmentClass: attachmentClass): boolean;
export declare function sandboxed(code: string): any;
export declare function storageAvailable(type: string): any;
export {};
