export declare function storageAvailable(type: string): any;
export declare class LocalStorageExpired {
    private storage;
    constructor();
    private init;
    set(key: string, value: string | object, expired: number): void;
    get(key: string): object | undefined;
    remove(key: string): void;
}
