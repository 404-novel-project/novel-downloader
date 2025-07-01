export declare const MAPPING_TYPES: {
    readonly FILENAME: "filename";
    readonly HASH: "hash";
};
export type MappingType = typeof MAPPING_TYPES[keyof typeof MAPPING_TYPES];
export declare class SessionMappingCache {
    private static instance;
    private cache;
    private activeSessions;
    private constructor();
    static getInstance(): SessionMappingCache;
    initializeSession(sessionId: string): void;
    clearSession(sessionId: string): void;
    isSessionActive(sessionId: string): boolean;
    getMappingsWithLoading(sessionId: string, domain: string, mappingType: MappingType, fetchFn: () => Promise<Map<string, string>>): Promise<Map<string, string>>;
    hasMappings(sessionId: string, domain: string, mappingType: MappingType): boolean;
    getActiveSessions(): string[];
    clearAllSessions(): void;
    getCacheStats(): {
        activeSessions: number;
        cachedDomains: number;
        totalMappings: number;
    };
    private getKey;
}
