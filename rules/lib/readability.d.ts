import { gfetch_request_options } from "../../lib/http";
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
export declare function parse(doc: Document, options?: ReadabilityOptions | undefined): {
    title: string;
    byline: string;
    dir: string;
    content: string | Element;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
} | null;
export declare function fetchAndParse(url: string, charset: string | undefined, init?: RequestInit | undefined, patch?: (doc: Document) => Document, options?: ReadabilityOptions | undefined): Promise<{
    title: string;
    byline: string;
    dir: string;
    content: string | Element;
    textContent: string;
    length: number;
    excerpt: string;
    siteName: string;
} | null>;
export declare function gfetchAndParse(url: string, charset: string | undefined, init?: gfetch_request_options | undefined, patch?: (doc: Document) => Document, options?: ReadabilityOptions | undefined): Promise<{
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
