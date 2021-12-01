export interface GfetchRequestOptions {
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
export declare function gfetch(url: string, { method, headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, username, password, }?: GfetchRequestOptions): Promise<GM_xmlhttpResponse>;
export declare function getText(url: string, charset?: string, init?: RequestInit): Promise<string | void>;
export declare function getHtmlDOM(url: string, charset?: string, init?: RequestInit): Promise<Document>;
export declare function getHtmlDomWithRetry(url: string, charset?: string, init?: RequestInit): Promise<Document | null>;
export declare function ggetText(url: string, charset?: string, init?: GfetchRequestOptions): Promise<string | void>;
export declare function ggetHtmlDOM(url: string, charset?: string, init?: GfetchRequestOptions): Promise<Document>;
export declare function ggetHtmlDomWithRetry(url: string, charset?: string, init?: GfetchRequestOptions): Promise<Document | null>;
