export declare class ImageCache {
    private static instance;
    private cache;
    private readonly maxCacheSize;
    private accessOrder;
    private constructor();
    static getInstance(): ImageCache;
    getImageData(imageUrl: string): Promise<Uint8Array>;
    private cacheImageData;
    private updateAccessOrder;
    clearCache(): void;
    getCacheStats(): {
        size: number;
        maxSize: number;
        urls: string[];
    };
}
