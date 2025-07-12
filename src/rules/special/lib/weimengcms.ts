/**
 * Utilities for websites using WeimengCMS
 * 
 * @example
 * ```typescript
 * import { WeimengCMS, createWeimengConfig } from './lib/weimengcms';
 * 
 * const config = createWeimengConfig({
 *   baseUrl: "https://mysite.com",
 *   selectors: { BOOK_TITLE: "h1.title" }
 * });
 * 
 * const weimeng = new WeimengCMS(config);
 * const chapterContent = await weimeng.fetchChapterContent("12345");
 * ```
 */

import { gfetch } from "../../../lib/http";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * WeimengCMS API Response interface
 * Standard response format for WeimengCMS-based novel websites
 */
export interface WeimengApiResponse {
  code: number;
  msg: string;
  count: number; // number of properties in data
  data: {
    novel?: WeimengNovelData;
    chapter?: WeimengChapterData;
    prev?: WeimengNavigationData;
    next?: WeimengNavigationData;
    price?: WeimengPriceData;
  };
}

/**
 * Novel metadata from WeimengCMS API
 */
export interface WeimengNovelData {
  novel_author: string;
  novel_chapter: string; // number of chapters as string
  novel_cover: string; // cover image URL
  novel_id: string; // novel ID as string
  novel_info: string; // description
  novel_newcid: string; // latest chapter ID
  novel_newcname: string; // latest chapter name
  novel_pinyin: string; // pinyin of novel name
  novel_process: string; // completion status
  novel_startcid: string; // first chapter ID
  novel_startcname: string; // first chapter name
  novel_wordnumber: string; // total word count as string
  type_id: string; // genre ID as string
  type_name: string; // genre name
}

/**
 * Chapter content data from WeimengCMS API
 */
export interface WeimengChapterData {
  author_id: string;
  chapter_cid: string;
  chapter_id: string;
  chapter_islogin: string; // "0" = no login required
  chapter_ispay: string; // "0" = free, "1" = paid
  chapter_istxt: string; // "0" = not text, "1" = text
  chapter_isvip: string; // "0" = not VIP, "1" = VIP
  chapter_name: string;
  chapter_nid: string; // novel ID
  chapter_number: string;
  chapter_order: string;
  chapter_status: string;
  chapter_time: string; // timestamp of chapter creation
  chapter_type: string; // e.g., "公众章节"
  chapter_vid: string;
  content: string[]; // array of paragraphs
  is_content: boolean;
  is_sub: number;
  novel_id: string;
  type_id: string;
  volume_desc: string; // e.g., "正文内容"
  volume_name: string; // e.g., "正文"
}

/**
 * Navigation data for previous/next chapters
 */
export interface WeimengNavigationData {
  chapter_id: string; // "0" if no chapter
  chapter_name: string; // empty if no chapter
}

/**
 * Pricing information from WeimengCMS
 */
export interface WeimengPriceData {
  sell_month: string;
  sell_all: string;
  sell_number: string;
}

/**
 * Configuration interface for WeimengCMS sites
 */
export interface WeimengConfig {
  baseUrl: string;
  selectors: {
    BOOK_TITLE: string;
    BOOK_AUTHOR: string;
    BOOK_INTRO: string;
    BOOK_TAGS: string;
    BOOK_COVER: string;
    CHAPTER_LIST_LINK: string;
    CHAPTER_LINKS: string;
  };
  api: {
    ENDPOINT_PATTERN: string;
    CHAPTER_ACTION: string;
    SUCCESS_CODE: number;
  };
  urlPatterns: {
    CHAPTER_ID_REGEX: RegExp;
  };
  errors: {
    NO_CHAPTER_LIST_LINK: string;
    NO_CHAPTERS_FOUND: string;
    CHAPTER_LIST_FETCH_FAILED: string;
    NO_CHAPTER_ID: string;
    API_ERROR: string;
    NO_CHAPTER_DATA: string;
  };
}

/**
 * Chapter options interface for WeimengCMS chapters
 */
