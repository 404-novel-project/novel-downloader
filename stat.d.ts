interface StatData {
    success: {
        [domain: string]: number;
    };
    failed: {
        [domain: string]: number;
    };
}
export declare const successPlus: () => Promise<StatData>;
export declare const failedPlus: () => Promise<StatData>;
export declare const printStat: () => Promise<void>;
export declare const resetStat: () => Promise<StatData>;
export {};
