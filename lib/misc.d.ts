export declare type PublicConstructor<T> = new () => T;
interface concurrencyOptions {
    signal?: AbortSignal;
    reason?: string;
}
export declare function concurrencyRun(list: any[], limit: number, asyncHandle: (arg: any) => any, options?: concurrencyOptions): Promise<any[]>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function deepcopy<T>(obj: T): T;
export declare function regexpEscape(str: string): string;
export declare function saveToArchiveOrg(url: string): Promise<any>;
export {};
