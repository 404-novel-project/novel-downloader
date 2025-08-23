import { GfetchRequestInit } from "../lib/http";
import { ReferrerMode, Status } from "./main";
export declare class AttachmentClass {
    readonly url: string;
    name: string;
    readonly mode: "naive" | "TM";
    readonly DEFAULT_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";
    status: Status;
    retryTime: number;
    Blob: Blob | null | void;
    comments?: string;
    private referrerMode;
    private _init;
    private _TMinit;
    constructor(url: string, name: string, mode: "naive" | "TM", referrerMode?: ReferrerMode, customReferer?: string, init?: {
        init: RequestInit;
        TMinit: GfetchRequestInit;
    });
    init(): Promise<Blob | null>;
    private download;
    private tmDownload;
    private toJSON;
}
