import { log } from "../../log";
import { ggetText } from "../http";
import { _GM_setValue, _GM_getValue, _GM_deleteValue } from "../GM";
import ImageHasher from "../imageHasher";
import { SessionMappingCache, MAPPING_TYPES } from "../SessionMappingCache";
import { GmWindow } from "../../global";

/**
 * Hash decoder for converting images to text using hash-based mappings with learning capability
 * Uses session-based caching - mappings are downloaded once per book download and cached in memory only
 * Site-specific mappings are fetched based on domain name
 */
export class HashDecoder {
  private readonly domain: string;
  private readonly remoteUrl: string;
  private readonly learnedCacheKey: string;
  private readonly sessionId: string;
  
  private mappings: Map<string, string> | null = null;
  private learnedMappings: Map<string, string> | null = null;
  private loading: Promise<void> | null = null;
  private imageHasher: ImageHasher;

  constructor(domain: string, sessionId?: string) {
    if (!domain) {
      throw new Error("Domain name is required for HashDecoder initialization");
    }
    
    this.domain = domain;
    this.sessionId = sessionId || (window as GmWindow).workerId;
    
    // Construct site-specific URLs and cache keys
    this.remoteUrl = `https://fastly.jsdelivr.net/gh/oovz/novel-downloader-image-to-text-mapping@master/hash-mappings/${domain}.min.json`;
    this.learnedCacheKey = `hash-mappings-learned-${domain}`;
    
    this.imageHasher = new ImageHasher();
    this.loadLearnedMappings().catch(error => {
      log.error("Failed to initialize learned mappings:", error);
    });
    
    log.debug(`HashDecoder initialized for domain: ${domain}, session: ${this.sessionId}`);
  }

  /**
   * Decode image to text using hash-based mapping
   */
  async decode(imageData: Uint8Array): Promise<string | null> {
    try {
      await this.ensureMappingsLoaded();
      
      const hash = await this.generateImageHash(imageData);
      
      // Try server mappings first (highest priority)
      if (this.mappings?.has(hash)) {
        const text = this.mappings.get(hash)!;
        log.debug(`Decoded text from server mappings: ${text} for hash: ${hash}`);
        return text;
      }
      
      // Try learned mappings as fallback
      if (this.learnedMappings?.has(hash)) {
        const text = this.learnedMappings.get(hash)!;
        log.debug(`Decoded text from learned mappings: ${text} for hash: ${hash}`);
        return text;
      }
      
      log.debug(`No mapping found for hash: ${hash}`);
      return null;
    } catch (error) {
      log.error("Error in hash decoding:", error);
      return null;
    }
  }

  /**
   * Learn a new mapping from user input
   */
  async learnMapping(imageData: Uint8Array, text: string): Promise<void> {
    try {
      const hash = await this.generateImageHash(imageData);
      
      if (!this.learnedMappings) {
        this.learnedMappings = new Map();
      }
      
      this.learnedMappings.set(hash, text);
      await this.saveLearnedMappings();
      
      log.debug(`Learned new mapping: ${hash} -> ${text}`);
    } catch (error) {
      log.error("Error learning mapping:", error);
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
   * Clear learned mappings
   */
  async clearLearnedMappings(): Promise<void> {
    await _GM_deleteValue(this.learnedCacheKey);
    this.learnedMappings = new Map();
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
    log.debug(`Imported ${this.learnedMappings.size} learned mappings`);
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
        MAPPING_TYPES.HASH,
        () => this.fetchRemoteMappings()
      );
      
      log.debug(`Loaded ${this.mappings.size} hash mappings for session ${this.sessionId}`);
    } catch (error) {
      log.error("Failed to load hash mappings:", error);
      throw error; // Fail fast - no fallback empty map
    }
  }

  /**
   * Fetch mappings from remote URL using ggetText for CORS bypass
   */
  private async fetchRemoteMappings(): Promise<Map<string, string>> {
    try {
      log.debug("Fetching hash mappings from remote");
      
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
      
      log.debug(`Successfully loaded ${mappings.size} hash mappings from remote`);
      return mappings;
    } catch (error) {
      log.error("Failed to fetch hash mappings:", error);
      throw error;
    }
  }

  /**
   * Load learned mappings from storage
   */
  private async loadLearnedMappings(): Promise<void> {
    try {
      const cached = await _GM_getValue(this.learnedCacheKey);
      if (cached) {
        const data = JSON.parse(cached as string);
        this.learnedMappings = new Map(Object.entries(data));
        log.debug(`Loaded ${this.learnedMappings.size} learned hash mappings from storage`);
      } else {
        this.learnedMappings = new Map();
      }
    } catch (error) {
      log.error("Failed to load learned mappings:", error);
      this.learnedMappings = new Map();
    }
  }

  /**
   * Save learned mappings to storage
   */
  private async saveLearnedMappings(): Promise<void> {
    try {
      if (this.learnedMappings) {
        const data = Object.fromEntries(this.learnedMappings);
        // Learned mappings are permanent
        await _GM_setValue(this.learnedCacheKey, JSON.stringify(data));
        log.debug(`Saved ${this.learnedMappings.size} learned mappings to storage`);
      }
    } catch (error) {
      log.error("Failed to save learned mappings:", error);
    }
  }

  /**
   * Generate a hash from image data using ImageHasher
   */
  private async generateImageHash(imageData: Uint8Array): Promise<string> {
    // Convert Uint8Array to Blob for ImageHasher
    const blob = new Blob([imageData]);
    return await this.imageHasher.hash(blob);
  }
}
