export declare function setStreamSaverSetting(): Promise<void>;
export declare class FflateZip {
    filename: string;
    stream: boolean;
    private zcount;
    private count;
    private filenameList;
    private zipOut;
    private savedZip;
    constructor(filename: string, stream: boolean, mimetype?: string);
    file(filename: string, fileBlob: Blob, nocompress?: boolean): Promise<void>;
    generateAsync(): Promise<void>;
}
