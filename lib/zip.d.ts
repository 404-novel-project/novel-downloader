export declare class FflateZip {
    private zcount;
    private count;
    private filenameList;
    private zipOut;
    private savedZip;
    onFinal?: (zipBlob: Blob) => void;
    onFinalError?: (error: Error) => void;
    constructor();
    file(filename: string, fileBlob: Blob): Promise<void>;
    generateAsync(): Promise<void>;
}
