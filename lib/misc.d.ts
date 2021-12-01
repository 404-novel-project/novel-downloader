export declare type PublicConstructor<T> = new () => T;
export declare function rm(selector: string, all: boolean | undefined, dom: HTMLElement): void;
export declare function rm2(content: HTMLElement, filters: (string | RegExp)[]): void;
export declare function rms(ads: (string | RegExp)[], dom: HTMLElement): HTMLElement;
export declare function concurrencyRun(list: any[], limit: number, asyncHandle: (arg: any) => any): Promise<any[]>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function sandboxed(code: string): any;
export declare function storageAvailable(type: string): any;
export declare function calculateMd5(blob: Blob): Promise<unknown>;
export declare class LocalStorageExpired {
    private storage;
    constructor();
    private init;
    set(key: string, value: string | object, expired: number): void;
    get(key: string): object | undefined;
    remove(key: string): void;
}
export declare function deepcopy<T>(obj: T): T;
export declare function regexpEscape(str: string): string;
export declare function getMaxDepth(element: Element): number;
export declare function getNodeTextLength(element: Element): number;
export declare function getCookie(name: string): string | null;
