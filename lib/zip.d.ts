export declare function setStreamSaverSetting(): Promise<void>;
export declare class FflateZip {
    filename: string;
    stream: boolean;
    private zcount;
    private count;
    private filenameList;
    private zipOut;
    private savedZip;
    constructor(filename: string, stream: boolean);
    file(filename: string, fileBlob: Blob): Promise<void>;
    generateAsync(): Promise<void>;
}
