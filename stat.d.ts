interface statData {
    success: {
        [domain: string]: number;
    };
    failed: {
        [domain: string]: number;
    };
}
export declare const successPlus: () => Promise<statData>;
export declare const failedPlus: () => Promise<statData>;
export declare const printStat: () => Promise<void>;
export declare const resetStat: () => Promise<statData>;
export {};
