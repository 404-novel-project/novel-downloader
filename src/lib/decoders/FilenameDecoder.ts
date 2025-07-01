import { log } from "../../log";
import { ggetText } from "../http";
import { _GM_setValue, _GM_getValue, _GM_deleteValue } from "../GM";
import { SessionMappingCache, MAPPING_TYPES } from "../SessionMappingCache";
import { GmWindow } from "../../global";

/**
 * Filename decoder for converting full filenames (including extensions) to characters using remote mappings
 * Uses session-based caching - mappings are downloaded once per book download and cached in memory only
 * Site-specific mappings are fetched based on domain name
 */
export class FilenameDecoder {
  private readonly domain: string;
  private readonly remoteUrl: string;
  private readonly learnedCacheKey: string;
  private readonly sessionId: string;
  
  private mappings: Map<string, string> | null = null;
  private learnedMappings: Map<string, string> | null = null;
  private loading: Promise<void> | null = null;

  constructor(domain: string, sessionId?: string) {
    if (!domain) {
      throw new Error("Domain name is required for FilenameDecoder initialization");
    }
    
    this.domain = domain;
    this.sessionId = sessionId || (window as GmWindow).workerId;
    
    // Construct site-specific URLs and cache keys
    this.remoteUrl = `https://fastly.jsdelivr.net/gh/oovz/novel-downloader-image-to-text-mapping@master/filename-mappings/${domain}.min.json`;
    this.learnedCacheKey = `filename-mappings-learned-${domain}`;
    
    this.loadLearnedMappings().catch(error => {
      log.error("Failed to initialize learned mappings:", error);
    });
    
    log.debug(`FilenameDecoder initialized for domain: ${domain}, session: ${this.sessionId}`);
  }

  /**
   * Decode filename to character using filename-based mapping
   */
  async decode(imageData: Uint8Array): Promise<string | null> {
    // imageData parameter unused - decoder works with filenames from URLs
    log.warn("FilenameDecoder.decode() called with imageData - this decoder requires filename context from URL");
    return null;
  }

  /**
   * Decode full filename (including extension) to character using filename-based mapping
   */
  async decodeFromFilename(filename: string): Promise<string | null> {
    try {
      await this.ensureMappingsLoaded();
      
      // Try server mappings first (highest priority)
      if (this.mappings?.has(filename)) {
        const character = this.mappings.get(filename)!;
        log.debug(`Decoded character from server mappings: ${character} for filename: ${filename}`);
        return character;
      }
      
      // Try learned mappings as fallback
      if (this.learnedMappings?.has(filename)) {
        const character = this.learnedMappings.get(filename)!;
        log.debug(`Decoded character from learned mappings: ${character} for filename: ${filename}`);
        return character;
      }
      
      log.debug(`No character mapping found for filename: ${filename}`);
      return null;
    } catch (error) {
      log.error("Error in filename decoding:", error);
      return null;
    }
  }

  /**
   * Get available mappings count for diagnostics
   */
  getMappingsCount(): { remote: number; learned: number } {
    return {
      remote: this.mappings?.size ?? 0,
      learned: this.learnedMappings?.size ?? 0
    };
  }

  /**
   * Clear cached mappings (for testing or updates)
   * Note: Session-based mappings are automatically cleared when the session ends
   */
  async clearCache(): Promise<void> {
    // Clear session cache for this domain
    const sessionCache = SessionMappingCache.getInstance();
    sessionCache.clearSession(this.sessionId);
    
    this.mappings = null;
    this.loading = null;
  }

  /**
   * Ensure mappings are loaded from cache or remote source
   */
  private async ensureMappingsLoaded(): Promise<void> {
    if (this.mappings) {
      return;
    }

    if (this.loading) {
      await this.loading;
      return;
    }

    this.loading = this.loadMappings();
    await this.loading;
  }

  /**
   * Load mappings from session cache or fetch from remote
   */
  private async loadMappings(): Promise<void> {
    try {
      const sessionCache = SessionMappingCache.getInstance();
      
      this.mappings = await sessionCache.getMappingsWithLoading(
        this.sessionId,
        this.domain,
        MAPPING_TYPES.FILENAME,
        () => this.fetchRemoteMappings()
      );
      
      log.debug(`Loaded ${this.mappings.size} filename mappings for session ${this.sessionId}`);
    } catch (error) {
      log.error("Failed to load filename mappings:", error);
      throw error; // Fail fast - no fallback empty map
    }
  }

  /**
   * Fetch mappings from remote URL using ggetText for CORS bypass
   */
  private async fetchRemoteMappings(): Promise<Map<string, string>> {
    try {
      log.debug("Fetching filename mappings from remote");
      
      const response = await ggetText(this.remoteUrl);
      if (!response) {
        throw new Error("Empty response from remote URL");
      }
      
      const data = JSON.parse(response);
      
      if (typeof data !== 'object' || !data) {
        throw new Error("Invalid mapping data format");
      }

      const mappings = new Map<string, string>();
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          mappings.set(key, value);
        } else {
          log.warn(`Skipping invalid mapping entry: ${key} -> ${value} (not a string)`);
        }
      }
      
      log.debug(`Successfully loaded ${mappings.size} filename mappings from remote`);
      return mappings;
    } catch (error) {
      log.error("Failed to fetch filename mappings:", error);
      throw error;
    }
  }

  /**
   * Load learned mappings from cache
   */
  private async loadLearnedMappings(): Promise<void> {
    try {
      const cached = await _GM_getValue(this.learnedCacheKey);
      if (cached) {
        const data = JSON.parse(cached as string);
        this.learnedMappings = new Map(Object.entries(data));
        log.debug(`Loaded ${this.learnedMappings.size} learned filename mappings from cache`);
      } else {
        this.learnedMappings = new Map();
      }
    } catch (error) {
      log.error("Failed to load learned filename mappings:", error);
      this.learnedMappings = new Map();
    }
  }

  /**
   * Learn and remember a new filename mapping
   */
  async learnMapping(filename: string, character: string): Promise<void> {
    try {
      if (!this.learnedMappings) {
        this.learnedMappings = new Map();
      }

      this.learnedMappings.set(filename, character);
      await this.saveLearnedMappings();
      
      log.debug(`Learned new filename mapping: ${filename} -> ${character}`);
    } catch (error) {
      log.error("Error learning filename mapping:", error);
    }
  }

  /**
   * Clear all learned mappings
   */
  async clearLearnedMappings(): Promise<void> {
    await _GM_deleteValue(this.learnedCacheKey);
    this.learnedMappings = new Map();
    log.debug("Cleared all learned filename mappings");
  }

  /**
   * Export learned mappings for backup
   */
  exportLearnedMappings(): Record<string, string> {
    if (!this.learnedMappings) {
      return {};
    }
    return Object.fromEntries(this.learnedMappings);
  }

  /**
   * Import learned mappings from backup
   */
  async importLearnedMappings(mappings: Record<string, string>): Promise<void> {
    this.learnedMappings = new Map(Object.entries(mappings));
    await this.saveLearnedMappings();
    log.debug(`Imported ${this.learnedMappings.size} learned filename mappings`);
  }

  /**
   * Save learned mappings to storage
   */
  private async saveLearnedMappings(): Promise<void> {
    try {
      if (this.learnedMappings) {
        const data = Object.fromEntries(this.learnedMappings);
        await _GM_setValue(this.learnedCacheKey, JSON.stringify(data));
        log.debug(`Saved ${this.learnedMappings.size} learned filename mappings to storage`);
      }
    } catch (error) {
      log.error("Failed to save learned filename mappings:", error);
    }
  }
}
