/// <reference types="tampermonkey" />
export declare function fetchWithRetry(input: RequestInfo, init?: RequestInit): Promise<Response>;
export declare function fetchWithTimeout(input: string, options?: RequestInit, timeout?: number): Promise<Response>;
export interface GfetchRequestInit {
    method?: "GET" | "HEAD" | "POST" | undefined;
    headers?: Record<string, string>;
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
    user?: string;
    password?: string;
}
export declare function gfetch(url: string, { method, headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, user, password, }?: GfetchRequestInit): Promise<Tampermonkey.Response<object>>;
export declare function getText(input: RequestInfo, charset?: string, init?: RequestInit, test?: (response: Response) => Promise<boolean>): Promise<string | void>;
export declare function getHtmlDOM(input: RequestInfo, charset?: string, init?: RequestInit, test?: (response: Response) => Promise<boolean>): Promise<Document>;
export declare function getHtmlDomWithRetry(input: RequestInfo, charset?: string, init?: RequestInit, test?: (response: Response) => Promise<boolean>): Promise<Document | null>;
export declare function ggetText(url: string, charset?: string, init?: GfetchRequestInit, test?: (response: Tampermonkey.Response<object>) => Promise<boolean>): Promise<string | void>;
export declare function ggetHtmlDOM(url: string, charset?: string, init?: GfetchRequestInit, test?: (response: Tampermonkey.Response<object>) => Promise<boolean>): Promise<Document>;
export declare function ggetHtmlDomWithRetry(url: string, charset?: string, init?: GfetchRequestInit, test?: (response: Tampermonkey.Response<object>) => Promise<boolean>): Promise<Document | null>;
export declare function getFrameContentEvent(url: string, timeout?: number, eventType?: "load" | "DOMContentLoaded", sandboxs?: string[]): Promise<Document | null>;
export declare function getFrameContentCondition(url: string, stopCondition: (frame: HTMLIFrameElement) => boolean, sandboxs?: string[]): Promise<Document | null>;
