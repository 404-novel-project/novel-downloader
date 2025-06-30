export declare class HashDecoder {
    private readonly domain;
    private readonly remoteUrl;
    private readonly learnedCacheKey;
    private readonly sessionId;
    private mappings;
    private learnedMappings;
    private loading;
    private imageHasher;
    constructor(domain: string, sessionId?: string);
    decode(imageData: Uint8Array): Promise<string | null>;
    learnMapping(imageData: Uint8Array, text: string): Promise<void>;
    getMappingsCount(): {
        remote: number;
        learned: number;
    };
    clearCache(): Promise<void>;
    clearLearnedMappings(): Promise<void>;
    exportLearnedMappings(): Record<string, string>;
    importLearnedMappings(mappings: Record<string, string>): Promise<void>;
    private ensureMappingsLoaded;
    private loadMappings;
    private fetchRemoteMappings;
    private loadLearnedMappings;
    private saveLearnedMappings;
    private generateImageHash;
}
