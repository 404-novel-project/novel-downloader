import { ReferrerMode, Status } from "./main";
export declare class AttachmentClass {
    url: string;
    name: string;
    mode: "naive" | "TM";
    referrerMode: ReferrerMode;
    customReferer: string;
    status: Status;
    retryTime: number;
    private defaultHeader;
    imageBlob: Blob | null | void;
    comments: string;
    constructor(url: string, name: string, mode: "naive" | "TM", referrerMode?: ReferrerMode, customReferer?: string);
    init(): Promise<Blob | null>;
    private downloadImage;
    private tmDownloadImage;
    private toJSON;
}
