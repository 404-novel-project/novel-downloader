export declare class FilenameDecoder {
    private readonly remoteUrl;
    private readonly cacheKey;
    private mappings;
    private loading;
    constructor(domain: string);
    decode(imageData: Uint8Array): Promise<string | null>;
    decodeFromFilename(filename: string): Promise<string | null>;
    getMappingsCount(): number;
    clearCache(): Promise<void>;
    private ensureMappingsLoaded;
    private loadMappings;
    private fetchRemoteMappings;
}
