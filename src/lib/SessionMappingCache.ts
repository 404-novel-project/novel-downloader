import { log } from "../log";

/**
 * State for tracking mappings and loading status per session+domain
 */
interface SessionDomainState {
  mappings: Map<string, string> | null;
  loading: Promise<Map<string, string>> | null;
}

/**
 * Session-based mapping cache for decoders
 * Provides in-memory mapping storage that's automatically cleaned up when book downloads complete
 * Prevents repeated downloads of the same mapping file during a book download session
 */
export class SessionMappingCache {
  private static instance: SessionMappingCache | null = null;
  private cache: Map<string, SessionDomainState> = new Map(); // sessionId-domain -> state
  private activeSessions: Set<string> = new Set();

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get singleton instance of SessionMappingCache
   */
  static getInstance(): SessionMappingCache {
    if (!SessionMappingCache.instance) {
      SessionMappingCache.instance = new SessionMappingCache();
    }
    return SessionMappingCache.instance;
  }

  /**
   * Initialize a new download session
   */
  initializeSession(sessionId: string): void {
    this.activeSessions.add(sessionId);
    log.debug(`[SessionMappingCache] Initialized session: ${sessionId}`);
  }

  /**
   * Clear all mappings for a download session
   */
  clearSession(sessionId: string): void {
    // Remove all cache entries for this session
    const keysToDelete: string[] = [];
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${sessionId}-`)) {
        keysToDelete.push(key);
      }
    }
    
    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
    
    this.activeSessions.delete(sessionId);
    
    log.debug(`[SessionMappingCache] Cleared session: ${sessionId} (removed ${keysToDelete.length} cache entries)`);
  }

  /**
   * Check if a session is currently active
   */
  isSessionActive(sessionId: string): boolean {
    return this.activeSessions.has(sessionId);
  }

  /**
   * Get mappings for a session+domain with concurrent loading support
   * If mappings aren't cached, calls the provided fetch function to download them
   * Prevents multiple simultaneous downloads of the same mapping file
   */
  async getMappingsWithLoading(
    sessionId: string, 
    domain: string, 
    fetchFn: () => Promise<Map<string, string>>
  ): Promise<Map<string, string>> {
    const key = this.getKey(sessionId, domain);
    let state = this.cache.get(key);
    
    if (!state) {
      state = { mappings: null, loading: null };
      this.cache.set(key, state);
    }
    
    // Return cached mappings if available
    if (state.mappings) {
      log.debug(`[SessionMappingCache] Using cached mappings for ${key}`);
      return state.mappings;
    }
    
    // If already loading, wait for existing load to complete
    if (state.loading) {
      log.debug(`[SessionMappingCache] Waiting for in-progress download for ${key}`);
      return await state.loading;
    }
    
    // Start new download
    log.debug(`[SessionMappingCache] Starting download for ${key}`);
    state.loading = fetchFn();
    
    try {
      state.mappings = await state.loading;
      log.debug(`[SessionMappingCache] Successfully cached ${state.mappings.size} mappings for ${key}`);
      return state.mappings;
    } catch (error) {
      log.error(`[SessionMappingCache] Failed to download mappings for ${key}:`, error);
      // Remove the cache entry on failure so future attempts can retry
      this.cache.delete(key);
      throw error;
    } finally {
      state.loading = null;
    }
  }

  /**
   * Check if mappings are cached for a session+domain
   */
  hasMappings(sessionId: string, domain: string): boolean {
    const key = this.getKey(sessionId, domain);
    const state = this.cache.get(key);
    return state?.mappings !== null && state?.mappings !== undefined;
  }

  /**
   * Get active session IDs for debugging
   */
  getActiveSessions(): string[] {
    return Array.from(this.activeSessions);
  }

  /**
   * Clear all sessions and mappings (for cleanup/testing)
   */
  clearAllSessions(): void {
    this.cache.clear();
    this.activeSessions.clear();
    log.debug("[SessionMappingCache] Cleared all sessions and mappings");
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats(): { activeSessions: number; cachedDomains: number; totalMappings: number } {
    let totalMappings = 0;
    for (const state of this.cache.values()) {
      if (state.mappings) {
        totalMappings += state.mappings.size;
      }
    }
    
    return {
      activeSessions: this.activeSessions.size,
      cachedDomains: this.cache.size,
      totalMappings
    };
  }

  /**
   * Generate cache key for session+domain combination
   */
  private getKey(sessionId: string, domain: string): string {
    return `${sessionId}-${domain}`;
  }
}
