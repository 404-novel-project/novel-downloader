import { GfetchRequestOptions } from "./http";
interface ReadabilityOptions {
    debug?: boolean;
    maxElemsToParse?: number;
    nbTopCandidates?: number;
    charThreshold?: number;
    classesToPreserve?: string[];
    keepClasses?: boolean;
    serializer?: (node: Node) => string | Element;
    disableJSONLD?: boolean;
}
export declare function parse(doc: Document, options?: ReadabilityOptions): {
    title: string;
    byline: string;
    dir: string;
    content: string | Element;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
} | null;
export declare function fetchAndParse(url: string, charset?: string, init?: RequestInit, patch?: (doc: Document) => Document, options?: ReadabilityOptions): Promise<{
    title: string;
    byline: string;
    dir: string;
    content: string | Element;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
} | null>;
export declare function gfetchAndParse(url: string, charset?: string, init?: GfetchRequestOptions, patch?: (doc: Document) => Document, options?: ReadabilityOptions): Promise<{
    title: string;
    byline: string;
    dir: string;
    content: string | Element;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
} | null>;
export {};
