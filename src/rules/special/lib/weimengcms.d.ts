export interface WeimengApiResponse {
    code: number;
    msg: string;
    count: number;
    data: {
        novel?: WeimengNovelData;
        chapter?: WeimengChapterData;
        prev?: WeimengNavigationData;
        next?: WeimengNavigationData;
        price?: WeimengPriceData;
    };
}
export interface WeimengNovelData {
    novel_author: string;
    novel_chapter: string;
    novel_cover: string;
    novel_id: string;
    novel_info: string;
    novel_newcid: string;
    novel_newcname: string;
    novel_pinyin: string;
    novel_process: string;
    novel_startcid: string;
    novel_startcname: string;
    novel_wordnumber: string;
    type_id: string;
    type_name: string;
}
export interface WeimengChapterData {
    author_id: string;
    chapter_cid: string;
    chapter_id: string;
    chapter_islogin: string;
    chapter_ispay: string;
    chapter_istxt: string;
    chapter_isvip: string;
    chapter_name: string;
    chapter_nid: string;
    chapter_number: string;
    chapter_order: string;
    chapter_status: string;
    chapter_time: string;
    chapter_type: string;
    chapter_vid: string;
    content: string[];
    is_content: boolean;
    is_sub: number;
    novel_id: string;
    type_id: string;
    volume_desc: string;
    volume_name: string;
}
export interface WeimengNavigationData {
    chapter_id: string;
    chapter_name: string;
}
export interface WeimengPriceData {
    sell_month: string;
    sell_all: string;
    sell_number: string;
}
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
export interface WeimengChapterOptions {
    chapterId: string;
}
export declare const DEFAULT_WEIMENG_CONFIG: WeimengConfig;
export declare function isValidWeimengResponse(data: any): data is WeimengApiResponse;
export declare function hasValidChapterData(response: WeimengApiResponse): response is WeimengApiResponse & {
    data: {
        chapter: WeimengChapterData;
    };
};
export declare function isValidChapterId(chapterId: string | null): chapterId is string;
export declare function isSuccessResponse(response: WeimengApiResponse, expectedCode?: number): boolean;
export declare function hasValidContent(content: string[]): boolean;
export declare function validateChapterResponse(response: any, expectedCode?: number): {
    isValid: boolean;
    errors: string[];
    chapterData?: WeimengChapterData;
};
export declare function createWeimengConfig(overrides: Partial<WeimengConfig>): WeimengConfig;
export declare function validateWeimengConfig(config: WeimengConfig): {
    isValid: boolean;
    errors: string[];
};
export declare class WeimengCMS {
    private config;
    constructor(config: WeimengConfig);
    buildApiRequest(chapterId: string): string;
    fetchChapterContent(chapterId: string, chapterUrl?: string): Promise<WeimengChapterData>;
    processChapterContent(chapterData: WeimengChapterData): HTMLElement;
    private handleApiResponse;
    extractChapterIdFromUrl(url: string): string | null;
    getConfig(): WeimengConfig;
}
export declare function createWeimengForSite(apiBaseUrl: string, additionalConfig?: Partial<WeimengConfig>): WeimengCMS;
export declare function extractChapterIdFromUrl(url: string, pattern?: RegExp): string | null;
