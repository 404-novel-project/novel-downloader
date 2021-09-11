export declare class fflateZip {
    private zcount;
    private count;
    private tcount;
    private filenameList;
    private savedZip;
    private zipOut;
    private onUpdateId?;
    memlimit: boolean;
    onFinal?: (zipBlob: Blob) => any;
    onFinalError?: (error: Error) => any;
    constructor(memlimit?: boolean);
    file(filename: string, file: Blob): void;
    private addToSavedZip;
    generateAsync(onUpdate?: ((percent: number) => any) | undefined): Promise<void>;
}
