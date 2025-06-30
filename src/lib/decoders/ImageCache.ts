import { log } from "../../log";
import { gfetch } from "../http";

/**
 * Simple image cache for decoder processing that doesn't interfere with epub attachments
 * Uses memory-only cache to avoid conflicting with the attachment system
 */
export class ImageCache {
  private static instance: ImageCache | null = null;
  private cache: Map<string, Uint8Array> = new Map();
  private readonly maxCacheSize = 50; // Limit cache to 50 images
  private accessOrder: string[] = []; // Track access order for LRU eviction

  private constructor() {
    // Private constructor for singleton
  }

  /**
   * Get singleton instance
   */
  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  /**
   * Get image data from cache or download if not cached
   */
  async getImageData(imageUrl: string): Promise<Uint8Array> {
    if (this.cache.has(imageUrl)) {
      // Update access order for LRU
      this.updateAccessOrder(imageUrl);
      log.debug(`Image cache hit for: ${imageUrl.substring(0, 50)}...`);
      return this.cache.get(imageUrl)!;
    }

    // Download image data using gfetch
    try {
      log.debug(`Downloading image for cache: ${imageUrl.substring(0, 50)}...`);
      
      const response = await gfetch(imageUrl, { 
        responseType: "arraybuffer",
        method: "GET"
      });
      
      if (response.status !== 200 || !response.response) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const uint8Array = new Uint8Array(response.response as ArrayBuffer);
      
      this.cacheImageData(imageUrl, uint8Array);
      
      log.debug(`Downloaded and cached image: ${uint8Array.length} bytes`);
      return uint8Array;
    } catch (error) {
      log.error(`Failed to download image: ${imageUrl}`, error);
      throw error;
    }
  }

  /**
   * Cache image data with LRU eviction
   */
  private cacheImageData(imageUrl: string, data: Uint8Array): void {
    // If cache is full, remove least recently used item
    if (this.cache.size >= this.maxCacheSize) {
      const lruUrl = this.accessOrder.shift();
      if (lruUrl) {
        this.cache.delete(lruUrl);
        log.debug(`Evicted LRU image from cache: ${lruUrl.substring(0, 50)}...`);
      }
    }

    // Add to cache and access order
    this.cache.set(imageUrl, data);
    this.accessOrder.push(imageUrl);
  }

  /**
   * Update access order for LRU tracking
   */
  private updateAccessOrder(imageUrl: string): void {
    const index = this.accessOrder.indexOf(imageUrl);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(imageUrl);
    }
  }

  /**
   * Clear all cached images
   */
  clearCache(): void {
    this.cache.clear();
    this.accessOrder.length = 0;
    log.debug("Cleared image cache");
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; maxSize: number; urls: string[] } {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      urls: Array.from(this.cache.keys()).map(url => url.substring(0, 50) + "...")
    };
  }
}
