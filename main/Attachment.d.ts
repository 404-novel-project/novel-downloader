import { ReferrerMode, Status } from "./main";
export declare class AttachmentClass {
    url: string;
    name: string;
    mode: "naive" | "TM";
    referrerMode: ReferrerMode;
    customReferer: string;
    private defaultHeader;
    status: Status;
    retryTime: number;
    imageBlob: Blob | null | void;
    comments: string;
    constructor(url: string, name: string, mode: "naive" | "TM", referrerMode?: ReferrerMode, customReferer?: string);
    init(): Promise<Blob | null>;
    private downloadImage;
    private tmDownloadImage;
    private toJSON;
}
