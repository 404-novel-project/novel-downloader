export interface OCRResult {
    text: string;
    confidence: number;
}
export declare class OCRDecoder {
    private modelLoaded;
    private loadingPromise;
    private ocrEngine;
    private modelCache;
    private ppocrDict;
    private readonly cacheKey;
    private readonly cacheVersion;
    private readonly cacheVersionKey;
    private readonly zipUrl;
    private readonly filesToExtract;
    constructor();
    decode(imageData: Uint8Array): Promise<OCRResult | null>;
    isAvailable(): boolean;
    getModelInfo(): {
        name: string;
        version: string;
        loaded: boolean;
    };
    close(): Promise<void>;
    clearModelCache(): Promise<void>;
    private ensureModelLoaded;
    private loadModel;
    private configureONNXRuntime;
    private downloadAndCacheModels;
    private extractZipFiles;
    private uint8ArrayToBinaryString;
    private loadPaddleOCRDict;
    private uint8ArrayToImageData;
}