export interface WeimengChapterOptions {
  chapterId: string;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

/**
 * Default configuration for WeimengCMS sites
 * This serves as the base configuration that can be overridden for specific sites
 */
export const DEFAULT_WEIMENG_CONFIG: WeimengConfig = {
  baseUrl: "", // Must be provided by implementation
  selectors: {
    BOOK_TITLE: "h2.works-intro-title > strong",
    BOOK_AUTHOR: "p.works-intro-digi > span", 
    BOOK_INTRO: "p.works-intro-short",
    BOOK_TAGS: "#tags-show > a",
    BOOK_COVER: "div.works-cover > img",
    CHAPTER_LIST_LINK: "div.works-chapter-wr > ul > li.active > a",
    CHAPTER_LINKS: "ol > li > p a"
  },
  api: {
    ENDPOINT_PATTERN: "/wmcms/ajax/index.php",
    CHAPTER_ACTION: "novel.getchapter",
    SUCCESS_CODE: 200
  },
  urlPatterns: {
    CHAPTER_ID_REGEX: /\/read\/(\d+)\.html$/
  },
  errors: {
    NO_CHAPTER_LIST_LINK: "Chapter list page link not found",
    NO_CHAPTERS_FOUND: "No chapters found in chapter list page",
    CHAPTER_LIST_FETCH_FAILED: "Failed to fetch chapter list from separate page",
    NO_CHAPTER_ID: "Could not extract chapter ID from URL",
    API_ERROR: "API Error",
    NO_CHAPTER_DATA: "No chapter data found"
  }
};

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Type guard to validate WeimengCMS API response structure
 */
export function isValidWeimengResponse(data: any): data is WeimengApiResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.code === 'number' &&
    typeof data.msg === 'string' &&
    typeof data.data === 'object' &&
    data.data !== null
  );
}

/**
 * Type guard to validate chapter data in API response
 */
export function hasValidChapterData(response: WeimengApiResponse): response is WeimengApiResponse & { data: { chapter: WeimengChapterData } } {
  return (
    response.data.chapter !== undefined &&
    typeof response.data.chapter === 'object' &&
    response.data.chapter !== null &&
    typeof response.data.chapter.chapter_name === 'string' &&
    Array.isArray(response.data.chapter.content)
  );
}

/**
 * Validates that a chapter ID is in the correct format
 */
export function isValidChapterId(chapterId: string | null): chapterId is string {
  return (
    typeof chapterId === 'string' &&
    chapterId.length > 0 &&
    /^\d+$/.test(chapterId)
  );
}

/**
 * Validates WeimengCMS API response code
 */
export function isSuccessResponse(response: WeimengApiResponse, expectedCode: number = 200): boolean {
  return response.code === expectedCode;
}

/**
 * Validates that chapter content array is not empty
 */
export function hasValidContent(content: string[]): boolean {
  return (
    Array.isArray(content) &&
    content.length > 0 &&
    content.some(paragraph => typeof paragraph === 'string' && paragraph.trim().length > 0)
  );
}

/**
 * Comprehensive validation for WeimengCMS chapter response
 */
export function validateChapterResponse(response: any, expectedCode: number = 200): {
  isValid: boolean;
  errors: string[];
  chapterData?: WeimengChapterData;
} {
  const errors: string[] = [];

  if (!isValidWeimengResponse(response)) {
    errors.push("Invalid API response structure");
    return { isValid: false, errors };
  }

  if (!isSuccessResponse(response, expectedCode)) {
    errors.push(`API returned error code: ${response.code} - ${response.msg}`);
    return { isValid: false, errors };
  }

  if (!hasValidChapterData(response)) {
    errors.push("No valid chapter data found in response");
    return { isValid: false, errors };
  }

  const chapterData = response.data.chapter;

  if (!hasValidContent(chapterData.content)) {
    errors.push("Chapter content is empty or invalid");
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: [],
    chapterData
  };
}

// =============================================================================
// CONFIGURATION UTILITIES
// =============================================================================

/**
 * Creates a WeimengCMS configuration by merging defaults with site-specific overrides
 */
export function createWeimengConfig(overrides: Partial<WeimengConfig>): WeimengConfig {
  return {
    baseUrl: overrides.baseUrl || DEFAULT_WEIMENG_CONFIG.baseUrl,
    selectors: {
      ...DEFAULT_WEIMENG_CONFIG.selectors,
      ...overrides.selectors
    },
    api: {
      ...DEFAULT_WEIMENG_CONFIG.api,
      ...overrides.api
    },
    urlPatterns: {
      ...DEFAULT_WEIMENG_CONFIG.urlPatterns,
      ...overrides.urlPatterns
    },
    errors: {
      ...DEFAULT_WEIMENG_CONFIG.errors,
      ...overrides.errors
    }
  };
}

/**
 * Validates a WeimengCMS configuration
 */
