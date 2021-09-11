export interface gfetch_request_options {
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
export declare function getText(url: string, charset: string | undefined, init?: RequestInit | undefined): Promise<string>;
export declare function getHtmlDOM(url: string, charset: string | undefined, init?: RequestInit | undefined): Promise<Document>;
export declare function ggetText(url: string, charset: string | undefined, init?: gfetch_request_options | undefined): Promise<string>;
export declare function ggetHtmlDOM(url: string, charset: string | undefined, init?: gfetch_request_options | undefined): Promise<Document>;
