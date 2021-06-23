interface statData {
    success: {
        [domain: string]: number;
    };
    failed: {
        [domain: string]: number;
    };
}
declare let statData: statData;
export declare function successPlus(): statData;
export declare function failedPlus(): statData;
export declare function printStat(): void;
export declare function resetStat(): statData;
export {};