export function validateWeimengConfig(config: WeimengConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.baseUrl || typeof config.baseUrl !== 'string') {
    errors.push("baseUrl is required and must be a string");
  }

  if (!config.selectors || typeof config.selectors !== 'object') {
    errors.push("selectors configuration is required");
  }

  if (!config.api || typeof config.api !== 'object') {
    errors.push("api configuration is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// =============================================================================
// WEIMENGCMS CLIENT CLASS
// =============================================================================

/**
 * WeimengCMS client for handling API requests and content processing
 */
export class WeimengCMS {
  private config: WeimengConfig;

  constructor(config: WeimengConfig) {
    const validation = validateWeimengConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid WeimengCMS configuration: ${validation.errors.join(', ')}`);
    }
    this.config = config;
  }

  /**
   * Builds WeimengCMS API request URL for chapter content
   */
  public buildApiRequest(chapterId: string): string {
    const params = new URLSearchParams({
      action: this.config.api.CHAPTER_ACTION,
      cid: chapterId,
      format: "1"
    });
    
    return `${this.config.baseUrl}${this.config.api.ENDPOINT_PATTERN}?${params.toString()}`;
  }

  /**
   * Fetches chapter content from WeimengCMS API
   */
  public async fetchChapterContent(
    chapterId: string, 
    chapterUrl?: string
  ): Promise<WeimengChapterData> {
    if (!isValidChapterId(chapterId)) {
      throw new Error(`Invalid chapter ID: ${chapterId}`);
    }

    const apiUrl = this.buildApiRequest(chapterId);

    try {
      const response = await gfetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Referer: chapterUrl || this.config.baseUrl,
          "User-Agent": navigator.userAgent,
        },
      });

      return await this.handleApiResponse(response);
    } catch (error) {
      console.error(`[WeimengCMS] Error fetching chapter content:`, error);
      throw error;
    }
  }

  /**
   * Processes chapter content from WeimengCMS API response into DOM elements
   */
  public processChapterContent(chapterData: WeimengChapterData): HTMLElement {
    const contentRaw = document.createElement("div");

    if (Array.isArray(chapterData.content)) {
      chapterData.content.forEach((paragraph: string) => {
        if (paragraph.trim()) {
          const p = document.createElement("p");
          p.textContent = paragraph.trim();
          contentRaw.appendChild(p);
          // Add empty line between paragraphs
          const br = document.createElement("br");
          contentRaw.appendChild(br);
        }
      });
    } else {
      console.warn(`[WeimengCMS] Chapter content is not an array:`, chapterData.content);
    }

    return contentRaw;
  }

  /**
   * Handles and validates WeimengCMS API response from gfetch (Tampermonkey)
   */
  private async handleApiResponse(response: Tampermonkey.Response<object>): Promise<WeimengChapterData> {
    // gfetch returns Tampermonkey.Response, not standard Response
    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText || 'Unknown error'}`);
    }

    try {
      // Parse JSON from responseText (gfetch response format)
      const data: WeimengApiResponse = JSON.parse(response.responseText);
      const validation = validateChapterResponse(data, this.config.api.SUCCESS_CODE);

      if (!validation.isValid) {
        throw new Error(`${this.config.errors.API_ERROR}: ${validation.errors.join(', ')}`);
      }

      return validation.chapterData!;
    } catch (error) {
      console.error(`[WeimengCMS] Error processing gfetch API response:`, error);
      throw error;
    }
  }

  /**
   * Extracts chapter ID from URL using configured regex pattern
   */
  public extractChapterIdFromUrl(url: string): string | null {
    const match = url.match(this.config.urlPatterns.CHAPTER_ID_REGEX);
    return match ? match[1] : null;
  }

  /**
   * Gets the configuration object
   */
  public getConfig(): WeimengConfig {
    return { ...this.config }; // Return a copy to prevent external modifications
  }
}

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Creates a WeimengCMS instance for a known site
 */
export function createWeimengForSite(apiBaseDomain: string, additionalConfig?: Partial<WeimengConfig>): WeimengCMS {
  const config = createWeimengConfig({
    baseUrl: apiBaseDomain,
    ...additionalConfig
  });

  return new WeimengCMS(config);
}

/**
 * Helper function to extract chapter ID from URL using default regex
 */
export function extractChapterIdFromUrl(url: string, pattern?: RegExp): string | null {
  const regex = pattern || DEFAULT_WEIMENG_CONFIG.urlPatterns.CHAPTER_ID_REGEX;
  const match = url.match(regex);
  return match ? match[1] : null;
}
