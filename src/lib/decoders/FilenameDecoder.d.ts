export declare class FilenameDecoder {
    private readonly domain;
    private readonly remoteUrl;
    private readonly learnedCacheKey;
    private readonly sessionId;
    private mappings;
    private learnedMappings;
    private loading;
    constructor(domain: string, sessionId?: string);
    decode(imageData: Uint8Array): Promise<string | null>;
    decodeFromFilename(filename: string): Promise<string | null>;
    getMappingsCount(): {
        remote: number;
        learned: number;
    };
    clearCache(): Promise<void>;
    private ensureMappingsLoaded;
    private loadMappings;
    private fetchRemoteMappings;
    private loadLearnedMappings;
    learnMapping(filename: string, character: string): Promise<void>;
    clearLearnedMappings(): Promise<void>;
    exportLearnedMappings(): Record<string, string>;
    importLearnedMappings(mappings: Record<string, string>): Promise<void>;
    private saveLearnedMappings;
}
