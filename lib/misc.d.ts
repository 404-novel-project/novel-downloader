export declare type PublicConstructor<T> = new () => T;
export declare function rm(selector: string, all: boolean | undefined, dom: HTMLElement): void;
export declare function concurrencyRun(list: object[], limit: number, asyncHandle: Function): Promise<Function[]>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function sandboxed(code: string): any;
export declare function storageAvailable(type: string): any;
export declare function calculateMd5(blob: Blob): Promise<unknown>;
export declare class localStorageExpired {
    private storage;
    constructor();
    private init;
    set(key: string, value: string | object, expired: number): void;
    get(key: string): any;
    remove(key: string): void;
}
